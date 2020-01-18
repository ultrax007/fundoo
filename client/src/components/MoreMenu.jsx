import React, { Fragment } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
// import update from "immutability-helper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { createMuiTheme, MuiThemeProvider, InputBase } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { withStyles } from "@material-ui/core/styles";
import noteServices from "../services/noteServices";
import "../sass/playground.sass";
const nServe = new noteServices();

const theme = createMuiTheme({
	overrides: {
		MuiMenuItem: {
			root: {
				fontSize: "13px"
			}
		},
		MuiInputBase: {
			root: {
				fontSize: "12px"
			}
		}
	}
});
const styles = {
	MuiList: {
		paddingTop: "0",
		paddingBottom: "0"
	},
	gutters: {
		paddingLeft: "8px",
		paddingRight: "4px"
	},
	MuiListItem: {
		paddingTop: "0",
		paddingBottom: "0"
	}
};
class MoreMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pop_open: false,
			anchorEl: null,
			lanchorEl: null,
			lMenu: false,
			searchText: "",
			labels: []
		};
	}

	componentDidMount() {
		// console.log("value of state in moreState",this.props.moreState);
		
		this.getAllLabels();
	}
	componentWillUnmount() {
		this.setState({
			pop_open: false,
			anchorEl: null,
			lanchorEl: null,
			lMenu: false,
			searchText: "",
			labels: []
		});
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

	handleLabelAdd = async (event, index) => {
		event.preventDefault();
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		if (this.props.moreState.id !== "") {
			let data = {};
			data.noteId = this.props.moreState.id;
			// console.log("value in data.noteId", data.noteId, index);
			data.labelId = this.state.labels[index].id;
			console.log("value of data", data);
			await nServe
				.addLabelToNotes(data)
				.then(response => {
					console.log("success", response);
					if (response.data.data.success) {
						console.log("label to be added", this.state.labels[index]);
						this.props.addLabel(this.state.labels[index]);
					}
				})
				.catch(err => {
					console.log("err", err);
				});
		} else {
			console.log("adding lable to take note", this.state.labels[index]);
			this.props.addLabel(this.state.labels[index]);
		}
	};

	handleDelete = () => {
		if (this.props.moreState.id !== "") {
			let updatedState = {};
			updatedState.noteIdList = [this.props.moreState.id];
			updatedState.isDeleted = true;
			nServe
				.deleteNote(updatedState)
				.then(response => {
					console.log("information in deletenote response", response.data);
				})
				.catch(err => {
					console.log("error occured while fetching data", err);
				});
		}
		this.handleClose();
		// this.props.deleteAction();
		this.props.onUpdate(this.props.moreState.id);
	};

	handleMenu = async event => {
		event.preventDefault();
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		await this.setState({
			pop_open: true,
			anchorEl: event.currentTarget,
			lanchorEl: event.currentTarget
		});
		// console.log("value of anchorEl",this.state.anchorEl);
	};

	handleLMenu = async event => {
		event.preventDefault();
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		console.log("value of lanchorel", this.state.lanchorEl);
		await this.setState({
			pop_open: false,
			anchorEl: null,
			lMenu: true
		});
		// console.log("lmenu hit open", this.state.lMenu);
	};

	handleLMenuClose = async event => {
		event.preventDefault();
		// event.stopPropagation();
		// event.nativeEvent.stopImmediatePropagation();
		await this.setState({
			lMenu: false,
			lanchorEl: null
		});
		console.log("lmenu hit close", this.state.lMenu);
	};

	handleClose = () => {
		this.setState({
			pop_open: false,
			anchorEl: null
		});
	};

	handleSearchText = event => {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		this.setState({ searchText: event.currentTarget.value });
		console.log("value in search", this.state.searchText);
	};

	handleQnA = event => {
		event.preventDefault();
		this.props.question();
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Tooltip title="more">
					<IconButton
						id={this.props.styleid}
						size="small"
						onClick={event => this.handleMenu(event)}
					>
						<MoreVertOutlinedIcon fontSize="inherit" />
					</IconButton>
				</Tooltip>
				<MuiThemeProvider theme={theme}>
					<Menu
						id="fade-menu"
						anchorEl={this.state.anchorEl}
						open={this.state.pop_open}
						onClose={this.handleClose}
						TransitionComponent={Fade}
					>
						{this.props.moreState.id !== "" ? (
							<MenuItem onClick={this.handleDelete}>Delete Note</MenuItem>
						) : null}

						<MenuItem onClick={event => this.handleLMenu(event)}>
							Add Lable
						</MenuItem>
						<MenuItem onClick={event => this.handleQnA(event)}>
							Ask Question
						</MenuItem>
						{/* <MenuItem>Show Checklist</MenuItem> */}
					</Menu>
					<Popper
						open={this.state.lMenu}
						anchorEl={this.state.lanchorEl}
						style={{ zIndex: "1301" }}
						placement={"left-start"}
					>
						<ClickAwayListener
							onClickAway={event => this.handleLMenuClose(event)}
						>
							<Paper id="lMenu">
								<List dense={true} classes={{ padding: classes.MuiList }}>
									<ListItem classes={{ root: classes.MuiListItem }}>
										<ListItemText primary="Label note" />
									</ListItem>
									<ListItem classes={{ root: classes.MuiListItem }}>
										<InputBase
											margin="dense"
											placeholder="Enter label name"
											endAdornment={
												<InputAdornment position="end">
													<SearchSharpIcon
														fontSize="small"
														style={{ color: "#a2a2a2" }}
													/>
												</InputAdornment>
											}
											value={this.state.searchText}
											onChange={event => this.handleSearchText(event)}
										/>
									</ListItem>
									{this.state.labels.map((data, index) => (
										<ListItem
											dense
											key={data.id}
											classes={{
												root: classes.MuiListItem,
												gutters: classes.gutters
											}}
										>
											<Checkbox
												size="small"
												disableRipple={true}
												icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
												checkedIcon={
													<CheckBoxIcon
														fontSize="small"
														style={{ color: "#757575" }}
													/>
												}
												onChange={event => this.handleLabelAdd(event, index)}
											/>
											<ListItemText primary={data.label} />
										</ListItem>
									))}
								</List>
							</Paper>
						</ClickAwayListener>
					</Popper>
				</MuiThemeProvider>
			</Fragment>
		);
	}
}
export default withStyles(styles)(MoreMenu);
