import api from './request';

import {
    CONTRACTOR_PRODUCTS,
    UPLOAD_PRODUCTS
} from '../constants/APIURLS';


export const getContractorProducts = () => {
    return api('get', CONTRACTOR_PRODUCTS)
};

export const uploadXls = (file) => {
    return api('post', UPLOAD_PRODUCTS, file)
};