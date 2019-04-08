import React, {Component} from 'react'
import 'antd/dist/antd.css';
import styles from './CompanySettings.module.css'
import nike from "../../../img/nike.jpg";






class GeneralInformation extends Component {


    render() {

        return (
            <div>
                <form className={styles.generalInformation}>
                    <div className={styles.right}>
                        <h4>Общая информация</h4>
                        <span>Эта информация нужна для начала работ. Ее будут видеть другие участники системы.</span>
                        <div>
                            <label>Название компании</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label>Сферы деятельности</label>
                            <select>
                                <option></option>
                            </select>
                        </div>
                        <div>
                            <label>Сферы услуг</label>
                            <select>
                                <option></option>
                            </select>
                        </div>
                        <div>
                            <label>Город (территориальное размещение)</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label>Сферы деятельности</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label>Адрес</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label>Тип компании</label>
                            <select>
                                <option></option>
                            </select>
                        </div>
                        <div>
                            <label>URL</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label>Условия работы</label>
                            <input type="text"/>
                        </div>
                        <h5>Тип деятельности для розничной торговли:</h5>
                        <div className={styles.type}>
                            <div>
                                <input type="checkbox" />
                                <label>Интернет-магазин</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Интернет-магазин</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Розничная сеть</label>
                            </div>
                        </div>
                        <h5>Тип деятельности для оптовой торговли:</h5>
                        <div className={styles.type}>
                            <div>
                                <input type="checkbox" />
                                <label>Дистрибьютор</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Производитель</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Импортер</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Дилер</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Субдилер</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Экспортер</label>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label>Официальный представитель</label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.left}>
                        <div>
                            <div className={styles.logo}>
                                <div className={styles.logoImg}>
                                    <img src={nike} alt="nike"/>
                                </div>
                                <div className={styles.logoInfo}>
                                    <h4 className={styles.formTitle}>Логотип</h4>
                                    <p>Размер логотипа должен быть не меньше 150х150 пикселей</p>
                                    <button className={styles.change}>Загрузить логотип</button>
                                </div>
                            </div>
                            <h4>Контактные данные</h4>
                            <div>
                                <label>Веб-сайт</label>
                                <input type="text"/>
                            </div>
                            <div>
                                <label>Телефон</label>
                                <input type="text"/>
                            </div>
                            <div>
                                <label>E-mail</label>
                                <input type="text"/>
                            </div>
                            <div>
                                <label>Кому видны контактные данные ?</label>
                                <input type="text"/>
                            </div>
                        </div>
                        <button className={styles.save}>Сохранить</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default GeneralInformation;





