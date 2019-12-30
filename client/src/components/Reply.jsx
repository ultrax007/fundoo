import React, { Component, Fragment } from "react";
import "../sass/playground.sass";
import FroalaEditorComponent from "react-froala-wysiwyg";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import noteServices from "../services/noteServices";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import ReplyIcon from "@material-ui/icons/Reply";
// const nServe = new noteServices();

const styled = {
  listItem: {
    paddingTop: "0px",
    paddingBottom: "0px"
  },
  listItemButton: {
    justifyContent: "flex-end"
  },
  froala: {
    padding: "0 25px",
    justifyConten: "stretch"
  },
  button: {
    backgroundColor: "#1DE9B6",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#FF9100"
    }
  },
  Rbutton: {
    fontSize: "12px"
  },
  avatar: {
    width: "25px",
    height: "25px",
    border: "2px solid #ccc"
  }
};
class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyQ: "",
      reply: false,
      viewReply: false,
      viewStatus: false
    };
  }
  handleChange = replyQ => {
    console.log("value in replyQ", replyQ);
    this.setState({
      replyQ: replyQ
    });
  };
  getDate = utc => {
    var nDate = new Date(utc).toString().slice(0, 21);
    console.log("now date is", nDate);
    return nDate;
  };
  handleReply = event => {
    event.preventDefault();
    this.setState({ reply: !this.state.reply });
  };
  handleViewReply = event => {
    event.preventDefault();
    this.setState({ viewStatus: !this.state.viewStatus });
    this.props.showReplies();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <ListItem classes={{ root: classes.listItem }}>
          <ListItemAvatar style={{ minWidth: "40px" }}>
            <Avatar
              classes={{ root: classes.avatar }}
              alt={localStorage.getItem("name").charAt(0)}
              src={this.props.profile}
            />
          </ListItemAvatar>
          <ListItemText>
            <div id="textReply">
              <b>{localStorage.getItem("name")}</b>
              {"  "}
              {this.getDate(this.props.data.createdDate)}
            </div>
          </ListItemText>
          {this.props.replyButton && (
            <ListItemSecondaryAction>
              <Button
                classes={{ sizeSmall: classes.Rbutton }}
                size="small"
                onClick={event => this.handleViewReply(event)}
              >
                {this.state.viewStatus ? "hide reply" : "view reply"}
              </Button>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <ListItem classes={{ root: classes.listItem }}>
          <h3
            style={{
              margin: "0px 0px 0px 8px"
            }}
          >
            >
          </h3>
          <div
            id="answered"
            dangerouslySetInnerHTML={{
              __html: this.props.data.message
            }}
          ></div>
          {this.props.replyButton && (
            <ListItemIcon
              size="small"
              style={{ marginLeft: "40px" }}
              onClick={event => this.handleReply(event)}
            >
              <ReplyIcon style={{ color: "#757575" }} />
            </ListItemIcon>
          )}
        </ListItem>

        {this.state.reply && (
          <Fragment>
            <ListItem>
              <div id="froala">
                <FroalaEditorComponent
                  tag="textarea"
                  config={this.config}
                  model={this.state.replyQ}
                  onModelChange={this.handleChange}
                />
              </div>
            </ListItem>
            <ListItem classes={{ root: classes.listItemButton }}>
              <Button
                size="small"
                classes={{ root: classes.button }}
                onClick={event => {
                  this.handleSubmitReply(event);
                }}
              >
                Submit
              </Button>
            </ListItem>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styled)(Reply);
