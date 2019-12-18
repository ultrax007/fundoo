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
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import Paper from "@material-ui/core/Paper";
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker
} from "@material-ui/pickers";

import { withStyles } from "@material-ui/core/styles";

const styles = {
	MuiListItemIcon: {
		color: "#494949",
		minWidth: "30px"
	},
	MuiList: {
		paddingTop: "0"
	},
	MuiListItem: {
		paddingTop: "0",
		paddingBottom: "0"
	}
};
class RemindMe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pop_open: false,
			picker_open: false,
      anchorEl: null,
      reminderDate: new Date('2019-12-18T21:11:54'),
      reminderTime:new Date('2019-12-18T21:11:54')
		};
  }
  handleDateChange = date => {
    console.log("value in event",date);
    this.setState({
      reminderDate: date
    });
    console.log("value in handle change ",this.state.reminderDate);
  }
  handleTimeChange = event => {
    this.setState({
      reminderTime: event.target.value
    });
    console.log("value in handle change ",this.state.reminderTime);
  }
	handleRemindMe(event) {
		event.preventDefault();
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: event.currentTarget
		});
	}
	handlePicker(event) {
		event.preventDefault();
		this.setState({
			pop_open: false,
			picker_open: !this.state.picker_open,
			anchorEl: event.currentTarget
		});
	}
	handleClose = () => {
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: null
		});
	};
	handlePickerClose = () => {
		this.setState({
			picker_open: !this.state.picker_open,
			anchorEl: null
		});
	};
	render() {
		const { classes } = this.props;
		const picker = {
			fontSize: "13px"
		};
		const text = {
			fontSize: "13px"
		};
		const ptext = {
			fontSize: "14px"
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
						<List classes={{ padding: classes.MuiList }}>
							<ListItem classes={{ root: classes.MuiListItem }}>
								<ListItemText primary="Reminder:"></ListItemText>
							</ListItem>
							<ListItem button classes={{ root: classes.MuiListItem }}>
								<ListItemText
									primaryTypographyProps={{ style: text }}
									primary="Later today"
								/>
								<ListItemText
									secondaryTypographyProps={{ style: time }}
									secondary="8:00 PM"
								/>
							</ListItem>
							<ListItem button classes={{ root: classes.MuiListItem }}>
								<ListItemText
									primaryTypographyProps={{ style: text }}
									primary="Tomorrow"
								/>
								<ListItemText
									secondaryTypographyProps={{ style: time }}
									secondary="8:00 AM"
								/>
							</ListItem>
							<ListItem button classes={{ root: classes.MuiListItem }}>
								<ListItemText
									primaryTypographyProps={{ style: text }}
									primary="Next week"
								/>
								<ListItemText
									secondaryTypographyProps={{ style: time }}
									secondary="Mon, 8:00 AM"
								/>
							</ListItem>
							<ListItem button onClick={event => this.handlePicker(event)} classes={{ root: classes.MuiListItem }}>
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
				<Popover
					open={this.state.picker_open}
					anchorEl={this.state.anchorEl}
					onClose={this.handlePickerClose}
					anchorOrigin={{
						vertical: "center",
						horizontal: "left"
					}}
					transformOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
				>
					<Paper id="remindMePicker">
						<List classes={{ padding: classes.MuiList }}>
							<ListItem classes={{ root: classes.MuiListItem }}>
								<ListItemIcon classes={{root: classes.MuiListItemIcon}}>
									<IconButton size="small">
										<ArrowBackOutlinedIcon
											fontSize="inherit"
											style={{ padding: "5px" }}
										/>
									</IconButton>
								</ListItemIcon>
								<ListItemText
									primaryTypographyProps={{ style: ptext }}
									primary="Pick date & time"
								></ListItemText>
							</ListItem>

							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<ListItem classes={{ root: classes.MuiListItem }}>
									<KeyboardDatePicker
                    disableToolbar
                    name="reminderDate"
										size="small"
										variant="inline"
										format="MM/dd/yyyy"
										margin="dense"
										id="date-picker-inline"
                    inputProps={{ style: picker }}
										value={this.state.reminderDate}
										onChange={this.handleDateChange}
									/>
								</ListItem>
								<ListItem classes={{ root: classes.MuiListItem }}>
                  <KeyboardTimePicker
                    name="reminderTime"
										size="small"
										margin="dense"
										id="time-picker"
										inputProps={{ style: picker }}
										keyboardIcon={<AccessTimeSharpIcon fontSize="inherit" />}
										value={this.state.reminderTime}
										onChange={this.handleTimeChange}
									/>
								</ListItem>
							</MuiPickersUtilsProvider>
						</List>
					</Paper>
				</Popover>
			</Fragment>
		);
	}
}
export default withStyles(styles)(RemindMe);
