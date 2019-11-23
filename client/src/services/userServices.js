import axios from 'axios';
// const {address} = require("../configs/routeConfig");
const address = 'http://fundoonotes.incubation.bridgelabz.com/api';

class userServices{
  loginUser(loginData) {
    console.log(address);
    
    return axios.post(address + '/user/login',loginData);
  }
  
  registerUser(userData) {
    return axios.post(address + '/user/userSignUp',userData);
  }
  
  forgotUser(userEmail) {
    return axios.post(address + '/user/reset',userEmail);
  }
  
  resetUser(userPass, token) {
    return axios.post(address + '/user/reset-password', userPass,
    {
      headers: {
        token: token
      }
    });
  }
}

export default userServices;
