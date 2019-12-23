import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
// import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Grow from "@material-ui/core/Grow";
import {
	createMuiTheme,
	MuiThemeProvider,
	ListItemText
} from "@material-ui/core";
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
			}
		},
		MuiTypography: {
			body2: {
				fontSize: "13px"
			}
		}
	}
});

class collaborator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogOpen: false,
			profile:
				"http://fundoonotes.incubation.bridgelabz.com/" +
				localStorage.getItem("imageUrl")
		};
	}
	handleClick = () => {
		this.setState({ dialogOpen: !this.state.dialogOpen });
	};
	handleCloseDialog = () => {
		this.setState({ dialogOpen: false });
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
						// style={{}}
						open={this.state.dialogOpen}
						TransitionComponent={Grow}
						keepMounted
						onClose={this.handleCloseDialog}
						style={{ zIndex: "4001" }}
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
							<ListItem>
								<ListItemAvatar>
									<Avatar
										style={{
											border: "1px solid #757575",
											color: "#757575",
											backgroundColor: "#fafafa"
										}}
									>
										<PersonAddIcon fontSize="small"/>
									</Avatar>
								</ListItemAvatar>
								<InputBase
									id="searchtext"
									fullWidth
                  style={{fontSize:"13px"}}
									placeholder="Person or email to share with"
									variant="naked"
								/>
							</ListItem>
						</List>
					</Dialog>
				</MuiThemeProvider>
			</Fragment>
		);
	}
}

export default collaborator;
