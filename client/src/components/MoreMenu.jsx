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
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
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

export default class MoreMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pop_open: false,
			anchorEl: null,
			lMenu: false,
			searchText: "",
			labels:[]
		};
	}

	componentDidMount() {
		this.getAllLabels();
	}

	getAllLabels = () => {
		nServe
			.getAllLabels()
			.then(response => {
				console.log("labels are", response.data);
				this.setState({
					labels: response.data.data.details
				});
				// console.log("labels in state",this.state.labels);
			})
			.catch(err => {
				console.log("error fetching", err);
			});
	};

	addLable = (event, index) => {
		event.preventDefault();
		let data = {};
		data.noteId = this.props.moreState.id;
		// console.log("value in data.noteId", data.noteId, index);
		data.lableId = this.state.labels[index].id;
		console.log("value of data", data);
		nServe.addLabelToNotes(data).then(response => {
			console.log("success",response.data);
		}).catch(err => {
			console.log("err",err);
		})
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
		this.props.deleteAction();
		this.props.onUpdate();
	};

	handleMenu(e) {
		e.preventDefault();
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: e.currentTarget
		});
	}

	handleLMenu = async event => {
		event.preventDefault();
		this.setState({
			pop_open: false,
			lMenu: !this.state.lMenu
		});
		await console.log("lmenu hit", this.state.lMenu);
	};
	handleLMenuClose = async event => {
		event.preventDefault();
		this.setState({
			pop_open: false,
			lMenu: false,
			anchorEl: null
		});
		await console.log("lmenu hit", this.state.lMenu);
	};

	handleClose = () => {
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: null
		});
	};

	handleSearchText = event => {
		this.setState({ searchText: event.currentTarget.value });
		console.log("value in search", this.state.searchText);
	};

	render() {
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
						<MenuItem onClick={this.handleDelete}>Delete Note</MenuItem>
						<MenuItem onClick={event => this.handleLMenu(event)}>
							Add Lable
						</MenuItem>
						<MenuItem>Show Checklist</MenuItem>
						<MenuItem>Ask Question</MenuItem>
					</Menu>
					<ClickAwayListener
						onClickAway={event => this.handleLMenuClose(event)}
					>
						<Popper
							open={this.state.lMenu}
							anchorEl={this.state.anchorEl}
							style={{ zIndex: "1301" }}
						>
							<Paper id="lMenu">
								<List dense={true}>
									<ListItem>
										<ListItemText primary="Label note" />
									</ListItem>
									<ListItem>
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
									{this.state.labels.map((data,index) => (
										<ListItem key={data.id}>
											<Checkbox
												fontSize="small"
												disableRipple={true}
												icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
												checkedIcon={<CheckBoxIcon fontSize="small" style={{ color: "#757575" }} />}
												onChange={event=>this.addLable(event,index)}
											/>
											<ListItemText primary={data.label}/>
										</ListItem>
									))}
								</List>
							</Paper>
						</Popper>
					</ClickAwayListener>
				</MuiThemeProvider>
			</Fragment>
		);
	}
}
