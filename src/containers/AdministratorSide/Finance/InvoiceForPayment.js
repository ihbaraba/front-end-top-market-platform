import React, {Component} from 'react'
import styles from './Finance.module.css'
import 'antd/dist/antd.css';
import { Table } from 'antd'
import  download  from "../../../img/download-button.svg";


const dataSource = [{
    key: '1',
    date: '03/03/2019 14:12',
    type: 'Роялти',
    accountNumber: 'МП-2321312313',
    cost: '7000.00 грн',
    status: 'Оплачено',
}, {
    key: '2',
    date: '03/03/2019 14:12',
    type: 'Роялти',
    accountNumber: 'МП-2321312313',
    cost: '7000.00 грн',
    status: 'Оплачено',
}, {
    key: '3',
    date: '03/03/2019 14:12',
    type: 'Роялти',
    accountNumber: 'МП-2321312313',
    cost: '7000.00 грн',
    status: 'Оплачено',
}, {
    key: '4',
    date: '03/03/2019 14:12',
    type: 'Роялти',
    accountNumber: 'МП-2321312313',
    cost: '7000.00 грн',
    status: 'Оплачено',
}, {
    key: '5',
    date: '03/03/2019 14:12',
    type: 'Роялти',
    accountNumber: 'МП-2321312313',
    cost: '7000.00 грн',
    status: 'Оплачено',
}];

const columns = [{
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
}, {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
}, {
    title: 'Номер счета',
    dataIndex: 'accountNumber',
    key: 'accountNumber',
}, {
    title: 'Сумма',
    dataIndex: 'cost',
    key: 'cost',
}, {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
}, {
    render: () => (
        <span>
            <button className={styles.download}><img src={download} alt="download"/></button>
        </span>
    ),
}];

class InvoiceForPayment extends Component {

    render() {
        return (
            <div className={styles.invoiceForPayment}>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

export default InvoiceForPayment;





