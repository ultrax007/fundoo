import axiosServices from "./axiosServices.js";
const obj = new axiosServices();
export default class noteServices {

  createNote(data) {
    console.log("data in userservices",data);
    return obj.postMethod(data, "/notes/addNotes", true)
  }
  
  getAllNotes() {
    return obj.getMethod("/notes/getNotesList", true);
  }
}
