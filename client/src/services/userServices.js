import axiosServices from "./axiosServices.js";
const obj = new axiosServices();
export default class userServices {
	/**************************POST METHODS******************************************* */
  
  login(data) {
		return obj.postMethod(data, "/user/login", false);
	}
  
  forget(data) {
		return obj.postMethod(data, "/user/reset", false);
	}
  
  register(data) {
		return obj.postMethod(data, "/user/userSignUp", false);
	}
  
  addToCart(data) {
		return obj.postMethod(data, "/productcarts/addToCart", false);
	}

	placeCartOrder(data) {
		return obj.postMethod(data, "/productcarts/placeOrder", true);
  }
  
	profileImageUpload(data) {
		return obj.postImage(data, "/user/uploadProfileImage", true);
	}

	/**************************GET METHODS******************************************* */

	services() {
		return obj.getMethod("/user/service", false);
	}

	getCartDetails(data) {
		return obj.getMethod("/productcarts/getCartDetails/" + data, false);
	}

	myCart() {
		return obj.getMethod("/productcarts/myCart", true);
  }
  
	/**************************RESET METHODS******************************************* */

	reset(data) {
		return obj.resetMethod(data, "/user/reset-password", data.token);
	}
}
