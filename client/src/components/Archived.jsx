import React from "react";
import "../sass/playground.sass";
import { connect } from "react-redux";
import Masonry from "react-masonry-css";
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
			.then(response => {
				console.log("information in response", response.data.data.data);
				this.setState({ allNotes: response.data.data.data });
				console.log("value of allnotes in archived", this.state.allNotes);
			})
			.catch(err => {
				console.log("error occured while fetching data", err);
			});
	};

	render() {
		const breakpointColumnsObj = {
			default: this.props.viewStatus ? 1 : 3,
			4440: this.props.viewStatus ? 1 : 4,
			1500: this.props.viewStatus ? 1 : 3,
			1100: this.props.viewStatus ? 1 : 2,
			900: 1,
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
				<div id="takeNoteContainer">{/* <TakeNote /> */}</div>
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
								operation={this.getNotesFromDB}
							/>
						))}
					</Masonry>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return { drawerStatus: state.drawerData, viewStatus: state.viewData };
};
export default connect(mapStateToProps)(Archived);
