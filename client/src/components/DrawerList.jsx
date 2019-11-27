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
	render() {
		return (
			<Fragment>
				<List component="nav" aria-label="main mailbox folders">
					<ListItem button>
						<ListItemIcon>
							<EmojiObjectsOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Notes" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<NotificationsNoneOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Drafts" />
					</ListItem>
				</List>
				<Divider />
				<List component="nav" aria-label="labels">
					<ListItem>
						<Typography id="labels" component="p">
							LABELS
						</Typography>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<CreateOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Edit labels" />
					</ListItem>
				</List>

				<Divider />
				<List component="nav" aria-label="secondary mailbox folders">
					<ListItem button>
						<ListItemIcon>
							<ArchiveOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Archive" />
					</ListItem>
					<ListItem button>
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
