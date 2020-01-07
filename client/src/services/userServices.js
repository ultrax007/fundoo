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

  services() {
    return obj.getMethod("/user/service", false);
  }

  getCartDetails(data) {
    return obj.getMethod("/productcarts/getCartDetails/"+data, false);
  }

  addToCart(data) {
    return obj.postMethod(data,"/productcarts/addToCart", false);
  }
  
  reset(data) {
    return obj.resetMethod(data,"/user/reset-password",data.token);
  }

  profileImageUpload(data) {
    return obj.postImage(data,"/user/uploadProfileImage",true);
  }
}
