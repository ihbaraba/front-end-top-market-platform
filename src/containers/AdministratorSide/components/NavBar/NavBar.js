import React, {Component} from 'react';
import {Tooltip} from 'antd';
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
import {connect} from "react-redux";


const contractorMenu = [
    {
        title: 'Мой кабинет',
        icon: cabinet,
        activeIcon: cabinetActive,
        href: 'cabinet',
        developing: false
    },
    {
        title: 'Мои товары',
        icon: shopping,
        href: 'products',
        developing: false
    },
    {
        title: 'Мои заказы',
        icon: list,
        href: 'orders',
        developing: true
    },
    {
        title: 'Финансы',
        icon: chart,
        href: 'finance',
        developing: true
    },
    {
        title: 'База знаний',
        icon: database,
        href: 'knowledge_base',
        developing: true
    },
    {
        title: 'Доп. услуги',
        icon: services,
        href: 'additional_services',
        developing: true
    },
    {
        title: 'Обуч. модуль',
        icon: study,
        href: 'learning',
        developing: true
    },
];

const partnerMenu = [
    {
        title: 'Мой кабинет',
        icon: cabinet,
        activeIcon: cabinetActive,
        href: 'cabinet',
        developing: false
    },
    {
        title: 'Мой магазин',
        icon: home,
        href: 'store',
        developing: true
    },
    {
        title: 'Все товары',
        icon: cart,
        href: 'categories',
        developing: false
    },
    {
        title: 'Мои заказы',
        icon: list,
        href: 'orders',
        developing: true
    },
    {
        title: 'Финансы',
        icon: chart,
        href: 'finance',
        developing: true
    },
    {
        title: 'Мои товары',
        icon: shopping,
        href: 'my_products',
        developing: false
    },
    {
        title: 'База знаний',
        icon: database,
        href: 'knowledge_base',
        developing: true
    },
    {
        title: 'Доп. услуги',
        icon: services,
        href: 'additional_services',
        developing: true
    },
    {
        title: 'Обуч. модуль',
        icon: study,
        href: 'learning',
        developing: true
    }
];

class NavBar extends Component {

    render() {
        const navigation = this.props.user.role === 'CONTRACTOR' ? contractorMenu : partnerMenu;

        return (
            <div className={styles.navigationBar}>
                {navigation.map((item, index) => {
                    if (item.developing) {
                        return (
                            <Tooltip placement="right" title='Находится в разработке'>
                                <NavLink
                                    className={styles.menuItem}
                                    key={index}
                                    to={`/admin/${item.href}`}>
                                    <img src={item.icon} alt="" className={styles.icon}/>
                                    <img src={item.activeIcon} alt="" className={styles.activeIcon}/>

                                    {item.title}
                                </NavLink>
                            </Tooltip>
                        )
                    } else {
                        return (
                            <NavLink
                                className={styles.menuItem}
                                key={index}
                                to={`/admin/${item.href}`}>
                                <img src={item.icon} alt="" className={styles.icon}/>
                                <img src={item.activeIcon} alt="" className={styles.activeIcon}/>

                                {item.title}
                            </NavLink>
                        )
                    }
                })}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);