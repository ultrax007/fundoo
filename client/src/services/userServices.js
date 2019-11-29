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

	postMethod(data, target) {
		return axios.post(address + target, data);
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
