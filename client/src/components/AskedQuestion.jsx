import React, { Component, Fragment } from "react";
import "../sass/playground.sass";
import update from "immutability-helper";
import Reply from "./Reply";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import noteServices from "../services/noteServices";
import {
	ListItemText,
	Divider,
	Button,
	ListItemSecondaryAction,
	IconButton
} from "@material-ui/core";
import ReplyIcon from "@material-ui/icons/Reply";
import Like from "@material-ui/icons/ThumbUpOutlined";
import Dislike from "@material-ui/icons/ThumbUpAlt";
import StarRatings from "react-star-ratings";
import { withStyles } from "@material-ui/core/styles";
import que from "../assets/que2.svg";
var sum = 0,
	avg;
const nServe = new noteServices();

const styles = {
	listItem: {
		paddingTop: "0px",
		paddingBottom: "0px"
	},
	listItemButton: {
		// marginLeft: "40px",
		justifyContent: "flex-end"
		// paddingTop: "0px",
		// paddingBottom: "0px",
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

class AskedQuestion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			noteDetails: "",
			qExist: false,
			question: "",
			replyQ: "",
			answers: [],
			reply: false,
			main: false,
			first: false,
			second: false,
			like: false,
			likesArray: [],
			likesCount: 0,
			ratingAvg: 0,
			ratingArray: [],
			date: new Date().toString(),
			profile:
				"http://fundoonotes.incubation.bridgelabz.com/" +
				localStorage.getItem("imageUrl")
		};
	}

	handleModelChange = model => {
		console.log("value in model", model);
		this.setState({
			question: model
		});
	};

	handleChange = replyQ => {
		console.log("value in replyQ", replyQ);
		this.setState({
			replyQ: replyQ
		});
	};

	UNSAFE_componentWillMount() {
		this.setState({
			profile:
				"http://fundoonotes.incubation.bridgelabz.com/" +
				localStorage.getItem("imageUrl")
		});
		console.log("value in match params", this.props.match.params.id);
		this.getNoteDetailsfromDb(this.props.match.params.id);
	}

	// componentDidMount() {
	// }
	componentWillUnmount() {
		this.setState({ noteDetails: "", question: "", profile: "" });
	}

	getNoteDetailsfromDb = data => {
		nServe.getNotesDetails(data).then(response => {
			console.log("successfully fetched data", response.data.data.data[0]);
			this.setState({ noteDetails: response.data.data.data[0] });
			if (response.data.data.data[0].questionAndAnswerNotes.length > 0) {
				this.setState(
					{
						date: new Date(
							response.data.data.data[0].questionAndAnswerNotes[0].createdDate
						).toString(),
						qExist: true,
						question: response.data.data.data[0].questionAndAnswerNotes[0]
					},
					() => {
						let d = this.state.date.slice(0, 21);
						this.setState({ date: d }, () => {
							console.log("value of date", typeof this.state.date);
						});
						this.setState(
							{
								likesArray: response.data.data.data[0].questionAndAnswerNotes[0].like.filter(
									obj => obj.like === true
								),
								ratingArray:
									response.data.data.data[0].questionAndAnswerNotes[0].rate
							},
							() => {
								this.setState(
									{
										likesCount: this.state.likesArray.length
									},
									() => {
										console.log(
											"reply" +
												this.state.question.message +
												"has likes" +
												this.state.likesCount
										);
										for (
											let index = 0;
											index < this.state.likesArray.length;
											index++
										) {
											if (
												this.state.likesArray[index].userId ===
												localStorage.getItem("userId")
											) {
												this.setState({ like: true });
											}
										}
									}
								);
								// for (
								// 	let index = 0;
								// 	index < this.state.ratingArray.length;
								// 	index++
								// ) {
								// 	if (
								// 		this.state.ratingArray[index].userId ===
								// 		localStorage.getItem("userId")
								// 	) {
								// 		this.setState({
								// 			ratingAvg: this.state.ratingArray[index].rate
								// 		});
								// 	}
								// }
								for (
									let index = 0;
									index < this.state.ratingArray.length;
									index++
								) {
									if (this.state.ratingArray[index]) {
										console.log(
											"array of rate ",
											this.state.ratingArray[index].rate
										);
										sum = sum + this.state.ratingArray[index].rate;
										avg = sum / this.state.ratingArray.length;
										console.log("value of sum", sum, avg);
									}
									this.setState(
										{
											ratingAvg: avg
										},
										() => {
											console.log("value in state avg", this.state.ratingAvg);
										}
									);
								}
							}
						);
					}
				);
				if (response.data.data.data[0].questionAndAnswerNotes.length > 1) {
					this.setState(
						{
							answers: response.data.data.data[0].questionAndAnswerNotes.slice(
								1
							)
						},
						() => {
							console.log("in ansers", this.state.answers);
						}
					);
				}
			}
		});
	};

	handleAddQuestion = event => {
		event.preventDefault();
		let data = {};
		data.message = this.state.question;
		data.notesId = this.props.match.params.id;
		if (data.message !== "") {
			nServe
				.addQuestion(data)
				.then(response => {
					this.setState({
						qExist: true,
						question: response.data.data.details
					});
					console.log(
						"question added successfully",
						response.data.data.details
					);
				})
				.catch(err => {
					console.log("error adding question", err);
				});
		} else {
			console.log("question should not be empty");
		}
	};

	handleClose = event => {
		event.preventDefault();
		// this.props.history.push("/dashboard/notes");
		this.props.history.goBack();
	};
	getDate = utc => {
		var nDate = new Date(utc).toString().slice(0, 21);
		console.log("now date is", nDate);
		return nDate;
	};

	handleReply = event => {
		event.preventDefault();
		this.setState({ reply: !this.state.reply });
	};

	handleViewReply = event => {
		event.preventDefault();
		this.setState({ viewReply: !this.state.viewReply });
	};

	handleMainReply = event => {
		event.preventDefault();
		this.setState({ main: !this.state.main });
	};

	handleFirstReply = event => {
		this.setState({ first: !this.state.first });
	};

	handleSecondReply = () => {
		this.setState({ second: !this.state.second });
	};
	hitReplyApi = data => {
		console.log("value in data in hitreplyapi***", data);
		nServe
			.replyQuestion(data)
			.then(response => {
				console.log("successfully submitted reply", response.data.data);
			})
			.catch(err => {
				console.log("error occured", err);
			});
	};
	handleSubmitReply = (event, id, message) => {
		event.preventDefault();
		this.setState({ reply: false });
		var data = {};
		if (!message) {
			console.log("in question submit");
			data.id = this.state.question.id;
			data.message = this.state.replyQ;
		} else {
			console.log("in reply submit");
			data.id = id;
			data.message = message;
		}
		this.hitReplyApi(data);
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
					id: this.state.question.id,
					like: true
				};
				this.hitLikeDislikeApi(data);
			}
		);
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
	handleDislike = event => {
		event.preventDefault();
		this.setState(
			{
				like: false,
				likesCount: this.state.likesCount - 1
			},
			() => {
				let data = {
					id: this.state.question.id,
					like: false
				};
				this.hitLikeDislikeApi(data);
			}
		);
	};
	hitRatingApi = data => {
		console.log("hit rating contains data", data);
		nServe
			.ratingChange(data)
			.then(response => {
				console.log("rating changed", response);
			})
			.catch(err => {
				console.log("rating change failed", err);
			});
	};
	changeRating = async newRating => {
		let flag = false,
			data = {};
		// have to change rating according to the avg
		console.log("value in new rating", newRating);
		for (let index = 0; index < this.state.ratingArray.length; index++) {
			if (
				this.state.ratingArray[index].userId === localStorage.getItem("userId")
			) {
				await this.setState({
					ratingArray: update(this.state.ratingArray, {
						[index]: { rate: { $set: newRating } }
					})
				});
				flag = true;
				break;
			}
		}
		if (flag === true) {
			sum = 0;
			this.state.ratingArray.forEach(element => {
				sum += element.rate;
			});
			avg = await (sum / this.state.ratingArray.length);
			await this.setState({
				ratingAvg: avg
			});
		} else {
			await this.setState({
				ratingAvg: newRating
			});
		}
		data.rate = await this.state.ratingAvg;
		data.id = await this.state.question.id;
		this.hitRatingApi(data);
	};
	render() {
		const { noteDetails } = this.state;
		const { question } = this.state;
		// console.log("value in notedetails", noteDetails);
		const { classes } = this.props;
		const text = {
			fontSize: "25px"
		};
		const text2 = {
			fontSize: "22px"
		};
		const text3 = {
			fontSize: "25px",
			fontWeight: "500"
		};
		const text4 = {
			fontSize: "16px"
		};
		const like = {
			fontSize: "12px"
		};
		const myStyle = this.props.drawerStatus ? "containerSM" : "container";
		return (
			<div id={myStyle}>
				<Paper id="qnaPaper">
					<List>
						<ListItem classes={{ root: classes.listItem }}>
							<ListItemText
								primaryTypographyProps={{ style: text }}
								primary={noteDetails.title}
							/>
							<ListItemSecondaryAction>
								<Button onClick={event => this.handleClose(event)}>
									close
								</Button>
							</ListItemSecondaryAction>
						</ListItem>
						<ListItem classes={{ root: classes.listItem }}>
							<ListItemText
								primaryTypographyProps={{ style: text2 }}
								primary={noteDetails.description}
							/>
						</ListItem>
						<Divider />
						{this.state.qExist ? (
							<Fragment>
								<ListItem>
									<ListItemAvatar>
										<Avatar
											style={{ border: "2px solid #ccc" }}
											alt={localStorage.getItem("name").charAt(0)}
											src={this.state.profile}
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
												{this.state.date}
											</p>
										</div>
									</ListItemText>
								</ListItem>
								<ListItem>
									<ListItemIcon
										size="small"
										style={{ minWidth: "40px", justifyContent: "center" }}
									>
										<img
											src={que}
											alt="?"
											width="28px"
											height="28px"
											style={{ boxShadow: "grey 3px 3px 2px 0px" }}
										/>
									</ListItemIcon>
									<div
										id="questioned"
										dangerouslySetInnerHTML={{
											__html: question.message
										}}
									></div>

									<ListItemIcon style={{ marginLeft: "45px" }}>
										<IconButton
											size="small"
											onClick={event => this.handleReply(event)}
										>
											<ReplyIcon />
										</IconButton>
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
									<ListItemSecondaryAction>
										<div id="stars">
											<StarRatings
												rating={this.state.ratingAvg}
												starRatedColor="#0098f7"
												changeRating={this.changeRating}
												numberOfStars={5}
												starDimension="15px"
												starSpacing="4px"
											/>
										</div>
										{this.state.answers.length > 0 && (
											<Button
												classes={{ sizeSmall: classes.Rbutton }}
												size="small"
												onClick={event => this.handleMainReply(event)}
											>
												{this.state.main ? "hide reply" : "view reply"}
											</Button>
										)}
									</ListItemSecondaryAction>
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
								{this.state.main && (
									<Fragment>
										{/* main replies of thread */}
										{this.state.answers &&
											this.state.answers.map(data =>
												question.id === data.parentId &&
												data.isApproved === true ? (
													<div key={data.id} id="answer">
														<Divider />
														<Reply
															data={data}
															profile={this.state.profile}
															showReplies={this.handleFirstReply}
															replyButton={true}
															submitReply={this.handleSubmitReply}
														/>
														{/* reply first child */}
														{this.state.first && (
															<List>
																{this.state.answers.map(data1 =>
																	data.id === data1.parentId &&
																	data1.isApproved === true ? (
																		<div key={data1.id} id="answer">
																			<Reply
																				data={data1}
																				profile={this.state.profile}
																				showReplies={this.handleSecondReply}
																				replyButton={true}
																				submitReply={this.handleSubmitReply}
																			/>
																			{/* reply second child */}
																			{this.state.second && (
																				<List>
																					{this.state.answers.map(data2 =>
																						data1.id === data2.parentId &&
																						data2.isApproved === true ? (
																							<div key={data2.id} id="answer">
																								<Reply
																									data={data2}
																									profile={this.state.profile}
																									replyButton={false}
																								/>
																							</div>
																						) : null
																					)}
																				</List>
																			)}
																		</div>
																	) : null
																)}
															</List>
														)}
													</div>
												) : null
											)}
									</Fragment>
								)}
							</Fragment>
						) : (
							<Fragment>
								<ListItem classes={{ root: classes.listItem }}>
									<ListItemText
										primaryTypographyProps={{ style: text3 }}
										primary="Ask a Question"
									/>
								</ListItem>

								<ListItem classes={{ root: classes.listItem }}>
									<ListItemText
										primaryTypographyProps={{ style: text4 }}
										primary="Make sure what you’re asking is unique, concise, and phrased like a question."
									/>
								</ListItem>

								<ListItem classes={{ root: classes.listItem }}>
									<div id="froala">
										<FroalaEditorComponent
											tag="textarea"
											config={this.config}
											model={this.state.question}
											onModelChange={this.handleModelChange}
										/>
									</div>
								</ListItem>
								<ListItem classes={{ root: classes.listItemButton }}>
									<Button
										size="small"
										classes={{ root: classes.button }}
										onClick={event => {
											this.handleAddQuestion(event);
										}}
									>
										Submit-Question
									</Button>
								</ListItem>
							</Fragment>
						)}
					</List>
				</Paper>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return { drawerStatus: state.drawerData };
};
export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(AskedQuestion);
