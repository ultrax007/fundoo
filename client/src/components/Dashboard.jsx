//Default imports for designing
import React from "react";
import "../sass/dashboard.sass";
import { connect } from "react-redux";
import compose from "recompose/compose";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import flogo from "../assets/favicon.ico";
import SearchIcon from "@material-ui/icons/Search";
import {
	createMuiTheme,
	MuiThemeProvider,
	Button,
	Paper,
	List,
	ListItem,
	ListItemText,
	Chip
} from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import ViewAgendaOutlinedIcon from "@material-ui/icons/ViewAgendaOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import Popover from "@material-ui/core/Popover";
import Drawerlist from "./DrawerList";
import { drawer, typedText, view } from "./redux/Actions";

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
				position: "fixed",
				top: "65px",
				width: "270px",
				height: "90vh",
				overflowY: "auto",
				"@global": {
					"*": {
						"scrollbar-width": "thin"
					},
					"*::webkit-scrollbar": {
						width: "2px",
						height: "2px"
					}
				}
			},
			paperAnchorDockedLeft: {
				borderRight: "none"
			}
		}
	}
});

const styles = {
	gutters: {
		padding:"0 16px"
	},
	MuiAvatar: {
		width: "70px",
		height: "70px",
		boxShadow:
			" 0px 0px 14px 4px rgba(117, 242, 255, 0.25), 0 0px 6px 3px rgba(156, 255, 164, 0.20)"
	},
	MuiList: {
		paddingTop: "5px"
	},
	MuiListItem: {
		padding: "8px",
		justifyContent: "center"
	},
	MuiButton: {
		fontSize:"10px"
	},
	typography: {
		color:"#fff",
		textShadow:"1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;"
	}
};

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			pop_open: false,
			listView: false,
			searched: ""
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

	handleDrawer = async () => {
		await this.setState({ open: !this.state.open });
		this.props.drawer(this.state.open);
	};

	handleToggleTakeNote = async tnvalue => {
		await this.setState({ takeNoteToggle: tnvalue });
	};
	setFocusToTextBox = () => {
		let el = document.getElementById("inputInactive");
		if (el !== null) {
			document.getElementById("inputInactive").focus();
		}
	};
	handleLogout = () => {
		localStorage.clear();
		const path = "/";
		this.props.history.push(path);
	};
	getNotes = () => {
		this.props.history.push("/dashboard/notes");
	};
	getReminder = () => {
		this.props.history.push("/dashboard/reminders");
	};
	getLabel = data => {
		let path = "/dashboard/label/" + data;
		this.props.history.push(path);
	};
	getArchived = () => {
		this.props.history.push("/dashboard/archived");
	};
	getTrash = () => {
		this.props.history.push("/dashboard/trash");
	};
	openSearch = () => {
		document.getElementById("searchtext").focus();
		this.props.history.push("/dashboard/search");
	};

	handleSearch = async event => {
		event.preventDefault();

		await this.setState({ searched: event.currentTarget.value });
		this.props.typedText(this.state.searched);
		console.log("searched:==>", this.state.searched);
	};

	handleGridList = async event => {
		event.preventDefault();
		await this.setState({ listView: !this.state.listView });
		this.props.view(this.state.listView);
	};

	render() {
		const { classes } = this.props;

		return (
			<div className="main">
				<MuiThemeProvider theme={theme}>
					<div className="header">
						<AppBar position="fixed">
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
									<div className="flogotext" onClick={this.setFocusToTextBox}>
										Fundoo
									</div>
								</div>
								<div className="searchBlock">
									<InputBase
										id="searchtext"
										fullWidth
										height="90%"
										placeholder="Search"
										variant="outlined"
										style={{ height: "3.1875em", color: "#757575" }}
										value={this.state.searched}
										onChange={event => this.handleSearch(event)}
										onClick={this.openSearch}
										startAdornment={
											<InputAdornment position="start">
												<SearchIcon
													onClick={this.openSearch}
													style={{ color: "#757575", padding: "0 15px" }}
												/>
											</InputAdornment>
										}
									/>
									<IconButton
										size="small"
										style={{ width: "30px", alignSelf: "center" }}
										onClick={this.getNotes}
									>
										<CloseSharpIcon
											id="closeIcon"
											style={{ color: "#757575", padding: "0 15px" }}
										/>
									</IconButton>
								</div>
								<div id="rightPanelLogo">
									<IconButton
										id="logos"
										onClick={event => this.handleGridList(event)}
									>
										{this.state.listView ? (
											<DashboardOutlinedIcon />
										) : (
											<ViewAgendaOutlinedIcon />
										)}
									</IconButton>
									<IconButton id="logos">
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
										<Paper id="profileMenu">
											<List classes={{ padding: classes.MuiList }}>
												<ListItem classes={{ gutters: classes.gutters }} style={{ justifyContent: "center" }}>
													<Badge
														overlap="circle"
														anchorOrigin={{
															vertical: "bottom",
															horizontal: "right"
														}}
														badgeContent={
															<IconButton
																size="small"
																style={{
																	backgroundColor: "#8844bbe0",
																	boxShadow:
																		" -4px -2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
																}}
															>
																<CameraAltOutlinedIcon fontSize="inherit" />
															</IconButton>
														}
													>
														<Avatar
															src={flogo}
															classes={{ root: classes.MuiAvatar }}
														>
															<AccountCircleOutlinedIcon />
														</Avatar>
													</Badge>
													<ListItemText
														classes={{root:classes.typography}}
														primary={localStorage.getItem("name")}
													/>
												</ListItem>
												{/* <ListItem classes={{ gutters: classes.gutters }} style={{ textAlign: "center" }}>
													
												</ListItem> */}
												<ListItem classes={{ gutters: classes.gutters }} style={{ justifyContent: "center" }}>
													<Chip
														
														size="small"
														label={localStorage.getItem("email")}
													/>
												</ListItem>
												<ListItem classes={{ root: classes.MuiListItem,gutters:classes.gutters }}>
													<Button
														classes={{containedSizeSmall:classes.MuiButton}}
														disableElevation
														size="small"
														variant="contained"
														color="primary"
														margin="dense"
														onClick={this.handleLogout}
													>
														logout
													</Button>
												</ListItem>
											</List>
										</Paper>
									</Popover>
								</div>
							</Toolbar>
						</AppBar>
					</div>
					<div>
						<Drawer
							open={this.state.open}
							variant="persistent"
							style={{ position: "fixed", zIndex: "1000" }}
						>
							<Drawerlist
								notes={this.getNotes}
								reminder={this.getReminder}
								archived={this.getArchived}
								trash={this.getTrash}
								label={this.getLabel}
							/>
						</Drawer>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		drawerStatus: state.open,
		searchedText: state.searched,
		viewStatus: state.listView
	};
};
const mapDispatchToProps = {
	drawer,
	typedText,
	view
};
export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);
