const SERVERS = {
    PRODUCT: {
        XHR: "https://api.topmarket.club/api/v1/",
    },
    DEV: {
        XHR: "https://api.topmarket.club/api/v1/",
    },
};

/*
* Getting current URL.
* Aiming to avoid wrong backend server address
* If it is not "localhost" setting SERVERS.PRODUCT
* */

const generatedDetected = {
    XHR: `https://api.${document.location.hostname}/api/v1/`,
    SOCKET: `wss://api.${document.location.hostname}/`,
};

export const BASE_URL = document.location.hostname === "localhost"
    ? SERVERS.DEV.XHR /* <=== set here server what needs for developing -  */
    : generatedDetected.XHR;

/**************************
 * */

//USER
export const LOGIN = 'login';

export const REGISTRATION = 'register';

export const CONFIRM_EMAIL = 'auth/confirm';

export const PROFILE = 'profile';

export const PASSWORD = 'password_change';

export const RESET_PASSWORD = 'password_reset';

//COMPANY
export const COMPANY_PROFILE = 'company/detail';

export const UPDATE_COMPANY_PROFILE = 'company/update';

export const GET_COMPANY_TYPE = 'company/company_type';

export const GET_ACTIVITY_AREAS = 'company/activity_areas';

export const GET_SERVICE_INDUSTRY = 'company/service_industry';

export const COMPANY_DOCUMENTS = 'company/documents';

export const COMPANY_PITCH = 'company/pitch';

//PRODUCTS
export const CONTRACTOR_PRODUCTS = 'catalog/contractor_products';

export const CONTRACTOR_CATEGORIES = 'catalog/contractor_products/contractor_categories';

export const ALL_CATEGORIES = 'catalog/categories';

export const UPLOAD_PRODUCTS = 'catalog/products_upload';

export const NEW_PRODUCTS = 'catalog/contractor_products';

export const DOWNLOADS_STATUS = 'catalog/contractor_products/upload_history';


