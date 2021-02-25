import axios from 'axios';
import {API_URL} from '../../../env';

class API {
  constructor() {
    this.domain = API_URL;
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
