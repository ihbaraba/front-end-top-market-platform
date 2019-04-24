import React, {Component} from 'react'
import 'antd/dist/antd.css';
import styles from "../../../AdministratorSide/Registration/Registration.module.css";
import logo from "../../../../img/logo.png";
import {Link} from "react-router-dom";



class Header extends Component {

    render() {

        return (
            <div>
                <header>
                    <div className={styles.logo}>
                        <img src={logo} alt=""/>
                    </div>
                    <Link to='/login'><button className={styles.regBtn}>Войти</button></Link>
                </header>
            </div>
        )
    }
}


export default Header;

