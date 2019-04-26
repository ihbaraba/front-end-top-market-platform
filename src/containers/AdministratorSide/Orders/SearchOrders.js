import React, {Component} from 'react'
import styles from './Orders.module.css'


const statusList = [
    {
        id: 1,
        title: 'Новый заказ'
    },
    {
        id: 2,
        title: 'Данные подтверждены. Ожидает отправки'
    },
    {
        id: 3,
        title: 'Передан в службу доставки'
    },
    {
        id: 4,
        title: 'Доставляется'
    },
    {
        id: 5,
        title: 'Ожидает в пункте самовывоза'
    },
    {
        id: 6,
        title: 'Посылка получена'
    },
    {
        id: 7,
        title: 'Не обработан продавцом'
    },
    {
        id: 10,
        title: 'Отправка просрочена'
    },
    {
        id: 11,
        title: 'Не забрал посылку'
    },
    {
        id: 12,
        title: 'Отказался от товара'
    },
    {
        id: 13,
        title: 'Отменен Администратором'
    },
    {
        id: 15,
        title: 'Некорректный ТТН'
    },
    {
        id: 16,
        title: 'Нет в наличии/брак'
    },
    {
        id: 17,
        title: 'Отмена. Не устраивает оплата'
    },
    {
        id: 18,
        title: 'Не удалось связаться с покупателем'
    },
    {
        id: 19,
        title: 'Возврат'
    },
    {
        id: 20,
        title: 'Отмена. Не устраивает товар'
    },
    {
        id: 24,
        title: 'Отмена. Не устраивает доставка'
    },
    {
        id: 25,
        title: 'Тестовый заказ'
    },
    {
        id: 26,
        title: 'Обрабатывается менеджером'
    },
    {
        id: 27,
        title: 'Требует доукомплектации'
    },
    {
        id: 28,
        title: 'Некорректные контактные данные'
    },
    {
        id: 29,
        title: 'Отмена. Некорректная цена на сайте'
    },
    {
        id: 30,
        title: 'Истек срок резерва'
    },
    {
        id: 31,
        title: 'Отмена. Заказ восстановлен'
    },
    {
        id: 32,
        title: 'Отмена. Не устраивает разгруппировка заказа'
    },
    {
        id: 33,
        title: 'Отмена. Не устраивает стоимость доставки'
    },
    {
        id: 34,
        title:
            'Отмена. Не устраивает перевозчик, способ доставки'
    },
    {
        id: 35,
        title: 'Отмена. Не устраивают сроки доставки'
    },
    {
        id: 36,
        title:
            'Отмена. Клиент хочет оплату по безналу. У продавца нет такой возможности'
    },
    {
        id: 37,
        title: 'Отмена. Не устраивает предоплата'
    },
    {
        id: 38,
        title: 'Отмена. Не устраивает качество товара'
    },
    {
        id: 39,
        title:
            'Отмена. Не подошли характеристики товара (цвет,размер)'
    },
    {
        id: 40,
        title: 'Отмена. Клиент передумал'
    },
    {
        id: 41,
        title: 'Отмена. Купил на другом сайте'
    },
    {
        id: 42,
        title: 'Нет в наличии'
    },
    {
        id: 43,
        title: 'Брак'
    },
    {
        id: 44,
        title: 'Отмена. Фейковый заказ'
    },
    {
        id: 45,
        title: 'Отменен покупателем'
    },
    {
        id: 46,
        title: 'Восстановлен при прозвоне'
    },
    {
        id: 47,
        title: 'Обрабатывается менеджером (не удалось связаться 1-ый раз)'
    },
    {
        id: 48,
        title: 'Обрабатывается менеджером (не удалось связаться 2-ой раз)'
    },
];


class SearchOrders extends Component {
    state = {
        id: '',
        min_date: '',
        max_date: '',
        status: '',
        user_fio: '',
        user_phone: ''
    };

    handleChangeInput = ({target: {value, name}}) => {
        this.setState({
            [name]: value
        })
    };

    render() {
        const {
            id,
            min_date,
            max_date,
            status,
            user_fio,
            user_phone
        } = this.state;

        return (
            <div>
                <form className={styles.searchOrders}>
                    <div className={styles.orderNumber}>
                        <label>Номер заказа</label>
                        <input type="text"
                               name='id'
                               value={id}
                               onChange={this.handleChangeInput}
                        />
                    </div>
                    <div className={styles.orderDate}>
                        <label>Дата заказа</label>
                        <input type="date" name='min_date' value={min_date} onChange={this.handleChangeInput}/>
                        <input type="date" name='max_date' value={max_date} onChange={this.handleChangeInput}/>
                    </div>
                    <div className={styles.orderStatus}>
                        <label>Статус заказа</label>
                        <select name='status' value={status} onChange={this.handleChangeInput}>
                            {statusList.map(item => (
                                <option value={item.id} key={item.id}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.name}>
                        <label>ФИО покупателя</label>
                        <input type="text"
                               name='user_fio'
                               value={user_fio}
                               onChange={this.handleChangeInput}
                        />
                    </div>
                    <div className={styles.phone}>
                        <label>Телефон</label>
                        <input type="tel"
                               name='user_phone'
                               value={user_phone}
                               onChange={this.handleChangeInput}
                        />
                    </div>
                    <button className={styles.find} type='button' onClick={() => this.props.onSearch(this.state)}>Поиск</button>

                </form>
            </div>
        );
    }
}

export default SearchOrders;



