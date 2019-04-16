import api from './request';

import {
    COMPANY_PROFILE,
    GET_COMPANY_TYPE,
    GET_ACTIVITY_AREAS,
    GET_SERVICE_INDUSTRY,
    COMPANY_DOCUMENTS
} from '../constants/APIURLS';


export const getProfile = () => {
    return api('get', COMPANY_PROFILE)
};

export const updateProfile = user => {
    return api('patch', COMPANY_PROFILE, user)
};

export const getSelectParams = () => {
    return [api('get', GET_COMPANY_TYPE), api('get', GET_ACTIVITY_AREAS), api('get', GET_SERVICE_INDUSTRY)]
};

export const getDocuments = () => {
    return api('get', COMPANY_DOCUMENTS)
};


