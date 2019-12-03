import React, { Fragment } from "react";
import NoteCard from "./NoteCard";

export default class DisplayAllNotes extends React.Component {
	render() {
		var noteArray=this.props.noteData;
		console.log("value of props", this.props.noteData);
		// console.log("value in render", this.state.noteArray);
		return (
			<Fragment>
				{noteArray.map((data,index) => (
					<NoteCard key={index} dataFromDisplay={data} />
        ))}
			</Fragment>
		);
	}
}
