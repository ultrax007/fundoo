import axiosServices from "./axiosServices.js";
const obj = new axiosServices();
export default class noteServices {
  /**
   ******************************************** post methods*************************************************************************
   */

  createNote(data) {
    // console.log("data in nservices",data);
    return obj.formDataPostMethod(data, "/notes/addNotes", true);
  }

  createLabel(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(data, "/noteLabels", true);
  }

  updateNote(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(data, "/notes/updateNotes", true);
  }

  addUpdateReminder(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(data, "/notes/addUpdateReminderNotes", true);
  }

  deleteReminder(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(data, "/notes/removeReminderNotes", true);
  }

  updateLable(data, id) {
    // console.log("data in nservices",data);
    return obj.postMethod(data, "/noteLabels/" + id + "/updateNoteLabel", true);
  }

  changeNoteColor(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(data, "/notes/changesColorNotes", true);
  }

  changeNoteArchive(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(data, "/notes/archiveNotes", true);
  }

  deleteNote(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(data, "/notes/trashNotes", true);
  }

  deleteForeverNote(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(data, "/notes/deleteForeverNotes", true);
  }

  deleteNoteLabelFromCard(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(
      data,
      "/notes/" + data.noteId + "/addLabelToNotes/" + data.labelId + "/remove",
      true
    );
  }

  addLabelToNotes(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(
      data,
      "/notes/" + data.noteId + "/addLabelToNotes/" + data.labelId + "/add",
      true
    );
  }

  getNotesFromLabelName(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(
      data,
      "/notes/getNotesListByLabel/" + data.labelName,
      true
    );
  }

  addChecklist(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(
      data,
      "/notes/" + data.notesId + "/checklist/add",
      true
    );
  }

  updateChecklist(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(
      data,
      "/notes/" + data.notesId + "/checklist/" + data.checkListId + "/update",
      true
    );
  }

  removeChecklist(data) {
    // console.log("data in nservices",data);
    return obj.postMethod(
      data,
      "/notes/" + data.noteId + "/checklist/" + data.checklistId + "/remove",
      true
    );
  }

  searchUserList(data) {
    // console.log("data in nservices", data);
    return obj.postMethod(data, "/user/searchUserList", true);
  }

  addCollaborator(data) {
    // console.log("data in nservices", data);
    return obj.postMethod(
      data,
      "/notes/" + data.id + "/AddcollaboratorsNotes",
      true
    );
  }

  addQuestion(data) {
    // console.log("data in nservices", data);
    return obj.postMethod(
      data,
      "/questionAndAnswerNotes/addQuestionAndAnswer",
      true
    );
  }

  replyQuestion(data) {
    // console.log("data in nservices", data);
    return obj.postMethod(
      data,
      "/questionAndAnswerNotes/reply/" + data.id,
      true
    );
  }

  /**
   * ****************************************Get methods******************************************************************************
   */

  getAllNotes() {
    // console.log("data in nservices");
    return obj.getMethod("/notes/getNotesList", true);
  }

  getArchivedNotes() {
    // console.log("data in nservices");
    return obj.getMethod("/notes/getArchiveNotesList", true);
  }

  getAllLabels() {
    // console.log("data in nservices");
    return obj.getMethod("/noteLabels/getNoteLabelList", true);
  }

  getTrashNotes() {
    // console.log("data in nservices");
    return obj.getMethod("/notes/getTrashNotesList", true);
  }

  getReminderNotes() {
    // console.log("data in nservices");
    return obj.getMethod("/notes/getReminderNotesList", true);
  }

  getNotesDetails(data) {
    // console.log("data in nservices");
    return obj.getMethod("/notes/getNotesDetail/" + data, true);
  }

  /**
   * **************************************delete methods******************************************************************************
   */

  deleteNoteLabel(id) {
    // console.log("data in nservices",id);
    return obj.deleteMethod("/noteLabels/" + id + "/deleteNoteLabel");
  }

  deleteCollaborator(data) {
    // console.log("data in nservices", data);
    return obj.deleteMethod(
      "/notes/" + data.id + "/removeCollaboratorsNotes/" + data.userId,
      true
    );
  }
}
