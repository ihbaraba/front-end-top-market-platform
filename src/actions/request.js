import axios from 'axios';
import {notification} from 'antd';
import {loadProgressBar} from 'axios-progress-bar';

import {BASE_URL} from '../constants/APIURLS';

loadProgressBar();

const http = (method, url, data, type) => {
    const token = sessionStorage.getItem('token');

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: `${BASE_URL}${url}`,
            data: data,
            headers: token ? {
                'Content-Type': type || 'application/json',
                'authorization': `Bearer ${token}`
            } : {
                'Content-Type': type || 'application/json',
            }
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                if (typeof error.response.data === 'object') {
                    for (let key in error.response.data) {
                        if (key !== 'messages') {
                            notification.error({
                                // message: key,
                                // description: error.response.data[key][0],
                                message: error.response.data[key][0],
                            });
                        }
                    }
                } else {
                    notification.error({
                        message: 'Сервер не отвечает',
                    });
                }
            });
    })
};

export default http;