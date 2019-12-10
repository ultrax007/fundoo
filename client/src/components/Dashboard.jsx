//Default imports for designing
import React from "react";
import "../sass/dashboard.sass";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import flogo from "../assets/favicon.ico";
import SearchIcon from "@material-ui/icons/Search";
import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Popover from "@material-ui/core/Popover";
import Drawerlist from "./DrawerList";

//component imports
// import TakeNote from "./TakeNote";
// import NoteCard from "./NoteCard";
// import DisplayAllNotes from "./DisplayAllNotes";
// const scroll = createMuiTheme({
// 	overrides: {

// 	}
// });

const theme = createMuiTheme({
	overrides: {
		MuiAppBar: {
			colorPrimary: {
				color: "#424242",
				backgroundColor: "white"
			}
		},
		MuiFormControl: {
			root: {
				minWidth: "85%"
			}
		},
		MuiInputBase: {
			root: {
				color: "#757575",
				outlineColor: "inherit"
			}
		},
		MuiDrawer: {
			paper: {
				position:"absolute",
				top: "65px",
				width: "270px",
				height: "95vh",
				overflowY: "auto"
			},
			paperAnchorDockedLeft: {
				borderRight: "none"
			}
			// "@global": {
			// 	"*::-webkit-scrollbar": {
			// 		width: "0.4em"
			// 	},
			// 	"*::-webkit-scrollbar-track": {
			// 		"-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
			// 	},
			// 	"*::-webkit-scrollbar-thumb": {
			// 		backgroundColor: "rgba(0,0,0,.1)",
			// 		outline: "1px solid slategrey"
			// 	}
			// }
		}
	}
});

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			pop_open: false,
		};
	}
	handleProfileDropDown(e) {
		e.preventDefault();
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: e.currentTarget
		});
	}

	handleClose = () => {
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: null
		});
	};

	handleDrawer = () => {
		this.setState({ open: !this.state.open });
	};

	handleToggleTakeNote = async tnvalue => {
		await this.setState({ takeNoteToggle: tnvalue });
	};
	setFocusToTextBox = () => {
		document.getElementById("inputInactive").focus();
	};
	handleLogout = () => {
		localStorage.clear();
		const path = '/';
		this.props.history.push(path);
	}
	getNotes = () => {
		this.props.history.push("/dashboard/notes");
	}
	getReminder = () => {
		this.props.history.push("/dashboard/reminder");
	}
	getArchived = () => {
		this.props.history.push("/dashboard/archived");
	}
	getTrash = () => {
		this.props.history.push("/dashboard/trash");
	}
	

	render() {
		// var style;
		// style = this.state.open ? "containerSM" : "container";

		return (
			<div className="main">
				<MuiThemeProvider theme={theme}>
					<div className="header">
						<AppBar position="static">
							<Toolbar>
								<IconButton
									edge="start"
									color="inherit"
									aria-label="open drawer"
									onClick={this.handleDrawer}
								>
									<MenuIcon />
								</IconButton>
								<div id="logo">
									<div className="flogo">
										<img
											src={flogo}
											alt="Fundoo"
											height="90%"
											width="80%"
											onClick={this.setFocusToTextBox}
										></img>
									</div>
									<div className="flogotext" onClick={this.setFocusToTextBox}>Fundoo</div>
								</div>
								<div className="searchBlock">
									<TextField
										id="searchtext"
										margin="dense"
										width="60%"
										height="90%"
										placeholder="search"
										variant="outlined"
										// style={classes.search}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<SearchIcon />
												</InputAdornment>
											)
										}}
									/>
								</div>
								<div id="rightPanelLogo">
									<IconButton>
										<ViewAgendaOutlinedIcon />
									</IconButton>
									<IconButton>
										<ShoppingCartOutlinedIcon />
									</IconButton>
								</div>
								<div id="avatar">
									<Avatar onClick={event => this.handleProfileDropDown(event)}>
										<AccountCircleOutlinedIcon />
									</Avatar>
									<Popover
										open={this.state.pop_open}
										anchorEl={this.state.anchorEl}
										onClose={this.handleClose}
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "center"
										}}
										transformOrigin={{
											vertical: "top",
											horizontal: "right"
										}}
									>
										<Button variant="outlined" margin="dense" onClick={this.handleLogout}>
											logout
										</Button>
									</Popover>
								</div>
							</Toolbar>
						</AppBar>
					</div>
					<div>
						<Drawer open={this.state.open} variant="persistent">
							<Drawerlist notes={this.getNotes} reminder={this.getReminder} archived={this.getArchived} trash={this.getTrash}/>
						</Drawer>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
}
