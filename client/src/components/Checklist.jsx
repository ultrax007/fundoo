import React, { Fragment } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "../sass/TakeNote.sass";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import {
	createMuiTheme,
	MuiThemeProvider,
	Typography
} from "@material-ui/core";
import update from "immutability-helper";
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
			}
		},
		MuiInputBase: {
			input: {
				padding: "7px 0 7px"
			}
		}
	}
});

export default class Checklist extends React.Component {
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
			checkData: "",
			// reminder: "",
			// collaborators: ""
			showList: false
		};
	}
	static getDerivedStateFromProps(props, state) {
		return {
			...props.listState
		};
	}
	componentDidMount() {
		console.log("state is", this.state);
		var notecl = this.state.noteCheckLists;
		this.setState({
			statusOpen: notecl.filter(notecl => notecl.status === "open")
		});

		this.setState({
			statusClose: notecl.filter(notecl => notecl.status === "close")
		});
	}

	handleToggle = () => {
		this.setState({ showList: !this.state.showList });
		if (this.state.showList === true) {
			document.getElementById("checkText").focus();
		} else {
			document.getElementById("listText").focus();
		}
	};
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
		console.log("value of index", index);

		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				$splice: [[index, 1]]
			})
		});
	};
	handleCrossClose = async (event, index) => {
		event.preventDefault();
		console.log("value of index", index);

		await this.setState({
			statusClose: update(this.state.statusClose, {
				$splice: [[index, 1]]
			})
		});
	};

	handleCheck = async (event, index) => {
		event.preventDefault();
		console.log("value of index", index);

		await this.setState({
			noteCheckLists: update(this.state.noteCheckLists, {
				[index]: {
					status: {
						$apply: function(status) {
							return status === "open" ? "close" : "open";
						}
					}
				}
			})
		});
	};

	handleCheckData = event => {
		this.setState({ checkData: event.currentTarget.value });
	};

	render() {
		console.log("in checklist");
		console.log("value in statusopen", this.state.statusOpen);
		console.log("value in statusclose", this.state.statusClose);
		var listStyle = {
			width: "16px",
			height: "16px",
			default: {
				minWidth: "fit-content",
				marginRight: "5px"
			}
		};

		return (
			<Fragment>
				<List>
					{this.state.statusOpen
						? this.state.statusOpen.map((data, index) => (
								<div key={index}>
									<MuiThemeProvider theme={list}>
										<ListItem dense>
											<ListItemIcon id="List" style={listStyle} size="small">
												<Checkbox
													edge="start"
													disableRipple={true}
													color="default"
													fontSize="inherit"
													// onCheck={event=>this.handleCheck(event,index)}
													// checked={data.status === "open" ? false : true}
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
													<CloseSharpIcon />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									</MuiThemeProvider>
								</div>
						  ))
						: null}
					{/* below this will be checklist input */}
					{this.state.showList ? (
						<MuiThemeProvider theme={list}>
							<ListItem dense>
								<ListItemIcon id="List" style={listStyle} size="small">
									<Checkbox
										edge="start"
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
									value={this.state.checkData}
									onChange={event => this.handleCheckData(event)}
								/>
								<ListItemSecondaryAction>
									<IconButton edge="end" aria-label="comments" size="small">
										<CheckSharpIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						</MuiThemeProvider>
					) : null}
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
								multiline
								placeholder="List item"
								// value={this.state.description}
							 	onKeyPress ={this.handleToggle}
							/>
						</ListItem>
					</MuiThemeProvider>
					{this.state.statusClose.length!==0 ? (
						<div>
							<Divider style={{ width: "90%", margin: "0 5%" }} />
							<ListItem>
								<Typography
									variant="body2"
									component="p"
									style={{ color: "#757575" }}
								>
									Completed item
								</Typography>
							</ListItem>
						</div>
					) : null}
					{this.state.statusClose
						? this.state.statusClose.map((data, index) => (
								<div key={index}>
									<Divider />
									<MuiThemeProvider theme={list}>
										<ListItem dense>
											<ListItemIcon id="List" style={listStyle} size="small">
												<Checkbox
													edge="start"
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
													<CloseSharpIcon />
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
