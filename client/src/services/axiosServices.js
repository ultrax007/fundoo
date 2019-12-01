import axios from "axios";
// const {address} = require("../configs/routeConfig");
const address = "http://fundoonotes.incubation.bridgelabz.com/api";
const token = localStorage.getItem("token");
export default class axiosServices {
	// constructor() {}
	getEncodData(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		}
		return formBody.join("&");
	}

	postMethod(data, target, isTokenReq) {
		return axios.post(address + target, data, isTokenReq && {
			headers: {
				'Content-type': 'application/json; charset=utf-8',
				'Authorization': token
			}
		});
	}

	getMethod(target) {
		return axios.get(address + target, {
			headers: {
				'Authorization':token
			}
		});
	}

	putMethod(data, target,isTokenReq) {
		return axios.put(address + target, data, isTokenReq && {
			headers: {
				'Content-type': 'application/json; charset=utf-8',
				'Authorization': token
			}
		});
	}

	deleteMethod(target) {
		return axios.delete(address + target);
	}

	resetUser(userPass, tok) {
		var formData = this.getEncodData(userPass);
		console.log("password is " + userPass + " \ntoken is==>  " + tok);

		return axios.post(address + "/user/reset-password", formData, {
			headers: {
				Authorization: token,
				"Content-Type": "application/x-www-form-urlencoded"
			}
		});
	}
}
