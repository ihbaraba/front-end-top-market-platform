import React, {Component} from 'react';
import {Tooltip, Menu, Icon} from 'antd';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import styles from './NavBar.module.css'
import 'antd/dist/antd.css';
import CategoryList from "./CategoryList";

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


import {selectedCategory} from "../../../../actions/userActions";
import {getAllCategories} from "../../../../actions/productsActions";

const SubMenu = Menu.SubMenu;

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
        title: 'Все товары',
        icon: cart,
        activeIcon: cartActive,
        href: 'categories',
        developing: false
    },
    {
        title: 'Мои товары',
        icon: shopping,
        activeIcon: shoppingActive,
        href: 'my_products',
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
    state = {
        collapsed: false,
        categories: [],
        selectedItem: 'Мои товары'
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleChangeCategory = (category) => {
        console.log(category);
        this.props.selectedCategory(category.key)
    };

    async componentDidMount() {
        const res = await getAllCategories();
        this.setState({
            categories: res
        });
    }

    render() {
        const navigation = this.props.user.role === 'CONTRACTOR' ? contractorMenu : partnerMenu,
            {
                selectedItem,
                categories
            } = this.state;


        return (
            <div className={styles.navigationBar}>
                <Menu
                    mode="inline"
                    inlineCollapsed={this.state.collapsed}
                >
                    <div onClick={this.toggleCollapsed} className={styles.navButton}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                    </div>

                    {navigation.map((item, index) => {
                        if (item.developing) {
                            return (
                                <Menu.Item key={index} onClick={() => this.setState({selectedItem: item.title})}>
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
                                </Menu.Item>
                            )
                        } else {
                            return (
                                <Menu.Item key={index} onClick={() => this.setState({selectedItem: item.title})}>
                                    <NavLink
                                        className={styles.menuItem}
                                        key={index}
                                        to={`/admin/${item.href}`}>
                                        <img src={item.icon} alt="" className='default-icon'/>
                                        <img src={item.activeIcon} alt="" className='active-icon'/>

                                        {item.title}
                                    </NavLink>

                                    {(item.title === 'Мои товары' && selectedItem === 'Мои товары') ?
                                        <CategoryList
                                            categories={categories}
                                            onSelectCategory={this.handleChangeCategory}
                                        /> : ''}
                                </Menu.Item>
                            )
                        }
                    })}
                </Menu>
            </div>

        )
    }
}


const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    selectedCategory: (category) => dispatch(selectedCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);