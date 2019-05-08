import api from './request';

import {
    STORE,
} from '../constants/APIURLS';


export const createStore = (store) => {
    // console.log("login_request this.props", this.props);
    return api('post', STORE, store)
};
