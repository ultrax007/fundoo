import axiosServices from "./axiosServices.js";
const obj = new axiosServices();
export default class userServices {

  login(data) {
    return obj.postMethod(data, "/user/login", false);
  }

  forget(data) {
    return obj.postMethod(data, "/user/reset", false);
  }

  
  register(data) {
    return obj.postMethod(data,"/user/userSignUp", false);
  }
  
  reset(data,token) {
    return obj.resetUser(data, token);
  }

  /**
   * operation methods
   */
  getAllNotes() {
    return obj.getMethod("/notes/getNotesList", true);
  }
}
