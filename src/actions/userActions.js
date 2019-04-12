import api from './request';

import {
    LOGIN,
    REGISTRATION,
    CONFIRM_EMAIL
} from '../constants/APIURLS';


export const login = user => {
    return api('post', LOGIN, user)
        .then(res => {
            sessionStorage.setItem('token', res.token)
        })
};

export const registration = user => {
    return api('post', REGISTRATION, user)
};

export const confirmEmail = token => {
    return api('post', CONFIRM_EMAIL, token)
};

export const updateProfile = user => {
    return api('put', CONFIRM_EMAIL, user)
};