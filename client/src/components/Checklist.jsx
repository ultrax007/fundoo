import React, { Fragment } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "../sass/TakeNote.sass";
import update from "immutability-helper";
import noteServices from "../services/noteServices";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
// import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import {
	createMuiTheme,
	MuiThemeProvider,
	Typography
} from "@material-ui/core";
const nServe = new noteServices();

var uniqid = require("uniqid");

const lined = {
	width: "90%",
	fontSize: "12px",
	padding: "7px 0 7px",
	textDecoration: "line-through"
};
const unlined = {
	width: "90%",
	fontSize: "12px",
	padding: "7px 0 7px"
};
const list = createMuiTheme({
	overrides: {
		MuiListItem: {
			dense: {
				paddingTop: "0",
				paddingBottom: "0"
			},
			gutters: {
				paddingLeft: "0px"
			}
		},
		MuiInputBase: {
			input: {
				padding: "7px 0 7px"
			},
			inputMarginDense: {
				padding: "3px 0 3px"
			}
		},
		MuiIconButton: {
			root: {
				"&:hover": {
					backgroundColor: "#fff0"
				}
			}
		}
	}
});

export default class Checklist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			noteCheckLists: [],
			statusOpen: [],
			statusClose: [],
			dummy: "",
			original: "",
			showList: false
		};
	}

	componentDidMount() {
		// console.log("value in listState",this.props.listState);
		this.setState(
			{
				...this.props.listState
			},
			() => {
				var notecl = this.state.noteCheckLists;
				this.setState({
					statusOpen: notecl.filter(notecl => notecl.status === "open" && notecl.isDeleted!== true),
					statusClose: notecl.filter(notecl => notecl.status === "close" && notecl.isDeleted!== true)
				});
			}
		);
		console.log("state is", this.state);
	}

	handleText = async (event, index) => {
		console.log("value of index", index, event.currentTarget.value);

		await this.setState({
			noteCheckLists: update(this.state.noteCheckLists, {
				[index]: { itemName: { $set: event.currentTarget.value } }
			})
		});
	};

	handleCrossOpen = async (event, index) => {
		event.preventDefault();
		console.log("value of index", this.state.statusOpen[index]);
		if (this.state.id !== "") {
			let data = {};
			data.noteId = this.state.id;
			data.checklistId = this.state.statusOpen[index].id;
			this.handleRemoveChecklist(data);
			console.log("value in data in handle crossopen",data);
			
			await this.props.onRemove(this.state.statusOpen[index].id);
		} else {
			await this.props.onRemove(this.state.statusOpen[index].key);
		}

		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				$splice: [[index, 1]]
			})
		});
	};

	handleCrossClose = async (event, index) => {
		event.preventDefault();
		console.log("value of index", index);
		if (this.state.id !== "") {
			let data = {};
			data.noteId = this.state.id;
			data.checklistId = this.state.statusClose[index].id;
			this.handleRemoveChecklist(data);
			console.log("value in data in handle crossopen",data);
			await this.props.onRemove(this.state.statusClose[index].id);
		} else {
			await this.props.onRemove(this.state.statusClose[index].key);
		}

		await this.setState({
			statusClose: update(this.state.statusClose, {
				$splice: [[index, 1]]
			})
		});
	};

	handleCheckOpen = async (event, index) => {
		event.preventDefault();
		console.log("value of index", index);
		console.log(
			"before operation",
			this.state.statusOpen,
			this.state.statusClose
		);
		await this.props.onChecked(this.state.statusOpen[index].key);
		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				[index]: {
					status: {
						$set: "close"
					}
				}
			})
		});
		await this.setState({
			statusClose: update(this.state.statusClose, {
				$unshift: [this.state.statusOpen[index]]
			})
		});
		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				$splice: [[index, 1]]
			})
		});

		console.log("checked open", this.state.statusOpen);
		console.log("checked close", this.state.statusClose);
	};

	handleCheckClose = async (event, index) => {
		event.preventDefault();
		console.log("value at index", this.state.statusClose[index]);
		console.log(
			"before operation",
			this.state.statusOpen,
			this.state.statusClose
		);
		await this.props.onChecked(this.state.statusClose[index].key);
		await this.setState({
			statusClose: update(this.state.statusClose, {
				[index]: {
					status: {
						$set: "open"
					}
				}
			})
		});
		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				$unshift: [this.state.statusClose[index]]
			})
		});
		await this.setState({
			statusClose: update(this.state.statusClose, {
				$splice: [[index, 1]]
			})
		});

		console.log("checked open", this.state.statusOpen);
		console.log("checked close", this.state.statusClose);
	};

	handleTick = async event => {
		event.preventDefault();

		var openCheck = {};
		openCheck.itemName = this.state.original;
		openCheck.status = "open";
		openCheck.isDeleted = false;
		openCheck.notesId = this.state.id;
		openCheck.key = uniqid();

		console.log("in handle tick id in state is ", this.state.id);
		if (this.state.id !== "") {
			this.handleAddChecklist(openCheck);
		}

		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				$push: [openCheck]
			})
		});

		this.setState({ original: "" });
		document.getElementById("listText").focus();
		console.log("new value in open now", this.state.statusOpen);
		var newCheck = this.state.statusOpen.concat(this.state.statusClose);
		console.log("value in newCheck", newCheck);
		this.props.onTick(newCheck);
	};

	handleAddChecklist = data => {
		nServe
			.addChecklist(data)
			.then(response => {
				console.log("checklist item added successfully", response);
			})
			.catch(err => {
				console.log("error occured while adding checklist", err);
			});
	};

	handleRemoveChecklist = data => {
		nServe
			.removeChecklist(data)
			.then(response => {
				console.log("checklist item removed successfully", response);
			})
			.catch(err => {
				console.log("error occured while removing checklist", err);
			});
	};

	handleDummyData = async event => {
		await this.setState({ dummy: event.currentTarget.value });
		if (this.state.dummy.length > 0) {
			this.setState({
				original: this.state.dummy,
				dummy: ""
			});
			var el = document.getElementById("checkText");
			el.focus();
			if (typeof el.selectionStart == "number") {
				el.selectionStart = el.selectionEnd = el.value.length;
			} else if (typeof el.createTextRange != "undefined") {
				var range = el.createTextRange();
				range.collapse(false);
				range.select();
			}
		}
	};
	handleOriginalData = async event => {
		await this.setState({ original: event.currentTarget.value });
		if (this.state.original.length <= 0) {
			document.getElementById("listText").focus();
		}
	};

	render() {

		var listStyle = {
			width: "16px",
			height: "16px",
			marginLeft: "18px",
			default: {
				minWidth: "fit-content",
				marginRight: "5px"
			},
			"&:hover": {
				backgroundColor: "#fff0"
			}
		};

		return (
			<Fragment>
				<List>
					{/***************************************closed status will appear here************************************************* */}
					{this.state.statusOpen
						? this.state.statusOpen.map((data, index) => (
								<div key={index}>
									<MuiThemeProvider theme={list}>
										<ListItem dense>
											<ListItemIcon
												id="List"
												style={listStyle}
												size="small"
												onClick={event => this.handleCheckOpen(event, index)}
											>
												<Checkbox
													edge="start"
													size="small"
													icon={<CheckBoxOutlineBlankIcon />}
													checkedIcon={<CheckBoxOutlinedIcon />}
													disableRipple={true}
													color="default"
													fontSize="inherit"
													// onCheck={event=>this.handleCheck(event,index)}
													checked={false}
												/>
											</ListItemIcon>

											<InputBase
												style={unlined}
												margin="dense"
												multiline
												placeholder="List item"
												value={data.itemName}
												onChange={event => this.handleText(event, index)}
											/>
											<ListItemSecondaryAction>
												<IconButton
													edge="end"
													aria-label="close"
													onClick={event => this.handleCrossOpen(event, index)}
													size="small"
												>
													<CloseSharpIcon fontSize="inherit" />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									</MuiThemeProvider>
								</div>
						  ))
						: null}
					{/********************************* below this will be checklist input**************************************** */}
					{this.state.original.length > 0 ? (
						<MuiThemeProvider theme={list}>
							<ListItem dense>
								<ListItemIcon id="List" style={listStyle} size="small">
									<Checkbox
										edge="start"
										size="small"
										icon={<CheckBoxOutlineBlankIcon />}
										checkedIcon={<CheckBoxOutlinedIcon />}
										disableRipple={true}
										color="default"
										fontSize="inherit"
									/>
								</ListItemIcon>
								<InputBase
									id="checkText"
									style={{
										width: "90%",
										fontSize: "12px",
										padding: "7px 0 7px"
									}}
									margin="dense"
									multiline
									placeholder="List item"
									value={this.state.original}
									onChange={event => this.handleOriginalData(event)}
								/>
								<ListItemSecondaryAction>
									<IconButton
										edge="end"
										aria-label="comments"
										size="small"
										onClick={event => this.handleTick(event)}
									>
										<CheckSharpIcon fontSize="inherit" />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						</MuiThemeProvider>
					) : null}

					{/************************************** this will show input ****************************************************************************** */}

					<MuiThemeProvider theme={list}>
						<ListItem dense>
							<ListItemIcon style={{ minWidth: "fit-content", margin: "0 3%" }}>
								<AddSharpIcon fontSize="inherit" />
								{/* <Checkbox edge="start" disableRipple color="default" /> */}
							</ListItemIcon>
							<InputBase
								id="listText"
								style={{
									width: "90%",
									fontSize: "12px",
									padding: "7px 0 7px"
								}}
								margin="dense"
								placeholder="List item"
								value={this.state.dummy}
								onChange={event => this.handleDummyData(event)}
							/>
						</ListItem>
					</MuiThemeProvider>

					{/*********************will appear on status close******************************************************************** */}
					{this.state.statusClose.length !== 0 ? (
						<div>
							<Divider style={{ width: "90%", margin: "0 5%" }} />
							<ListItem>
								<Typography
									variant="body2"
									component="p"
									style={{ color: "#757575" }}
								>
									{this.state.statusClose.length} Completed item
								</Typography>
							</ListItem>
						</div>
					) : null}

					{/************************************** this will show checked boxes below****************************************************************************** */}
					{this.state.statusClose
						? this.state.statusClose.map((data, index) => (
								<div key={index}>
									<Divider />
									<MuiThemeProvider theme={list}>
										<ListItem dense>
											<ListItemIcon
												id="List"
												style={listStyle}
												size="small"
												onClick={event => this.handleCheckClose(event, index)}
											>
												<Checkbox
													edge="start"
													size="small"
													icon={<CheckBoxOutlineBlankIcon />}
													checkedIcon={<CheckBoxOutlinedIcon />}
													disableRipple={true}
													color="default"
													fontSize="inherit"
													// onCheck={event=>this.handleCheck(event,index)}
													checked={true}
												/>
											</ListItemIcon>

											<InputBase
												style={lined}
												margin="dense"
												multiline
												placeholder="List item"
												value={data.itemName}
												onChange={event => this.handleText(event, index)}
											/>
											<ListItemSecondaryAction>
												<IconButton
													edge="end"
													aria-label="close"
													onClick={event => this.handleCrossClose(event, index)}
													size="small"
												>
													<CloseSharpIcon fontSize="inherit" />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									</MuiThemeProvider>
								</div>
						  ))
						: null}

					<Divider />
				</List>
			</Fragment>
		);
	}
}
