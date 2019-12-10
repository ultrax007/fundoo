import React, { Fragment } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "../sass/TakeNote.sass";
import update from "immutability-helper";
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
		},
		MuiIconButton: {
			root: {
				"&:hover": {
					backgroundColor: "none"
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
		this.handleTick();
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

	handleCheckOpen = async (event, index) => {
		event.preventDefault();
		console.log("value of index", index);
		console.log("before operation",this.state.statusOpen,this.state.statusClose);

		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				[index]: {
					status: {
						$set:"close" 
					}
				}
			})			
		});
		await this.setState({
			statusClose: update(this.state.statusClose, {
				$unshift: [this.state.statusOpen[index]]
			})
		})
		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				$splice: [[index, 1]]
			})
		})
		
		console.log("checked open",this.state.statusOpen);
		console.log("checked close",this.state.statusClose);
	};

	handleCheckClose = async (event, index) => {
		event.preventDefault();
		console.log("value of index", index);
		console.log("before operation",this.state.statusOpen,this.state.statusClose);

		await this.setState({
			statusClose: update(this.state.statusClose, {
				[index]: {
					status: {
						$set:"open" 
					}
				}
			})			
		});
		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				$unshift: [this.state.statusClose[index]]
			})
		})
		await this.setState({
			statusClose: update(this.state.statusClose, {
				$splice: [[index, 1]]
			})
		})
		
		console.log("checked open",this.state.statusOpen);
		console.log("checked close",this.state.statusClose);
	};

	handleTick = async () => {
		var openCheck = {};
		openCheck.itemName = this.state.original;
		openCheck.status = "open";
		openCheck.isDeleted = "false";
		
		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				$push:[openCheck]
			})
		})
		this.setState({ original: "" })
		document.getElementById("listText").focus();
		console.log("new value in open now", this.state.statusOpen);
		var newCheck = this.state.statusOpen.concat(this.state.statusClose);
		console.log("value in newCheck",newCheck);
		this.props.onCheck(newCheck);
	}

	handleDummyData = async (event) => {
		await this.setState({ dummy: event.currentTarget.value });
		if (this.state.dummy.length > 0) {
			this.setState({
				original: this.state.dummy,
				dummy:""
			})
			document.getElementById("checkText").focus();
			// setTimeout(() => {
				
			// }, 500);
		}
	};
	handleOriginalData = async (event) => {
		await this.setState({ original: event.currentTarget.value });
		if (this.state.original.length<=0) {
			document.getElementById("listText").focus();
		}
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
			},"&:hover": {
				backgroundColor: "none"
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
											<ListItemIcon id="List" style={listStyle} size="small" onClick={event=>this.handleCheckOpen(event,index)}>
												<Checkbox
													edge="start"
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
													<CloseSharpIcon />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									</MuiThemeProvider>
								</div>
						  ))
						: null}
					{/********************************* below this will be checklist input**************************************** */}
					{this.state.original.length>0 ? (
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
									value={this.state.original}
									onChange={event => this.handleOriginalData(event)}
								/>
								<ListItemSecondaryAction>
									<IconButton edge="end" aria-label="comments" size="small" onClick={this.handleTick}>
										<CheckSharpIcon />
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



				{/************************************** this will show checked boxes below****************************************************************************** */}
					{this.state.statusClose
						? this.state.statusClose.map((data, index) => (
								<div key={index}>
									<Divider />
									<MuiThemeProvider theme={list}>
										<ListItem dense>
											<ListItemIcon id="List" style={listStyle} size="small" onClick={event=>this.handleCheckClose(event,index)}>
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
