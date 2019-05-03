import React, {Component} from 'react'
import styles from './Orders.module.css'
import { Tabs } from 'antd';
import OrdersFromRozetka from "./OrdersFromRozetka";
const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

class Orders extends Component {

    render() {
        return (
            <div>
                <h3 className={styles.title}>Мои заказы</h3>

                <Tabs onChange={callback} type="card">
                    <TabPane tab="Заказы из Rozetka" key="1">
                        <OrdersFromRozetka/>
                    </TabPane>

                    <TabPane tab="Заказы из Top Market" disabled key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Заказы из Prom.ua" disabled key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Orders;





