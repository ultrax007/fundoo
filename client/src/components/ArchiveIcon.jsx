import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

export default class ArchiveIcon extends React.Component {
  refreshArchive = () => {
    // event.preventDefault();
    this.props.archiveAction();
  };
	render() {
		return (
			<Fragment>
					<IconButton size="small" onClick={this.refreshArchive}>
						{this.props.archiveState ? (
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
