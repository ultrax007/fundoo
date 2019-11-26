import axios from "axios";
// const {address} = require("../configs/routeConfig");
const address = "http://fundoonotes.incubation.bridgelabz.com/api";

class userServices {
	getEncodData(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		}
		return formBody.join("&");
	}

	loginUser(loginData) {
		console.log(address);

		return axios.post(address + "/user/login", loginData);
	}

	registerUser(userData) {
		return axios.post(address + "/user/userSignUp", userData);
	}

	forgotUser(userEmail) {
		return axios.post(address + "/user/reset", userEmail);
	}

  resetUser(userPass, token) {
    var formData = this.getEncodData(userPass)
		console.log("password is " + userPass + " \ntoken is==>  " + token);

		return axios.post(address + "/user/reset-password", formData, {
			headers: {
				Authorization: token,
				"Content-Type": "application/x-www-form-urlencoded"
			}
		});
	}
}

export default userServices;
