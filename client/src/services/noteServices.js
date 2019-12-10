import axiosServices from "./axiosServices.js";
const obj = new axiosServices();
export default class noteServices {


  /**
   ******************************************** post methods*************************************************************************
   */


  createNote(data) {
    return obj.postMethod(data, "/notes/addNotes", true)
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

  deleteNoteLableFromCard(data) {
    // console.log("value in service of notelabledelte card", noteId, labelId);
    console.log("/notes/"+data.noteId+"/addLabelToNotes/"+data.labelId+"/remove");
    return obj.postMethod(data,"/notes/"+data.noteId+"/addLabelToNotes/"+data.labelId+"/remove",true)
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



  deleteNoteLable(id) {
    return obj.deleteMethod("/noteLabels/"+id+"/deleteNoteLabel")
  }
  
}
