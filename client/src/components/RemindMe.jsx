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
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker
} from "@material-ui/pickers";

import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

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
class RemindMe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pop_open: false,
			picker_open: false,
			anchorEl: null,
			panchorEl: null,
			reminder: "",
			sDate: "",
			sTime: "",
			reminderDate: new Date(),
			reminderTime: new Date("2019-12-19T20:00:00")
		};
	}
	handleDateChange = async date => {
		console.log("value in date", date);
		await this.setState({
			reminderDate: date,
			sDate: date.toString().slice(0, 15)
		});
		console.log("value in handle change ", this.state.reminderDate);
	};
	handleTimeChange = async time => {
		console.log("value in time", time);
		await this.setState({
			reminderTime: time,
			sTime: time.toString().slice(15, 33)
		});
		console.log("value in handle change ", this.state.reminderTime);
	};
	handleSave = async event => {
		event.preventDefault();
		event.stopPropagation();
		if (this.state.sDate === "") {
			console.log("date is empty");
			await this.setState(
				{
					reminderDate: new Date()
				},
				() => {
					this.setState({
						sDate: this.state.reminderDate.toString().slice(0, 15)
					});
				}
			);
		}
		// console.log("sdate is",this.state.sDate);
		if (this.state.sTime === "") {
			console.log("time is empty");
			await this.setState(
				{
					reminderTime: new Date("2019-12-19T20:00:00")
				},
				() => {
					this.setState({
						sTime: this.state.reminderTime.toString().slice(15, 33)
					});
				}
			);
		}
		await this.setState(
			{
				reminder: this.state.sDate.concat(this.state.sTime),
				picker_open: false,
				pop_open: false
			},
			() => {
				console.log("reminder is", this.state.reminder);
			}
		);
	};
	handeSetReminder = async (date, time) => {
		await this.setState({
			sDate: date.toString().slice(0, 15)
		});
		await this.setState({
			sTime: time.toString().slice(15, 33)
		});
		await this.setState(
			{
				reminder: this.state.sDate.concat(this.state.sTime),
				pop_open: false
			},
			() => {
				console.log("reminder is", this.state.reminder);
			}
		);
	};
	handleTemplates = async (event, choice) => {
		event.preventDefault();
		switch (choice) {
			case "1": {
				this.handeSetReminder(new Date(), new Date("2019-12-19T20:00:00"));
				break;
			}
			case "2": {
				const today = new Date();
				const tomorrow = new Date(today);
				tomorrow.setDate(tomorrow.getDate() + 1);
				this.handeSetReminder(tomorrow, new Date("2019-12-19T08:00:00"));
				break;
			}
			case "3": {
				var monday = new Date();
				monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7));
				this.handeSetReminder(monday, new Date("2019-12-19T08:00:00"));
				break;
			}
			default: {
				break;
			}
		}
	};
	handleRemindMe(event) {
		event.preventDefault();
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: event.currentTarget,
			panchorEl: event.currentTarget
		});
	}
	handlePicker(event) {
		event.preventDefault();
		this.setState({
			pop_open: false,
			picker_open: true
			// anchorEl: event.currentTarget
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
			panchorEl: null
		});
	};
	render() {
		const { classes } = this.props;

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
							<ListItem
								button
								classes={{ root: classes.MuiListItem }}
								onClick={event => this.handleTemplates(event, "1")}
							>
								<ListItemText
									primaryTypographyProps={{ style: text }}
									primary="Later today"
								/>
								<ListItemText
									secondaryTypographyProps={{ style: time }}
									secondary="8:00 PM"
								/>
							</ListItem>
							<ListItem
								button
								classes={{ root: classes.MuiListItem }}
								onClick={event => this.handleTemplates(event, "2")}
							>
								<ListItemText
									primaryTypographyProps={{ style: text }}
									primary="Tomorrow"
								/>
								<ListItemText
									secondaryTypographyProps={{ style: time }}
									secondary="8:00 AM"
								/>
							</ListItem>
							<ListItem
								button
								classes={{ root: classes.MuiListItem }}
								onClick={event => this.handleTemplates(event, "3")}
							>
								<ListItemText
									primaryTypographyProps={{ style: text }}
									primary="Next week"
								/>
								<ListItemText
									secondaryTypographyProps={{ style: time }}
									secondary="Mon, 8:00 AM"
								/>
							</ListItem>
							<ListItem
								button
								onClick={event => this.handlePicker(event)}
								classes={{ root: classes.MuiListItem }}
							>
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
					anchorEl={this.state.panchorEl}
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
								<ListItemIcon classes={{ root: classes.MuiListItemIcon }}>
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
							<ListItem
								classes={{ root: classes.MuiListItem }}
								style={{ justifyContent: "flex-end" }}
							>
								<Button
									size="small"
									color="primary"
									onClick={event => {
										this.handleSave(event);
									}}
								>
									Save
								</Button>
							</ListItem>
						</List>
					</Paper>
				</Popover>
			</Fragment>
		);
	}
}
export default withStyles(styles)(RemindMe);
