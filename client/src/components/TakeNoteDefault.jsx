import React from "react";
import "../sass/TakeNote.sass";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//icons imported from material ui
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
const theme = createMuiTheme({
	overrides: {
		MuiInputBase: {
			input: {
				color: "#202124",
				fontWeight: "500"
			}
		}
	}
});




export default class TakeNote extends React.Component {
	handleNoteState = () => {
    this.props.noteState();
  };
	render() {
		return (
			<Paper id="noteInactive">
				<MuiThemeProvider theme={theme}>
					<InputBase
						autoComplete="off"
						style={{ marginLeft: "2%", width: "72%", color: "#202124" }}
						id="inputInactive"
						margin="dense"
						placeholder="Take a note..."
						onClick={this.handleNoteState}
					/>
				</MuiThemeProvider>
				<Tooltip title="New List">
					<IconButton>
						<CheckBoxOutlinedIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="New note with Drawing">
					<IconButton>
						<BrushOutlinedIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="New note with Image">
					<IconButton>
						<InsertPhotoOutlinedIcon />
					</IconButton>
				</Tooltip>
			</Paper>
		);
	}
}
