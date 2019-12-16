import React, { Fragment } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "../sass/TakeNote.sass";
import update from "immutability-helper";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
// import ListItemText from "@material-ui/core/ListItemText";
import InputBase from "@material-ui/core/InputBase";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

var uniqid = require("uniqid");

const lined = {
	width: "90%",
	fontSize: "12px",
	padding: "7px 0 7px",
	textDecoration: "line-through"
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

export default class NoteCardChecklist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			title: "",
			description: "",
			// labelIdList: "",
			noteCheckLists: [],
			isPined: false,
			isArchived: false,
			isDeleted: false,
			color: "",
			statusOpen: [],
			statusClose: [],
			dummy: "",
			original: "",
			// reminder: "",
			// collaborators: ""
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
					statusOpen: notecl.filter(notecl => notecl.status === "open"),
					statusClose: notecl.filter(notecl => notecl.status === "close")
				});
			}
		);
		// console.log("state is", this.state);
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
		await this.props.onRemove(this.state.statusOpen[index].key);

		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				$splice: [[index, 1]]
			})
		});
	};

	handleCrossClose = async (event, index) => {
		event.preventDefault();
		console.log("value of index", index);
		await this.props.onRemove(this.state.statusClose[index].key);

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
		openCheck.notesId = "";
		openCheck.key = uniqid();

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
		// console.log("in checklist");
		// console.log("value in statusopen", this.state.statusOpen);
		// console.log("value in statusclose", this.state.statusClose);
		var listStyle = {
			width: "16px",
			height: "16px",
			paddingRight: "10px",
			minWidth: "0px",
			"&:hover": {
				backgroundColor: "none"
			}
		};

		return (
			<Fragment>
				<List>
					{/***************************************open status will appear here************************************************* */}
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
													icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
													checkedIcon={
														<CheckBoxOutlinedIcon fontSize="small" />
													}
													disableRipple={true}
													color="default"
													fontSize="inherit"
													// onCheck={event=>this.handleCheck(event,index)}
													checked={false}
												/>
											</ListItemIcon>
											<ListItemText primary={data.itemName} />
										</ListItem>
									</MuiThemeProvider>
								</div>
						  ))
						: null}
					{/************************************** closed ones will appear****************************************************************************** */}
					{this.state.statusOpen.length > 0 &&
					this.state.statusClose.length > 0 ? (
						<Divider />
					) : null}
					{this.state.statusClose
						? this.state.statusClose.map((data, index) => (
								<div key={index}>
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
													icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
													checkedIcon={
														<CheckBoxOutlinedIcon fontSize="small" />
													}
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
											{/* <ListItemSecondaryAction>
												<IconButton
													edge="end"
													aria-label="close"
													onClick={event => this.handleCrossClose(event, index)}
													size="small"
												>
													<CloseSharpIcon />
												</IconButton>
											</ListItemSecondaryAction> */}
										</ListItem>
									</MuiThemeProvider>
								</div>
						  ))
						: null}
				</List>
			</Fragment>
		);
	}
}
