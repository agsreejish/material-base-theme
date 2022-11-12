import axios from "axios";

const instance = axios.create();

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    
    return Promise.reject((error.response && error.response.data) || 'Unable to contact server.');
  });

export default instance;
