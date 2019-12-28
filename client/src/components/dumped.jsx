import React, { Component } from "react";
import { Paper, Button, Divider } from "@material-ui/core";
import "./QuestionAnswer.css";
import FroalaEditor from "react-froala-wysiwyg";
import {
  getNoteDetails,
  AddQuesion,
  ReplyQuesion
} from "../UserServices/noteService";
import TextField from "@material-ui/core/TextField";
import PersonOutlineTwoToneIcon from "@material-ui/icons/PersonOutlineTwoTone";
import { IconButton } from "@material-ui/core";
import ReplyIcon from "@material-ui/icons/Reply";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
class QuestionAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      question: "",
      answer: [],
      message: "",
      reply: true,
      replyButton: true,
      replyButtonMain: true,
      questionArrays: [],
      answerArr: [],
      answerArray: "",
      FroalaEditor: true,
      idArrays: [],
      replyButton2: true
    };
  }
  handleReplyButtonMain = async () => {
    await this.setState(
      { replyButtonMain: !this.state.replyButtonMain },
      () => {
        console.log("In reply Main button");
      }
    );
  };

  handleReplyButton = async () => {
    await this.setState({ replyButton: !this.state.replyButton, message: " " });
    console.log("In reply button");
  };
  handleReplyButton2 = async () => {
    await this.setState({
      replyButton2: !this.state.replyButton2,
      message: " "
    });
    console.log("In reply button 2");
  };

  componentDidMount() {
    let id = this.props.match.params;
    getNoteDetails(id)
      .then(async response => {
        console.log("question Note DATA==>", response.data.data.data[0]);
        // console.log(
        //   "questions message",
        //   response.data.data.data[0].questionAndAnswerNotes[0].message
        // );
        await this.setState({
          title: response.data.data.data[0].title,
          description: response.data.data.data[0].description,
          answer: response.data.data.data[0].questionAndAnswerNotes
        });
        await this.setState({
          questionArrays: this.state.answer[0].message
        });
        console.log("question array in getdetails", this.state.questionArrays);
        // await this.setState({
        //   questionArrays:
        //     response.data.data.data[0].questionAndAnswerNotes[0].message
        // });
        await this.setState({
          answerArr:
            response.data.data.data[0].questionAndAnswerNotes[0].message
        });
        await this.setState({
          idArrays: response.data.data.data[0].questionAndAnswerNotes[0].id
        });

        var arr = [];
        arr = this.state.answer.slice(1, this.state.answer.length);
        // console.log("Spliced array", arr);
        this.setState({ answer: arr });
        var array = this.state.answer.filter(res => res.isApproved === true);

        // console.log("Array of question and answer", this.state.answer);
        this.setState({ answer: array });

        console.log("question and answer", this.state.answer);

        // await this.setState({
        //   answerArray:
        //     response.data.data.data[0].questionAndAnswerNotes[0].message
        // });
      })
      .catch(err => {
        console.log("question note ERROR==>", err);
      });
  }
  handleModelChange = event => {
    this.setState({ message: event });
    console.log("Message is", this.state.message);
  };

  handleSubmitAnswer = () => {
    console.log("message", this.state.message);
    this.setState({
      message: this.state.message,
      FroalaEditor: !this.state.FroalaEditor
    });
    var data = {
      message: this.state.message,
      notesId: this.props.match.params.id
    };
    AddQuesion(data)
      .then(async response => {
        await this.setState({
          que: response.data.data.details,
          message: this.state.message
        });
        console.log("response in add question ", response);
      })
      .catch(error => {
        console.log("error in add question ", error);
      });
  };

  handleReplyAnswer = id => {
    console.log("messageAnswer", this.state.message);
    this.setState({
      message: this.state.message,
      FroalaEditor: !this.state.FroalaEditor
    });
    var data = {
      message: this.state.message,
      // id: this.state.idArrays
      id: id
    };
    // console.log("object this.state.idArrays", this.state.idArrays);
    ReplyQuesion(data)
      .then(async response => {
        // await this.setState({
        //   que: response.data.data.details,
        //   message: this.state.message
        // });
        console.log("response in reply answer ", response);
      })
      .catch(error => {
        console.log("error in reply answer ", error);
      });
  };

  handleReplyAnswerToAnswer = () => {};
  handleReply = () => {
    this.setState({ reply: !this.state.reply });
  };
  handleClose = () => {
    this.props.history.push("/dashboard");
  };
  render() {
    // this.state.answer.map(
    //   id => (
    //     console.log("Parent id map", id.parentId),
    //     console.log(" noteid map", id.notesId)
    //   )
    // );
    return (
      <div className="questionPaper">
        <Paper>
          <div className="titleQuestion">
            <b>
              <TextField
                InputProps={{
                  disableUnderline: true
                }}
                value={this.state.title}
                multiline
                style={{ paddingLeft: "15px" }}
              />
            </b>
            <Button onClick={this.handleClose}>Close</Button>
          </div>

          <div className="descriptionQuestion">
            <b>
              <TextField
                InputProps={{
                  disableUnderline: true
                }}
                multiline
                value={this.state.description}
                style={{ paddingLeft: "15px" }}
              />
            </b>
          </div>
          <Divider />
          <div>
            <h4 style={{ paddingLeft: "20px" }}>Ask a Question </h4>
          </div>
          <div>
            {/**if already question asked */}
            {this.state.questionArrays.length ? (
              <div style={{ fontSize: "small" }}>
                <IconButton>
                  <PersonOutlineTwoToneIcon />
                </IconButton>
                {localStorage.getItem("firstName") +
                  " " +
                  localStorage.getItem("lastName")}
                {/** <IconButton onClick={this.handleReplyButtonMain}>
                  <ReplyIcon />
                </IconButton>
                */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ArrowRightIcon fontSize="large" />
                  <div
                    style={{ color: "red" }}
                    dangerouslySetInnerHTML={{
                      __html: this.state.questionArrays
                    }}
                  />
                </div>
                <div>
                  {this.state.replyButtonMain ? null : (
                    <div>
                      <FroalaEditor
                        tag="textarea"
                        config={this.config}
                        model={this.state.message}
                        onModelChange={this.handleModelChange}
                      />
                      <div>
                        <Button
                          onClick={() =>
                            this.handleReplyAnswer(this.state.idArrays)
                          }
                        >
                          Submit-Answer
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                {/**if new question ask  */}
                {this.state.FroalaEditor ? (
                  <div style={{ padding: "15px" }}>
                    <FroalaEditor
                      tag="textarea"
                      config={this.config}
                      model={this.state.message}
                      onModelChange={this.handleModelChange}
                    />
                    <Button onClick={this.handleSubmitAnswer}>
                      Submit-Question
                    </Button>
                  </div>
                ) : null}
              </div>
            )}

            <div className="reply">
              {this.state.reply ? (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={this.handleReply}>View Reply</Button>
                </div>
              ) : (
                <div>
                  <div>
                    {this.state.answer.length ? (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                          }}
                        ></div>

                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {this.state.answer.map(ans =>
                            this.state.idArrays === ans.parentId ? (
                              <div key={ans.id}>
                                <div style={{ fontSize: "small" }}>
                                  <IconButton>
                                    <PersonOutlineTwoToneIcon />
                                  </IconButton>
                                  {localStorage.getItem("firstName") +
                                    " " +
                                    localStorage.getItem("lastName")}
                                  <IconButton
                                    onClick={this.handleReplyButtonMain}
                                  >
                                    <ReplyIcon style={{ marginLeft: "2%" }} />
                                  </IconButton>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                  }}
                                >
                                  <div
                                    style={{ fontSize: "small" }}
                                    dangerouslySetInnerHTML={{
                                      __html: ans.message
                                    }}
                                  />

                                  <Button onClick={this.handleReplyButton}>
                                    show reply
                                  </Button>
                                </div>
                                <div>
                                  {this.state.replyButton && (
                                    <div style={{ paddingLeft: "30px" }}>
                                      <div>
                                        {this.state.answer.map(ans2 =>
                                          ans.id === ans2.parentId ? (
                                            <div key={ans2.id}>
                                              <div
                                                style={{ fontSize: "small" }}
                                              >
                                                <IconButton>
                                                  <PersonOutlineTwoToneIcon />
                                                </IconButton>
                                                {localStorage.getItem(
                                                  "firstName"
                                                ) +
                                                  " " +
                                                  localStorage.getItem(
                                                    "lastName"
                                                  )}
                                                <IconButton
                                                  onClick={
                                                    this.handleReplyButton2
                                                  }
                                                >
                                                  <ReplyIcon
                                                    style={{ marginLeft: "2%" }}
                                                  />
                                                </IconButton>
                                              </div>
                                              <div
                                                style={{ fontSize: "small" }}
                                                dangerouslySetInnerHTML={{
                                                  __html: ans2.message
                                                }}
                                              />

                                              <div>
                                                <div>
                                                  {this.state
                                                    .replyButton2 ? null : (
                                                    <div>
                                                      <FroalaEditor
                                                        tag="textarea"
                                                        config={this.config}
                                                        model={
                                                          this.state.message
                                                        }
                                                        onModelChange={
                                                          this.handleModelChange
                                                        }
                                                      />

                                                      <div className="submitQuestion">
                                                        <Button
                                                          onClick={() =>
                                                            this.handleReplyAnswer(
                                                              ans2.id
                                                            )
                                                          }
                                                        >
                                                          Submit-Answer
                                                        </Button>
                                                      </div>
                                                    </div>
                                                  )}
                                                </div>
                                                {this.state.answer.map(ans3 =>
                                                  ans2.id === ans3.parentId ? (
                                                    <div
                                                      key={ans3.id}
                                                      style={{
                                                        paddingLeft: "40px"
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          paddingLeft: "15px",
                                                          fontSize: "small"
                                                        }}
                                                      >
                                                        <IconButton>
                                                          <PersonOutlineTwoToneIcon />
                                                        </IconButton>
                                                        {localStorage.getItem(
                                                          "firstName"
                                                        ) +
                                                          " " +
                                                          localStorage.getItem(
                                                            "lastName"
                                                          )}
                                                      </div>
                                                      <div
                                                        style={{
                                                          paddingLeft: "15px",
                                                          fontSize: "small"
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                          __html: ans3.message
                                                        }}
                                                      />
                                                    </div>
                                                  ) : null
                                                )}
                                              </div>
                                            </div>
                                          ) : null
                                        )}
                                        {/*<FroalaEditor
                                          tag="textarea"
                                          config={this.config}
                                          model={this.state.message}
                                          onModelChange={this.handleModelChange}
                                        /> 
                                      
                                       <div className="submitQuestion">
                                        <Button
                                          onClick={() =>
                                            this.handleReplyAnswer(ans.id)
                                          }
                                        >
                                          Submit-Answer
                                        </Button>
                                      </div>*/}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : null
                          )}

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end"
                            }}
                          >
                            <Button onClick={this.handleReply}>
                              Hide Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {this.state.FroalaEditor ? (
                          <div style={{ padding: "15px" }}>
                            <FroalaEditor
                              tag="textarea"
                              config={this.config}
                              model={this.state.message}
                              onModelChange={this.handleModelChange}
                            />
                            <div>
                              <Button
                                onClick={() =>
                                  this.handleReplyAnswer(this.state.idArrays)
                                }
                              >
                                Submit-Answer
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
export default QuestionAnswer;
