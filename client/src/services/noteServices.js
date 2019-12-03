import axiosServices from "./axiosServices.js";
const obj = new axiosServices();
export default class noteServices {
  createNote(data) {
    return obj.postMethod(data, "/notes/addNotes", true)
  }

  updateNote(data) {
    return obj.postMethod(data, "/notes/updateNotes", true);
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
