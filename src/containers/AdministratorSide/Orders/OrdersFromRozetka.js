import React, {Component} from 'react'
import styles from './Orders.module.css'
import {Tabs, Table} from 'antd';
import SearchOrders from "./SearchOrders";
import {getOrders} from '../../../actions/ordersAction';
import moment from 'moment';
import {statusList} from './statusList';

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

const columns = [
    {
        title: '№ заказа',
        dataIndex: 'id',
        key: 'orderNumber'
    },
    {
        title: 'Дата заказа',
        dataIndex: 'dateOrder',
        key: 'dateOrder',
        render: (date) => (<span>{moment(date).format('DD-MM-YYYY HH:mm')}</span>)
    },
    {
        title: 'Товар',
        dataIndex: 'itemPhotos',
        key: 'itemPhotos',
        render: (itemPhotos) => (
            <span className='product-avatar'>
                <img
                    src={itemPhotos.length > 0 ? itemPhotos[0].url : ''}
                    alt=""/>
            </span>
        )

    },
    {
        title: 'Поставщик',
        dataIndex: 'provider',
        key: 'provider'
    },
    {
        title: 'Сумма',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: 'Статус заказа',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            let selectedStatus = statusList.find(item => item.id === status);
            return(
                <span>{selectedStatus.title}</span>
            )
        }
    },

];

class OrdersFromRozetka extends Component {

    state = {
        orders: [],

        count: 0,
        currentPage: 1,

    };

    getOrders = async ({id, min_date, max_date, status, user_fio, user_phone}) => {
        const {currentPage} = this.state;

        const urlParams = [
            id ? `&id=${id}` : '',
            min_date ? `&min_date=${min_date}` : '',
            max_date ? `&max_date=${max_date}` : '',
            status ? `&status=${status}` : '',
            user_fio ? `&user_fio=${user_fio}` : '',
            user_phone ? `&user_phone=${user_phone}` : '',
        ];
        console.log(urlParams);

        const url = `?page=${currentPage + urlParams.join('')}`;
        const res = await getOrders(url);

        this.setState({
            orders: res.results,
            count: res.count
        })
    };

    componentDidMount() {
        this.getOrders('')
    };

    render() {
        const {orders} = this.state;
        return (
            <div>
                <SearchOrders
                    onSearch={this.getOrders}
                />

                <Tabs onChange={callback} type="card">
                    <TabPane tab="В обработке" key="1">
                        <div>
                            <Table
                                columns={columns}
                                expandedRowRender={record => <span>
                                    {record.description}
                                </span>}
                                dataSource={orders}
                            />
                        </div>
                    </TabPane>

                    <TabPane tab="Успешно завершены" disabled key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Неуспешно завершены" disabled key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </div>
        );
    }
}

export default OrdersFromRozetka;





