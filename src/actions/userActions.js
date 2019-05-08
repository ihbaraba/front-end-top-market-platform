import api from './request';

import {
    LOGIN,
    REGISTRATION,
    CONFIRM_EMAIL,
    PROFILE,
    PASSWORD,
    RESET_PASSWORD,
    CONTACT_FORM,
    INVOICE
} from '../constants/APIURLS';


export const login = (user) => dispatch => {
    // console.log("login_request this.props", this.props);
    return api('post', LOGIN, user)
        .then(res => {
            localStorage.setItem('token', res.access);

            getProfile()
                .then(res => {
                    dispatch({
                        type: 'UPDATE_PROFILE',
                        payload: res
                    })
                })
        })
};

export const registration = user => {
    return api('post', REGISTRATION, user)
};

export const confirmEmail = token => {
    return api('get', CONFIRM_EMAIL + token)
};

export const getProfile = () => {
    return api('get', PROFILE)
};

export const updateProfile = user => dispatch => {
    return api('patch', PROFILE, user)
        .then(res => {
            dispatch({
                type: 'UPDATE_PROFILE',
                payload: res
            })
        })
};

export const changePassword = pass => {
    return api('put', PASSWORD, pass)
};

export const resetPassword = email => {
    return api('post', RESET_PASSWORD, email)
};

export const sendContactForm = form => {
    return api('post', CONTACT_FORM, form)
};


export const sendInvoice = (pocket) => {
    return api('put', INVOICE, pocket)
};