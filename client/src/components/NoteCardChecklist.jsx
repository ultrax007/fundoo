import React, { Fragment } from "react";
import Checkbox from "@material-ui/core/Checkbox";
// import "../sass/TakeNote.sass";
import update from "immutability-helper";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
// import ListItemText from "@material-ui/core/ListItemText";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const lined = {
	width: "90%",
	fontSize: "12px",
	padding: "7px 0 7px",
	textDecoration: "line-through"
};

const nlist = createMuiTheme({
	overrides: {
		MuiListItem: {
			dense: {
				paddingTop: "0",
				paddingBottom: "0"
			},
			gutters: {
				paddingLeft: "0px"
			}
		},
		MuiInputBase: {
			input: {
				padding: "7px 0 7px"
			}
		},
		MuiIconButton: {
			root: {
				"&:hover": {
					backgroundColor: "#fff0"
				}
			}
		}
	}
});

export default class NoteCardChecklist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			noteCheckLists: [],
			statusOpen: [],
			statusClose: [],
			dummy: "",
			original: "",
			showList: false
		};
	}

	componentDidMount() {
		this.setState(
			{
				...this.props.listState
			},
			() => {
				var notecl = this.state.noteCheckLists;
				this.setState({
					statusOpen: notecl.filter(
						notecl => notecl.status === "open" && notecl.isDeleted !== true
					),
					statusClose: notecl.filter(
						notecl => notecl.status === "close" && notecl.isDeleted !== true
					)
				});
			}
		);
	}

	handleText = async (event, index) => {
		console.log("value of index", index, event.currentTarget.value);

		await this.setState({
			noteCheckLists: update(this.state.noteCheckLists, {
				[index]: { itemName: { $set: event.currentTarget.value } }
			})
		});
	};

	handleCheckOpen = async (event, index) => {
		event.preventDefault();
		console.log("value of index", index);
		console.log(
			"before operation",
			this.state.statusOpen,
			this.state.statusClose
		);
		console.log("value in handle check open", this.state.statusOpen[index].id);
		await this.props.onChecked(this.state.statusOpen[index].id);
		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				[index]: {
					status: {
						$set: "close"
					}
				}
			})
		});
		await this.setState({
			statusClose: update(this.state.statusClose, {
				$unshift: [this.state.statusOpen[index]]
			})
		});
		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				$splice: [[index, 1]]
			})
		});

		console.log("checked open", this.state.statusOpen);
		console.log("checked close", this.state.statusClose);
	};

	handleCheckClose = async (event, index) => {
		event.preventDefault();
		console.log("value at index", this.state.statusClose[index]);
		console.log(
			"before operation",
			this.state.statusOpen,
			this.state.statusClose
		);
		await this.props.onChecked(this.state.statusClose[index].id);
		await this.setState({
			statusClose: update(this.state.statusClose, {
				[index]: {
					status: {
						$set: "open"
					}
				}
			})
		});
		await this.setState({
			statusOpen: update(this.state.statusOpen, {
				$unshift: [this.state.statusClose[index]]
			})
		});
		await this.setState({
			statusClose: update(this.state.statusClose, {
				$splice: [[index, 1]]
			})
		});

		console.log("checked open", this.state.statusOpen);
		console.log("checked close", this.state.statusClose);
	};

	render() {
		// console.log("in checklist");
		// console.log("value in statusopen", this.state.statusOpen);
		// console.log("value in statusclose", this.state.statusClose);
		var listStyle = {
			width: "16px",
			height: "16px",
			paddingRight: "10px",
			minWidth: "0px",
			"&:hover": {
				backgroundColor: "none"
			}
		};

		return (
			<Fragment>
				<MuiThemeProvider theme={nlist}>
					<List style={{paddingTop:"0px",paddingBottom:"0px"}}>
						{/***************************************open status will appear here************************************************* */}
						{this.state.statusOpen
							? this.state.statusOpen.map((data, index) => (
									<div key={index}>
										<ListItem dense>
											<ListItemIcon
												id="List"
												style={listStyle}
												size="small"
												onClick={event => this.handleCheckOpen(event, index)}
											>
												<Checkbox
													edge="start"
													size="small"
													icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
													checkedIcon={
														<CheckBoxOutlinedIcon fontSize="small" />
													}
													disableRipple={true}
													color="default"
													fontSize="small"
													// onCheck={event=>this.handleCheck(event,index)}
													checked={false}
												/>
											</ListItemIcon>
											<ListItemText primary={data.itemName} />
										</ListItem>
									</div>
							  ))
							: null}
						{/************************************** closed ones will appear****************************************************************************** */}
						{this.state.statusOpen.length > 0 &&
						this.state.statusClose.length > 0 ? (
							<Divider />
						) : null}
						{this.state.statusClose
							? this.state.statusClose.map((data, index) => (
									<div key={index}>
										{/* <MuiThemeProvider theme={list}> */}
										<ListItem dense>
											<ListItemIcon
												id="List"
												style={listStyle}
												size="small"
												onClick={event => this.handleCheckClose(event, index)}
											>
												<Checkbox
													edge="start"
													size="small"
													icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
													checkedIcon={
														<CheckBoxOutlinedIcon fontSize="small" />
													}
													disableRipple={true}
													color="default"
													fontSize="inherit"
													// onCheck={event=>this.handleCheck(event,index)}
													checked={true}
												/>
											</ListItemIcon>

											<ListItemText style={lined} primary={data.itemName} />
											
										</ListItem>
										{/* </MuiThemeProvider> */}
									</div>
							  ))
							: null}
					</List>
				</MuiThemeProvider>
			</Fragment>
		);
	}
}
