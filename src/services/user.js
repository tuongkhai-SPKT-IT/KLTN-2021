import API from '../components/API/API';

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
                response.message = r-es.data.message
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