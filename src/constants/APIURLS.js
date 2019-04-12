const SERVERS = {
    PRODUCT: {
        XHR: "",
    },
    DEV: {
        XHR: "",
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
export const LOGIN = 'auth/login';

export const REGISTRATION = 'auth/registration';

export const CONFIRM_EMAIL = 'auth/confirm';