import React, {Component} from 'react'
import styles from './Orders.module.css'



class SearchOrders extends Component {




    render() {
        return (
            <div>
                <form className={styles.searchOrders}>
                    <div className={styles.orderNumber}>
                        <label>Номер заказа</label>
                        <input type="text"/>
                    </div>
                    <div className={styles.orderDate}>
                        <label>Дата заказа</label>
                        <input type="date"/>
                        <input type="date"/>
                    </div>
                    <div className={styles.orderStatus}>
                        <label>Статус заказа</label>
                        <select>
                            <option>Активный</option>
                            <option>Не активный</option>
                        </select>
                    </div>
                    <div className={styles.name}>
                        <label>ФИО покупателя</label>
                        <input type="text"/>
                    </div>
                    <div className={styles.phone}>
                        <label>Телефон</label>
                        <input type="tel"/>
                    </div>
                    <button className={styles.find}>Поиск</button>

                </form>
            </div>
        );
    }
}

export default SearchOrders;



