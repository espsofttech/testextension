import axios from 'axios'
import Cookies from 'js-cookie';
const loginData = (!Cookies.get('loginSuccessMrMintAdmin')) ? [] : JSON.parse(Cookies.get('loginSuccessMrMintAdmin'),true);

export const request = (path, data, method) => {
    console.log(data)
    // const serverPath = 'https://espsofttech.org:5029/api'
    const serverPath="http://132.148.75.182:8007"
    //const serverPath="http://132.148.75.182:8088/api/wallet"
//    const serverPath="http://localhost:8007"

    var options = {
        method: method,
        url: `${serverPath}/${path}`,
        headers: {
            'Content-Type': 'application/json', 
          
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"   
       
        },
        dataType: 'json'
    };
    if (loginData) {
        // options.headers['Authorization'] = loginData?.authToken
    }
    if (method === 'GET') {
        options['params'] = data
    } else {
        options['data'] = data
    }
    let res = axios(options)
    res.then(res1 => { })
    return res
}

export const requestFormData = (path, data, method) => {
    // const serverPath = 'https://espsofttech.org:5029/api'
// const serverPath = 'http://localhost:8007'
  const serverPath="http://132.148.75.182:8007"

    var form_data = new FormData();
    for (var key in data) {
        form_data.append(key, data[key]);
    }
    var options = {
        method: method,
        url: `${serverPath}/${path}`,
        data : form_data,
        // headers: { authorization: loginData?.authToken },
    };
    let res = axios(options);
    res.then(res1 => { })
    return res
}

export const postRequest = async (path, data) => await request(path, data, 'POST')
export const getRequest = async (path, data) => await request(path, data, 'GET')
export const putRequest = async (path, data) => await request(path, data, 'PUT')
export const deleteRequest = async (path, data) => await request(path, data, 'DELETE')

export const postRequestFormData = async (path, data) => await requestFormData(path, data, 'POST')