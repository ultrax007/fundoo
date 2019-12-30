import React from "react";
import "../sass/playground.sass";
import { connect } from "react-redux";
import Masonry from "react-masonry-css";
import NoteCard from "./NoteCard";
import Typography from "@material-ui/core/Typography";
import sad from "../assets/sad.svg";
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
  handleQnA = id => {
    console.log("value in id in qna notes", id);
    this.props.history.push("/dashboard/AskQuestion/" + id);
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
    let noteArray = this.state.allNotes;
    return (
      <>
        {this.props.searchedText.length > 0 ? (
          <div id={myStyle}>
            <div id="takeNoteContainer">{/* <TakeNote /> */}</div>
            <div className={CStyle}>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
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
                      qna={this.handleQnA}
                    />
                  ))}
              </Masonry>
            </div>
          </div>
        ) : (
          <div id="sad">
            <img src={sad} alt="sad" width="150px"></img>
            <Typography
              variant="h3"
              component="h3"
              style={{ color: "#e5e5e5", padding: "25px 0" }}
            >
              Sorry nothing to display
            </Typography>
            <Typography
              variant="h4"
              component="h4"
              style={{ color: "#c3c3c3", padding: "25px 0" }}
            >
              type something to search...
            </Typography>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    drawerStatus: state.drawerData,
    viewStatus: state.viewData,
    searchedText: state.typedData
  };
};

export default connect(mapStateToProps)(Search);
