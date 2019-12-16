import React, { Fragment } from "react";
import "../sass/TakeNote.sass";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import TakeNoteDefault from "./TakeNoteDefault";
import TakeNoteDialog from "./TakeNoteDialog";

export default class TakeNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			noteClicked: false
		}
	}

	// setNoteState = () => {
	// 	console.log("in setNoteState");
	// 	this.setState({
	// 		noteClicked: true
	// 	});
	// }

	handleNoteState = () => {
		console.log("note state changed");
		this.setState({
			noteClicked: !this.state.noteClicked,
		});
	};

	handleTakeNoteClose = () => {
		this.props.operation();
	}
	render() {
		return (
			<Fragment>
				{this.state.noteClicked ? (
					<ClickAwayListener onClickAway={this.handleNoteState}>
						<TakeNoteDialog noteState={this.handleNoteState} takeNoteClose={this.handleTakeNoteClose}/>
					</ClickAwayListener>
				) : (
						<TakeNoteDefault noteState={this.handleNoteState}/>
				)}
		</Fragment>
		);
	}
}
