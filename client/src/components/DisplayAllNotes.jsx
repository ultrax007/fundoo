import React, { Fragment } from "react";
import NoteCard from "./NoteCard";
var noteArray;
export default class DisplayAllNotes extends React.Component {


	handleNoteArray = async (index) => {
		await this.props.updateOperation(index);
	};

	shouldComponentUpdate() {
    return true;
	}
	UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
		console.log("in  display all notes"+nextProps);
		
	}
	
	render() {
		noteArray = this.props.noteData;
		console.log("value of props", this.props.noteData);
		console.log('render works in display component',noteArray);

		// console.log("value in render", this.state.noteArray);
		return (
			<Fragment>
				{noteArray.map((data, index) => (
					<NoteCard
						key={index}
						dataFromDisplay={data}
						operation={()=>this.handleNoteArray(index)}
					/>
				))}
			</Fragment>
		);
	}
}
