import React, { Fragment } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import noteServices from "../services/noteServices";
const nServe = new noteServices();

const theme = createMuiTheme({
	overrides: {
		MuiMenuItem: {
			root: {
				fontSize: "13px"
			}
		}
	}
});

export default class MoreMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pop_open: false,
			anchorEl: null
		};
	}

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
    this.props.deleteAction();
    this.handleClose();
	};

	handleMenu(e) {
		e.preventDefault();
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: e.currentTarget
		});
	}

	handleClose = () => {
		this.setState({
			pop_open: !this.state.pop_open,
			anchorEl: null
		});
	};
	render() {
		return (
			<Fragment>
				<Tooltip title="more">
					<IconButton size="small" onClick={event => this.handleMenu(event)}>
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
						<MenuItem>Add Lable</MenuItem>
						<MenuItem>Ask Question</MenuItem>
					</Menu>
				</MuiThemeProvider>
			</Fragment>
		);
	}
}
