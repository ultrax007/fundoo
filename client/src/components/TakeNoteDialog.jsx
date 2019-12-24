import React, { Fragment } from "react";
import "../sass/TakeNote.sass";
import update from "immutability-helper";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import noteServices from "../services/noteServices";
import CheckList from "./Checklist";

//icons imported from material ui
import PersonIcon from "@material-ui/icons/Person";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import AccessTimeSharpIcon from "@material-ui/icons/AccessTimeSharp";
import Chip from "@material-ui/core/Chip";
import pin from "../assets/pin.svg";
import pined from "../assets/pined.svg";
import RemindMe from "./RemindMe";
import Collaborator from "./Collaborator";
import MoreMenu from "./MoreMenu";
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
			noteLabels: [],
			labelIdList: [],
			isPined: false,
			isArchived: false,
			color: "",
			reminder: [],
			combined: "",
			collaborators: [],
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
			note.reminder = this.state.reminder;
			note.labelIdList = JSON.stringify(this.state.labelIdList);
			note.collaberators = JSON.stringify(this.state.collaborators);

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
	deleteLable = (event, index) => {
		event.preventDefault();
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		let id = this.state.labelIdList.indexOf(this.state.noteLabels[index].id);
		console.log("value of id in delete lable", id);
		this.setState(
			{
				labelIdList: update(this.state.labelIdList, {
					$splice: [[id, 1]]
				}),
				noteLabels: update(this.state.noteLabels, {
					$splice: [[index, 1]]
				})
			},
			() => {
				console.log("after removal labels are", this.state);
			}
		);
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
					}),
					labelIdList: update(this.state.labelIdList, {
						$push: [label.id]
					})
				},
				() => {
					console.log(
						"label added successfully",
						this.state.noteLabels,
						this.state.labelIdList
					);
				}
			);
		}
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
	handleAddReminder = reminder => {
		let date = reminder.slice(4, 10);
		let time = reminder.slice(16, 21);
		this.setState(
			{
				reminder: reminder.toString(),
				combined: date + "," + time
			},
			() => {
				console.log("value in combined", this.state.combined);
				console.log("value in reminder", this.state.reminder);
			}
		);
	};
	handleDeleteReminder = event => {
		event.preventDefault();
		this.setState({
			reminder: [],
			combined: ""
		});
	};
	handleAddCollaborator = userData => {
		console.log("value in userData in collaborator",userData);
		this.setState({
			collaborators: update(this.state.collaborators, { $push: [userData] })
		});
	};

	handleRemoveCollaborator = index => {
		this.setState({
			collaborators: update(this.state.collaborators, { $splice: [[index, 1]] })
		});
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
						<Fragment key={data.id}>
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
					{this.state.collaborators.map(data => (
								<IconButton
									key={data.email}
									size="small"
									style={{
										border: "1px solid #494949",
										margin: "0 3px",
										backgroundColor: "#00b9ff7a"
									}}
								>
									<Tooltip title={data.email}>
										<PersonIcon fontSize="inherit" />
									</Tooltip>
								</IconButton>
							))}
				</div>
				<div id="functions">
					<div id="iconBar">
						<MuiThemeProvider theme={iconmod}>
							<RemindMe
								remindState={this.state}
								addReminder={this.handleAddReminder}
								styleid={"ib"}
							/>

							<Collaborator
								collabAdd={this.handleAddCollaborator}
								collabRemove={this.handleRemoveCollaborator}
								collabState={this.state}
								styelid={"idb"}
							/>

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
							<MoreMenu
								addLabel={this.handleAddLabel}
								moreState={this.state}
								styleid={"ib"}
							/>
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
