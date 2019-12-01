import React from "react";
import "../sass/NoteCard.sass";
// import "../sass/TakeNote.sass";

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
			color: ""
			// reminder: "",
			// collaborators: ""
    };
      
		// this.handleColor = this.handleColor.bind(this);
  }
  componentDidMount() {
    // console.log(this.props.allNotes[0]);
  }
  componentWillReceiveProps(newProps) {
    console.log("value in newProps",newProps);
  }
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
		this.setState({ color });
	};

	render() {
		return (
			<Card id="card" style={{ backgroundColor: this.state.color }}>
				<CardContent>
					<div id="title">
            <Typography variant="h5" component="h4" style={{width:"80%",overflowWrap:"break-word"}}>
							Titleasdfasdfasdfasdfasdfasdfasdf
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

					<Typography variant="body2" component="p">
						Description.well meaning and kindly.
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
		);
	}
}
