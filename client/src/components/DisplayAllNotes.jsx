import React, { Fragment } from "react";
import noteServices from "../services/noteServices";
import NoteCard from "./NoteCard";
const nServe = new noteServices();

export default class DisplayAllNotes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allNotes: []
		};
	}

  componentDidMount() {
		this.getAllNotes();
	}

	getAllNotes = () => {
		nServe
			.getAllNotes()
			.then(response => {
				console.log("information in response", response.data.data.data);
				this.setState({ allNotes: response.data.data.data.reverse() });
				console.log(this.state.allNotes);
			})
			.catch(err => {
				console.log("error occured while fetching data", err);
			});
	};
	render() {
		return (
			<Fragment>
				{this.state.allNotes.map((data,index) => (
					<NoteCard key={index} dataFromDisplay={data} />
        ))}
			</Fragment>
		);
	}
}
