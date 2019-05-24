import api from './request';

import {
    STORE,
} from '../constants/APIURLS';


export const getMyStore = () => {
    // console.log("login_request this.props", this.props);
    return api('get', STORE)
};

export const updateStore = (store) => {
    // console.log("login_request this.props", this.props);
    return api('patch', STORE, store)
};
