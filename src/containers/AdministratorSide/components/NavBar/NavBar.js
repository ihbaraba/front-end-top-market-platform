import React, {Component} from 'react';
import {Tooltip} from 'antd';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import styles from './NavBar.module.css'
import 'antd/dist/antd.css';

import cabinet from '../../../../img/navIcons/user.svg';
import cabinetActive from '../../../../img/navIcons/user2.svg';

import home from '../../../../img/navIcons/home.svg';
import homeActive from '../../../../img/navIcons/home-active.svg';

import cart from '../../../../img/navIcons/shopping-cart.svg';
import cartActive from '../../../../img/navIcons/shopping-cart2.svg';

import list from '../../../../img/navIcons/list.svg';
import listActive from '../../../../img/navIcons/list2.svg';

import chart from '../../../../img/navIcons/pie-chart.svg';
import chartActive from '../../../../img/navIcons/pie-chart2.svg';

import shopping from '../../../../img/navIcons/shopping-bag.svg';
import shoppingActive from '../../../../img/navIcons/shopping-bag2.svg';

import database from '../../../../img/navIcons/database.svg';
import databaseActive from '../../../../img/navIcons/database2.svg';

import services from '../../../../img/navIcons/add-button-inside-black-circle.svg';
import servicesActive from '../../../../img/navIcons/add-button-inside-black-circle2.svg';

import study from '../../../../img/navIcons/teacher-reading.svg';
import studyActive from '../../../../img/navIcons/teacher-reading2.svg';

import сontact from '../../../../img/navIcons/contact.svg';
import сontactActive from '../../../../img/navIcons/contact-active.svg';


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
        activeIcon: shoppingActive,
        href: 'products',
        developing: false
    },
    {
        title: 'Мои заказы',
        icon: list,
        activeIcon: listActive,
        href: 'contractor_orders',
        developing: false
    },
    {
        title: 'Финансы',
        icon: chart,
        activeIcon: chartActive,
        href: 'finance',
        developing: true
    },
    {
        title: 'База знаний',
        icon: database,
        activeIcon: databaseActive,
        href: 'knowledge_base',
        developing: true
    },
    {
        title: 'Доп. услуги',
        icon: services,
        activeIcon: servicesActive,
        href: 'additional_services',
        developing: true
    },
    {
        title: 'Обуч. модуль',
        icon: study,
        activeIcon: studyActive,
        href: 'learning',
        developing: true
    },
    {
        title: 'Контактная форма',
        icon: сontact,
        activeIcon: сontactActive,
        href: 'contacts-form',
    }
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
        activeIcon: homeActive,
        href: 'store',
        developing: true
    },
    {
        title: 'Все товары',
        icon: cart,
        activeIcon: cartActive,
        href: 'categories',
        developing: false
    },
    {
        title: 'Мои заказы',
        icon: list,
        activeIcon: listActive,
        href: 'orders',
        developing: false
    },
    {
        title: 'Финансы',
        icon: chart,
        activeIcon: chartActive,
        href: 'finance',
        developing: true
    },
    {
        title: 'Мои товары',
        icon: shopping,
        activeIcon: shoppingActive,
        href: 'my_products',
        developing: false
    },
    {
        title: 'База знаний',
        icon: database,
        activeIcon: databaseActive,
        href: 'knowledge_base',
        developing: true
    },
    {
        title: 'Доп. услуги',
        icon: services,
        activeIcon: servicesActive,
        href: 'additional_services',
        developing: true
    },
    {
        title: 'Обуч. модуль',
        icon: study,
        activeIcon: studyActive,
        href: 'learning',
        developing: true
    },
    {
        title: 'Контактная форма',
        icon: сontact,
        activeIcon: сontactActive,
        href: 'contacts-form',
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
                                    <img src={item.icon} alt="" className='default-icon'/>
                                    <img src={item.activeIcon} alt="" className='active-icon'/>

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
                                <img src={item.icon} alt="" className='default-icon'/>
                                <img src={item.activeIcon} alt="" className='active-icon'/>

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