import React, {Component} from 'react'
import {Tabs, Table, Divider, Tag} from 'antd';
import styles from './ProfileSettings.module.css'
import 'antd/dist/antd.css';
import avatar from "../../../img/avatar.png";

const TabPane = Tabs.TabPane;

const dataSource = [{
    key: '1',
    name: 'Mike',
    id: 32,
    profit: '+ 100.00 грн',
    registrationDate: '03/03/2019 14:12'
}, {
    key: '2',
    name: 'John',
    id: 42,
    profit: '+ 100.00 грн',
    registrationDate: '03/03/2019 14:12'
}];

const columns = [{
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
}, {
    title: 'Прибыль',
    dataIndex: 'profit',
    key: 'profit',
}, {
    title: 'Дата регистрации',
    dataIndex: 'registrationDate',
    key: 'registrationDate',
}];


class ProfileSettings extends Component {


    callback = (key) => {
        console.log(key);
    };

    render() {
        return (
            <div>
                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="Основные данные" key="1" className={styles.mainInfo}>
                        <div>
                            <form className={styles.userMainInfo}>
                                <div className={styles.formInputs}>
                                    <div>
                                        <label>Имя</label>
                                        <input type="text"/>
                                    </div>
                                    <div>
                                        <label>Фамилия</label>
                                        <input type="text"/>
                                    </div>
                                    <div>
                                        <label>Отчество</label>
                                        <input type="text"/>
                                    </div>
                                    <div>
                                        <label>E-mail</label>
                                        <input type="email"/>
                                    </div>
                                    <div>
                                        <label>Телефон</label>
                                        <input type="tel"/>
                                    </div>
                                    <div>
                                        <label>Веб-сайт</label>
                                        <input type="text"/>
                                    </div>
                                    <div>
                                        <label>Новый пароль</label>
                                        <input type="text"/>
                                    </div>
                                    <div>
                                        <label>Текущий пароль</label>
                                        <input type="text"/>
                                    </div>
                                </div>

                                <div className={styles.userInfo}>
                                    <div className={styles.ChangeAvatar}>
                                        <div className={styles.userAvatar}>
                                            <img src={avatar} alt=""/>
                                        </div>
                                        <div className={styles.userAvatarInfo}>
                                            <h3>Изменить аватар</h3>
                                            <span>Размер аватара должен быть не меньше 150х150 пикселей</span>


                                            <button className={styles.btnPrimary}>Изменить аватар</button>
                                        </div>
                                    </div>

                                    <div className={styles.EmailNotifications}>
                                        <h3>Уведомления на E-mail</h3>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>О новом заказе</label>
                                        </div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>Об изменении статуса ТТН</label>
                                        </div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>О получении счета на оплату</label>
                                        </div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>О получении отчета о продажах</label>
                                        </div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>О новом сообщении внутренней почты</label>
                                        </div>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>Об отмене заказа</label>
                                        </div>
                                    </div>

                                    <div className={styles.smsNotifications}>
                                        <h3>SMS Уведомления</h3>
                                        <span className={styles.number}>+380997786633</span>
                                        <div>
                                            <input type="checkbox"/>
                                            <label>О новом заказе</label>
                                        </div>
                                    </div>
                                    <button className={styles.save}>Сохранить</button>
                                </div>
                            </form>
                        </div>
                    </TabPane>

                    <TabPane tab="Реферальная программа" key="2">
                        <div className={styles.referralProgram}>
                            <h5>Реферальная программа</h5>
                            <div className={styles.copyLink}>
                                <input type="text"/>
                                <span>Дейте эту ссылку человеку, и при регистрации он станет Вашим рефералом</span>
                            </div>
                            <div className={styles.table}>
                                <Table dataSource={dataSource} columns={columns}/>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default ProfileSettings;





