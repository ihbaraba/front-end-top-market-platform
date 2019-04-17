import React, {Component} from 'react'
import styles from './Orders.module.css'
import { Tabs, Table } from 'antd';
import SearchOrders from "./SearchOrders";


const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}


class OrdersFromRozetka extends Component {




    render() {
        return (
            <div>
                <SearchOrders/>
                <Tabs onChange={callback} type="card">
                    <TabPane tab="В обработке (12)" key="1">
                        <div>

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





