import React, { Fragment } from "react";
import "../sass/playground.sass";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import sad from "../assets/sad.svg";
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
		let data = { labelName: this.state.labelName };
		nServe.getNotesFromLabelName(data).then(response => {
			console.log("data in response", response.data.data.data);
			this.setState({
				labels: response.data.data.data
			});
		});
	};

	componentDidMount() {
		this.setState(
			{
				labelName: this.props.match.params.username
			},
			() => {
				console.log(
					"value of labelName in component did update",
					this.state.labelName
				);
				this.getAllLabelsFromDb();
			}
		);
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.setState(
				{
					labelName: this.props.match.params.username
				},
				() => {
					console.log(
						"value of labelName in component did update",
						this.state.labelName
					);
					this.getAllLabelsFromDb();
				}
			);
		}
	}
	render() {
		const myStyle = this.props.drawerStatus ? "containerSM" : "container";
		const CStyle = this.props.drawerStatus
			? "allNotesContainerSM"
			: "allNotesContainer";
		let noteArray = this.state.labels;
		return (
			<Fragment>{noteArray.length>0?
				<div id={myStyle}>
					<div id="takeNoteContainer">{/* <TakeNote /> */}</div>
					<div className={CStyle}>
						{noteArray.map(data => (
							<NoteCard
								key={data.id}
								dataFromDisplay={data}
								operation={this.getAllLabelsFromDb}
							/>
						))}
					</div>
				</div>:<div id="sad">
						<img src={sad} alt="sad" width="150px"></img>
						<Typography
							variant="h3"
							component="h3"
							style={{ color: "#e5e5e5", padding: "25px 0" }}
						>
							Sorry nothing to display...
						</Typography>
					</div>}
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		drawerStatus: state.drawerData
	};
};

export default connect(mapStateToProps)(Labels);
