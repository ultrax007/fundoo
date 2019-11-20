import axios from 'axios';

var address = 'http://localhost:3000';

export function loginUser(loginData) {
  return axios.post(address + '/users/login',loginData);
}

export function registerUser(userData) {
  return axios.post(address + '/users/register',userData);
}

export function forgotUser(userEmail) {
  return axios.post(address + '/users/forgotPassword',userEmail);
}

export function resetUser(userPass, token) {
  return axios.post(address + '/users/resetPassword', userPass,
  {
    headers: {
      token: token
    }
  });
}

