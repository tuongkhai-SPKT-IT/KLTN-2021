import * as types from '../components/Redux/Constant.ActionType';
import API from '../components/API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../components/Constants';
import { useState } from 'react';

export asycn function PostStatus(statusParams, formData) {
  //đã dùng then thì không cần await/async
  var params = statusParams;
  let response = {
    status: false,
    message: '',
  };
  let token = await AsyncStorage.getItem(storeKeys.User_Token);

  params = {
    ...params,
    token: token,
  };

  const route = 'status/upload-status';
  const header = {
    Authorization: 'bearer' + token,
    'Content-Type': 'multipart/form-data',
    // Accept: 'application/x-www-form-urlencoded',
  };

  var api = new API();
  api
    .onCallAPI('post', route, formData, params, header)
    .then((res) => {
      if (res.data.error_code !== 0) {
        response.message = res.data.message;
        console.log(res.data.message);
      } else {
        response.status = true;
        response.message = res.data.message;
      }
    })
    .catch((err) => {
      console.log('error: ', err);
    });
  return response;
}
