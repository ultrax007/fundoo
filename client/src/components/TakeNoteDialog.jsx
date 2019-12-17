import React from "react";
import "../sass/TakeNote.sass";
import update from "immutability-helper";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import noteServices from "../services/noteServices";
import CheckList from "./Checklist";
// import Popover from "@material-ui/core/Popover";

//icons imported from material ui
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import pin from "../assets/pin.svg";
import pined from "../assets/pined.svg";
import ColorPalette from "./ColorPalette";
import ArchiveIcon from "./ArchiveIcon";
const nServe = new noteServices();

const button = createMuiTheme({
	overrides: {
		MuiButton: {
			root: {
				padding: "0",
				color: "#494949",
				"&:hover": {
					backgroundColor: "fff0"
				}
			},
			text: {
				padding: "0px"
			}
		}
	}
});
const iconmod = createMuiTheme({
	overrides: {
		MuiIconButton: {
			sizeSmall: {
				padding: "1%",
				color: "#494949"
			},
			root: {
				"&:hover": {
					backgroundColor: "fff0"
				}
			}
		}
	}
});

export default class TakeNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			title: "",
			description: "",
			noteCheckLists: [],
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

	handleNoteState = () => {
		this.props.noteState();
	};

	getEncodData(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		}
		return formBody.join("&");
	}

	handleCreateNote = () => {
		if (this.state.title !== "") {
			console.log("note created", this.state.noteCheckLists);
			let note = {};
			note.title = this.state.title;
			note.description = this.state.description;
			note.isPined = this.state.isPined;
			note.color = this.state.color;
			note.isArchived = this.state.isArchived;
			note.checklist = JSON.stringify(this.state.noteCheckLists);
			// note.labelIdList = "";
			// note.reminder = "";
			// note.collaborators = "";
			// hit create node api
			var data = this.getEncodData(note);
			console.log("data in note", data);
			nServe
				.createNote(data)
				.then(response => {
					if (response.status === 200) {
						console.log("note created successfully", response);
						this.props.takeNoteClose();
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
	handleIsArchived = async () => {
		// event.preventDefault();
		await this.setState({ isArchived: !this.state.isArchived });
		console.log("isArchived:=>", this.state.isArchived);
	};
	handleColor = color => {
		console.log("color:=>", color);
		this.setState({ color: color });
	};
	handleChecklistAdd = async arr => {
		console.log("value in arr", arr);
		await this.setState({
			noteCheckLists: arr
		});
		console.log("value in notechecklist", this.state.noteCheckLists);
	};

	handleChecklistRemove = key => {
		console.log("value in remove item", key);
		for (let i = 0; i < this.state.noteCheckLists.length; i++) {
			if (this.state.noteCheckLists[i].key === key) {
				console.log("index of item in notechecklist", i);
				this.setState(
					{
						noteCheckLists: update(this.state.noteCheckLists, {
							$splice: [[i, 1]]
						})
					},
					() => {
						console.log(
							"after item removal note checklist is",
							this.state.noteCheckLists
						);
					}
				);
				i = this.state.noteCheckLists.length;
			}
		}
	};

	handleChecklistCheck = key => {
		console.log("in handlechecklistcheck with item name", key);

		for (let i = 0; i < this.state.noteCheckLists.length; i++) {
			if (this.state.noteCheckLists[i].key === key) {
				console.log("found id in notechecklists", this.state.noteCheckLists[i]);
				if (this.state.noteCheckLists[i].status === "open") {
					this.setState(
						{
							noteCheckLists: update(this.state.noteCheckLists, {
								[i]: {
									status: {
										$set: "close"
									}
								}
							})
						},
						() => {
							i = this.state.noteCheckLists.length;
							console.log(
								"succesfully changed status in if",
								this.state.noteCheckLists,
								"value of i",
								i
							);
						}
					);
				} else {
					this.setState(
						{
							noteCheckLists: update(this.state.noteCheckLists, {
								[i]: {
									status: {
										$set: "open"
									}
								}
							})
						},
						() => {
							i = this.state.noteCheckLists.length;
							console.log(
								"succesfully changed status in else",
								this.state.noteCheckLists,
								"value of i",
								i
							);
						}
					);
				}
			}
		}
	};

	render() {
		return (
			<Paper
				id="noteActive"
				style={{ backgroundColor: this.state.color, borderRadius: "8px" }}
			>
				<div id="titleN">
					<InputBase
						autoFocus
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

				<CheckList
					listState={this.state}
					onChecked={this.handleChecklistCheck}
					onTick={this.handleChecklistAdd}
					onRemove={this.handleChecklistRemove}
				/>
				<div id="functions">
					<div id="iconBar">
						<MuiThemeProvider theme={iconmod}>
							<Tooltip title="Remind me">
								<IconButton id="ib" size="small">
									<AddAlertOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>

							<Tooltip title="Collaborator">
								<IconButton id="ib" size="small">
									<PersonAddOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>

							<Tooltip title="Add image">
								<IconButton id="ib" size="small">
									<InsertPhotoOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>
							<ColorPalette
								selectColor={this.handleColor}
								dataOfNote={this.state}
								styleid={"ib"}
							/>
							<ArchiveIcon
								archiveAction={this.handleIsArchived}
								archiveState={this.state.isArchived}
								styleid={"ib"}
							/>
							<Tooltip title="more">
								<IconButton id="ib" size="small">
									<MoreVertOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>
						</MuiThemeProvider>
					</div>
					<div id="button">
						<MuiThemeProvider theme={button}>
							<Tooltip title="close">
								<Button varient="secondary" onClick={this.handleCreateNote}>
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
