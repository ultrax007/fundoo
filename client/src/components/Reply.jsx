import React, { Component, Fragment } from "react";
import "../sass/playground.sass";
import FroalaEditorComponent from "react-froala-wysiwyg";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
import noteServices from "../services/noteServices";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import ReplyIcon from "@material-ui/icons/Reply";
import Like from "@material-ui/icons/ThumbUpOutlined";
import Dislike from "@material-ui/icons/ThumbUpAlt";
import StarRatings from "react-star-ratings";
const nServe = new noteServices();
var sum = 0,
	avg;
const styled = {
	listItem: {
		paddingTop: "0px",
		paddingBottom: "0px"
	},
	listItemButton: {
		justifyContent: "flex-end"
	},
	listItemText: {
		fontSize: "12px"
	},
	froala: {
		padding: "0 25px",
		justifyConten: "stretch"
	},
	button: {
		backgroundColor: "#1DE9B6",
		color: "#fff",
		"&:hover": {
			backgroundColor: "#FF9100"
		}
	},
	Rbutton: {
		fontSize: "12px"
	},
	avatar: {
		width: "25px",
		height: "25px",
		border: "2px solid #ccc"
	}
};

class Reply extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0,
			ratingAvg: 0,
			replyQ: "",
			reply: false,
			viewReply: false,
			viewStatus: false,
			like: false,
			likesArray: [],
			likesCount: 0
		};
	}
	componentDidMount() {
		this.setState(
			{
				likesArray: this.props.data.like.filter(obj => obj.like === true),
				ratingArray: this.props.data.rate
			},
			() => {
				this.setState({ likesCount: this.state.likesArray.length }, () => {
					console.log("has likes" + this.state.likesCount);
					for (let index = 0; index < this.state.likesArray.length; index++) {
						if (
							this.state.likesArray[index].userId ===
							localStorage.getItem("userId")
						) {
							this.setState({ like: true });
						}
					}
					for (let index = 0; index < this.state.ratingArray.length; index++) {
						if (
							this.state.ratingArray[index].userId ===
							localStorage.getItem("userId")
						) {
							this.setState({ rating: this.state.ratingArray[index].rate });
						}
					}
					for (let index = 0; index < this.state.ratingArray.length; index++) {
						if (this.state.ratingArray[index]) {
							console.log("array of rate ", this.state.ratingArray[index].rate);
							sum = sum + this.state.ratingArray[index].rate;
							avg = sum / this.state.ratingArray.length;
							console.log("value of sum", sum, avg);
						}
							this.setState({
								ratingAvg: avg
              }, () => {
                  console.log("value in state avg",this.state.ratingAvg);
              });
					}
				});
			}
		);
	}
	handleChange = replyQ => {
		console.log("value in replyQ", replyQ);
		this.setState({
			replyQ: replyQ
		});
	};
	getDate = utc => {
		var nDate = new Date(utc).toString().slice(0, 21);
		// console.log("now date is", nDate);
		return nDate;
	};
	handleReply = event => {
		event.preventDefault();
		this.setState({ reply: !this.state.reply });
	};
	handleViewReply = event => {
		event.preventDefault();
		this.setState({ viewStatus: !this.state.viewStatus });
		this.props.showReplies();
	};
	handleSubmitReply = event => {
		event.preventDefault();
		this.props.submitReply(event, this.props.data.id, this.state.replyQ);
	};
	hitLikeDislikeApi = data => {
		nServe
			.likeDislike(data)
			.then(response => {
				console.log("question liked/disliked", response);
			})
			.catch(err => {
				console.log("err hitting likedislike api", err);
			});
	};
	handleLike = event => {
		event.preventDefault();
		this.setState(
			{
				like: true,
				likesCount: this.state.likesCount + 1
			},
			() => {
				let data = {
					id: this.props.data.id,
					like: true
				};
				this.hitLikeDislikeApi(data);
			}
		);
	};
	handleDislike = event => {
		event.preventDefault();
		this.setState(
			{
				like: false,
				likesCount: this.state.likesCount - 1
			},
			() => {
				let data = {
					id: this.props.data.id,
					like: false
				};
				this.hitLikeDislikeApi(data);
			}
		);
	};
  changeRating = newRating => {
    // have to change rating according to the avg
		console.log("value in new rating", newRating);
		this.setState({
			rating: newRating
		});
	};
	render() {
		const { classes } = this.props;
		const like = {
			fontSize: "12px"
		};
		return (
			<Fragment>
				<ListItem classes={{ root: classes.listItem }}>
					<ListItemAvatar style={{ minWidth: "40px" }}>
						<Avatar
							classes={{ root: classes.avatar }}
							alt={localStorage.getItem("name").charAt(0)}
							src={this.props.profile}
						/>
					</ListItemAvatar>
					<ListItemText>
						<div id="textReply">
							<b>{localStorage.getItem("name")}</b>
							{"  "}
							<p
								style={{
									fontSize: "12px",
									margin: "0px 0px 0px 10px",
									width: "fit-content",
									alignSelf: "center"
								}}
							>
								{this.getDate(this.props.data.createdDate)}
							</p>
						</div>
					</ListItemText>
					{this.props.replyButton && (
						<ListItemSecondaryAction>
							<Button
								classes={{ sizeSmall: classes.Rbutton }}
								size="small"
								onClick={event => this.handleViewReply(event)}
							>
								{this.state.viewStatus ? "hide reply" : "view reply"}
							</Button>
						</ListItemSecondaryAction>
					)}
				</ListItem>
				<ListItem classes={{ root: classes.listItem }}>
					<h3
						style={{
							margin: "0px 0px 0px 8px"
						}}
					>
						>
					</h3>
					<div
						id="answered"
						dangerouslySetInnerHTML={{
							__html: this.props.data.message
						}}
					></div>
					{this.props.replyButton && (
						<Fragment>
							<ListItemIcon
								size="small"
								style={{ marginLeft: "40px", minWidth: "30px" }}
								onClick={event => this.handleReply(event)}
							>
								<ReplyIcon style={{ color: "#757575" }} />
							</ListItemIcon>
							<ListItemIcon
								size="small"
								style={{ marginLeft: "0px", minWidth: "30px" }}
							>
								{this.state.like ? (
									<Dislike
										style={{ color: "#0098f7" }}
										fontSize="inherit"
										onClick={event => this.handleDislike(event)}
									/>
								) : (
									<Like
										style={{ color: "#757575" }}
										fontSize="inherit"
										onClick={event => this.handleLike(event)}
									/>
								)}
							</ListItemIcon>
							<ListItemText primaryTypographyProps={{ style: like }}>
								likes {this.state.likesCount}
							</ListItemText>
							<StarRatings
								rating={this.state.ratingAvg}
								starRatedColor="#0098f7"
								changeRating={this.changeRating}
								numberOfStars={5}
								starDimension="15px"
								starSpacing="4px"
							/>
						</Fragment>
					)}
				</ListItem>

				{this.state.reply && (
					<Fragment>
						<ListItem>
							<div id="froala">
								<FroalaEditorComponent
									tag="textarea"
									config={this.config}
									model={this.state.replyQ}
									onModelChange={this.handleChange}
								/>
							</div>
						</ListItem>
						<ListItem classes={{ root: classes.listItemButton }}>
							<Button
								size="small"
								classes={{ root: classes.button }}
								onClick={event => {
									this.handleSubmitReply(event);
								}}
							>
								Submit
							</Button>
						</ListItem>
					</Fragment>
				)}
			</Fragment>
		);
	}
}

export default withStyles(styled)(Reply);
