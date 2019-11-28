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
import TakeNote from "./TakeNote";

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
				top: "65px",
				width: "270px",
				height: "95vh",
				overflowY: "auto"
			},
			paperAnchorDockedLeft: {
				borderRight: "none"
			}
		}
	}
});

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			pop_open: false
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

	render() {
		var style;
		style = this.state.open ? "containerSM" : "container";
		
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
										></img>
									</div>
									<div className="flogotext">Fundoo</div>
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
										onClick={this.handleClose}
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "center"
										}}
										transformOrigin={{
											vertical: "top",
											horizontal: "right"
										}}
									>
										<Button variant="outlined" margin="dense">logout</Button>
									</Popover>
								</div>
							</Toolbar>
						</AppBar>
					</div>
					<div>
						<Drawer open={this.state.open} variant="persistent">
							<Drawerlist />
						</Drawer>
					</div>
					{/* everything below will show in container area */}
					<div id={style}>
						<TakeNote/>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
}
