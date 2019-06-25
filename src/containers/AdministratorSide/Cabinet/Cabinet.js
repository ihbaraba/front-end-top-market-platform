import React, {Component, Fragment} from 'react'
import styles from './Cabinet.module.css'
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import '../../../App.css';
import avatar from '../../../img/avatar.png';
import ava from "../../../img/ava.png";
import like from "../../../img/like.svg";
import comment from "../../../img/comments.svg";
import 'react-daypicker/lib/DayPicker.css';
import DayPicker from 'react-daypicker';
import {Table} from 'antd';
import {connect} from "react-redux";
import {Modal, Tooltip as TooltipAntd} from 'antd'
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

import {getProfile, sendInvoice} from '../../../actions/userActions';
import {getProfile as getCompanyProfile} from "../../../actions/companyActions";


const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},];

const dataSource = [{
    key: '1',
    period: 'Март 2019',
    date: "01/03 - 07/03",
    file: '10 Downing Street'
}, {
    key: '2',
    period: 'Март 2019',
    date: "01/03 - 07/03",
    file: '10 Downing Street'
}];

const columns = [{
    title: 'Отчетный период',
    dataIndex: 'period',
    key: 'period',
}, {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
}, {
    title: 'Exel файл',
    dataIndex: 'file',
    key: 'file',
}];


class Cabinet extends Component {

    state = {
        user: {},
        company: {},

        visible: false
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    handleSendInvoice = async () => {
        await sendInvoice({
            userPocket: 'BASE'
        });
        this.setState({
            visible: false
        })
    };

    async componentDidMount() {
        const [user, company] = await Promise.all([getProfile(), getCompanyProfile()]);

        this.setState({
            user,
            company
        });
    }

    render() {
        const {user, company} = this.state;

        return (
            <div className='page'>
                <h3 className='page-title'>{user.role === 'PARTNER' ? 'Кабинет продавца' : 'Кабинет поставщика'}</h3>

                <div className={`${styles.userCard} page-content`}>
                    <div className={styles.userBlock}>
                        <div className={styles.userContacts}>
                            <div className={styles.userImg}>
                                <img src={user.avatarImage || avatar} alt=""/>
                            </div>
                            <div className={styles.userInfo}>
                                <h5 className={styles.userName}> {`${user.firstName || "User"} ${user.lastName || ''}`}</h5>
                                <p>Статус: <span className={styles.notActivated}> Активирован</span></p>
                                <p>Статус Компании: <span className={styles.notActivated}> Активирован</span></p>
                                <p>E-Mail: <span> {user.email}</span></p>
                                <p>Компания:<span> {company.name}</span></p>
                                <p>Телефон: <span> {company.phone}</span></p>
                                <p>Веб-сайт:<span> {company.url}</span></p>
                            </div>
                        </div>
                        <Link to="/admin/profile_settings" className={styles.editBtn}>Редактировать профиль</Link>

                        {this.props.user.role === 'CONTRACTOR' ? '' :
                            <div className={styles.description}>
                                <p>Для того чтобы пользоваться услугами Маркетплейса, Вы должны приобрести один из вариантов
                                    пакетов доступа, цена на которые 27 000 грн, 45 000 и 59 000 грн. Все доступы,
                                    которые дает каждый пакет, указаны в описании.
                                </p>
                            </div>}
                    </div>

                    <div className={styles.videoTariff}>
                        <h4>Для чего нужен пакет</h4>
                        <div className={styles.videoBlock}>
                            <iframe  src="https://www.youtube.com/embed/MizPu-dTPQU"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                        </div>
                    </div>


                </div>

                {this.props.user.role === 'CONTRACTOR' ? '' :
                    <div className={styles.chooseTariff}>
                        <h3>Приобретите пакет</h3>
                        <div className={styles.tariffsBox}>
                            <div className={styles.tariffItem}>
                                <div className={styles.silverTitle}>
                                    <h4>Silver</h4>
                                </div>
                                <div className={styles.tariffPrice}>
                                    <div className={styles.priceBlock}>
                                        <span className={styles.oldPrice}>35.000 грн</span>
                                        <span className={styles.currentPrice}>27.000 грн</span>
                                    </div>
                                </div>
                                <div className={styles.tariffItemBody}>
                                    <ul>
                                        <li>Добавление до 800 товаров в
                                            свой аккаунт</li>
                                        <li>Обучение в Smartlead Academy</li>
                                        <li>Возможность интеграции с
                                            интернет магазинам</li>
                                        <li>Полный доступ ко всем
                                            проверенным поставщикам</li>
                                        <li>Автоматизация заказов,
                                            готовая СРМ для Вашего бизнеса</li>
                                        <li>Возможность интеграции с
                                            маркетплейсами:
                                            (Prom.ua, Rozetka, Bigl)</li>
                                        <li>Удаленный контроль
                                            Вашего бизнеса</li>
                                        <li>Гарантия получения денег
                                            от поставщика</li>
                                    </ul>
                                </div>
                                <button className={styles.activeBtn}>Активен</button>

                              </div>
                                <div className={styles.tariffItem}>
                                    <div className={styles.goldTitle}>
                                        <h4>Gold</h4>
                                    </div>
                                    <div className={styles.tariffPrice}>
                                        <div className={styles.priceBlock}>
                                            <span className={styles.oldPrice}>59.000 грн</span>
                                            <span className={styles.currentPrice}>45.000 грн</span>
                                        </div>
                                    </div>
                                    <div className={styles.tariffItemBody}>
                                        <ul>
                                            <li>Добавление до 1200 товаров в
                                                свой аккаунт</li>
                                            <li>Обучение в Smartlead Academy</li>
                                            <li>Топ-50 популярных товаров</li>
                                            <li>Полный доступ ко всем
                                                проверенным поставщикам</li>
                                            <li>Возможность интеграции с
                                                интернет магазинами</li>
                                            <li>Получение аналитики о
                                                востребуемых товарах</li>
                                            <li>Автоматизация заказов,
                                                готовая СРМ для Вашего бизнеса</li>
                                            <li>Возможность интеграции с
                                                маркетплейсами:
                                                (Prom.ua, Rozetka, Bigl)</li>
                                            <li>Удаленный контроль
                                                Вашего бизнеса</li>
                                            <li>Гарантия получения денег
                                                от поставщика</li>
                                        </ul>
                                    </div>
                                    <button className={styles.buyBtn} onClick={this.showModal}>КУПИТЬ</button>
                                </div>
                                <div className={styles.tariffItem}>
                                    <div className={styles.platinumTitle}>
                                        <h4>Platinum</h4>
                                    </div>
                                    <div className={styles.tariffPrice}>
                                        <div className={styles.priceBlock}>
                                            <span className={styles.oldPrice}>89.000 грн</span>
                                            <span className={styles.currentPrice}>59.000 грн</span>
                                        </div>
                                    </div>
                                    <div className={styles.tariffItemBody}>
                                        <ul>
                                            <li>Добавление до 2000 товаров в
                                                свой аккаунт</li>
                                            <li>Обучение в Smartlead Academy</li>
                                            <li>Топ-100 популярных товаров</li>
                                            <li>Помощь в продвижении товаров
                                                в первый месяц</li>
                                            <li>Полный вывод на
                                                маркетплейс Rozetka</li>
                                            <li>Возможность интеграции с
                                                интернет магазинами</li>
                                            <li>Полный доступ ко всем
                                                проверенным поставщикам</li>
                                            <li>Личный разбор магазина с
                                                Владимиром Солошенко</li>
                                            <li>Получение аналитики о
                                                востребуемых товарах</li>
                                            <li>Автоматизация заказов,
                                                готовая СРМ для Вашего бизнеса</li>
                                            <li>Возможность интеграции с
                                                маркетплейсами:
                                                (Prom.ua, Rozetka, Bigl)</li>
                                            <li>Удаленный контроль
                                                Вашего бизнеса</li>
                                            <li>Гарантия получения денег
                                                от поставщика</li>
                                        </ul>
                                    </div>
                                    <button className={styles.buyBtn} onClick={this.showModal}>КУПИТЬ</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {/*<div className={styles.userCard}>*/}
                {/*<div className={styles.userContacts}>*/}
                {/*<div className={styles.userBlock}>*/}
                {/*<div className={styles.userContacts}>*/}
                {/*<div className={styles.userImg}>*/}
                {/*<img src={avatar} alt=""/>*/}
                {/*</div>*/}
                {/*<div className={styles.userInfo}>*/}
                {/*<h5 className={styles.userName}>Кукшин Роман Анатольевич</h5>*/}
                {/*<p>Статус:  <span className={styles.activated}>Полный пакет</span></p>*/}
                {/*<p>Статус Компании:  <span className={styles.activated}>Верифицированна</span></p>*/}
                {/*<p>E-Mail: <span>shrek@gmail.com</span></p>*/}
                {/*<p>Компания:<span> Nazar Marketplace</span></p>*/}
                {/*<p>Телефон: <span>+380963337777</span></p>*/}
                {/*<p>Веб-сайт:<span> www.gofriends.com</span></p>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<Link to="/admin/profile-settings" className={styles.editBtn}>Редактировать профиль</Link>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className={styles.yourPackage}>*/}
                {/*<h3>Ваш пакет</h3>*/}
                {/*<div className={styles.packageItem}>*/}
                {/*<div className={styles.packageItemHeader}>*/}
                {/*<span className={styles.packageItemTitle}>Базовый</span>*/}
                {/*<span className={styles.active}>Активирован</span>*/}
                {/*<span className={styles.currentPrice}><span className={styles.price}>50.000</span>грн</span>*/}
                {/*</div>*/}
                {/*<div className={styles.packageItemBody}>*/}
                {/*<div>*/}
                {/*<p>Полный доступ к платформе</p>*/}
                {/*<p>Возможность неограниченно редактировать товары</p>*/}
                {/*<p>Поддержка 24/7</p>*/}
                {/*<p>Пропуск на все встречи</p>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*<p>Полный доступ к платформе</p>*/}
                {/*<p>Возможность неограниченно редактировать товары</p>*/}
                {/*<p>Поддержка 24/7</p>*/}
                {/*<p>Пропуск на все встречи</p>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<button className={styles.buyFull}>Купить полный</button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<h3 className={styles.title}>Мой кабинет</h3>*/}
                {/*<div className={styles.chartBlock}>*/}
                {/*<div className={styles.ordersInProcessing}>*/}
                {/*<h4>Заказов в обработке</h4>*/}
                {/*<LineChart width={520} height={300} data={data}>*/}
                {/*<Line type="monotone" dataKey="uv" stroke="#F19300" />*/}
                {/*<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />*/}
                {/*<YAxis />*/}
                {/*<Tooltip />*/}
                {/*</LineChart>*/}
                {/*</div>*/}
                {/*<div className={styles.completedOrders}>*/}
                {/*<h4>Заказов в обработке</h4>*/}
                {/*<LineChart width={520} height={300} data={data}>*/}
                {/*<Line type="monotone" dataKey="uv" stroke="#F19300" />*/}
                {/*<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />*/}
                {/*<YAxis />*/}
                {/*<Tooltip />*/}
                {/*</LineChart>*/}
                {/*</div>*/}

                {/*</div>*/}
                {/*<div className={styles.activity}>*/}
                {/*<div className={styles.feed}>*/}
                {/*<h3 className={styles.title}>Лента новостей</h3>*/}
                {/*<div className={styles.feedBlock}>*/}
                {/*<form>*/}
                {/*<textarea className={styles.message}></textarea>*/}
                {/*<div>*/}
                {/*<div className={styles.feedActions}>*/}
                {/*<div>*/}
                {/*<span>Прикрепить :</span>*/}
                {/*<div>*/}

                {/*</div>*/}

                {/*</div>*/}
                {/*<button className={styles.publish}>Опубликовать</button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</form>*/}
                {/*<div className={styles.feeds}>*/}
                {/*<div className={styles.post}>*/}
                {/*<div className={styles.postHeader}>*/}
                {/*<div className={styles.userAvatar}>*/}
                {/*<img src={ava} alt=""/>*/}
                {/*</div>*/}
                {/*<div className={styles.postInfo}>*/}
                {/*<span className={styles.user}>Hexagon</span>*/}
                {/*<span className={styles.postDate}>13/03/2019  в 11:23</span>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className={styles.postBody}>*/}
                {/*<p> Друзья, привет!</p>*/}
                {/*<p> Свершилось - теперь все инструкции по работе с платформой*/}
                {/*Top Market вы можете найти на нашем сайте Top Zendesk -*/}
                {/*https://gofriends.zendesk.com/ </p>*/}
                {/*<p> Все структурировали.</p>*/}
                {/*</div>*/}
                {/*<div className={styles.actionLink}>*/}
                {/*<a href="#"><img src={like} alt=""/>Мне нравится </a>*/}
                {/*<a href="#"><img src={comment} alt=""/>Комментарии (0)</a>*/}
                {/*</div>*/}
                {/*<div className={styles.comments}>*/}
                {/*<div className={styles.yourComment}>*/}
                {/*<div className={styles.userAvatar}>*/}
                {/*<img src={ava} alt=""/>*/}
                {/*</div>*/}
                {/*<input type="text" placeholder="Ваш комментарий" />*/}
                {/*</div>*/}
                {/*<button className={styles.send}>Опубликовать</button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*<h3 className={styles.title}>Календарь заказов</h3>*/}
                {/*<div className={styles.orderCalendar}>*/}
                {/*<DayPicker onDayClick={(day) => this.setState({ day })}   />*/}
                {/*<div className={styles.orderTable}>*/}
                {/*<Table dataSource={dataSource} columns={columns} pagination={false} />*/}
                {/*</div>*/}
                {/*</div>*/}

                {/*</div>*/}
                {/*</div>*/}

                <div className="payModal">
                    <Modal
                        title="Покупка пакета"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        className={styles.buyPackage}
                        footer={false}
                    >
                        <div className={styles.modalContent}>
                            <p>Для того чтобы приобрести пакет доступа на Вашем аккаунте,
                                Вы можете воспользоваться двумя способами оплаты :
                                Оплата с помощью сервиса LiqPay или же оплата с помощью
                                банковской карты.
                            </p>
                        </div>
                        <div className={styles.payActions}>
                            <form method="POST" action="https://www.liqpay.ua/api/3/checkout"
                                  accept-charset="utf-8">
                                <input type="hidden" name="data" value="{{ data }}"/>
                                <input type="hidden" name="signature" value="{{ signature }}"/>
                                <button className={styles.payBtn}>Оплатить через LiqPay</button>
                            </form>

                            <button className={styles.payBtn} onClick={this.handleSendInvoice}>
                                Отправить счет фактуру на e-mail
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);





