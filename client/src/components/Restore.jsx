import React, { Fragment } from "react";
import RestoreFromTrashOutlinedIcon from "@material-ui/icons/RestoreFromTrashOutlined";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import noteServices from "../services/noteServices";
const nServe = new noteServices();

export default class Restore extends React.Component {
	handleRestore = () => {
		if (this.props.restoreState.id !== "") {
			let updatedState = {};
			updatedState.noteIdList = [this.props.restoreState.id];
			updatedState.isDeleted = false;
			nServe
				.deleteNote(updatedState)
				.then(response => {
					console.log("information in deletenote response", response.data);
					this.props.onUpdate(this.props.restoreState.id);
				})
				.catch(err => {
					console.log("error occured while fetching data", err);
				});
		}
	};

	render() {
		return (
			<Fragment>
				<Tooltip title="Restore">
					<IconButton size="small" onClick={this.handleRestore}>
						<RestoreFromTrashOutlinedIcon fontSize="inherit" />
					</IconButton>
				</Tooltip>
			</Fragment>
		);
	}
}
