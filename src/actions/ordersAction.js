import api from './request';

import {
    ORDERS,
    CONTRACTOR_ORDERS,
    PASS_TO_CONTRACTOR
} from '../constants/APIURLS';


export const getOrders = (url) => {
    return api('get', ORDERS + url)
};


export const passToContractor = (id) => {
    return api('get', PASS_TO_CONTRACTOR(id))
};



export const getContractorOrders = (url) => {
    return api('get', CONTRACTOR_ORDERS + url)
};