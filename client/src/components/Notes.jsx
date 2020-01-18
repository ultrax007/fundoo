import React from "react";
import "../sass/playground.sass";
import { connect } from "react-redux";
import TakeNote from "./TakeNote";
import NoteCard from "./NoteCard";
import Masonry from "react-masonry-css";
import update from "immutability-helper";
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

	handleQnA = (id) => {
		console.log("value in id in qna notes", id);
		this.props.history.push("/dashboard/AskQuestion/" + id);
	}

	handleOperation = async id => {
		console.log("note has value", id);
		let index;
		for (let i = 0; i < this.state.allNotes.length; i++) {
			console.log("allnotes of i", this.state.allNotes[i].id, id);

			if (this.state.allNotes[i].id === id) {
				index = await i;
				console.log("found id at post", i);
				this.setState({
					allNotes: update(this.state.allNotes, {
						$splice: [[index, 1]]
					})
				});
				break;
			}
		}
		console.log("value of index after operation is ", index);
	};

	render() {
		const breakpointColumnsObj = {
			default: this.props.viewStatus ? 1 : 3,
			4440: this.props.viewStatus ? 1 : 4,
			1500: this.props.viewStatus ? 1 : 3,
			1100: this.props.viewStatus ? 1 : this.props.drawerStatus ? 2 : 3,
			900: this.props.viewStatus ? 1 : this.props.drawerStatus ? 1 : 2,
			675: 1
		};
		const myStyle = this.props.drawerStatus ? "containerSM" : "container";
		const CStyle = this.props.drawerStatus
			? this.props.viewStatus
				? "listAllNotesContainerSM"
				: "allNotesContainerSM"
			: this.props.viewStatus
			? "listAllNotesContainer"
			: "allNotesContainer";

		return (
			<div id={myStyle}>
				<div id="takeNoteContainer">
					<TakeNote operation={this.getNotesFromDB} />
				</div>
				<div className={CStyle}>
					<Masonry
						breakpointCols={breakpointColumnsObj}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
					>
						{this.state.allNotes.map(data => (
							<NoteCard
								key={data.id}
								dataFromDisplay={data}
								operation={this.handleOperation}
								qna={this.handleQnA}
							/>
						))}
					</Masonry>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		drawerStatus: state.drawerData,
		viewStatus: state.viewData
	};
};
export default connect(mapStateToProps)(Notes);
