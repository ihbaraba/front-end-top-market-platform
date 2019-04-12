const SERVERS = {
    PRODUCT: {
        XHR: "http://api.topmarket.club/api/v1/",
    },
    DEV: {
        XHR: "http://api.topmarket.club/api/v1/",
    },
};

/*
* Getting current URL.
* Aiming to avoid wrong backend server address
* If it is not "localhost" setting SERVERS.PRODUCT
* */

const generatedDetected = {
    XHR: `https://${document.location.hostname}/api/v1/`,
    SOCKET: `wss://${document.location.hostname}/`,
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