import React, {Component} from 'react'
import styles from './Finance.module.css'
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import TransactionHistory from "./TransactionHistory";
import SettlementTable from "./SettlementTable";
import InvoiceForPayment from "./InvoiceForPayment";
import SalesReport from "./SalesReport";
const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

class Finance extends Component {

    render() {
        return (
            <div >
                <h3 className={styles.title}>Финансы и баланс</h3>
                <Tabs onChange={callback} type="card">
                    <TabPane tab="История транзакций" key="1">
                        <div className={styles.balanceInfo}>
                            <div className={styles.paidForPeriod}>
                                <h5>Выплачено за весь период</h5>
                                <span>
                                    <span className={styles.balance}> 19434.00</span>
                                    грн
                                </span>
                            </div>
                            <div className={styles.ordersInProcessed}>
                                <h5>Заказы в обработке</h5>
                                <span>
                                    <span className={styles.balance}> 434.00</span>
                                    грн
                                </span>
                            </div>
                            <div className={styles.availableForPayment}>
                                <h5>Доступно к выплате</h5>
                                <span>
                                    <span className={styles.balance}> 0.00</span>
                                    грн
                                </span>
                            </div>
                            <div className={styles.balanceActions}>
                                <button className={styles.withdraw}>Вывести</button>
                                <button className={styles.replenish}>Пополнить</button>
                            </div>
                        </div>

                        <TransactionHistory/>
                        <h3 className={styles.title}>Таблица взаиморасчетов</h3>
                        <SettlementTable/>


                    </TabPane>
                    <TabPane tab="Счета на оплату" key="2">
                        <div className={styles.bill}>
                            <div >
                                <h4>Дата выставления счета</h4>
                                <input type="date"/>
                                <input type="date"/>
                            </div>
                            <div>
                                <h4>Тип</h4>
                                <select></select>
                            </div>
                            <div>
                                <h4>Номер счета</h4>
                                <input type="text" className={styles.accountNumber}/>
                            </div>

                            <div>
                                <h4>Сумма заказа</h4>
                                <input type="text"  className={styles.orderPrice}/>
                                <input type="text"  className={styles.orderPrice}/>
                            </div>
                            <button className={styles.find}>Поиск</button>
                        </div>
                        <h3 className={styles.title}>Финансы и баланс</h3>
                        <InvoiceForPayment/>
                    </TabPane>
                    <TabPane tab="Отчет о реализованных товарах" key="3">
                        <div className={styles.salesReport}>
                            <div>
                                <h4>Дата выставления счета</h4>
                                <input type="date"/>
                                <input type="date"/>
                            </div>
                            <button className={styles.find}>Поиск</button>
                        </div>
                        <h3 className={styles.title}>Отчет реализованных товарах</h3>
                        <SalesReport/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Finance;





