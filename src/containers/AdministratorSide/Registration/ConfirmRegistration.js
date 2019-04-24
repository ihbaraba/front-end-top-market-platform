import React, {Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import logo from "../../../img/logo.png";
import styles from './Registration.module.css';

import {confirmEmail} from '../../../actions/userActions';

class ConfirmRegistration extends Component {

    componentDidMount() {
        let urlParams = queryString.parseUrl(document.location.search).query;
        console.log();

        confirmEmail(urlParams.token);
    }

    render() {
        return (
            <Fragment>
                <div className='container'>
                    <header>
                        <div className={styles.logo}>
                            <img src={logo} alt=""/>
                        </div>
                        <Link to='/login'>
                            <button className={styles.regBtn}>Войти</button>
                        </Link>
                    </header>
                </div>

                <div className={`container ${styles.confirmBlock}`} >
                    <h1>Спасибо за регистрацию</h1>
                    <Link to='/login'>Перейти на страницу авторизации</Link>
                </div>
            </Fragment>
        )
    }
}

export default ConfirmRegistration;