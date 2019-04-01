import React, {Component} from 'react'
import styles from './Employees.module.css'
import 'antd/dist/antd.css';
import {Table} from "antd";
import avatar from "../../../img/avatar.png";


const dataSource = [{
    key: '1',
    name: 'Имя:Роман ',
    avatar: avatar,
    surname: 'Фамилия: Кукшин',
    patronymic:  "Отчество: Анатольевич",
    accessRights: 'Права доступа: Владелец',
    phone: 'Телефон: +38099888777',
}, {
    key: '2',
    name: 'iPhone XR 64GB Space Grey ',
    avatar: avatar,
    surname: 'Фамилия: Кукшин',
    patronymic:  "Отчество: Анатольевич",
    accessRights: 'Права доступа: Владелец',
    phone: 'Телефон: +38099888777',
}, {
    key: '3',
    name: 'iPhone XR 64GB Space Grey ',
    avatar: avatar,
    surname: 'Фамилия: Кукшин',
    patronymic:  "Отчество: Анатольевич",
    accessRights: 'Права доступа: Владелец',
    phone: 'Телефон: +38099888777',
}, {
    key: '4',
    name: 'iPhone XR 64GB Space Grey ',
    avatar: avatar,
    surname: 'Фамилия: Кукшин',
    patronymic:  "Отчество: Анатольевич",
    accessRights: 'Права доступа: Владелец',
    phone: 'Телефон: +38099888777',
}, {
    key: '5',
    name: 'iPhone XR 64GB Space Grey ',
    avatar: avatar,
    surname: 'Фамилия: Кукшин',
    patronymic:  "Отчество: Анатольевич",
    accessRights: 'Права доступа: Владелец',
    phone: 'Телефон: +38099888777',
}];

const columns = [{
    render: (name, item) => (
        <span className={styles.userName}>
            <span className={styles.userImg}>
                <img src={item.avatar} alt=""/>
            </span>
            <span>
                {name}
            </span>
        </span>
    ),
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Фамилия',
    dataIndex: 'surname',
    key: 'surname',
}, {
    title: 'Количество',
    dataIndex: 'patronymic',
    key: 'patronymic',
}, {
    title: 'Права доступа',
    dataIndex: 'accessRights',
    key: 'accessRights',
}, {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
}];





class Employees extends Component {
    render() {
        return (
            <div>
                <div className={styles.top}>
                    <h3 className={styles.title}>Сотрудники</h3>
                    <button className={styles.addBtn}>Добавить сотрудника</button>
                </div>
                <div className={styles.employeesTable}>
                    <div className={styles.searchEmployees}>
                        <input type="search"/>
                        <select className={styles.choosePosition}>
                            <option value="" disabled selected hidden>Должность</option>
                            <option>Админ</option>
                            <option>Админ</option>
                            <option>Админ</option>
                        </select>
                        <select className={styles.selectRights}>
                            <option value="" disabled selected hidden>Права доступа</option>
                            <option>Владелец</option>
                            <option>Владелец</option>
                            <option>Владелец</option>
                        </select>
                        <div>
                            <input type="submit" value=" "/>
                        </div>
                    </div>
                    <Table dataSource={dataSource} columns={columns} showHeader={false}  className={styles.productTable} />
                </div>
            </div>
        );
    }
}

export default Employees;





