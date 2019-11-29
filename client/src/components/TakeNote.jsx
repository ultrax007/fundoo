import React from "react";
import "../sass/mainArea.sass";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import userServices from "../services/userServices";
// import Popover from "@material-ui/core/Popover";

//icons imported from material ui
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import pin from "../assets/pin.svg";
import pined from "../assets/pined.svg";
import ColorPalette from "./ColorPalette";

const theme = createMuiTheme({
	overrides: {
		MuiInputBase: {
			input: {
				color: "#202124",
				fontWeight: "500"
			}
		}
	}
});
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
			noteClicked: false,
			title: "",
			description: "",
			labelIdList: "",
			checklist: "",
			isPined: false,
			isArchived: false,
			color: "white",
			reminder: "",
			collaborators: ""
		};
		this.handleColor = this.handleColor.bind(this);
	}

	handleNoteState = () => {
		this.setState({
			noteClicked: !this.state.noteClicked,
			color:"white"
		});
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
	handleLabelIdList = event => {
		event.preventDefault();
		console.log("labelIdList;=>", event.currentTarget.value);
		this.setState({ labelIdList: event.currentTarget.value });
	};
	handleChecklist = event => {
		event.preventDefault();
		console.log("checklist:=>", event.currentTarget.value);
		this.setState({ checklist: event.currentTarget.value });
	};
	handleIsPined = async () => {
		await this.setState({ isPined: !this.state.isPined });
		console.log("isPined:=>", this.state.isPined);
	};
	handleIsArchived = async (event) => {
		event.preventDefault();
		console.log("isArchived:=>", this.state.isArchived);
		await this.setState({ isArchived: !this.state.isArchived });
	};
	handleColor = (color) => {
		console.log("color:=>", color);
		this.setState({ color });
	};

	handleCreateNote = () => {
		this.handleNoteState();
		if (this.state.title !== "" || this.state.description !== "") {
			console.log("note created");
			let note = {},target="";
			note.title = this.state.title;
			note.description = this.state.description;
			note.isPined = this.state.isPined;
			note.color = this.state.color;
			note.isArchived = this.state.isArchived;
			note.labelIdList = "";
			note.checklist = "";
			note.reminder = "";
			note.collaborators = "";
			// hit create node api

		}
	}
	

	render() {
		
		return (
			<div id="takeNoteContainer">
				{this.state.noteClicked ? (
					<ClickAwayListener onClickAway={this.handleNoteState}>
						<Paper id="noteActive" style={{backgroundColor:this.state.color}}>
							{/* <MuiThemeProvider> */}
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
							{/* </MuiThemeProvider> */}
							<div id="functions">
								<div id="iconBar">
									<MuiThemeProvider theme={iconmod}>
									<Tooltip title="Remind me"  >
										<IconButton size="small">
											<AddAlertOutlinedIcon fontSize="inherit" />
										</IconButton>
									</Tooltip>

									<Tooltip title="Collaborator" >
										<IconButton size="small">
											<PersonAddOutlinedIcon fontSize="inherit"/>
										</IconButton>
									</Tooltip>

									<Tooltip title="Add image" >
										<IconButton size="small">
											<InsertPhotoOutlinedIcon fontSize="inherit"/>
										</IconButton>
									</Tooltip>
									<ColorPalette selectColor={this.handleColor}/>
									<Tooltip title="Archive" >
										<IconButton size="small">
											<ArchiveOutlinedIcon fontSize="inherit"/>
										</IconButton>
									</Tooltip>

									<Tooltip title="more" >
										<IconButton size="small">
											<MoreVertOutlinedIcon fontSize="inherit"/>
										</IconButton>
										</Tooltip>
										</MuiThemeProvider>
								</div>
								<div id="button">
									<MuiThemeProvider theme={button}>
										<Tooltip title="close">
											<Button
												varient="secondary"
												onClick={this.handleCreateNote}
											>
												close
											</Button>
										</Tooltip>
									</MuiThemeProvider>
								</div>
							</div>
						</Paper>
					</ClickAwayListener>
				) : (
					<Paper id="noteInactive">
						<MuiThemeProvider theme={theme}>
							<InputBase
								style={{ marginLeft: "2%", width: "72%", color: "#202124" }}
								id="inputInactive"
								margin="dense"
								placeholder="Take a note..."
								onClick={this.handleNoteState}
							/>
						</MuiThemeProvider>
						<Tooltip title="New List">
							<IconButton>
								<CheckBoxOutlinedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="New note with Drawing">
							<IconButton>
								<BrushOutlinedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="New note with Image">
							<IconButton>
								<InsertPhotoOutlinedIcon />
							</IconButton>
						</Tooltip>
					</Paper>
				)}
			</div>
		);
	}
}
