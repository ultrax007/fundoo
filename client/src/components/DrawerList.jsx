import React, { Fragment } from "react";
import "../sass/drawer.sass";
// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import update from "immutability-helper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
// import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grow from "@material-ui/core/Grow";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import CreateIcon from "@material-ui/icons/Create";
import LabelIcon from "@material-ui/icons/Label";
import DeleteIcon from "@material-ui/icons/Delete";
import InputBase from "@material-ui/core/InputBase";
import noteServices from "../services/noteServices";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
const nServe = new noteServices();

const dlist = createMuiTheme({
	overrides: {
		MuiListItem: {
			gutters: {
				paddingLeft: "16px"
			}
		}
	}
});

export default class DrawerList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: true,
			reminder: false,
			editL: false,
			archive: false,
			trash: false,
			label: false,
			lId:"",
			labels: [],
			labelText: "",
			dialogOpen: false,
			showCreate: true,
			toggleEdit: false,
			toggleIcon: false,
			hoverId: "",
			editId: ""
		};
	}
	componentDidMount() {
		// this.handleNotes();
		this.getAllLabels();
	}

	getAllLabels = () => {
		nServe
			.getAllLabels()
			.then(response => {
				// console.log("labels are", response.data);
				this.setState({
					labels: response.data.data.details
				});
				// console.log("labels in state",this.state.labels);
			})
			.catch(err => {
				console.log("error fetching", err);
			});
	};

	createNoteLabel = () => {
		let data = {};
		data.label = this.state.labelText;
		data.isDeleted = false;
		data.userId = localStorage.getItem("userId");
		console.log("value in data in create label", data);
		nServe
			.createLabel(data)
			.then(response => {
				console.log("value in response of createlabel", response.data);
				this.setState({
					labels: update(this.state.labels, { $unshift: [response.data] }),
					labelText: ""
				});
				console.log("value in state ", this.state);
			})
			.catch(err => {
				console.log("error while posting label", err);
			});
	};

	updateLable = (event, index) => {
		event.preventDefault();
		let data = this.state.labels[index];
		let id = this.state.labels[index].id;
		console.log("value in update label ", index, data, id);
		nServe
			.updateLable(data, id)
			.then(response => {
				this.setState({ editId: "" });
				console.log("success", response.data);
			})
			.catch(err => {
				console.log("err", err);
			});
	};

	deleteLable = (event, index) => {
		event.preventDefault();
		let id = this.state.labels[index].id;
		nServe
			.deleteNoteLabel(id)
			.then(response => {
				this.setState({
					labels: update(this.state.labels, {
						$splice: [[index, 1]]
					})
				});
				console.log("success", response);
			})
			.catch(err => {
				console.log("err", err);
			});
	};

	handleClick = () => {
		this.setState({ dialogOpen: !this.state.dialogOpen });
	};

	handleMouseLeave = () => {
		this.setState({ hoverId: "" });
	};

	handleLableText = event => {
		this.setState({
			labelText: event.currentTarget.value
		});
	};

	handleCross = () => {
		this.setState({
			labelText: "",
			showCreate: false
		});
	};

	handleShow = () => {
		this.setState({
			showCreate: true
		});
	};

	handleToggleIcon = (event, index) => {
		event.preventDefault();
		this.setState({
			hoverId: index,
			toggleIcon: !this.state.toggleIcon
		});
	};

	handleToggleEdit = (event, index) => {
		event.preventDefault();
		this.setState({
			editId: index,
			hoverId: index,
			toggleEdit: !this.state.toggleEdit
		});
	};

	handleLableEdit = (event, index) => {
		this.setState({
			labels: update(this.state.labels, {
				[index]: {
					label: { $set: event.currentTarget.value }
				}
			})
		});
		console.log("editing value of label", this.state.labels[index]);
	};

	handleNotes = () => {
		this.setState({
			notes: true,
			reminder: false,
			editL: false,
			archive: false,
			trash: false,
			label:false
		});
		this.props.notes();
	};

	handleReminder = () => {
		this.setState({
			notes: false,
			reminder: true,
			editL: false,
			archive: false,
			trash: false,
			label:false
		});
		this.props.reminder();
	};

	handleELable = () => {
		this.setState({
			notes: false,
			reminder: false,
			editL: true,
			archive: false,
			trash: false,
			label:false
		});
		this.handleClick();
	};

	handleArchive = () => {
		this.setState({
			notes: false,
			reminder: false,
			editL: false,
			archive: true,
			trash: false,
			label:false
		});
		this.props.archived();
	};

	handleTrash = () => {
		this.setState({
			notes: false,
			reminder: false,
			editL: false,
			archive: false,
			trash: true,
			label:false
		});
		this.props.trash();
	};

	handleOpenLabels = (event, data) => {
		event.preventDefault();
		this.setState({
			notes: false,
			reminder: false,
			editL: false,
			archive: false,
			trash: false,
			label: true,
			lId:data.id
		});
		console.log("value in open label data", data.id);
		this.props.label(data.label);
	}

	render() {
		var style = this.state.notes ? "hNote" : null;
		var style1 = this.state.reminder ? "hNote" : null;
		var style2 = this.state.editL ? "hNote" : null;
		var style3 = this.state.archive ? "hNote" : null;
		var style4 = this.state.trash ? "hNote" : null;
		var style5 = this.state.label ? "hNote" : null;

		return (
			<Fragment>
				<MuiThemeProvider theme={dlist}>
				<List component="nav">
					<ListItem button id={style} onClick={this.handleNotes}>
						<ListItemIcon>
							<PostAddOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Notes" />
					</ListItem>

					<ListItem button id={style1} onClick={this.handleReminder}>
						<ListItemIcon>
							<NotificationsNoneOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Reminder" />
					</ListItem>

					<Divider />

					<Typography id="labels" component="p">
						LABELS
					</Typography>
					{this.state.labels.map((data) => (
						<ListItem id={this.state.lId===data.id?style5:null} button key={data.id} onClick={event=>this.handleOpenLabels(event,data)}>
							<ListItemIcon>
								<LabelOutlinedIcon />
							</ListItemIcon>
							<ListItemText>{data.label}</ListItemText>
						</ListItem>
					))}
					<ListItem button id={style2} onClick={this.handleELable}>
						<ListItemIcon>
							<CreateOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Edit labels" />
					</ListItem>

					<Divider />

					<ListItem button id={style3} onClick={this.handleArchive}>
						<ListItemIcon>
							<ArchiveOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Archive" />
					</ListItem>

					<ListItem button id={style4} onClick={this.handleTrash}>
						<ListItemIcon>
							<DeleteOutlineOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Trash" />
					</ListItem>
					</List>
					</MuiThemeProvider>
				<Dialog
					open={this.state.dialogOpen}
					TransitionComponent={Grow}
					keepMounted
					onClose={this.handleClick}
				>
					<DialogTitle>Edit labels</DialogTitle>
					<List dense={true}>
						<ListItem>
							{this.state.showCreate ? (
								<ListItemIcon
									size="small"
									style={{ minWidth: "32px", padding: "3px 0 7px" }}
									onClick={this.handleCross}
								>
									<Tooltip title="Cancel">
										<IconButton size="small">
											<CloseSharpIcon fontSize="inherit" />
										</IconButton>
									</Tooltip>
								</ListItemIcon>
							) : (
								<ListItemIcon
									size="small"
									style={{ minWidth: "32px", padding: "3px 0 7px" }}
									onClick={this.handleCross}
								>
									<Tooltip title="Cancel">
										<IconButton size="small" onClick={this.handleShow}>
											<AddSharpIcon fontSize="inherit" />
										</IconButton>
									</Tooltip>
								</ListItemIcon>
							)}

							<InputBase
								margin="dense"
								placeholder="Create new label"
								value={this.state.labelText}
								onChange={event => this.handleLableText(event)}
								onClick={this.handleShow}
							/>

							{this.state.showCreate ? (
								<ListItemIcon
									size="small"
									style={{
										minWidth: "20px",
										padding: "3px 0 7px",
										marginLeft: "5px"
									}}
								>
									<Tooltip title="Create label">
										<IconButton size="small" onClick={this.createNoteLabel}>
											<CheckSharpIcon fontSize="inherit" />
										</IconButton>
									</Tooltip>
								</ListItemIcon>
							) : null}
						</ListItem>

						{this.state.labels.map((data, index) => (
							<ListItem
								key={index}
								onMouseEnter={event => this.handleToggleIcon(event, index)}
								onMouseLeave={this.handleMouseLeave}
							>
								{this.state.hoverId === index ? (
									<ListItemIcon
										style={{ minWidth: "32px", padding: "3px 0 7px" }}
									>
										<IconButton
											size="small"
											onClick={event => {
												this.deleteLable(event, index);
											}}
										>
											<DeleteIcon fontSize="inherit" />
										</IconButton>
									</ListItemIcon>
								) : (
									<ListItemIcon
										style={{ minWidth: "32px", padding: "3px 0 7px" }}
									>
										<IconButton size="small">
											<LabelIcon fontSize="inherit" />
										</IconButton>
									</ListItemIcon>
								)}

								<InputBase
									margin="dense"
									placeholder="Create new label"
									value={data.label}
									onClick={event => this.handleToggleEdit(event, index)}
									onChange={event => this.handleLableEdit(event, index)}
								/>

								{this.state.editId === index ? (
									<ListItemIcon
										size="small"
										style={{
											minWidth: "20px",
											padding: "3px 0 7px",
											marginLeft: "5px"
										}}
									>
										<Tooltip title="Create label">
											<IconButton
												size="small"
												onClick={event => this.updateLable(event, index)}
											>
												<CheckSharpIcon fontSize="inherit" />
											</IconButton>
										</Tooltip>
									</ListItemIcon>
								) : (
									<ListItemIcon
										size="small"
										style={{
											minWidth: "20px",
											padding: "3px 0 7px",
											marginLeft: "5px"
										}}
									>
										<Tooltip title="Edit label">
											<IconButton size="small">
												<CreateIcon fontSize="inherit" />
											</IconButton>
										</Tooltip>
									</ListItemIcon>
								)}
							</ListItem>
						))}
					</List>
				</Dialog>
			</Fragment>
		);
	}
}
