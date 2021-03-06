import axios from 'axios';

class API {
  constructor() {
    //this.domain = 'http://localhost:8000/api/';
    this.domain = 'http://192.168.1.106:8000/api/';
    
  }
  onCallAPI = (method, url, data = {}, params = {}, headers = {}) => {
    return axios({
      method: method,
      url: this.domain + url,
      data: data,
      params: params,
      headers: headers,
    });
  };
}

export default API;
