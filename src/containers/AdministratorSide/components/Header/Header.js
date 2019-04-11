import React, {Component} from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import 'antd/dist/antd.css';
import logo from "../../../../img/logo.png";
import  avatar  from "../../../../img/ava.png";
import  notification  from "../../../../img/notification.svg";
import  cart  from "../../../../img/cart.svg";
import  dollar  from "../../../../img/dollar.svg";


const menu = (
    <Menu>
        <Menu.Item>
            <Link to="/admin/profile-settings">Настройки профиля</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/">Настройки компании</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/admin/employees">Сотрудники</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to="/">Выход</Link>
        </Menu.Item>
    </Menu>
);


class Header extends Component {
    render() {
        return (
            <div className='container'>
                <header>
                    <div className={styles.logo}>
                        <img src={logo} alt=""/>
                    </div>
                    <div className={styles.notification}>
                        <a href="#">
                            <img src={notification} alt=""/>
                            <span className={styles.alert}>1</span>
                        </a>
                    </div>
                    <div className={styles.cart}>
                        <Link to="/admin/cart">
                            <img src={cart} alt=""/>
                            <span className={styles.alert}>1</span>
                        </Link>
                    </div>

                    <div className={styles.balanceBlock}>
                        <div>
                            <p>Баланс:</p>
                        </div>

                        <div className={styles.balanceBox}>
                            <div className={styles.dollarIcon}>
                                <img src={dollar} alt=""/>
                            </div>
                            <div>
                                <span>0.00</span> грн
                            </div>
                        </div>
                    </div>

                    <div className={styles.userBlock}>
                        <div className={styles.avatar}>
                            <img src={avatar} alt=""/>
                        </div>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                <span className={styles.name}>Назар</span><Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header
