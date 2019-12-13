import React, { Fragment } from "react";
import "../sass/NoteCard.sass";
import update from "immutability-helper";
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
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import Dialog from "@material-ui/core/Dialog";
import Grow from "@material-ui/core/Grow";
import Chip from "@material-ui/core/Chip";
/**
 * needed file imports
 */
import pin from "../assets/pin.svg";
import pined from "../assets/pined.svg";
import ColorPalette from "./ColorPalette";
import ArchiveIcon from "./ArchiveIcon";
import MoreMenu from "./MoreMenu";
import Restore from "./Restore";
import DeleteForever from "./DeleteForever";
import noteServices from "../services/noteServices";
const nServe = new noteServices();

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

export default class NoteCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.dataFromDisplay.id,
			title: this.props.dataFromDisplay.title,
			description: this.props.dataFromDisplay.description,
			// labelIdList: "",
			// noteCheckLists: this.props.dataFromDisplay.noteCheckLists,
			isPined: this.props.dataFromDisplay.isPined,
			isArchived: this.props.dataFromDisplay.isArchived,
			isDeleted: this.props.dataFromDisplay.isDeleted,
			color: this.props.dataFromDisplay.color,
			noteLabels: this.props.dataFromDisplay.noteLabels,
			// reminder: "",
			// collaborators: ""
			dialogOpen: false
		};
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

	handleAddLabel = (label) => {
		console.log("add label in notecard has label", label,this.state.noteLabels.indexOf(label));
		if (this.state.noteLabels.indexOf(label) === -1) {
			this.setState({
				noteLabels: update(this.state.noteLabels, {
					$push: [label]
				})
			}, () => {
				console.log("label added successfully");
			})
		}
	}

	render() {
		// console.log("render works in card component", this.props);

		return (
			<Fragment>
				{!this.state.dialogOpen ? (
					<Card id="card" style={{ backgroundColor: this.state.color }} >
						<CardContent>
							<div id="title">
								<Typography
									variant="h5"
									component="h4"
									style={{ width: "80%", overflowWrap: "break-word" }}
									onClick={this.handleClick}
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

							<Typography variant="subtitle2" onClick={this.handleClick}>
								{this.state.description}
							</Typography>
						</CardContent>
						<div id="chips">
							{this.state.noteLabels.map((data, index) => (
								<Fragment key={index}>
									<Chip
										size="small"
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
								<div id="functions">
									<div id="iconBar">
										<MuiThemeProvider theme={iconmod}>
											<Tooltip title="Remind me">
												<IconButton id="ibd" size="small">
													<AddAlertOutlinedIcon fontSize="inherit" />
												</IconButton>
											</Tooltip>

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
// {this.state.dialogOpen ? (
// 	<MuiThemeProvider theme={dialog}>
// 		<Dialog onClose={this.handleClick} open={this.handleClick}>
// 			<NoteDialog
// 				diaData={this.state}
// 				handleDialog={this.handleClick}
// 			/>
// 		</Dialog>
// 	</MuiThemeProvider>
// ) : null}
