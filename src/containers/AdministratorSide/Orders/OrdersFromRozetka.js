import React, {Component} from 'react'
import styles from './Orders.module.css'
import { Tabs, Table } from 'antd';
import SearchOrders from "./SearchOrders";


const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}


const columns = [
    { title: '№ заказа', dataIndex: 'orderNumber', key: 'orderNumber' },
    { title: 'Дата заказа', dataIndex: 'dateOrder', key: 'dateOrder' },
    { title: 'Товар', dataIndex: 'product', key: 'product' },
    { title: 'Поставщик', dataIndex: 'provider', key: 'provider' },
    { title: 'Сумма', dataIndex: 'amount', key: 'amount' },
    { title: 'Статус заказа', dataIndex: 'statusOrder', key: 'statusOrder' },

];

const data = [
    {
        key: 1, orderNumber: 123414415,
        dateOrder: '03/03/2019 14:12',
        product: 'New York No. 1 Lake Park',
        provider: 'Nike Inc.',
        amount: '5834.00 грн',
        statusOrder: 'В пункте самовывоза ТТН: 20450123054480',
        description: 'descriotion',

    },

];






class OrdersFromRozetka extends Component {




    render() {
        return (
            <div>
                <SearchOrders/>
                <Tabs onChange={callback} type="card">
                    <TabPane tab="В обработке (12)" key="1">
                        <div>
                            <Table
                                columns={columns}
                                expandedRowRender={record => <span>
                                    {record.description}
                                </span>}
                                dataSource={data}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="Успешно завершены" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Неуспешно завершены" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        );
    }
}

export default OrdersFromRozetka;





