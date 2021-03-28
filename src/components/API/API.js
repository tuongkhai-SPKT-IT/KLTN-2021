import axios from 'axios';

class API {
  constructor() {
    //this.domain = 'http://localhost:8000/api/';
    // this.domain = 'http://192.168.1.109:8000/api/';
    // this.domain = ""
    this.domain = 'http://api.facebook-kltn.alphawolf.io/api/';

    // this.domain = 'http://192.168.1.109:8000/api/'; //ip  cho ở trường
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
