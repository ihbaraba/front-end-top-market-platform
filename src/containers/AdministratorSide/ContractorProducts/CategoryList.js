import React, {Component} from 'react'
import 'antd/dist/antd.css';
import styles from './ContractorProducts.module.css'


import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function handleClick(e) {
    console.log('click', e);
}


const CategoryList = ({categories}) => {

    return (
        <Menu onClick={handleClick} className={styles.categoryList}>
            {categories.map(category => (
                <SubMenu key={category.id} title={<span>{category.name}</span>}>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            ))}
        </Menu>
    );
};

export default CategoryList;





