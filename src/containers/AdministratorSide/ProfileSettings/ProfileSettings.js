import React, {Component} from 'react'
import {Tabs, Table} from 'antd';
import styles from './ProfileSettings.module.css'
import avatar from "../../../img/avatar.png";
import Dropzone from 'react-dropzone'

import {updateProfile} from '../../../actions/userActions';

const TabPane = Tabs.TabPane;

const columns = [
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Прибыль',
        dataIndex: 'profit',
        key: 'profit',
    },
    {
        title: 'Дата регистрации',
        dataIndex: 'registrationDate',
        key: 'registrationDate',
    }
];


class ProfileSettings extends Component {
    state = {
        name: ''
    };

    callback = (key) => {
        console.log(key);
    };

    handleChangeInput = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        })
    };

    onDrop = (file) => {
        console.log(file);
    };

    handleSaveProfile = async (e) => {
        e.preventDefault();

       await updateProfile(this.state);
    };

    componentDidMount() {

    }

    render() {
        const {name} = this.state;

        return (
            <div>
                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="Основные данные" key="1" className={styles.mainInfo}>
                        <div>
                            <form className={styles.userMainInfo} onSubmit={this.handleSaveProfile}>
                                <div className={styles.formInputs}>
                                    <div>
                                        <label>Имя</label>
                                        <input type="text"
                                               name='name'
                                               value={name}
                                               onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>Фамилия</label>
                                        <input type="text"
                                               name='secondName'
                                            // value={}
                                               onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>Отчество</label>
                                        <input type="text"
                                               name=''
                                            // value={}
                                               onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>E-mail</label>
                                        <input type="email"
                                               name=''
                                            // value={}
                                               onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>Телефон</label>
                                        <input type="tel"
                                               name=''
                                            // value={}
                                               onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>Веб-сайт</label>
                                        <input type="text"
                                               name=''
                                            // value={}
                                               onChange={this.handleChangeInput}
                                        />
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

                                            <Dropzone onDrop={this.onDrop} accept=".png, .svg, .jpg">
                                                {({getRootProps, getInputProps}) => (
                                                    <div {...getRootProps({className: 'dropzone'})}>
                                                        <input {...getInputProps()} />
                                                        <button className={styles.btnPrimary}>Изменить аватар</button>
                                                    </div>
                                                )}
                                            </Dropzone>
                                            <button className={styles.btnPrimary}>Изменить пароль</button>
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
                                <Table
                                    columns={columns}
                                />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default ProfileSettings;





