import React, {Component, Fragment} from 'react'
import {Tabs, Table, Checkbox} from 'antd';
import styles from './ProfileSettings.module.css'
import defaultAvatar from "../../../img/avatar.png";
import Dropzone from 'react-dropzone'
import { Modal } from 'antd'

import {updateProfile} from '../../../actions/userActions';

const TabPane = Tabs.TabPane,
    CheckboxGroup = Checkbox.Group;

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

const emailOptions = [
    {label: 'О новом заказе', value: '1'},
    {label: 'Об изменении статуса ТТН', value: '2'},
    {label: 'О получении счета на оплату', value: '3'},
    {label: 'О получении отчета о продажах', value: '4'},
    {label: 'О новом сообщении внутренней почты', value: '5'},
    {label: 'Об отмене заказа', value: '6'},
];
const smsOptions = [
    {label: 'О новом заказе', value: '1'},
];


class ProfileSettings extends Component {
    state = {
        name: '',
        avatar: defaultAvatar,
        emailNotifications: [],
        smsNotifications: [],
        visibleModal: false
    };

    callback = (key) => {
        console.log(key);
    };

    handleCancel = (e) => {
        this.setState({
            visibleModal: false,
        });
    };

    handleChangeInput = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        })
    };

    handleChangeCheckbox = (e, type) => {
        this.setState({
            [`${type}Notifications`]: e
        });
        console.log(`${type}: ___ ${e}`);
    };

    onDrop = (file) => {
        console.log(file[0]);
    };

    handleSaveProfile = async (e) => {
        e.preventDefault();

        await updateProfile(this.state);
    };

    componentDidMount() {

    }

    render() {
        const {name, visibleModal, emailNotifications, smsNotifications, avatar} = this.state;

        return (
            <Fragment>
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
                                            <button type='button' className={styles.btnPrimary} onClick={() => this.setState({visibleModal: true})}>Изменить пароль</button>
                                        </div>
                                    </div>

                                    <div className={styles.EmailNotifications}>
                                        <h3>Уведомления на E-mail</h3>

                                        <CheckboxGroup options={emailOptions} value={emailNotifications}
                                                       onChange={e => this.handleChangeCheckbox(e, 'email')}/>
                                    </div>

                                    <div className={styles.smsNotifications}>
                                        <h3>SMS Уведомления</h3>
                                        <span className={styles.number}>+380997786633</span>

                                        <CheckboxGroup options={smsOptions} value={smsNotifications}
                                                       onChange={e => this.handleChangeCheckbox(e, 'sms')}/>
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

                <Modal
                    title="Изменение пароля"
                    visible={visibleModal}
                    onCancel={this.handleCancel}
                    footer={false}
                >
                    <input type="text"/>
                    <input type="text"/>
                    <div className={styles.payActions}>
                        <button className={styles.payBtn}>Изменить пароль</button>
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

export default ProfileSettings;





