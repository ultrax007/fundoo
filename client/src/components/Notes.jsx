import React from "react";
import "../sass/playground.sass";
import { connect } from "react-redux";
import TakeNote from "./TakeNote";
import NoteCard from "./NoteCard";
import noteServices from "../services/noteServices";
const nServe = new noteServices();
class Notes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allNotes: []
		};
	}

	UNSAFE_componentWillMount() {
		// console.log("value props of note.jsx",this.props);
		this.getNotesFromDB();
	}

	getNotesFromDB = () => {
		nServe
			.getAllNotes()
			.then(response => {
				var noteArray = response.data.data.data;
				this.setState({
					allNotes: noteArray
						.filter(
							noteArray =>
								noteArray.isArchived !== true && noteArray.isDeleted !== true
						)
						.reverse()
				});
				console.log("allnotes in note.jsx", this.state.allNotes);
			})
			.catch(err => {
				console.log("error occured while fetching data", err);
			});
	};

	render() {
		console.log("render works in notes component",this.props.drawerStatus);
		const myStyle = this.props.drawerStatus ? "containerSM" : "container";
		const CStyle = this.props.drawerStatus ? "allNotesContainerSM" : "allNotesContainer";

		return (
			<div id={myStyle}>
				<div id="takeNoteContainer">
					<TakeNote />
				</div>
				<div className={CStyle}>
					{this.state.allNotes.map((data) => (
						<NoteCard
							key={data.id}
							dataFromDisplay={data}
							operation={this.getNotesFromDB}
						/>
					))}
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
  return { drawerStatus: state.drawerData };
};
export default connect(mapStateToProps)(Notes)
