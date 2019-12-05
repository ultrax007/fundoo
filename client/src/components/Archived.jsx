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
  
  UNSAFE_componentWillMount() {
		this.getNotesFromDB();
	}

	getNotesFromDB = () => {
		nServe
			.getArchivedNotes()
			.then(response =>  {
				console.log("information in response", response.data.data.data);
				this.setState({ allNotes:response.data.data.data});
				// const usersAvailabe = this.state.users.filter(user => user._id !== this.state.loggedUserId);reverse()
				console.log(this.state.allNotes);
			})
			.catch(err => {
				console.log("error occured while fetching data", err);
			});
	};
	render() {    
		return (
			<div id="container">
				<div id="takeNoteContainer">
					<TakeNote />
        </div>
        <div className="allNotesContainer">
						<DisplayAllNotes noteData={this.state.allNotes} />
				</div>
			</div>
		);
	}
}