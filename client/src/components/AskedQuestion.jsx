import React, { Component } from "react";
import "../sass/playground.sass";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import noteServices from "../services/noteServices";
import { ListItemText, Divider, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const nServe = new noteServices();

const styles = {
	listItem: {
		paddingTop: "0px",
		paddingBottom: "0px"
	},
	listItemButton: {
		// paddingTop: "0px",
		// paddingBottom: "0px",
		justifyContent: "flex-end"
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
	}
};

class AskedQuestion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			noteDetails: "",
			question: "",
			date: "",
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

	componentDidMount() {
		this.setState({
			profile:
				"http://fundoonotes.incubation.bridgelabz.com/" +
				localStorage.getItem("imageUrl")
		});
		console.log("value in match params", this.props.match.params.id);
		this.getNoteDetailsfromDb(this.props.match.params.id);
	}
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
						).toString()
					},
					() => {
						let d = this.state.date.slice(0, 21);
						this.setState({ date: d }, () => {
							console.log("value of date", typeof this.state.date);
						});
					}
				);
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
					console.log("question added successfully", response);
				})
				.catch(err => {
					console.log("error adding question", err);
				});
		} else {
			console.log("question should not be empty");
		}
	};

	render() {
    const { noteDetails } = this.state;
    console.log("value in notedetails",noteDetails);
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
						</ListItem>
						<ListItem classes={{ root: classes.listItem }}>
							<ListItemText
								primaryTypographyProps={{ style: text2 }}
								primary={noteDetails.description}
							/>
						</ListItem>

						<Divider />
						<ListItem classes={{ root: classes.listItem }}>
							<ListItemText
								primaryTypographyProps={{ style: text3 }}
								primary="Ask a Question"
							/>
						</ListItem>
						{noteDetails.questionAndAnswerNotes.length < 0 ?(
							<ListItem classes={{ root: classes.listItem }}>
								<ListItemText
									primaryTypographyProps={{ style: text4 }}
									primary="Make sure what you’re asking is unique, concise, and phrased like a question."
								/>
							</ListItem>
						):null}
						<ListItem>
							<ListItemAvatar>
								<Avatar
									style={{ border: "2px solid #ccc" }}
									alt={localStorage.getItem("name").charAt(0)}
									src={this.state.profile}
								/>
							</ListItemAvatar>
							<ListItemText>
								<span>
									<b>{localStorage.getItem("name")}</b>
									{"  "}
									{this.state.date}
								</span>
							</ListItemText>
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
