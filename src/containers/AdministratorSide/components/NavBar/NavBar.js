import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';
import styles from './NavBar.module.css'
import 'antd/dist/antd.css';

import cabinet from '../../../../img/user.svg';
import cabinetActive from '../../../../img/user2.svg';

import home from '../../../../img/home.svg';
import cart from '../../../../img/shopping-cart.svg';
import list from '../../../../img/list.svg';
import chart from '../../../../img/pie-chart.svg';
import shopping from '../../../../img/shopping-bag.svg';
import database from '../../../../img/database.svg';
import services from '../../../../img/add-button-inside-black-circle.svg';
import study from '../../../../img/teacher-reading.svg';


const menu = [
    {
        title: 'Мой кабинет',
        icon: cabinet,
        activeIcon: cabinetActive,
        href: 'cabinet',
    },
    {
        title: 'Мой магазин',
        icon: home,
        href: '/',
    },
    {
        title: 'Все товары',
        icon: cart,
        href: '/',
    },
    {
        title: 'Мои заказы',
        icon: list,
        href: '/',
    },
    {
        title: 'Финансы',
        icon: chart,
        href: '/',
    },
    {
        title: 'Мои товары',
        icon: shopping,
        href: '/',
    },
    {
        title: 'База знаний',
        icon: database,
        href: 'knowledge-base',
    },
    {
        title: 'Доп. услуги',
        icon: services,
        href: 'additional-services',
    },
    {
        title: 'Обуч. модуль',
        icon: study,
        href: '/',
    },

];

class NavBar extends Component {
    render() {

        return (
            <div className={styles.navigationBar}>
                {menu.map((item) => (
                    <NavLink
                        className={styles.menuItem}
                        key={item.href}
                        to={`/admin/${item.href}`}>
                        <img src={item.icon} alt="" className={styles.icon} />
                        <img src={item.activeIcon} alt="" className={styles.activeIcon} />

                        {item.title}
                    </NavLink>

                ))}
            </div>
        )
    }
}

export default NavBar
