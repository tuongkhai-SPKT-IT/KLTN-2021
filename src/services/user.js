import API from '../components/API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as storeKeys from '../components/Constants';

export async function GetUsers(data) {
    var params = data;
    let response = {
        status: false,
        message: '',
        data: null
    }
    
    var route = 'user/search-v1';

    var api = new API();
    await api
        .onCallAPI('get', route, {}, params, {})
        .then((res) => {
            if (res.data.error_code !== 0) {
                response.message = res.data.message
                response.data = res.data.data;
            } else {
                response.status = true;
                response.message = res.data.message;
                response.data = res.data.data;
            }
        })
        .catch((err) => {
            response.message = err;
        });
    return response;
}

export async function getNotifications() {
    let response = {
        status: false,
        message: '',
        data: null
    };
    let token = await AsyncStorage.getItem(storeKeys.User_Token);

    let params = {
        token: token,
    };

    const route = 'notification';
    const header = {
        Authorization: 'bearer' + token,
        'Content-Type': 'multipart/form-data',
    };

    var api = new API();
    await api
        .onCallAPI('get', route, {}, params, header)
        .then((res) => {
            if (res.data.error_code !== 0) {
                response.message = res.data.message;
            } else {
                response.status = true;
                response.message = res.data.message;
                response.data = res.data.data;
            }
        })
        .catch((err) => {
            console.log('error: ', err);
        });
    return response;
}

export async function CreateNotification(data) {
    var params = data;
    let response = {
        status: false,
        message: '',
    };
    let token = await AsyncStorage.getItem(storeKeys.User_Token);

    params = {
        ...params,
        token: token,
    };

    const route = 'notification';
    const header = {
        Authorization: 'bearer' + token,
        'Content-Type': 'multipart/form-data',
    };

    var api = new API();
    await api
        .onCallAPI('post', route, {}, params, header)
        .then((res) => {
            if (res.data.error_code !== 0) {
                response.message = res.data.message;
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

export async function getUserRooms() {
    let response = {
        status: false,
        message: '',
        data: null
    };
    let token = await AsyncStorage.getItem(storeKeys.User_Token);

    let params = {
        token: token,
    };

    const route = 'user/rooms';
    const header = {
        Authorization: 'bearer' + token,
        'Content-Type': 'multipart/form-data',
    };

    var api = new API();
    await api
        .onCallAPI('get', route, {}, params, header)
        .then((res) => {
            if (res.data.error_code !== 0) {
                response.message = res.data.message;
            } else {
                response.status = true;
                response.message = res.data.message;
                response.data = res.data.data;
            }
        })
        .catch((err) => {
            console.log('error: ', err);
        });
    return response;
}