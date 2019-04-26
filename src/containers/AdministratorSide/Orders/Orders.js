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
                <h3 className={styles.title}>Мои заказы (Находится в разработке)</h3>

                <Tabs onChange={callback} type="card">
                    <TabPane tab="Заказы из Rozetka (10)" key="1">
                        <OrdersFromRozetka/>
                    </TabPane>
                    <TabPane tab="Заказы из Top Market (0)" disabled key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Заказы из Prom.ua (0)" disabled key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Orders;





