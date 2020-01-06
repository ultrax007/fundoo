//Default imports for designing
import React from "react";
// import ReactCrop from "react-image-crop";
import "react-image-crop/lib/ReactCrop.scss";
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
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import Popover from "@material-ui/core/Popover";
import Drawerlist from "./DrawerList";
import Dialog from "@material-ui/core/Dialog";
import Grow from "@material-ui/core/Grow";
import { drawer, typedText, view } from "./redux/Actions";
import userServices from "../services/userServices";
const uServe = new userServices();
var img;
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
		padding: "0 16px"
	},
	MuiAvatar: {
		width: "50px",
		height: "50px",
		boxShadow:
			" 0px 0px 2px 0px rgba(255, 255, 255, 0.25), 0 0px 6px 3px rgba(154, 154, 154, 0.2)"
	},
	MuiList: {
		paddingTop: "0px"
	},
	MuiListItem: {
		padding: "8px",
		justifyContent: "center"
	},
	MuiButton: {
		borderRadius: "15px",
		backgroundColor: "#8844bb",
		fontSize: "10px",
		boxShadow: "0px 2px 5px grey"
	},
	typography: {
		color: "#fff",
		marginLeft: "10px",
		textAlign: "left"
		// textShadow:"1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;"
	}
};

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			pop_open: false,
			anchorEl: null,
			listView: false,
			searched: "",
			selectedFile: null,
			base64: "http://fundoonotes.incubation.bridgelabz.com/" + localStorage.getItem("imageUrl"),
			dialogOpen: false
		};
	}
	componentDidMount() {
		// this.getNotes();
		this.setState({
			base64: "http://fundoonotes.incubation.bridgelabz.com/" + localStorage.getItem("imageUrl")
		});
	}
	handleClick = () => {
		this.setState({ dialogOpen: !this.state.dialogOpen });
	};
	handleCloseDialog = () => {
		this.setState({ dialogOpen: false });
	};
	handleProfileDropDown(e) {
		e.preventDefault();
		e.nativeEvent.stopImmediatePropagation();
		this.setState({
			pop_open: true,
			anchorEl: e.currentTarget
		});
	}

	handleClose = () => {
		this.setState({
			pop_open: false,
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
	handleQnA = event => {
		event.preventDefault();
		console.log("in handleAsked Question");
		let path = "/dashboard/AskQuestion/";
		this.props.history.push(path);
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
	toBase64 = file =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});

	async Main(file) {
		img = await this.toBase64(file);
		console.log(img);
		this.setState({
			base64: img
		});
	}
	fileChangedHandler = async event => {
		await this.setState({ selectedFile: event.target.files[0] });
		this.Main(this.state.selectedFile);
		this.handleClick();
	};
	uploadHandler = () => {
		const formData = new FormData();
		formData.append("file", this.state.selectedFile);
		uServe
			.profileImageUpload(formData)
			.then(response => {
				console.log("response is", response);
				this.handleCloseDialog();
				localStorage.setItem("imageUrl", response.data.status.imageUrl);
			})
			.catch(err => {
				console.log("err", err);
			});
	};
	handleShoppingCart = (event) => {
		event.preventDefault();
		this.props.history.push("/dashboard/cart");
	}
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
								<div id="dlogo">
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
									<IconButton id="logos" onClick={event => this.handleShoppingCart(event)}>
										
										<ShoppingCartOutlinedIcon  />
									</IconButton>
								</div>
								<div id="avatar">
									<Avatar
										alt={localStorage.getItem("name").charAt(0)}
										src={this.state.base64}
										onClick={event => this.handleProfileDropDown(event)}
									/>

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
												<ListItem
													classes={{ gutters: classes.gutters }}
													style={{
														justifyContent: "center",
														backgroundColor: "#1a2327",
														boxShadow: "0px 2px 6px grey"
													}}
												>
													<Badge
														style={{ margin: "10px 10px 10px 0px" }}
														overlap="circle"
														anchorOrigin={{
															vertical: "bottom",
															horizontal: "right"
														}}
														badgeContent={
															<IconButton
																size="small"
																onClick={() => this.fileInput.click()}
																style={{
																	width: "20px",
																	height: "20px",
																	backgroundColor: "#3c3c3c59",
																	boxShadow:
																		"rgba(255, 255, 255, 0.2) 0px 0px 6px 0px, rgba(253, 253, 253, 0.1) 0px 6px 20px 0px"
																}}
															>
																<CameraAltOutlinedIcon
																	fontSize="inherit"
																	style={{
																		height: "12px",
																		width: "12px",
																		color: "#ffffffbf"
																	}}
																/>
																<input
																	style={{ display: "none" }}
																	type="file"
																	// accept="image/*"
																	onChange={event =>
																		this.fileChangedHandler(event)
																	}
																	ref={fileInput =>
																		(this.fileInput = fileInput)
																	}
																/>
															</IconButton>
														}
													>
														<Avatar
															alt={localStorage.getItem("name").charAt(0)}
															src={this.state.base64}
															classes={{ root: classes.MuiAvatar }}
														/>
													</Badge>
													<ListItemText
														classes={{ root: classes.typography }}
														primary={localStorage.getItem("name")}
													/>
												</ListItem>
												<ListItem
													classes={{ gutters: classes.gutters }}
													style={{ justifyContent: "center" }}
												>
													<Chip
														style={{
															marginTop: "15px",
															boxShadow: "0px 2px 5px grey"
														}}
														size="small"
														label={localStorage.getItem("email")}
													/>
												</ListItem>

												<ListItem
													classes={{
														root: classes.MuiListItem,
														gutters: classes.gutters
													}}
												>
													<Button
														classes={{ containedSizeSmall: classes.MuiButton }}
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
				<Dialog
					open={this.state.dialogOpen}
					TransitionComponent={Grow}
					keepMounted
					onClose={this.handleCloseDialog}
					style={{ zIndex: "4001" }}
				>
					<div style={{ maxHeight: "500px", maxWidth: "800px" }}>
						<img
							alt="Crop"
							style={{ maxWidth: "100%" }}
							src={this.state.base64}
						/>
						<Button onClick={this.uploadHandler}>Upload</Button>
					</div>
				</Dialog>
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
