import React from 'react';

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
      
  }
};
