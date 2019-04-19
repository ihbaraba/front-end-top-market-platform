import api from './request';

import {
    CONTRACTOR_PRODUCTS,
    CONTRACTOR_CATEGORIES,
    ALL_CATEGORIES,
    UPLOAD_PRODUCTS,
    DOWNLOADS_STATUS,
    NEW_PRODUCTS,
    ALL_PRODUCTS
} from '../constants/APIURLS';



export const getAllCategories = () => {
    return api('get', `${ALL_CATEGORIES}`)
};

//Contractor
export const getContractorProducts = () => {
    return api('get', CONTRACTOR_PRODUCTS)
};

export const getContractorCategories = () => {
    return api('get', CONTRACTOR_CATEGORIES)
};


export const uploadXls = (file) => {
    return api('post', UPLOAD_PRODUCTS, file)
};

export const getDownloadsStatus = () => {
    return api('get', DOWNLOADS_STATUS)
};

export const createNewProduct = (product) => {
    return api('post', NEW_PRODUCTS, product)
};

export const updateProduct = (product) => {
    return api('patch', `${NEW_PRODUCTS}${product.id}/`, product)
};

//partner
export const getAllProducts = () => {
    return api('get', `${ALL_PRODUCTS}`)
};