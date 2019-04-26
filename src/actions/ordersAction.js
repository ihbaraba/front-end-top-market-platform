import api from './request';

import {
    ORDERS
} from '../constants/APIURLS';


export const getOrders = (url) => {
    return api('get', ORDERS + url)
};