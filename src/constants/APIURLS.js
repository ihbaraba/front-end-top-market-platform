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