import React, { Fragment } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "../sass/TakeNote.sass";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
// import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
const list = createMuiTheme({
  overrides: {
    MuiListItem: {
      dense: {
        paddingTop: "0",
        paddingBottom: "0"
      }
    },
    MuiInputBase: {
      input: {
        padding: "7px 0 7px"
      }
    }
  }
});

// import Checkbox from '@material-ui/core/Checkbox';
export default class Checklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      // labelIdList: "",
      noteCheckLists: [
        {
          itemName: "ghghgdhf",
          status: "open",
          isDeleted: false,
          id: "5dea229e451e82001986864c",
          notesId: "5de8ecd7451e82001986861f"
        },
        {
          itemName: "ghghgdhf",
          status: "close",
          isDeleted: false,
          id: "5dea229e451e82001986864c",
          notesId: "5de8ecd7451e82001986861f"
        }
      ],
      isPined: false,
      isArchived: false,
      isDeleted: false,
      color: "",
      // reminder: "",
      // collaborators: ""
      showList: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      ...props.listState
    };
  }
  handleToggle = () => {
    this.setState({ showList: !this.state.showList });
  };
  handleText = (event, index) => {
    this.setState(state => {
      const noteCheckLists = state.noteCheckLists.map(data => {
        data[index].itemName = event.currentTarget.value;
      });
      return {
        noteCheckLists
      };
    });
  };
  render() {
    console.log("value in checklist state", this.state);
    var listStyle = {
      width: "16px",
      height: "16px",
      default: {
        minWidth: "fit-content",
        marginRight: "5px"
      }
    };
    return (
      <Fragment>
        <List>
          {this.state.noteCheckLists
            ? this.state.noteCheckLists.map((data, index) => (
                <div key={index}>
                  <Divider />
                  <MuiThemeProvider theme={list}>
                    <ListItem dense>
                      <ListItemIcon id="List" style={listStyle}>
                        <Checkbox
                          edge="start"
                          disableRipple={true}
                          color="default"
                          checked={data.status === "open" ? true : false}
                        />
                      </ListItemIcon>

                      <InputBase
                        style={{
                          width: "90%",
                          fontSize: "12px",
                          padding: "7px 0 7px"
                        }}
                        margin="dense"
                        multiline
                        placeholder="List item"
                        value={data.itemName}
                        onChange={event => this.handleText(event, index)}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                          <CheckSharpIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </MuiThemeProvider>
                </div>
              ))
            : null}
          {this.state.showList ? (
            <MuiThemeProvider theme={list}>
              <Divider />
              <ListItem dense onClick={this.handleToggle}>
                <ListItemIcon
                  style={{ minWidth: "fit-content", marginRight: "5px" }}
                >
                  <AddSharpIcon fontSize="inherit" />
                  {/* <Checkbox edge="start" disableRipple color="default" /> */}
                </ListItemIcon>
                <InputBase
                  style={{
                    width: "90%",
                    fontSize: "12px",
                    padding: "7px 0 7px"
                  }}
                  margin="dense"
                  multiline
                  placeholder="List item"
                  // value={this.state.description}
                  // onChange={event => this.handleDescription(event)}
                />
              </ListItem>
            </MuiThemeProvider>
          ) : (
            <MuiThemeProvider theme={list}>
              <Divider />
              <ListItem dense onClick={this.handleToggle}>
                <ListItemIcon
                  style={{ minWidth: "fit-content", marginRight: "5px" }}
                >
                  <AddSharpIcon fontSize="inherit" />
                  {/* <Checkbox edge="start" disableRipple color="default" /> */}
                </ListItemIcon>
                <InputBase
                  style={{
                    width: "90%",
                    fontSize: "12px",
                    padding: "7px 0 7px"
                  }}
                  margin="dense"
                  multiline
                  placeholder="List item"
                  // value={this.state.description}
                  // onChange={event => this.handleDescription(event)}
                />
              </ListItem>
            </MuiThemeProvider>
          )}

          <Divider />
        </List>
      </Fragment>
    );
  }
}
