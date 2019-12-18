import React, { Fragment } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import Popover from "@material-ui/core/Popover";
import AccessTimeSharpIcon from "@material-ui/icons/AccessTimeSharp";
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
const styles = {
  MuiListItemIcon: {
    
     minWidth: "30px"
    
  }
}
class RemindMe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pop_open: false,
			anchorEl: null
		};
	}
	handleRemindMe(event) {
		event.preventDefault();
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: event.currentTarget
		});
	}
	handleClose = () => {
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: null
		});
	};
  render() {
    const { classes } = this.props;
    
		const text = {
			fontSize: "13px"
		};
		const time = {
			fontSize: "13px",
			textAlign: "end"
		};
		return (
			<Fragment>
				<Tooltip title="Remind me">
					<IconButton
						id={this.props.styleid}
						size="small"
						onClick={event => this.handleRemindMe(event)}
					>
						<AddAlertOutlinedIcon fontSize="inherit" />
					</IconButton>
				</Tooltip>
				<Popover
					open={this.state.pop_open}
					anchorEl={this.state.anchorEl}
					onClose={this.handleClose}
					anchorOrigin={{
						vertical: "center",
						horizontal: "center"
					}}
					transformOrigin={{
						vertical: "center",
						horizontal: "left"
					}}
				>
					<Paper id="remindMe">
						<List>
							<ListItem>
								<ListItemText primary="Reminder:"></ListItemText>
							</ListItem>
							<ListItem button>
								<ListItemText
									primaryTypographyProps={{ style: text }}
									primary="Later today"
								/>
								<ListItemText
									secondaryTypographyProps={{ style: time }}
									secondary="8:00 PM"
								/>
							</ListItem>
							<ListItem button>
								<ListItemText
									primaryTypographyProps={{ style: text }}
									primary="Tomorrow"
								/>
								<ListItemText
									secondaryTypographyProps={{ style: time }}
									secondary="8:00 AM"
								/>
							</ListItem>
							<ListItem button>
								<ListItemText
									primaryTypographyProps={{ style: text }}
									primary="Next week"
								/>
								<ListItemText
									secondaryTypographyProps={{ style: time }}
									secondary="Mon, 8:00 AM"
								/>
							</ListItem>
							<ListItem button>
                <ListItemIcon classes={{ root: classes.MuiListItemIcon }}>
									<AccessTimeSharpIcon fontSize="inherit" />
								</ListItemIcon>
								<ListItemText
									primaryTypographyProps={{ style: text }}
									primary="Pick date & time"
								/>
							</ListItem>
						</List>
					</Paper>
				</Popover>
			</Fragment>
		);
	}
}
export default withStyles(styles)(RemindMe);