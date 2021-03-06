import React, { Fragment } from "react";
import "../sass/TakeNote.sass";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import noteServices from "../services/noteServices";
const nServe = new noteServices();
export default class ArchiveIcon extends React.Component {
	refreshArchive = () => {
		if (this.props.archiveState.id !== "") {
			let updatedArchive = {};
			updatedArchive.noteIdList = [this.props.archiveState.id];
			updatedArchive.isArchived = !this.props.archiveState.isArchived;
			nServe
				.changeNoteArchive(updatedArchive)
				.then(response => {
					console.log("information in Archive response", response.data);
				})
				.catch(err => {
					console.log("error occured while fetching data", err);
				});
		}
		this.handleUpdation();
		this.props.archiveAction();
	};
	handleUpdation = () => {
		this.props.onUpdate(this.props.archiveState.id);
	};
	render() {
		return (
			<Fragment>
				<IconButton id={this.props.styleid} size="small" onClick={this.refreshArchive}>
					{this.props.archiveState.isArchived ? (
						<Tooltip title="UnArchive">
							<UnarchiveOutlinedIcon fontSize="inherit" />
						</Tooltip>
					) : (
						<Tooltip title="Archive">
							<ArchiveOutlinedIcon fontSize="inherit" />
						</Tooltip>
					)}
				</IconButton>
			</Fragment>
		);
	}
}
