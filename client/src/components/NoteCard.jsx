import React, { Fragment } from "react";
import "../sass/NoteCard.sass";
import { connect } from "react-redux";
import update from "immutability-helper";
import CheckList from "./Checklist";
import NoteCardChecklist from "./NoteCardChecklist";
/**
 * Material ui imports
 */
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import AccessTimeSharpIcon from "@material-ui/icons/AccessTimeSharp";
import Dialog from "@material-ui/core/Dialog";
import Grow from "@material-ui/core/Grow";
import Chip from "@material-ui/core/Chip";

/**
 * needed file imports
 */
import pin from "../assets/pin.svg";
import pined from "../assets/pined.svg";
import RemindMe from "./RemindMe";
import Collaborator from "./Collaborator";
import ColorPalette from "./ColorPalette";
import ArchiveIcon from "./ArchiveIcon";
import MoreMenu from "./MoreMenu";
import Restore from "./Restore";
import DeleteForever from "./DeleteForever";
import noteServices from "../services/noteServices";
const nServe = new noteServices();
let date, time;
const button = createMuiTheme({
	overrides: {
		MuiButton: {
			root: {
				padding: "0",
				color: "#202124",
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
const backdrop = createMuiTheme({
	overrides: {
		MuiDialog: {
			root: {
				marginTop: "-15%"
			}
		},
		MuiBackdrop: {
			root: {
				backgroundColor: "#e5e5e59c"
			}
		},
		MuiPaper: {
			rounded: {
				borderRadius: "10px"
			}
		}
	}
});

const cardAction = createMuiTheme({
	overrides: {
		MuiIconButton: {
			sizeSmall: {
				padding: "2%"
			},
			root: {
				"&:hover": {
					backgroundColor: "#fff0"
				}
			}
		},
		MuiCardActions: {
			root: {
				justifyContent: "space-around",
				padding: "0 8px"
			}
		}
	}
});

class NoteCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.dataFromDisplay.id,
			title: this.props.dataFromDisplay.title,
			description: this.props.dataFromDisplay.description,
			noteCheckLists: this.props.dataFromDisplay.noteCheckLists,
			isPined: this.props.dataFromDisplay.isPined,
			isArchived: this.props.dataFromDisplay.isArchived,
			isDeleted: this.props.dataFromDisplay.isDeleted,
			color: this.props.dataFromDisplay.color,
			noteLabels: this.props.dataFromDisplay.noteLabels,
			reminder: this.props.dataFromDisplay.reminder,
			reminderString: new Date(
				this.props.dataFromDisplay.reminder[0]
			).toString(),
			combined: "",
			// collaborators: ""
			dialogOpen: false
		};
	}

	componentDidMount() {
		// console.log("date is", this.state.reminderString);
		if (this.state.reminderString !== "Invalid Date") {
			date = this.state.reminderString.slice(4, 10);
			time = this.state.reminderString.slice(16, 21);
			// console.log("value in reminder", this.state.reminderString, date, time);
			this.setState({
				combined: date + "," + time
			});
		}
	}

	handleClick = () => {
		this.setState({ dialogOpen: !this.state.dialogOpen });
	};

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
		this.setState({ color: color });
		console.log("color:=>", color);
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

	handleDeleteRestore = async () => {
		await this.setState({ isDeleted: !this.state.isDeleted });
		console.log("value of isDeleted", this.state.isDeleted);
	};

	handleUpdation = async () => {
		console.log("updation clicked");
		// event.preventDefault();
		await this.props.operation();
	};

	handleClose = () => {
		this.setState({ dialogOpen: false });
	};

	handleUpdateNote = () => {
		if (this.state.title !== "") {
			console.log("note updating");
			let note = {};
			note.noteId = this.state.id;
			note.title = this.state.title;
			note.description = this.state.description;
			// note.isPined = this.state.isPined;
			// note.color = this.state.color;
			note.isArchived = this.state.isArchived;
			// note.noteLabels = this.state.noteLabels;
			// note.checklist = "";
			// note.reminder = "";
			// note.collaborators = "";
			console.log("data in note", note);
			nServe
				.updateNote(note)
				.then(response => {
					if (response.status === 200) {
						console.log("note updated successfully", response);
					}
				})
				.catch(error => {
					console.log("note not updated error occurred", error);
				});
		} else {
			console.log("title is compulsory for note creation");
		}
		this.handleClick();
	};

	deleteLable = (event, index) => {
		event.preventDefault();
		console.log(
			"values needed noteid and lable id",
			this.state.id,
			this.state.noteLabels[index].id
		);
		let data = {};
		data.labelId = this.state.noteLabels[index].id;
		data.noteId = this.state.id;

		nServe
			.deleteNoteLabelFromCard(data)
			.then(response => {
				console.log("success", response.data);
			})
			.catch(err => {
				console.log("err", err);
			});
		this.setState({
			noteLabels: update(this.state.noteLabels, {
				$splice: [[index, 1]]
			})
		});
		this.forceUpdate();
	};

	handleAddLabel = label => {
		console.log(
			"add label in notecard has label",
			label,
			this.state.noteLabels.indexOf(label)
		);
		if (this.state.noteLabels.indexOf(label) === -1) {
			this.setState(
				{
					noteLabels: update(this.state.noteLabels, {
						$push: [label]
					})
				},
				() => {
					console.log("label added successfully");
				}
			);
		}
	};

	handleChecklistAdd = async arr => {
		console.log("value in arr", arr);
		await this.setState({
			noteCheckLists: arr
		});
		console.log("value in notechecklist", this.state.noteCheckLists);
	};

	handleChecklistRemove = id => {
		console.log("value in remove item", id);
		for (let i = 0; i < this.state.noteCheckLists.length; i++) {
			if (this.state.noteCheckLists[i].id === id) {
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

	handleChecklistCheck = id => {
		console.log("in handlechecklistcheck with item name", id);

		for (let index = 0; index < this.state.noteCheckLists.length; index++) {
			if (this.state.noteCheckLists[index].id === id) {
				console.log(
					"found id in notechecklists",
					this.state.noteCheckLists[index]
				);
				if (this.state.noteCheckLists[index].status === "open") {
					this.setState(
						{
							noteCheckLists: update(this.state.noteCheckLists, {
								[index]: {
									status: {
										$set: "close"
									}
								}
							})
						},
						() => {
							let data = {};
							data.checkListId = this.state.noteCheckLists[index].id;
							data.notesId = this.state.noteCheckLists[index].notesId;
							data.status = this.state.noteCheckLists[index].status;
							data.itemName = this.state.noteCheckLists[index].itemName;
							console.log("value in data", data);
							nServe
								.updateChecklist(data)
								.then(response => {
									console.log("updated db successfully", response);
								})
								.catch(err => {
									console.log("error while updating", err);
								});
							index = this.state.noteCheckLists.length;
							console.log(
								"succesfully changed status in if",
								this.state.noteCheckLists,
								"value of i",
								index
							);
						}
					);
				} else {
					this.setState(
						{
							noteCheckLists: update(this.state.noteCheckLists, {
								[index]: {
									status: {
										$set: "open"
									}
								}
							})
						},
						() => {
							let data = {};
							data.checkListId = this.state.noteCheckLists[index].id;
							data.notesId = this.state.noteCheckLists[index].notesId;
							data.status = this.state.noteCheckLists[index].status;
							data.itemName = this.state.noteCheckLists[index].itemName;
							console.log("value in data", data);
							nServe
								.updateChecklist(data)
								.then(response => {
									console.log("updated db successfully", response);
								})
								.catch(err => {
									console.log("error while updating", err);
								});
							index = this.state.noteCheckLists.length;
							console.log(
								"succesfully changed status in else",
								this.state.noteCheckLists,
								"value of i",
								index
							);
						}
					);
				}
			}
		}
	};

	handleAddReminder = reminder => {
		console.log("value in new Reminder", reminder);
		this.setState({
			combined: reminder
		});
	};

	handleDeleteReminder = event => {
		event.preventDefault();
		let data = { noteIdList: [this.state.id] };
		nServe
			.deleteReminder(data)
			.then(response => {
				console.log("successfully deleted reminder", response);
				this.setState({
					reminder: [],
					reminderString: "",
					combined: ""
				});
			})
			.catch(err => {
				console.log("err deleting reminder", err);
			});
	};

	render() {
		// console.log("render works in card component", this.props);

		return (
			<Fragment>
				{!this.state.dialogOpen ? (
					<Card
						id={this.props.viewStatus ? "Lcard" : "card"}
						style={{ backgroundColor: this.state.color }}
					>
						<CardContent>
							<div id="title">
								<Typography
									variant="h5"
									component="h4"
									style={{ width: "80%", overflowWrap: "break-word" }}
									onClick={!this.state.isDeleted ? this.handleClick : null}
								>
									{this.state.title}
								</Typography>
								<div id="npin">
									<IconButton onClick={this.handleIsPined} size="small">
										{this.state.isPined ? (
											<Tooltip title="Unpin note">
												<img src={pined} alt="pined"></img>
											</Tooltip>
										) : (
											<Tooltip title="Pin note">
												<img src={pin} alt="pin"></img>
											</Tooltip>
										)}
									</IconButton>
								</div>
							</div>

							<Typography
								variant="subtitle2"
								onClick={!this.state.isDeleted ? this.handleClick : null}
							>
								{this.state.description}
							</Typography>
							<NoteCardChecklist
								listState={this.state}
								onChecked={this.handleChecklistCheck}
								onTick={this.handleChecklistAdd}
								onRemove={this.handleChecklistRemove}
							/>
						</CardContent>
						{/*  */}
						<div id="chips">
							{this.state.combined !== "" ? (
								<Chip
									icon={<AccessTimeSharpIcon />}
									size="small"
									style={{ margin: "2px 3px" }}
									label={this.state.combined}
									onDelete={event => {
										this.handleDeleteReminder(event);
									}}
								/>
							) : null}
							{this.state.noteLabels.map((data, index) => (
								<Fragment key={index}>
									<Chip
										size="small"
										style={{ margin: "2px 3px" }}
										label={data.label}
										onDelete={event => {
											this.deleteLable(event, index);
										}}
									/>
								</Fragment>
							))}
						</div>
						<MuiThemeProvider theme={cardAction}>
							{!this.state.isDeleted ? (
								<CardActions id="cardActions">
									<RemindMe
										remindState={this.state}
										addReminder={this.handleAddReminder}
										styleid={"idb"}
									/>

									{/* <Tooltip title="Collaborator">
										<IconButton id="idb" size="small">
											<PersonAddOutlinedIcon fontSize="inherit" />
										</IconButton>
									</Tooltip> */}
									<Collaborator
										collabAdd={this.handleAddCollaborator}
										collabState={this.state}
										styelid={"idb"}
									/>
									<Tooltip title="Add image">
										<IconButton id="idb" size="small">
											<InsertPhotoOutlinedIcon fontSize="inherit" />
										</IconButton>
									</Tooltip>
									<ColorPalette
										selectColor={this.handleColor}
										dataOfNote={this.state}
										styleid={"idb"}
									/>
									<ArchiveIcon
										archiveAction={this.handleIsArchived}
										archiveState={this.state}
										onUpdate={this.handleUpdation}
										styleid={"idb"}
									/>
									<MoreMenu
										deleteAction={this.handleDeleteRestore}
										moreState={this.state}
										onUpdate={this.handleUpdation}
										styleid={"idb"}
										addLabel={this.handleAddLabel}
									/>
								</CardActions>
							) : (
								<CardActions
									id="cardActionsTrash"
									style={{ justifyContent: "flex-start" }}
								>
									<Restore
										restoreState={this.state}
										onUpdate={this.handleUpdation}
									/>
									<DeleteForever
										deleteState={this.state}
										onUpdate={this.handleUpdation}
									/>
								</CardActions>
							)}
						</MuiThemeProvider>
					</Card>
				) : (
					<MuiThemeProvider theme={backdrop}>
						<Dialog
							open={this.state.dialogOpen}
							TransitionComponent={Grow}
							keepMounted
							onClose={this.handleClose}
						>
							<Paper
								id="noteDialog"
								style={{ backgroundColor: this.state.color }}
							>
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
								<CheckList
									listState={this.state}
									onChecked={this.handleChecklistCheck}
									onTick={this.handleChecklistAdd}
									onRemove={this.handleChecklistRemove}
								/>
								<div id="chips">
									{this.state.combined !== "" ? (
										<Chip
											icon={<AccessTimeSharpIcon />}
											size="small"
											style={{ margin: "2px 3px" }}
											label={this.state.combined}
											onDelete={event => {
												this.handleDeleteReminder(event);
											}}
										/>
									) : null}
									{this.state.noteLabels.map((data, index) => (
										<Fragment key={index}>
											<Chip
												size="small"
												style={{ margin: "2px 3px" }}
												label={data.label}
												onDelete={event => {
													this.deleteLable(event, index);
												}}
											/>
										</Fragment>
									))}
								</div>
								<div id="functions">
									<div id="iconBar">
										<MuiThemeProvider theme={iconmod}>
											{/* <Tooltip title="Remind me">
												<IconButton id="ibd" size="small">
													<AddAlertOutlinedIcon fontSize="inherit" />
												</IconButton>
											</Tooltip> */}
											<RemindMe
												remindState={this.state}
												addReminder={this.handleAddReminder}
												styleid={"ibd"}
											/>

											<Tooltip title="Collaborator">
												<IconButton id="ibd" size="small">
													<PersonAddOutlinedIcon fontSize="inherit" />
												</IconButton>
											</Tooltip>

											<Tooltip title="Add image">
												<IconButton id="ibd" size="small">
													<InsertPhotoOutlinedIcon fontSize="inherit" />
												</IconButton>
											</Tooltip>
											<ColorPalette
												selectColor={this.handleColor}
												dataOfNote={this.state}
												styleid={"ibd"}
											/>
											<ArchiveIcon
												archiveAction={this.handleIsArchived}
												archiveState={this.state}
												onUpdate={this.handleUpdation}
												styleid={"ibd"}
											/>
											<MoreMenu
												deleteAction={this.handleDeleteRestore}
												moreState={this.state}
												onUpdate={this.handleUpdation}
												styleid={"ibd"}
											/>
										</MuiThemeProvider>
									</div>
									<div id="button">
										<MuiThemeProvider theme={button}>
											<Tooltip title="close">
												<Button
													varient="secondary"
													onClick={this.handleUpdateNote}
												>
													close
												</Button>
											</Tooltip>
										</MuiThemeProvider>
									</div>
								</div>
							</Paper>
						</Dialog>
					</MuiThemeProvider>
				)}
			</Fragment>
		);
	}
}
const mapStateToProps = state => {
	return { viewStatus: state.viewData };
};
export default connect(mapStateToProps)(NoteCard);
