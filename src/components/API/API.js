import axios from 'axios';
import ENV from '../../../env';

class API {
  constructor() {
    this.domain = 'http://192.168.1.185:8000/api/';
    // alert(ENV.API_URL)
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
