import React from "react";
import "../sass/TakeDialog.sass";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import userServices from "../services/userServices";

// import Popover from "@material-ui/core/Popover";

//icons imported from material ui
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import pin from "../assets/pin.svg";
import pined from "../assets/pined.svg";
import ColorPalette from "./ColorPalette";
const userve = new userServices();

const button = createMuiTheme({
	overrides: {
		MuiButton: {
			root: {
				padding: "0",
				color: "#757575",
				"&:hover": {
					backgroundColor: "none"
				}
			}
		}
	}
});
const iconmod = createMuiTheme({
	overrides: {
		MuiIconButton: {
			sizeSmall: {
				padding: "2%"
			}
		}
	}
});

export default class TakeNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			// labelIdList: "",
			// checklist: "",
			isPined: false,
			isArchived: false,
			color: ""
			// reminder: "",
			// collaborators: ""
		};
		this.handleColor = this.handleColor.bind(this);
	}
	// static getDerivedStateFromProps(props, state) {
	// 	return {
	// 		title: "",
	// 		description: "",
	// 		// labelIdList: "",
	// 		// checklist: "",
	// 		isPined: false,
	// 		isArchived: false,
	// 		color: ""
	// 		// reminder: "",
	// 		// collaborators: ""
	// 	};
	// }
	componentWillMount() {
		this.setState({
			title: this.props.diaData.title,
			description: this.props.diaData.description,
			// labelIdList: "",
			// checklist: "",
			isPined: this.props.diaData.isPined,
			isArchived: this.props.diaData.isArchived,
			color: this.props.diaData.color,
			// reminder: "",
			// collaborators: ""
		});
	}

	handleNoteState = () => {
		this.props.noteState();
	};

	handleCreateNote = () => {
		if (this.state.title !== "") {
			console.log("note created");
			let note = {};
			note.title = this.state.title;
			note.description = this.state.description;
			note.isPined = this.state.isPined;
			// note.color = this.state.color;
			note.isArchived = this.state.isArchived;
			// note.labelIdList = "";
			// note.checklist = "";
			// note.reminder = "";
			// note.collaborators = "";
			// hit create node api
			console.log("data in note", note);
			userve
				.createNote(note)
				.then(response => {
					if (response.status === 200) {
						console.log("note created successfully", response);
					}
				})
				.catch(error => {
					console.log("note not created error occurred", error);
				});
		} else {
			console.log("title is compulsory for note creation");
		}
		this.handleNoteState();
		this.setState({ color: "" });
	};

	handleTitle = event => {
		event.preventDefault();
		console.log("title:=>", event.currentTarget.value);
		this.setState({ title: event.currentTarget.value });
	};
	handleDescription = event => {
		event.preventDefault();
		console.log("description:=>", event.currentTarget.value);
		this.setState({ description: event.currentTarget.value });
	};
	// handleLabelIdList = event => {
	// 	event.preventDefault();
	// 	console.log("labelIdList;=>", event.currentTarget.value);
	// 	this.setState({ labelIdList: event.currentTarget.value });
	// };
	// handleChecklist = event => {
	// 	event.preventDefault();
	// 	console.log("checklist:=>", event.currentTarget.value);
	// 	this.setState({ checklist: event.currentTarget.value });
	// };
	handleIsPined = async () => {
		await this.setState({ isPined: !this.state.isPined });
		console.log("isPined:=>", this.state.isPined);
	};
	handleIsArchived = async event => {
		event.preventDefault();
		console.log("isArchived:=>", this.state.isArchived);
		await this.setState({ isArchived: !this.state.isArchived });
	};
	handleColor = color => {
		console.log("color:=>", color);
		this.setState({ color });
	};

	render() {
		return (
			<Paper id="noteActive" style={{ backgroundColor: this.state.color }}>
				<div id="titleN">
					<InputBase
						style={{ marginLeft: "2%", width: "89%", color: "#202124" }}
						id="inputInactive"
						margin="dense"
						placeholder="Title"
						value={this.state.title}
						onChange={event => this.handleTitle(event)}
					/>
					<div id="pin">
						<Tooltip title="pin">
							<IconButton onClick={this.handleIsPined}>
								{this.state.isPined ? (
									<img src={pined} alt="pined"></img>
								) : (
									<img src={pin} alt="pin"></img>
								)}
							</IconButton>
						</Tooltip>
					</div>
				</div>

				<InputBase
					style={{
						marginLeft: "2%",
						width: "96%",
						color: "#202124",
						fontSize: "12px",
						fontWeight: "500"
					}}
					id="inputInactive"
					margin="dense"
					multiline
					placeholder="Take a note..."
					value={this.state.description}
					onChange={event => this.handleDescription(event)}
				/>
				<div id="functions">
					<div id="iconBar">
						<MuiThemeProvider theme={iconmod}>
							<Tooltip title="Remind me">
								<IconButton size="small">
									<AddAlertOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>

							<Tooltip title="Collaborator">
								<IconButton size="small">
									<PersonAddOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>

							<Tooltip title="Add image">
								<IconButton size="small">
									<InsertPhotoOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>
							<ColorPalette selectColor={this.handleColor} />
							<Tooltip title="Archive">
								<IconButton size="small">
									<ArchiveOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>

							<Tooltip title="more">
								<IconButton size="small">
									<MoreVertOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>
						</MuiThemeProvider>
					</div>
					<div id="button">
						<MuiThemeProvider theme={button}>
							<Tooltip title="close">
								<Button varient="secondary">
									close
								</Button>
							</Tooltip>
						</MuiThemeProvider>
					</div>
				</div>
			</Paper>
		);
	}
}
