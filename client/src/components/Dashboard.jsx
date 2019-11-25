import React from "react";
import "../sass/dashboard.sass";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import flogo from "../assets/favicon.ico";
import SearchIcon from "@material-ui/icons/Search";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Drawer from "@material-ui/core/Drawer";
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
				minWidth: "60%"
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
				width: "250px",
				height: "95vh",
				overflowY: "scroll",
			}
		}
	}
});
export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}
	handleDrawer = () => {
		this.setState({ open: !this.state.open });
	};
	render() {
		// const classes = {};

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
										width="50%"
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
									<Avatar>
										<AccountCircleOutlinedIcon />
									</Avatar>
								</div>
							</Toolbar>
							<Drawer open={this.state.open} varient="persistent" anchor="left">
							abc
						</Drawer>
						</AppBar>
						
					</div>
					<div className="container"></div>
				</MuiThemeProvider>
			</div>
		);
	}
}
