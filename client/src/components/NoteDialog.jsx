import React from "react";
import "../sass/NoteDialog.sass";

import { createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// import Popover from "@material-ui/core/Popover";

//icons imported from material ui
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";

import pin from "../assets/pin.svg";
import pined from "../assets/pined.svg";
import ColorPalette from "./ColorPalette";
import ArchiveIcon from "./ArchiveIcon";



export default class TakeNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id:"",
			title: "",
			description: "",
			// labelIdList: "",
			// checklist: "",
			isPined: false,
			isArchived: false,
			color: ""
			// reminder: "",
			// collaborators: ""
		};
		this.handleColor = this.handleColor.bind(this);
	}
	// static getDerivedStateFromProps(props, state) {
	// 	return {
	// 		title: "",
	// 		description: "",
	// 		// labelIdList: "",
	// 		// checklist: "",
	// 		isPined: false,
	// 		isArchived: false,
	// 		color: ""
	// 		// reminder: "",
	// 		// collaborators: ""
	// 	};
	// }
	componentWillMount() {
		this.setState({
			id:this.props.diaData.id,
			title: this.props.diaData.title,
			description: this.props.diaData.description,
			// labelIdList: "",
			// checklist: "",
			// isPined: this.props.diaData.isPined,
			isArchived: this.props.diaData.isArchived,
			color: this.props.diaData.color,
			// reminder: "",
			// collaborators: ""
		});
	}

	handleNoteState = () => {
		this.props.handleDialog();
	};

	

	
	// handleLabelIdList = event => {
	// 	event.preventDefault();
	// 	console.log("labelIdList;=>", event.currentTarget.value);
	// 	this.setState({ labelIdList: event.currentTarget.value });
	// };
	// handleChecklist = event => {
	// 	event.preventDefault();
	// 	console.log("checklist:=>", event.currentTarget.value);
	// 	this.setState({ checklist: event.currentTarget.value });
	// };
	// handleIsPined = async () => {
	// 	await this.setState({ isPined: !this.state.isPined });
	// 	console.log("isPined:=>", this.state.isPined);
	// };
	

	render() {
		return (
			<Paper id="noteDialog" style={{ backgroundColor: this.state.color }}>
				<div id="titleN">
					<InputBase
						style={{ marginLeft: "2%", width: "89%", color: "#202124" }}
						id="inputInactive"
						margin="dense"
						placeholder="Title"
						value={this.state.title}
						onChange={event => this.handleTitle(event)}
					/>
					<div id="pin">
						<Tooltip title="pin">
							<IconButton onClick={this.handleIsPined}>
								{this.state.isPined ? (
									<img src={pined} alt="pined"></img>
								) : (
									<img src={pin} alt="pin"></img>
								)}
							</IconButton>
						</Tooltip>
					</div>
				</div>

				<InputBase
					style={{
						marginLeft: "2%",
						width: "96%",
						color: "#202124",
						fontSize: "12px",
						fontWeight: "500"
					}}
					id="inputInactive"
					margin="dense"
					multiline
					placeholder="Take a note..."
					value={this.state.description}
					onChange={event => this.handleDescription(event)}
				/>
				<div id="functions">
					<div id="iconBar">
						<MuiThemeProvider theme={iconmod}>
							<Tooltip title="Remind me">
								<IconButton size="small">
									<AddAlertOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>

							<Tooltip title="Collaborator">
								<IconButton size="small">
									<PersonAddOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>

							<Tooltip title="Add image">
								<IconButton size="small">
									<InsertPhotoOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>
							<ColorPalette selectColor={this.handleColor} dataOfNote={this.state}/>
							<ArchiveIcon archiveAction={this.handleIsArchived} archiveState={this.state}/>

							<Tooltip title="more">
								<IconButton size="small">
									<MoreVertOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>
						</MuiThemeProvider>
					</div>
					<div id="button">
						<MuiThemeProvider theme={button}>
							<Tooltip title="close">
								<Button varient="secondary" onClick={this.handleUpdateNote}>
									close
								</Button>
							</Tooltip>
						</MuiThemeProvider>
					</div>
				</div>
			</Paper>
		);
	}
}
