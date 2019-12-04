import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import noteServices from "../services/noteServices";
const nServe = new noteServices();

export default class DeleteForever extends React.Component {
	handleForeverDelete = () => {
		if (this.props.deleteState.isDeleted === true) {
			let updatedState = {};
			updatedState.noteIdList = [this.props.deleteState.id];
			updatedState.isDeleted = this.props.deleteState.isDeleted;
			nServe
				.deleteForeverNote(updatedState)
				.then(response => {
					console.log("information in deletenote forever response", response.data);
				})
				.catch(err => {
					console.log("error occured while fetching data", err);
				});
		}
	};
	render() {
		return (
			<Fragment>
				<Tooltip title="Delete Forever">
					<IconButton size="small" onClick={this.handleForeverDelete}>
						<DeleteForeverOutlinedIcon fontSize="inherit" />
					</IconButton>
				</Tooltip>
			</Fragment>
		);
	}
}
