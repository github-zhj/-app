import axios from 'axios'
//创建axios的一个实例 
// var instance = axios.create({
//     baseURL: 'http://baobab.kaiyanapp.com/api/v4',
//     timeout: 6000
// })

// axios.defaults.baseURL = 'http://baobab.kaiyanapp.com/api/v4';

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}