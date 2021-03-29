import * as types from '../components/Redux/Constant.ActionType';
import API from '../components/API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../components/Constants';
import { useState } from 'react';

export async function PostStatus(statusParams){
    const params = statusParams;
    const route = 'status/upload-status';
    let token = ''
    AsyncStorage.getItem(storeKeys.User_Token)
        .then((val) => {
            // return JSON.parse(val);
            if(val){
                token = val
            }
        });

    alert(token);
    console.log(token)
    return;

    const headers = {
        'Authorization': `Bearer ${token}`
    }
    var api = new API();
    return api.onCallAPI('post', route, {}, params, headers)
        .then((res) => {
            if (res.data.error_code !== 0) {
                window.alert(res.data.message);
            } else {
                window.alert(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};