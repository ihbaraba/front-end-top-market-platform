import React, {Component} from 'react'
import styles from './Finance.module.css'
import 'antd/dist/antd.css';
import { Table } from 'antd'

const dataSource = [{
    key: '1',
    type: 'Новый заказ',
    orderNumber: 12412412515,
    vendorCode: '5kj834Ad421',
    date: '03/03/2019 14:12',
    amount: '1 шт',
    cost: '418200 грн',
    change: '+418.20 (10)%'
}, {
    key: '2',
    type: 'Новый заказ',
    orderNumber: 12412412515,
    vendorCode: '5kj834Ad421',
    date: '03/03/2019 14:12',
    amount: '1 шт',
    cost: '418200 грн',
    change: '+418.20 (10)%'
}, {
    key: '3',
    type: 'Новый заказ',
    orderNumber: 12412412515,
    vendorCode: '5kj834Ad421',
    date: '03/03/2019 14:12',
    amount: '1 шт',
    cost: '418200 грн',
    change: '+418.20 (10)%'
}, {
    key: '4',
    type: 'Новый заказ',
    orderNumber: 12412412515,
    vendorCode: '5kj834Ad421',
    date: '03/03/2019 14:12',
    amount: '1 шт',
    cost: '418200 грн',
    change: '+418.20 (10)%'
}, {
    key: '5',
    type: 'Новый заказ',
    orderNumber: 12412412515,
    vendorCode: '5kj834Ad421',
    date: '03/03/2019 14:12',
    amount: '1 шт',
    cost: '418200 грн',
    change: '+418.20 (10)%'
}];

const columns = [{
    title: () =>{
        return(
            <span>
                <h4>Тип операции</h4>
                <select className={styles.orderType}>
                    <option>Новый заказ</option>
                    <option>Новый заказ</option>
                </select>
            </span>
        )
    },
    dataIndex: 'type',
    key: 'type',
}, {
    title: () =>{
        return(
            <span>
                <h4>Номер заказа</h4>
                <input type="text" className={styles.orderNumber}/>
            </span>
        )
    },
    dataIndex: 'orderNumber',
    key: 'orderNumber',
}, {
    title: () =>{
        return(
            <span>
                <h4>Артикул</h4>
                <input type="text" className={styles.orderNumber}/>
            </span>
        )
    },
    dataIndex: 'vendorCode',
    key: 'vendorCode',
}, {
    title: () =>{
        return(
            <span>
                <h4>Дата операции</h4>
                <input type="date" className={styles.orderDate}/>
            </span>
        )
    },
    dataIndex: 'date',
    key: 'date',
}, {
    title: () =>{
        return(
            <span>
                <h4>Кол-во</h4>
                <div className={styles.empty}></div>
            </span>
        )
    },
    dataIndex: 'amount',
    key: 'amount',
}, {
    title: () =>{
        return(
            <span>
                <h4>Стоимость</h4>
                <div className={styles.empty}></div>
            </span>
        )
    },
    dataIndex: 'cost',
    key: 'cost',
}, {
    title: () =>{
        return(
            <span>
                <h4>Изменение</h4>
                <div className={styles.empty}></div>
            </span>
        )
    },
    dataIndex: 'change',
    key: 'change',
}];


class TransactionHistory extends Component {

    render() {
        return (
            <div className={styles.transactionHistory}>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

export default TransactionHistory;





