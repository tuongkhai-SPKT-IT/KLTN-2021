import * as types from '../components/Redux/Constant.ActionType';
import API from '../components/API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../components/Constants';
import { useState } from 'react';

export async function PostStatus(statusParams) {
    var params = statusParams;
    let response = {
        status: false,
        message: ''
    }
    let token = ''
    await AsyncStorage.getItem(storeKeys.User_Token)
        .then(function (val) {
            if (val) {
                token = val;
            } else {
                return 'No token';
            }
        });

    params = {
        ...params,
        token: token
    }
    
    var route = 'status/upload-status';
    var header = {
        Authorization: 'bearer' + token,
    };

    var api = new API();
    await api
        .onCallAPI('post', route, {}, params, header)
        .then((res) => {
            if (res.data.error_code !== 0) {
                response.message = res.data.message
            } else {
                response.status = true;
                response.message = res.data.message
            }
        })
        .catch((err) => {
            console.log('error: ', err);
        });
    return response;
}