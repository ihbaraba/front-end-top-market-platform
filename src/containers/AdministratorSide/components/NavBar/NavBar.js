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
import сontacts from '../../../../img/contact.svg';
import {connect} from "react-redux";


const contractorMenu = [
    {
        title: 'Мой кабинет',
        icon: cabinet,
        activeIcon: cabinetActive,
        href: 'cabinet',
    },
    {
        title: 'Мои товары',
        icon: shopping,
        href: 'products',
    },
    {
        title: 'Мои заказы',
        icon: list,
        href: 'orders',
    },
    {
        title: 'Финансы',
        icon: chart,
        href: 'finance',
    },
    {
        title: 'База знаний',
        icon: database,
        href: 'knowledge_base',
    },
    {
        title: 'Доп. услуги',
        icon: services,
        href: 'additional_services',
    },
    {
        title: 'Обуч. модуль',
        icon: study,
        href: 'learning',
    },
    {
        title: 'Контактная форма',
        href: 'contacts-form',
    }
];

const partnerMenu = [
    {
        title: 'Мой кабинет',
        icon: cabinet,
        activeIcon: cabinetActive,
        href: 'cabinet',
    },
    {
        title: 'Мой магазин',
        icon: home,
        href: 'store',
    },
    {
        title: 'Все товары',
        icon: cart,
        href: 'categories',
    },
    {
        title: 'Мои заказы',
        icon: list,
        href: 'orders',
    },
    {
        title: 'Финансы',
        icon: chart,
        href: 'finance',
    },
    {
        title: 'Мои товары',
        icon: shopping,
        href: 'my_products',
    },
    {
        title: 'База знаний',
        icon: database,
        href: 'knowledge_base',
    },
    {
        title: 'Доп. услуги',
        icon: services,
        href: 'additional_services',
    },
    {
        title: 'Обуч. модуль',
        icon: study,
        href: 'learning',
    },
    {
        title: 'Контактная форма',
        icon: сontacts,
        href: 'contacts-form',
    }
];

class NavBar extends Component {

    render() {
        const navigation = this.props.user.role === 'CONTRACTOR' ? contractorMenu : partnerMenu;

        return (
            <div className={styles.navigationBar}>
                {navigation.map((item, index) => (
                    <NavLink
                        className={styles.menuItem}
                        key={index}
                        to={`/admin/${item.href}`}>
                        <img src={item.icon} alt="" className={styles.icon}/>
                        <img src={item.activeIcon} alt="" className={styles.activeIcon}/>

                        {item.title}
                    </NavLink>

                ))}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);