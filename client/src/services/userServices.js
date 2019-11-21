import axios from 'axios';
const { address} = require("../configs/routeConfig");

export default class userServices{
  loginUser(loginData) {
    return axios.post(address + '/user/login',loginData);
  }
  
  registerUser(userData) {
    return axios.post(address + '/user/register',userData);
  }
  
  forgotUser(userEmail) {
    return axios.post(address + '/users/forgotPassword',userEmail);
  }
  
  resetUser(userPass, token) {
    return axios.post(address + '/users/resetPassword', userPass,
    {
      headers: {
        token: token
      }
    });
  }
}


