import React from "react";
import "../sass/playground.sass"
import TakeNote from "./TakeNote";
import DisplayAllNotes from "./DisplayAllNotes";
import noteServices from "../services/noteServices";
const nServe = new noteServices();
export default class Notes extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			allNotes: []
		};
	}
	
	shouldComponentUpdate() {
    return true;
  }
  
  componentDidMount() {
		this.getNotesFromDB();
	}

	// static getDerivedStateFromProps() {
	// 	this.getNotesFromDB();
  // }
	getNotesFromDB = () => {
		nServe
			.getAllNotes()
			.then(response =>  {
				var noteArray = response.data.data.data;
				// console.log("information in response", noteArray);
				this.setState({ allNotes: noteArray.filter(noteArray => noteArray.isArchived!==true && noteArray.isDeleted!==true) });
				// const usersAvailabe = this.state.users.filter(user => user._id !== this.state.loggedUserId);reverse()
				console.log("allnotes in note.jsx",this.state.allNotes);
			})
			.catch(err => {
				console.log("error occured while fetching data", err);
			});
	};

	handleDataUpdate = async (index) => {
		var noteArr = this.state.allNotes;

		console.log('in note ',index,'        ',noteArr);
		
		var note = await noteArr.splice(index, 1);
		await this.setState({ allNotes: noteArr });
		console.log("values in noteArr", noteArr);
		console.log("value in note state",this.state.allNotes);
		
		console.log("value of note removed", note);
	}

	render() {
		console.log('render works in notes component'+ JSON.stringify(this.state.allNotes));
		
		return (
			<div id="container">
				<div id="takeNoteContainer">
					<TakeNote />
        </div>
				<div className="allNotesContainer">
					<div></div>
					<DisplayAllNotes noteData={this.state.allNotes} updateOperation={this.handleDataUpdate}/>
				</div>
			</div>
		);
	}
}
