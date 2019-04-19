import React, {Component} from 'react'
import 'antd/dist/antd.css';
import styles from './Categories.module.css'


import { Menu, Icon } from 'antd';
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
                    {category.subcategories ? category.subcategories.map(item => (
                        <Menu.Item key={item.id}>
                            {item.name}
                        </Menu.Item>
                    )) : ''}
                </SubMenu>
            ))}
        </Menu>
    );
};

export default CategoryList;





