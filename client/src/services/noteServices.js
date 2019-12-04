import axiosServices from "./axiosServices.js";
const obj = new axiosServices();
export default class noteServices {
  createNote(data) {
    return obj.postMethod(data, "/notes/addNotes", true)
  }

  updateNote(data) {
    return obj.postMethod(data, "/notes/updateNotes", true);
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
  
  getAllNotes() {
    return obj.getMethod("/notes/getNotesList", true);
  }

  getArchivedNotes() {
    return obj.getMethod("/notes/getArchiveNotesList", true);
  }

  getTrashNotes() {
    return obj.getMethod("/notes/getTrashNotesList", true);
  }
}
