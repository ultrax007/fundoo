import React, { Fragment } from "react";
import "../sass/playground.sass";
import TakeNote from "./TakeNote";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Masonry from "react-masonry-css";
import NoteCard from "./NoteCard";
import sad from "../assets/sad.svg";
import noteServices from "../services/noteServices";
const nServe = new noteServices();

class Reminders extends React.Component {
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
      .getReminderNotes()
      .then(async response => {
        console.log("information in response", response.data.data.data);
        await this.setState({ allNotes: response.data.data.data.reverse() });
        console.log("value of allnotes in archived", this.state.allNotes);
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

    return (
      <Fragment>
        {this.state.allNotes.length > 0 ? (
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
              Sorry nothing to display...
            </Typography>
          </div>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { drawerStatus: state.drawerData, viewStatus: state.viewData };
};
export default connect(mapStateToProps)(Reminders);
