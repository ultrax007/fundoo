import React, { Fragment } from "react";
import update from "immutability-helper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonIcon from "@material-ui/icons/Person";
// import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CloseIcon from "@material-ui/icons/Close";
import Grow from "@material-ui/core/Grow";
import {
	createMuiTheme,
	MuiThemeProvider,
	ListItemText,
	DialogActions,
	Button
} from "@material-ui/core";
import noteServices from "../services/noteServices";
const nServe = new noteServices();
const backdrop = createMuiTheme({
	overrides: {
		MuiDialog: {
			root: {
				marginTop: "-15%"
			}
		},
		MuiBackdrop: {
			root: {
				backgroundColor: "#e5e5e59c"
			}
		},
		MuiPaper: {
			rounded: {
				width: "600px",
				borderRadius: "10px"
			},
			elevation1: {
				boxShadow:
					" 0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
			}
		},
		MuiTypography: {
			body2: {
				fontSize: "13px"
			}
		},
		MuiListItemIcon: {
			root: {
				minWidth: "0px"
			}
		}
	}
});

class Collaborator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listOpen: false,
			dialogOpen: false,
			collaborators: this.props.collabState.collaborators,
			searchWord: "",
			userList: [],
			profile:
				"http://fundoonotes.incubation.bridgelabz.com/" +
				localStorage.getItem("imageUrl")
		};
	}
	
	handleSearch = async event => {
		event.preventDefault();
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		console.log("value in handle search", event.currentTarget.value);
		await this.setState({
			searchWord: event.currentTarget.value
		});
		this.getData(this.state.searchWord);
	};

	getData = word => {
		if (word.length > 2) {
			let data = {};
			data.searchWord = word;
			nServe
				.searchUserList(data)
				.then(response => {
					console.log("succesfully received userlist", response);
					this.setState({ userList: response.data.data.details }, () => {
						console.log("stored userlist in data");
					});
				})
				.catch(err => {
					console.log("error occured", err);
				});
		}
	};

	handleClick = () => {
		this.setState({ dialogOpen: !this.state.dialogOpen });
	};
	handleCloseDialog = () => {
		this.setState({ dialogOpen: false, searchWord: "" });
	};
	pushCollab = data => {
		this.setState({
			collaborators: update(this.state.collaborators, { $push: [data] })
		});
	};
	popCollab = index => {
		this.setState({
			collaborators: update(this.state.collaborators, { $splice: [[index, 1]] })
		});
	};
	handleDeleteCollaborator = (event, userData, index) => {
		event.preventDefault();
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		if (this.props.collabState.id === "") {
			this.popCollab(index);
			this.props.collabRemove(index);
		} else {
			nServe
				.deleteCollaborator(userData)
				.then(response => {
					this.popCollab(index);
					this.props.collabRemove(index);
					console.log("successfully deleted collaborator", response);
				})
				.catch(err => {
					console.log("err deleting collaborator", err);
				});
		}
	};
	handleAddCollaborator = (event, userData) => {
		event.preventDefault();
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		if (this.props.collabState.id === "") {
			this.pushCollab(userData)
			this.props.collabAdd(userData);
		} else {
			userData.id = this.props.collabState.id;
			console.log("value in data", userData);
			nServe
				.addCollaborator(userData)
				.then(response => {
					this.pushCollab(userData);
					this.props.collabAdd(userData);
					console.log("successfully added collaborator", response);
				})
				.catch(err => {
					console.log("err adding collaborator", err);
				});
		}
	};

	render() {
		return (
			<Fragment>
				<Tooltip title="Collaborator">
					<IconButton
						id={this.props.styleid}
						size="small"
						onClick={this.handleClick}
					>
						<PersonAddOutlinedIcon fontSize="inherit" />
					</IconButton>
				</Tooltip>
				<MuiThemeProvider theme={backdrop}>
					<Dialog
						open={this.state.dialogOpen}
						TransitionComponent={Grow}
						keepMounted
						onClose={this.handleCloseDialog}
					>
						<DialogTitle id="collab-title" style={{ padding: "4px 16px" }}>
							Collaborators
						</DialogTitle>
						<Divider style={{ width: "95%", alignSelf: "center" }} />
						<List dense>
							<ListItem>
								<ListItemAvatar>
									<Avatar
										style={{ border: "2px solid #ccc" }}
										alt={localStorage.getItem("name").charAt(0)}
										src={this.state.profile}
									/>
								</ListItemAvatar>
								<ListItemText secondary={localStorage.getItem("email")}>
									<b>{localStorage.getItem("name")}</b>
									<i> (owner)</i>
								</ListItemText>
							</ListItem>
							{this.state.collaborators.length > 0 &&
								this.state.collaborators.map((user, index) => (
									<ListItem key={user.email}>
										<ListItemAvatar>
											<Avatar
												style={{
													border: "1px solid #757575",
													color: "#757575",
													backgroundColor: "#fafafa"
												}}
											>
												<PersonIcon fontSize="small" />
											</Avatar>
										</ListItemAvatar>
										<ListItemText secondary={user.email}>
											<b>
												{user.firstName} {user.lastName}
											</b>
										</ListItemText>
										<ListItemIcon>
											<Tooltip title="delete">
												<IconButton
													size="small"
													onClick={event =>
														this.handleDeleteCollaborator(event, user, index)
													}
												>
													<CloseIcon fontSize="inherit" />
												</IconButton>
											</Tooltip>
										</ListItemIcon>
									</ListItem>
								))}
							<ListItem>
								<ListItemAvatar>
									<Avatar
										style={{
											border: "1px solid #757575",
											color: "#757575",
											backgroundColor: "#fafafa"
										}}
									>
										<PersonAddIcon fontSize="small" />
									</Avatar>
								</ListItemAvatar>
								<InputBase
									fullWidth
									style={{ fontSize: "13px" }}
									placeholder="Person or email to share with"
									variant="naked"
									value={this.state.searchWord}
									onChange={event => this.handleSearch(event)}
								/>
							</ListItem>
						</List>
						{this.state.searchWord.length > 2 ? (
							<Card
								style={{
									maxHeight: "160px",
									overflow: "auto",
									backgroundColor: "#f1f3f4",
									boxShadow: "0"
								}}
							>
								<List dense>
									{this.state.userList.map(users => (
										<ListItem
											button
											key={users.userId}
											onClick={event => {
												this.handleAddCollaborator(event, users);
											}}
										>
											<ListItemAvatar>
												<Avatar
													style={{
														border: "1px solid #757575",
														color: "#757575",
														backgroundColor: "#fafafa"
													}}
												>
													<PersonIcon fontSize="small" />
												</Avatar>
											</ListItemAvatar>
											<ListItemText>
												<b>{users.firstName}</b> <ins>'{users.email}'</ins>
											</ListItemText>
										</ListItem>
									))}
									{this.state.userList.length === 0 && (
										<ListItemText
											secondary="sorry nothing found..."
											style={{ paddingLeft: "10px" }}
										/>
									)}
								</List>
							</Card>
						) : null}
						<DialogActions>
							<Button size="small" onClick={this.handleCloseDialog}>
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</MuiThemeProvider>
			</Fragment>
		);
	}
}

export default Collaborator;
