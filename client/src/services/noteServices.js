import axiosServices from "./axiosServices.js";
const obj = new axiosServices();
export default class noteServices {


  /**
   ******************************************** post methods*************************************************************************
   */


  createNote(data) {
    return obj.formDataPostMethod(data, "/notes/addNotes", true)
  }

  createLabel(data) {
    return obj.postMethod(data, "/noteLabels", true);
  }

  updateNote(data) {
    return obj.postMethod(data, "/notes/updateNotes", true);
  }
  
  updateLable(data,id) {
    return obj.postMethod(data, "/noteLabels/" + id + "/updateNoteLabel", true);
  }

  changeNoteColor(data) {
    return obj.postMethod(data, "/notes/changesColorNotes", true);
  }

  changeNoteArchive(data) {
    return obj.postMethod(data, "/notes/archiveNotes", true);
  }

  deleteNote(data) {
    return obj.postMethod(data, "/notes/trashNotes", true);
  }

  deleteForeverNote(data) {
    return obj.postMethod(data, "/notes/deleteForeverNotes", true);
  }

  deleteNoteLabelFromCard(data) {
    return obj.postMethod(data, "/notes/" + data.noteId + "/addLabelToNotes/" + data.labelId + "/remove", true);
  }

  addLabelToNotes(data) {
    console.log("datat in nservices",data);
    return obj.postMethod(data, "/notes/" + data.noteId + "/addLabelToNotes/" + data.labelId + "/add", true);
  }

  getNotesFromLabelName(data) {
    console.log("datat in nservices",data);
    return obj.postMethod(data,"/notes/getNotesListByLabel/"+data.labelName, true);
  }

  addChecklist(data) {
    console.log("datat in nservices",data);
    return obj.postMethod(data,"/notes/"+data.notesId+"/checklist/add", true);
  }

  updateChecklist(data) {
    console.log("datat in nservices",data);
    return obj.postMethod(data,"/notes/"+data.notesId+"/checklist/"+data.checkListId+"/update", true);
  }

  removeChecklist(data) {
    console.log("datat in nservices",data);
    return obj.postMethod(data,"/notes/"+data.noteId+"/checklist/"+data.checklistId+"/remove", true);
  }
  
  
  /**
   * ****************************************Get methods******************************************************************************
   */

  
  
  getAllNotes() {
    return obj.getMethod("/notes/getNotesList", true);
  }

  getArchivedNotes() {
    return obj.getMethod("/notes/getArchiveNotesList", true);
  }

  getAllLabels() {
    return obj.getMethod("/noteLabels/getNoteLabelList", true);
  }

  getTrashNotes() {
    return obj.getMethod("/notes/getTrashNotesList", true);
  }



  /**
   * **************************************delete methods******************************************************************************
   */



  deleteNoteLabel(id) {
    return obj.deleteMethod("/noteLabels/" + id + "/deleteNoteLabel");
  }
  
}
