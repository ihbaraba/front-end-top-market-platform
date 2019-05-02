import api from './request';

import {
    CONTRACTOR_PRODUCTS,
    CONTRACTOR_CATEGORIES,
    FIRST_LEVEL_CATEGORIES,
    ALL_CATEGORIES,
    UPLOAD_PRODUCTS,
    DOWNLOADS_STATUS,
    NEW_PRODUCTS,
    ALL_PRODUCTS,
    REMOVE_CONTRACTOR_PRODUCTS,
    COPY_TO_MY_PRODUCTS,
    PARTNER_PRODUCTS,
    YML
} from '../constants/APIURLS';



export const getAllCategories = () => {
    return api('get', `${ALL_CATEGORIES}`)
};

export const getFirstLevelCategories = () => {
    return api('get', `${FIRST_LEVEL_CATEGORIES}`)
};

export const getCategoriesById = (id) => {
    return api('get', `${ALL_CATEGORIES}${id}/children`)
};

//Contractor
export const getContractorProducts = (url) => {
    return api('get', CONTRACTOR_PRODUCTS + url)
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

export const removeContractorProduct = (products) => {
    return api('post', `${REMOVE_CONTRACTOR_PRODUCTS}`, products)
};

//partner
export const getAllProducts = (url) => {
    return api('get', `${ALL_PRODUCTS + url}`)
};

export const copyProducts = (products) => {
    return api('post', `${COPY_TO_MY_PRODUCTS}`, products)
};

export const getPartnerProducts = (url) => {
    return api('get', `${PARTNER_PRODUCTS + url}`)
};

export const generateYml = (products, type) => {
    return api('post', `${YML}`, products)
};

export const updatePartnerProduct = (product) => {
    return api('patch', `${PARTNER_PRODUCTS}${product.id}/`, product)
};