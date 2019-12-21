import axios from "axios";
// const {address} = require("../configs/routeConfig");
const address = "http://fundoonotes.incubation.bridgelabz.com/api";
var token = localStorage.getItem("token");
export default class axiosServices {
	
	resetMethod(data, target, token) {
		return axios.post(address + target, data, {
			headers: {
				'Content-type': 'application/json; charset=utf-8',
				'Authorization': token
			}
		});
	}

	formDataPostMethod(data, target, isTokenReq) {
		 token = localStorage.getItem("token");

		return axios.post(address + target, data, isTokenReq && {
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Authorization': token
			}
		});
	}
	postMethod(data, target, isTokenReq) {
		 token = localStorage.getItem("token");

		return axios.post(address + target, data, isTokenReq && {
			headers: {
				'Content-type': 'application/json; charset=utf-8',
				'Authorization': token
			}
		});
	}

	getMethod(target) {
		token = localStorage.getItem("token");

		return axios.get(address + target, {
			headers: {
				'Authorization':token
			}
		});
	}

	putMethod(data, target, isTokenReq) {
		token = localStorage.getItem("token");
		
		return axios.put(address + target, data, isTokenReq && {
			headers: {
				'Content-type': 'application/json; charset=utf-8',
				'Authorization': token
			}
		});
	}
	
	deleteMethod(target,isTokenReq) {
		token = localStorage.getItem("token");
		return axios.delete(address + target, isTokenReq && {
			headers: {
				'Content-type': 'application/json; charset=utf-8',
				'Authorization': token
			}
		});
	}
	postImage(data,target,isTokenReq) { 
		token = localStorage.getItem("token");

		return axios.post(address + target, data, isTokenReq && {
			headers: {
				'Content-type': 'multipart/form-data',
				'Authorization': token
			}
		});
	}
}
