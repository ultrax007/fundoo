import React, { Fragment } from "react";
import "../sass/drawer.sass";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Typography from "@material-ui/core/Typography";
export default class DrawerList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: false,
			reminder: false,
			editL: false,
			archive: false,
			trash: false
		};
	}
	componentDidMount() {
		this.setState({
			notes: true,
			reminder: false,
			editL: false,
			archive: false,
			trash: false
		});
	}

	handleNotes = () => {
		this.setState({
			notes: true,
			reminder: false,
			editL: false,
			archive: false,
			trash: false
		});
		this.props.toggleState(true);
	}

	handleReminder = () => {
		this.setState({
			notes: false,
			reminder: true,
			editL: false,
			archive: false,
			trash: false
		});
		this.props.toggleState(true);
	}

	handleELable = () => {
		this.setState({
			notes: false,
			reminder: false,
			editL: true,
			archive: false,
			trash: false
		});
	}

	handleArchive = () => {
		this.setState({
			notes: false,
			reminder: false,
			editL: false,
			archive: true,
			trash: false
		});
		this.props.toggleState(false);
	}

	handleTrash = () => {
		this.setState({
			notes: false,
			reminder: false,
			editL: false,
			archive: false,
			trash: true
		});
		this.props.toggleState(false);
	}

	render() {
		var style = this.state.notes ? "hNote" : null;
		var style1 = this.state.reminder ? "hNote" : null;
		var style2 = this.state.editL ? "hNote" : null;
		var style3 = this.state.archive ? "hNote" : null;
		var style4 = this.state.trash ? "hNote" : null;
		// var style5 = this.state.labels ? "hNote" : null;

		return (
			<Fragment>
				<List component="nav">
					<ListItem button id={style} onClick={this.handleNotes}>
						<ListItemIcon>
							<EmojiObjectsOutlinedIcon />
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
			</Fragment>
		);
	}
}
