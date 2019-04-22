import React, {Component} from 'react'
import styles from './LandingPage.module.css'
import 'antd/dist/antd.css';
import  logo  from "../../../img/logo2.png";
import  macbook  from "../../../img/macbook.png";
import  girl  from "../../../img/girl.svg";
import  time  from "../../../img/time.svg";
import  rozetka  from "../../../img/rozetka.svg";
import  man  from "../../../img/man.png";
import {Link} from "react-router-dom";


class LandingPage extends Component {
    render() {
        return (
            <div>
                <header>
                    <div className={styles.container}>
                        <a href="#" className={styles.logo}><img src={logo} alt="logo" />SMART Lead</a>
                        <div className={styles.headerRight}>
                            <a href="tel:+380931377674" className={styles.tel}>+38 (093) 137-76-74</a>
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
                            <Link to='/registration'><button className={styles.btn}>CTAРТ</button></Link>
                        </div>
                        <div className={styles.macbook}>
                            <img src={macbook} alt="macbook" />
                        </div>
                    </div>
                </section>
                <section className={styles.benefits}>
                    <div className={styles.container}>
                        <h3>Преимущества</h3>
                    </div>
                    <div  className={styles.container}>
                        <div  className={styles.benefitslist}>
                            <div className={styles.list}>
                                <ul>
                                    <li>Автоматизированная «кнопка деньги</li>
                                    <li>Удобство управления всеми <br/> заявками/продажами</li>
                                    <li>Синхронизация с популярными <br/> маркетплейсами в 2 клика</li>
                                    <li>Все действия и процессы <br/> Автоматизированы в одном месте</li>
                                </ul>
                                <ul>
                                    <li>Оптимизация ресурсов и времени</li>
                                    <li>Облегчение логистики</li>
                                    <li>Учет и контроль над финансами</li>
                                    <li>Экономия времени</li>
                                </ul>
                            </div>
                            <a href="#" className={styles.btn}>CTAРТ</a>
                        </div>
                        <div className={styles.benefitsimg}>
                            <img src={girl} alt="girl" />
                        </div>
                    </div>
                </section>
                <section className={styles.savingtime}>
                    <div className={styles.container}>
                        <div className={styles.features}>
                            <h3>Экономия <br /> времени</h3>
                            <ul>
                                <li>Экономия вокруг создания <br/>интернет - магазина</li>
                                <li>Экономия в наполнении магазина</li>
                                <li>Экономия в работе с поставщиками</li>
                                <li>Экономия на обработке заказов</li>
                            </ul>
                            <a href="#" className={styles.btn}>CTAРТ</a>
                        </div>
                        <div  className={styles.timeimg}>
                            <img src={time} alt="time" />
                        </div>
                    </div>
                </section>
                <section className={styles.about}>
                    <div className={styles.container}>
                        <h3>У нас уже более<br/> 500 проектов</h3>
                        <div className={styles.aboutinfo}>
                            <div  className={styles.abouttext}>
                                <div>
                                    <p>У вас есть возможность,<br/> присоединиться к нам по<br/> сниженной цене.</p>
                                    <p  className={styles.rozetka}>
                                        <img src={rozetka} alt="rozetka" />
                                            Начните успешно<br/> продавать на Розетке!
                                    </p>
                                </div>
                            </div>
                            <form className={styles.consultation}>
                                <h5>Заполните заявку, чтобы<br/> получить консультацию</h5>
                                <input type="text" placeholder="Ваше имя" />
                                    <input type="tel" placeholder="Номер телефона" />
                                        <button  className={styles.btn}>Жду</button>
                            </form>
                        </div>

                    </div>
                </section>
                <section  className={styles.description}>
                    <div  className={styles.container}>
                        <div className={styles.founder}>
                            <div className={styles.descriptiontext}>
                                <h3>Основатель проекта</h3>
                                <ul>
                                    <li><strong>Владимир Солошенко, 30 лет</strong></li>
                                    <li><strong>Владелец торговой марки Smart Baby Watch</strong> <a
                                        href="https://smartbabywatch.ua/" target="_blank">(smartbabywatch.ua)</a>;
                                    </li>
                                    <li>Более 2х лет опыта продаж на маркетплейсе Розетка как результат: более 2400
                                        товаров продается на маркетплейсе, от 80 продаж в день;
                                    </li>
                                    <li><strong>Владелец компании Smart Lead</strong> – за 3 месяца обучил и вывел на
                                        розетку более 500 человек которые уже получают от 3 - 60 продаж в день;
                                    </li>
                                    <li>Реализует совместно с миллиардером Марком Гинзбургом первый в мире маркетплейс
                                        на блокчейн технологии <a href="https://bitonmarket.io/">(bitonmarket.io).</a>
                                    </li>
                                </ul>
                            </div>
                            <a href="#"  className={styles.btn}>CTAРТ</a>
                        </div>
                        <div  className={styles.man}>
                            <img src={man} alt="man" />
                        </div>
                    </div>
                </section>
                <section  className={styles.videoblock}>
                    <div className={styles.container}>
                        <h3>Видео</h3>
                        <div className={styles.video}>
                            <iframe src="https://www.youtube.com/embed/j2WvV4r4F8s" frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default LandingPage
