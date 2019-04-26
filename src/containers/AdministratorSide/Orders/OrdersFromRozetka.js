import React, {Component} from 'react'
import styles from './Orders.module.css'
import {Tabs, Table} from 'antd';
import SearchOrders from "./SearchOrders";
import {getOrders} from '../../../actions/ordersAction';
import moment from 'moment';
import {statusList} from './statusList';
import {connect} from "react-redux";

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
            return (
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

    getOrders1 = async ({id, min_date, max_date, status, user_fio, user_phone, page=1}) => {
        const {currentPage} = this.state;

        const urlParams = [
            id ? `&id=${id}` : '',
            min_date ? `&min_date=${min_date}` : '',
            max_date ? `&max_date=${max_date}` : '',
            status ? `&status=${status}` : '',
            user_fio ? `&user_fio=${user_fio}` : '',
            user_phone ? `&user_phone=${user_phone}` : '',
        ];

        const url1 = `?status_group=1&page=${page + urlParams.join('')}`;
        const res1 = await getOrders(url1);

        this.setState({
            orders1: res1.results,

            count1: res1.count,
        })
    };

    getOrders2 = async ({id, min_date, max_date, status, user_fio, user_phone, page=1}) => {
        const {currentPage} = this.state;

        const urlParams = [
            id ? `&id=${id}` : '',
            min_date ? `&min_date=${min_date}` : '',
            max_date ? `&max_date=${max_date}` : '',
            status ? `&status=${status}` : '',
            user_fio ? `&user_fio=${user_fio}` : '',
            user_phone ? `&user_phone=${user_phone}` : '',
        ];

        const url2 = `?status_group=2&page=${page + urlParams.join('')}`;
        const res2 = await getOrders(url2);

        this.setState({
            orders2: res2.results,
            count2: res2.count,
        })
    };

    getOrders3 = async ({id, min_date, max_date, status, user_fio, user_phone, page=1}) => {
        const {currentPage} = this.state;

        const urlParams = [
            id ? `&id=${id}` : '',
            min_date ? `&min_date=${min_date}` : '',
            max_date ? `&max_date=${max_date}` : '',
            status ? `&status=${status}` : '',
            user_fio ? `&user_fio=${user_fio}` : '',
            user_phone ? `&user_phone=${user_phone}` : '',
        ];

        const url3 = `?status_group=3&page=${page + urlParams.join('')}`;
        const res3 = await getOrders(url3);

        this.setState({
            orders3: res3.results,
            count3: res3.count,
        })
    };

    handleChangeTable = (e, type) => {
        if (type === '1') {
            this.getOrders1({page: e.current})
        } else if(type === '2') {
            this.getOrders2({page: e.current})
        } else if(type === '3') {
            this.getOrders3({page: e.current})
        }
    };

    componentDidMount() {
        if (this.props.user.role !== 'CONTRACTOR') {
            this.getOrders1('');
            this.getOrders2('');
            this.getOrders3('');
        }
    };

    render() {
        const {count1, count2, count3, currentPage} = this.state,

            config1 = {
                pagination: {
                    pageSize: 10,
                    total: count1,
                    current: currentPage
                }
            },
            config2 = {
                pagination: {
                    pageSize: 10,
                    total: count2,
                    current: currentPage
                }
            },
            config3 = {
                pagination: {
                    pageSize: 10,
                    total: count3,
                    current: currentPage
                }
            };


        const {orders1, orders2, orders3,} = this.state;
        return (
            <div>
                <SearchOrders
                    onSearch={this.getOrders}
                />

                <Tabs onChange={callback} type="card">
                    <TabPane tab="В обработке" key="1">
                        <div>
                            <Table
                                {...config1}
                                columns={columns}
                                expandedRowRender={record => <span>
                                    {record.description}
                                </span>}
                                dataSource={orders1}
                                onChange={(e) => this.handleChangeTable(e, '1')}
                            />
                        </div>
                    </TabPane>

                    <TabPane tab="Успешно завершены" key="2">
                        <div>
                            <Table
                                {...config2}
                                columns={columns}
                                expandedRowRender={record => <span>
                                    {record.description}
                                </span>}
                                dataSource={orders2}
                                onChange={(e) => this.handleChangeTable(e, '2')}
                            />
                        </div>

                    </TabPane>

                    <TabPane tab="Неуспешно завершены" key="3">
                        <div>
                            <Table
                                {...config3}
                                columns={columns}
                                expandedRowRender={record => <span>
                                    {record.description}
                                </span>}
                                dataSource={orders3}
                                onChange={(e) => this.handleChangeTable(e, '3')}
                            />
                        </div>

                    </TabPane>
                </Tabs>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersFromRozetka);





