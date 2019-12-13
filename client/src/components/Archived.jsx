import React from "react";
import "../sass/playground.sass"
import { connect } from "react-redux";
import NoteCard from "./NoteCard";
import noteServices from "../services/noteServices";
const nServe = new noteServices();

class Archived extends React.Component {
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
				console.log("value of allnotes in archived",this.state.allNotes);
			})
			.catch(err => {
				console.log("error occured while fetching data", err);
			});
	};
	
	render() {    
			const myStyle = this.props.drawerStatus ? "containerSM" : "container";
			const CStyle = this.props.drawerStatus ? "allNotesContainerSM" : "allNotesContainer";
	
			return (
				<div id={myStyle}>
					<div id="takeNoteContainer">
						{/* <TakeNote /> */}
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
export default connect(mapStateToProps)(Archived)