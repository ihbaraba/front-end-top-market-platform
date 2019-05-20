import React, {Component} from 'react'
import styles from './LandingPage.module.css'
import 'antd/dist/antd.css';
import logo from "../../../img/logo2.png";
import macbook from "../../../img/macbook.png";
import girl from "../../../img/girl.svg";
import time from "../../../img/time.svg";
import rozetka from "../../../img/rozetka.svg";
import man from "../../../img/man.png";
import scheme from "../../../img/scheme.png";
import viber from "../../../img/viber.svg";
import prom from "../../../img/prom.svg";
import poshta from "../../../img/poshta.svg";
import sms from "../../../img/sms.svg";
import arroba from "../../../img/arroba.svg";
import creaction from "../../../img/creaction.png";
import management from "../../../img/management.png";
import finance from "../../../img/finance.svg";
import services from "../../../img/services.svg";
import learning2 from "../../../img/learning2.png";
import additional from "../../../img/additional.png";
import {Link} from "react-router-dom";
import {notification} from "antd";
import {sendContactForm} from "../../../actions/userActions";


class LandingPage extends Component {
    state = {
        phoneNumber: '',
        name: '',
    };

    handleChangeInput = (name) => ({target: {value}}) => {
        this.setState({
            [name]: value
        })
    };

    handleSend = async (e) => {
        e.preventDefault();

        await sendContactForm(this.state);

        notification.success({
            message: 'Отправлено',
        });

        this.setState({
            name: '',
            phoneNumber: ''
        })
    };


    goRegistrationPage = () => {
        this.props.history.push('/registration')
    };

    render() {
        const {phoneNumber, name} = this.state;

        return (
            <div>
                <header>
                    <div className={styles.container}>
                        <a href="#" className={styles.logo}><img src={logo} alt="logo"/>SMART Lead 2.0</a>
                        <div className={styles.headerRight}>
                            <a href="tel:+380931377674" className={styles.tel}>(093) 137-76-74</a>
                            <Link to='/contacts-form' className={styles.regBtn}>Обратная связь</Link>
                            <Link to='/registration' className={styles.regBtn}>Регистрация</Link>
                            <Link to='/login' className={styles.regBtn}>Войти</Link>
                        </div>
                    </div>
                </header>
                <section className={styles.home}>
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <h3>Smart Lead 2.0</h3>
                            <p>Авторская система продаж</p>
                            <Link to='/registration'>
                                <button className={styles.btn} onClick={this.goRegistrationPage}>CTAРТ</button>
                            </Link>
                        </div>
                        <div className={styles.macbook}>
                            <img src={macbook} alt="macbook"/>
                        </div>
                    </div>
                </section>
                <section className={styles.benefits}>
                    <div className={styles.container}>
                        <h3>Преимущества</h3>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.benefitslist}>
                            <div className={styles.list}>
                                <ul>
                                    <li>Автоматизированная "кнопка деньги"</li>
                                    <li>Удобство управления всеми <br/> заявками/продажами</li>
                                    <li>Синхронизация с популярными <br/> маркетплейсами в 2 клика</li>
                                    <li>Все действия и процессы <br/> автоматизированы в одном месте</li>
                                    <li>Возможность взаимодействия <br/> партнеров и поставщиков</li>
                                </ul>
                                <ul>
                                    <li>Оптимизация ресурсов и времени</li>
                                    <li>Облегчение логистики</li>
                                    <li>Учет и контроль над финансами</li>
                                    <li>Экономия времени</li>
                                </ul>
                            </div>
                            <a href="#" className={styles.btn} onClick={this.goRegistrationPage}>CTAРТ</a>
                        </div>
                        <div className={styles.benefitsimg}>
                            <img src={girl} alt="girl"/>
                        </div>
                    </div>
                </section>
                <section className={styles.savingtime}>
                    <div className={styles.container}>
                        <div className={styles.features}>
                            <h3>Экономия <br/> времени</h3>
                            <ul>
                                <li>Экономия вокруг создания <br/>интернет - магазина</li>
                                <li>Экономия в наполнении магазина</li>
                                <li>Экономия в работе с поставщиками</li>
                                <li>Экономия на обработке заказов</li>
                            </ul>
                            <a href="#" className={styles.btn} onClick={this.goRegistrationPage}>CTAРТ</a>
                        </div>
                        <div className={styles.timeimg}>
                            <img src={time} alt="time"/>
                        </div>
                    </div>
                </section>
                <section className={styles.about}>
                    <div className={styles.container}>
                        <h3>Начните работать<br/>эффективнее</h3>
                        <div className={styles.aboutinfo}>
                            <div className={styles.abouttext}>
                                <div>
                                    <p>С нами уже работают более 500<br/> интернет-магазинов.</p>
                                    <p>У вас есть возможность,<br/> присоединиться к нам по<br/> сниженной цене.</p>
                                    <p>
                                        Начните успешно<br/> продавать на Розетке!
                                    </p>
                                </div>
                            </div>
                            <form className={styles.consultation} id='form'>
                                <h5>Заполните заявку, чтобы<br/> получить консультацию</h5>
                                <input
                                    value={name}
                                    type="text"
                                    placeholder="Ваше имя"
                                    onChange={this.handleChangeInput('name')}
                                />
                                <input
                                    value={phoneNumber}
                                    type="tel"
                                    placeholder="Номер телефона"
                                    onChange={this.handleChangeInput('phoneNumber')}
                                />

                                <button className={styles.btn} onClick={this.handleSend}>Жду</button>
                            </form>
                        </div>

                    </div>
                </section>
                <section className={styles.howItWorks}>
                    <div className="container">
                        <h3>Как это работает?</h3>
                        <div className={styles.scheme}>
                            <img src={scheme} alt=""/>
                        </div>
                    </div>
                </section>
                <section className={styles.integration}>
                    <div className={styles.container}>
                        <h3>Интеграция<br/>с сервисами:</h3>
                        <div className={styles.integrationBlock}>
                            <div className={styles.integrationItem}>
                                <div className={styles.viber}>
                                    <img src={viber} alt=""/>
                                </div>
                                <div className={styles.intFeatures}>
                                    <span>- Заказы</span>
                                    <span>- Статус заказа</span>
                                </div>
                            </div>
                            <div className={styles.integrationItem}>
                                <div className={styles.poshta}>
                                    <img src={poshta} alt=""/>
                                </div>
                                <div className={styles.intFeatures}>
                                    <span>- Статусы доставки</span>
                                </div>
                            </div>
                            <div className={styles.integrationItem}>
                                <div className={styles.rozetka}>
                                    <img src={rozetka} alt=""/>
                                </div>
                                <div className={styles.intFeatures}>
                                    <span>- API</span>
                                    <span>- Полная интеграция</span>
                                </div>
                            </div>
                            <div className={styles.integrationItem}>
                                <div className={styles.sms}>
                                    <img src={sms} alt=""/>
                                </div>
                                <div className={styles.intFeatures}>
                                    <span>- Статусы доставки</span>
                                </div>
                            </div>
                            <div className={styles.integrationItem}>
                                <div className={styles.prom}>
                                    <img src={prom} alt=""/>
                                </div>
                                <div className={styles.intFeatures}>
                                    <span>- API</span>
                                    <span>- Полная интеграция</span>
                                </div>
                            </div>
                            <div className={styles.integrationItem}>
                                <div className={styles.arroba}>
                                    <img src={arroba} alt=""/>
                                </div>
                                <div className={styles.intFeatures}>
                                    <span>- Уведомления о заказах</span>
                                    <span>- Уведомления доставках</span>
                                    <span>- Уведомления о продажах</span>
                                    <span>- Документы в Rozetka</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.creation}>
                    <div className={styles.container}>
                        <h3>Создание моего <br/> интернет-магазина</h3>
                        <h6>Современная e-commerce площадка на Python/ Django</h6>
                        <div className={styles.creationBox}>
                            <ul className={styles.creationList}>
                                <li>Создание магазина за 2 минуты</li>
                                <li>Возможность использовать домен и поддомен</li>
                                <li>Простая в использовании админ-панель</li>
                                <li>Выбирайте дизайн - шаблон</li>
                                <li>Кастомизируйте элементы вашего сайта</li>
                                <li>Кастомизируйте карточку товара</li>

                                <button className={styles.btn} onClick={this.goRegistrationPage}>Получить доступ</button>
                            </ul>
                            <div className={styles.creationImg}>
                                <img src={creaction} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.management}>
                    <div className={styles.container}>
                        <h3>Управление заказами</h3>
                        <div className={styles.managementWrap}>
                            <ul className={styles.creationList}>
                                <li>Обработка заказов со всех<br/>
                                    маркетплейсов:<br/>
                                    Rozetka, Prom.ua, мой магазин
                                </li>
                                <li>Контроль статуса выполнения заказа</li>
                                <li>Интеграция с API Rozetka и др маркетплейсов</li>

                                <a href='#form' className={styles.btn}>Узнать</a>
                            </ul>
                            <div className={styles.manImg}>
                                <img src={management} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.finance}>
                    <div className={styles.container}>
                        <h3>Финансы</h3>
                        {/*<h5>Полный контроль над финансами</h5>*/}
                        <div className={styles.financeWrap}>
                            <ul className={styles.financeList}>
                                <h5>Полный контроль над финансами</h5>
                                <li>Вся история транзакций</li>
                                <li>Все счета на оплату</li>
                                <li>Отчеты</li>
                                <li>Таблица взаиморасчетов</li>
                                <li>Отчет о реализованных товарах</li>
                                <li>Удобный вывод финансов</li>
                            </ul>
                            <div className={styles.financeImg}>
                                <img src={finance} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.services}>
                    <div className={styles.container}>
                        <h3>Сервисы от маркетплейса</h3>
                        <div className={styles.servicesWrap}>
                            <div className={styles.servicesListBlock}>
                                <ul className={styles.servicesList}>
                                    <li className={styles.call}>Call центр</li>
                                    <li className={styles.process}>Обработка заказов</li>
                                    <li className={styles.support}>Поддержка в одном месте</li>
                                </ul>
                                <button className={styles.btn} onClick={this.goRegistrationPage}>Регистрация</button>
                            </div>
                            <div className={styles.servicesImg}>
                                <img src={services} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.learning}>
                    <div className={styles.container}>
                        <h3>Обучающий модуль</h3>
                        <div className={styles.learningWrap}>
                            <ul className={styles.learningList}>
                                <li>Единая база знаний</li>
                                <li>Видеоуроки по использованию платформы</li>
                                <li>Оформление договора с Rozetka</li>
                                <li>Парсинг товаров из других магазинов</li>

                                <button className={styles.btn} onClick={this.goRegistrationPage}>Регистрация</button>
                            </ul>
                            <div className={styles.learningImg}>
                                <img src={learning2} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.additionalServices}>
                    <div className={styles.container}>
                        <h3>Доп услуги</h3>
                        <h5>Возможность передачи своего интернет - магазинга маркетплейсу</h5>
                        <div className={styles.additionalBox}>
                            <ul className={styles.creationList}>
                                <li>Сall center</li>
                                <li>Развитие и обслуживание моего магазина</li>
                                <li>Услуги копирайтинга</li>

                                <button className={styles.btn} onClick={this.goRegistrationPage}>Получить доступ</button>
                            </ul>
                            <div className={styles.additionalImg}>
                                <img src={additional} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.description}>
                    <div className={styles.container}>
                        <div className={styles.founder}>
                            <div className={styles.descriptiontext}>
                                <h3>Основатель проекта</h3>
                                <ul>
                                    <li><strong>Владимир Солошенко, 30 лет</strong></li>
                                    <li><strong>Владелец торговой марки Smart Baby Watch</strong> <a
                                        href="https://smartbabywatch.ua/" target="_blank">(smartbabywatch.ua).</a>
                                    </li>
                                    <li>Более 2х лет опыта продаж на маркетплейсе Розетка.
                                        Как результат - более 2400 товаров продается на маркетплейсе, от 80 продаж в день.
                                    </li>
                                    <li><strong>Владелец компании Smart Lead</strong> – за 3 месяца обучил и вывел на
                                        Розетку более 500 человек, которые уже имеют 3 - 60 продаж в день.
                                    </li>
                                    <li>Реализует совместно с миллиардером Марком Гинзбургом первый в мире маркетплейс
                                        на блокчейн технологии <a href="https://bitonmarket.io/">(bitonmarket.io).</a>
                                    </li>
                                </ul>
                            </div>
                            <a href="#" className={styles.btn} onClick={this.goRegistrationPage}>CTAРТ</a>
                        </div>
                        <div className={styles.man}>
                            <img src={man} alt="man"/>
                        </div>
                    </div>
                </section>
                <footer>
                    <div className={styles.container}>
                        <div className={styles.footerTop}>
                            <a href="#" className={styles.footerLogo}>
                                <img src={logo} alt=""/>
                                SMART Lead
                            </a>
                            <div className={styles.footerContacts}>
                                <p><a href="tel:+380931377674">(093) 137-76-74</a></p>
                                <p>г. Киев, ул. Затышная 7б</p>
                            </div>
                        </div>
                        <div className={styles.footerBottom}>
                            <span className={styles.copy}>(c) Smartlead 2019</span>
                            <span>ФЛП Солошенко Владимир Владимирович, ИНН 3220809017</span>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default LandingPage