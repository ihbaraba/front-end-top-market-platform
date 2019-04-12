import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

import {confirmEmail} from '../../../actions/userActions';

const ConfirmRegistration = () => {
    let urlParams = queryString.parseUrl(document.location.search).query;
    console.log(urlParams);

    confirmEmail(urlParams);

    return (
        <Fragment>
            <h1>Ok</h1>
            <Link to='/'>go to login page</Link>
        </Fragment>
    )
};

export default ConfirmRegistration;