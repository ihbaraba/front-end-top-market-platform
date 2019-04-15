import api from './request';

import {
    LOGIN,
    REGISTRATION,
    CONFIRM_EMAIL,
    PROFILE,
    PASSWORD,
    RESET_PASSWORD
} from '../constants/APIURLS';


export const login = user => {
    return api('post', LOGIN, user)
        .then(res => {
            sessionStorage.setItem('token', res.access)
        })
};

export const registration = user => {
    return api('post', REGISTRATION, user)
};

export const confirmEmail = token => {
    return api('post', CONFIRM_EMAIL, token)
};

export const getProfile = user => {
    return api('get', PROFILE, user)
};

export const updateProfile = user => {
    return api('patch', PROFILE, user)
};

export const changePassword = pass => {
    return api('put', PASSWORD, pass)
};

export const resetPassword = email => {
    return api('post', RESET_PASSWORD, email)
};