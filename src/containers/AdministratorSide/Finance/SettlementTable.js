import React, {Component} from 'react'
import styles from './Finance.module.css'
import 'antd/dist/antd.css';
import { Table } from 'antd'

const dataSource = [{
    key: '1',
    orderNumber: 123414415,
    date: '03/03/2019 14:12',
    сustomer: 'Кукшин Роман Анатольевич',
    product: 'iPhone XR 64GB Space Grey',
    city: 'Киев',
    payment: 'Картой',
    ttn: '124144214214',
    cost: '5834.00 грн',
    rozetka: '583.00 грн',
}, {
    key: '2',
    orderNumber: 123414415,
    date: '03/03/2019 14:12',
    сustomer: 'Кукшин Роман Анатольевич',
    product: 'iPhone XR 64GB Space Grey',
    city: 'Киев',
    payment: 'Картой',
    ttn: '124144214214',
    cost: '5834.00 грн',
    rozetka: '583.00 грн',
}, {
    key: '3',
    orderNumber: 123414415,
    date: '03/03/2019 14:12',
    сustomer: 'Кукшин Роман Анатольевич',
    product: 'iPhone XR 64GB Space Grey',
    city: 'Киев',
    payment: 'Картой',
    ttn: '124144214214',
    cost: '5834.00 грн',
    rozetka: '583.00 грн',
}, {
    key: '4',
    orderNumber: 123414415,
    date: '03/03/2019 14:12',
    сustomer: 'Кукшин Роман Анатольевич',
    product: 'iPhone XR 64GB Space Grey',
    city: 'Киев',
    payment: 'Картой',
    ttn: '124144214214',
    cost: '5834.00 грн',
    rozetka: '583.00 грн',
}, {
    key: '5',
    orderNumber: 123414415,
    date: '03/03/2019 14:12',
    сustomer: 'Кукшин Роман Анатольевич',
    product: 'iPhone XR 64GB Space Grey',
    city: 'Киев',
    payment: 'Картой',
    ttn: '124144214214',
    cost: '5834.00 грн',
    rozetka: '583.00 грн',
},
];

const columns = [{
    title: 'Номер заказа',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
},  {
    title: 'Дата  заказа',
    dataIndex: 'date',
    key: 'date',
}, {
    title: 'Заказчик',
    dataIndex: 'сustomer',
    key: 'сustomer',
}, {
    title: 'Товар',
    dataIndex: 'product',
    key: 'product',
}, {
    title: 'Город',
    dataIndex: 'city',
    key: 'city',
}, {
    title: 'Оплата',
    dataIndex: 'payment',
    key: 'payment',
}, {
    title: 'ТНН',
    dataIndex: 'ttn',
    key: 'ttn',
}, {
    title: 'Сумма',
    dataIndex: 'cost',
    key: 'cost',
}, {
    title: 'к Rozetka',
    dataIndex: 'rozetka',
    key: 'rozetka',
}];


class SettlementTable extends Component {

    render() {
        return (
            <div className={styles.settlementTable}>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

export default SettlementTable;





