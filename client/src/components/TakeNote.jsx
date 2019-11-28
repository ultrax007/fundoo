import React from "react";
import "../sass/mainArea.sass";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import {
	createMuiTheme,
	MuiThemeProvider,
	Button
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

//icons imported from material ui
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import pin from "../assets/pin.svg";

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
const button = createMuiTheme({
	overrides: {
		MuiButton: {
			root: {
				padding: "0",
				// marginLeft: "40%",
				color: "#757575",
				"&:hover": {
					backgroundColor: "none"
				}
			}
		}
	}
});

export default class TakeNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			noteClicked: false
		};
	}

	handleNoteState = () => {
		this.setState({ noteClicked: !this.state.noteClicked });
	};

	render() {
		return (
			<div id="takeNoteContainer">
				{this.state.noteClicked ? (
					<ClickAwayListener onClickAway={this.handleNoteState}>
						<Paper id="noteActive">
							{/* <MuiThemeProvider> */}
							<div id="titleN">
								<InputBase
									style={{ marginLeft: "2%", width: "89%", color: "#202124" }}
									id="inputInactive"
									margin="dense"
									placeholder="Title"
								/>
								<Tooltip title="pin">
									<IconButton>
										<img src={pin} alt="pin"></img>
									</IconButton>
								</Tooltip>
							</div>

							<InputBase
								style={{ marginLeft: "2%", width: "96%", color: "#202124" }}
								id="inputInactive"
								margin="dense"
								multiline
								placeholder="Take a note..."
							/>
							{/* </MuiThemeProvider> */}
              <div id="iconbar">
                <div>
								<Tooltip title="Remind me">
									<IconButton>
										<AddAlertOutlinedIcon />
									</IconButton>
								</Tooltip>

								<Tooltip title="Collaborator">
									<IconButton>
										<PersonAddOutlinedIcon />
									</IconButton>
								</Tooltip>

								<Tooltip title="Add image">
									<IconButton>
										<InsertPhotoOutlinedIcon />
									</IconButton>
								</Tooltip>

								<Tooltip title="Change color">
									<IconButton>
										<ColorLensOutlinedIcon />
									</IconButton>
								</Tooltip>

								<Tooltip title="Archive">
									<IconButton>
										<ArchiveOutlinedIcon />
									</IconButton>
								</Tooltip>

								<Tooltip title="more">
									<IconButton>
										<MoreVertOutlinedIcon />
									</IconButton>
                  </Tooltip>
                  </div>
								<div id="button">
									<MuiThemeProvider theme={button}>
										<Tooltip title="close">
											<Button varient="secondary">close</Button>
										</Tooltip>
									</MuiThemeProvider>
								</div>
							</div>
						</Paper>
					</ClickAwayListener>
				) : (
					<Paper id="noteInactive">
						<MuiThemeProvider theme={theme}>
							<InputBase
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
				)}
			</div>
		);
	}
}
