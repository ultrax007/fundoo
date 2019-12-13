import React from "react";
import "../sass/playground.sass";
import { connect } from "react-redux";
import NoteCard from "./NoteCard";
import noteServices from "../services/noteServices";
const nServe = new noteServices();

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allNotes: []
		};
	}

	componentDidMount() {
		this.getNotesFromDB();
	}

	getNotesFromDB = () => {
		nServe
			.getAllNotes()
			.then(response => {
				var noteArray = response.data.data.data;
				this.setState({
					allNotes: noteArray
				});
				console.log("allnotes in note.jsx", this.state.allNotes);
			})
			.catch(err => {
				console.log("error occured while fetching data", err);
			});
	};

	render() {
		console.log("render works in notes component", this.props.drawerStatus);
		const myStyle = this.props.drawerStatus ? "containerSM" : "container";
		const CStyle = this.props.drawerStatus
			? "allNotesContainerSM"
			: "allNotesContainer";
		let noteArray = this.state.allNotes;
		return (
			<>
				{this.props.searchedText.length > 0 ? (
					<div id={myStyle}>
						<div id="takeNoteContainer">{/* <TakeNote /> */}</div>
						<div className={CStyle}>
							{noteArray
								.filter(
									noteArray =>
										noteArray.title.includes(this.props.searchedText) ||
										noteArray.description.includes(this.props.searchedText)
								)
								.map(data => (
									<NoteCard
										key={data.id}
										dataFromDisplay={data}
										operation={this.getNotesFromDB}
									/>
								))}
						</div>
					</div>
				) : null}
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		drawerStatus: state.drawerData,
		searchedText: state.typedData
	};
};

export default connect(mapStateToProps)(Search);
