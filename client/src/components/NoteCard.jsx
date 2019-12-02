import React, { Fragment } from "react";
import "../sass/NoteCard.sass";
import NoteDialog from "./NoteDialog";
// import "../sass/TakeNote.sass";
import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import pin from "../assets/pin.svg";
import pined from "../assets/pined.svg";
import ColorPalette from "./ColorPalette";

const cardAction = createMuiTheme({
	overrides: {
		MuiIconButton: {
			sizeSmall: {
				padding: "2%"
			}
		},
		MuiCardActions: {
			root: {
				justifyContent: "space-around"
			}
		}
	}
});

export default class NoteCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			// labelIdList: "",
			// checklist: "",
			isPined: false,
			isArchived: false,
			color: "",
			// reminder: "",
			// collaborators: ""
			dialogOpen: false
		};

		// this.handleColor = this.handleColor.bind(this);
	}

	// static getDerivedStateFromProps(props, state) {
	// 	return {
	// 		title: props.dataFromDisplay.title,
	// 		description: props.dataFromDisplay.description,
	// 		// labelIdList: "",
	// 		// checklist: "",
	// 		isPined: props.dataFromDisplay.isPined,
	// 		isArchived: props.dataFromDisplay.isArchived,
	// 		color: props.dataFromDisplay.color,
	// 		// reminder: "",
	// 		// collaborators: ""
	// 	}
	// }
	componentWillMount() {
		this.setState({
			title: this.props.dataFromDisplay.title,
			description: this.props.dataFromDisplay.description,
			// labelIdList: "",
			// checklist: "",
			isPined: this.props.dataFromDisplay.isPined,
			isArchived: this.props.dataFromDisplay.isArchived,
			color: this.props.dataFromDisplay.color,
			// reminder: "",
			// collaborators: ""
		});
	}

	handleClick = () => {
		this.setState({ dialogOpen: !this.state.dialogOpen });
	};

	handleIsPined = async () => {
		await this.setState({ isPined: !this.state.isPined });
		console.log("isPined:=>", this.state.isPined);
	};

	handleIsArchived = async event => {
		event.preventDefault();
		console.log("isArchived:=>", this.state.isArchived);
		await this.setState({ isArchived: !this.state.isArchived });
	};

	handleColor = color => {
		console.log("color:=>", color);
		this.setState({ color:color });
	};

	render() {
		return (
			<Fragment>
				<Card id="card" style={{ backgroundColor: this.state.color }}>
					<CardContent>
						<div id="title">
							<Typography
								variant="h5"
								component="h4"
								style={{ width: "80%", overflowWrap: "break-word" }}
								onClick={this.handleClick}
							>
								{this.state.title}
							</Typography>
							<div id="npin">
								<IconButton onClick={this.handleIsPined} size="small">
									{this.state.isPined ? (
										<Tooltip title="Unpin note">
											<img src={pined} alt="pined"></img>
										</Tooltip>
									) : (
										<Tooltip title="Pin note">
											<img src={pin} alt="pin"></img>
										</Tooltip>
									)}
								</IconButton>
							</div>
						</div>

						<Typography variant="subtitle2" onClick={this.handleClick}>
							{this.state.description}
						</Typography>
					</CardContent>
					<MuiThemeProvider theme={cardAction}>
						<CardActions id="cardActions">
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
							<ColorPalette selectColor={this.handleColor} />
							<Tooltip title="Archive">
								<IconButton size="small">
									<ArchiveOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>

							<Tooltip title="more">
								<IconButton size="small">
									<MoreVertOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Tooltip>
						</CardActions>
					</MuiThemeProvider>
				</Card>
				{
					this.state.dialogOpen
						?
						<Dialog onClose={this.handleClick} open={this.handleClick}>
							<NoteDialog diaData={this.state}/>
						</Dialog>
						:
						null
				}
				
			</Fragment>
		);
	}
}
