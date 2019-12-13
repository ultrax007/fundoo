import React from "react";
import "../sass/playground.sass";
import { connect } from "react-redux";
import NoteCard from "./NoteCard";
import noteServices from "../services/noteServices";
const nServe = new noteServices();

class Labels extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			labelName: "",
			labels: []
		};
	}

  getAllLabelsFromDb = () => {
    console.log("value of label name in api call", this.state.labelName);
    let data = { labelName:this.state.labelName };
		nServe.getNotesFromLabelName(data).then(response => {
			console.log("data in response", response);
			// this.setState(state)
		});
	};

	componentDidMount() {
		this.setState(
			{
				labelName: this.props.match.params.username
			},
			() => {
        console.log("value of labelName", this.state.labelName);
        this.getAllLabelsFromDb();
			}
		);
		
	}
	render() {
		const myStyle = this.props.drawerStatus ? "containerSM" : "container";
		const CStyle = this.props.drawerStatus
			? "allNotesContainerSM"
			: "allNotesContainer";
		let noteArray = this.state.labels;
		return (
			<div id={myStyle}>
				<div id="takeNoteContainer">{/* <TakeNote /> */}</div>
				{/* <div className={CStyle}>
							{noteArray.map(data => (
								<NoteCard
									key={data.id}
									dataFromDisplay={data}
									operation={this.getAllLabelsFromDb}
								/>
							))}
						</div> */}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		drawerStatus: state.drawerData
	};
};

export default connect(mapStateToProps)(Labels);
