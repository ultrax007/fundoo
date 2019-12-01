import React, { Fragment } from 'react';
import userServices from "../services/userServices";
import NoteCard from './NoteCard';
const userve = new userServices();

export default class DisplayAllNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotes:[]
    }
  }

  componentDidMount() {
    this.getAllNotes();
  }

  getAllNotes = () => {
    userve.getAllNotes().then(response => {
      console.log("information in response", response.data.data.data);
      this.setState({ allNotes: response.data.data.data })
      console.log(this.state.allNotes);
    }).catch(err => {
      console.log("error occured while fetching data",err);
      })
  }
  render() {
    return (
      <Fragment>
        <NoteCard dataFromDisplay={this.state.allNotes[0]}/>
      </Fragment>
    );
  }
};
