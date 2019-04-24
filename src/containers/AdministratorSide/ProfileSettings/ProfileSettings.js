import React, {Component, Fragment} from 'react'
import {Tabs, Table, Checkbox, Form, Input, Button} from 'antd';
import styles from './ProfileSettings.module.css'
import defaultAvatar from "../../../img/avatar.png";
import Dropzone from 'react-dropzone'
import {Modal, Icon, notification} from 'antd'

import {getProfile, updateProfile, changePassword, login} from '../../../actions/userActions';
import {connect} from "react-redux";

const TabPane = Tabs.TabPane,
    CheckboxGroup = Checkbox.Group,
    FormItem = Form.Item;


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
    {label: 'О новом заказе', value: 'newOrder'},
    {label: 'Об изменении статуса ТТН', value: 'ttnChange'},
    {label: 'О получении счета на оплату', value: 'orderPaid'},
    {label: 'О получении отчета о продажах', value: 'salesReport'},
    {label: 'О новом сообщении внутренней почты', value: 'newMessage'},
    {label: 'Об отмене заказа', value: 'cancelOrder'},
];
const smsOptions = [
    {label: 'О новом заказе', value: 'newOrder'},
];


class ProfileSettings extends Component {
    state = {
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        webSite: '',
        phone: '',
        avatarImage: '',
        updateImage: false,
        emailNotifications: [],
        phoneNotifications: [],
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
        this.getBase64(file[0], (result) => {
            this.setState({
                avatarImage: result,
                updateImage: true
            })
        });
    };

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    handleSaveProfile = async (e) => {
        e.preventDefault();

        let requestData = this.state;

        let emailNot = {},
            smsNot = {};

        this.state.emailNotifications.forEach(item => {
            emailNot[item] = true
        });
        this.state.phoneNotifications.forEach(item => {
            smsNot[item] = true
        });

        if (!this.state.updateImage) delete requestData.avatarImage;

        await this.props.updateProfile({
            ...requestData,
            emailNotifications: emailNot,
            phoneNotifications: smsNot
        })
            .then(() => notification.success({
                    message: 'Сохранено',
                })
            )
    };

    handleUpdatePassword = async (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, user) => {
            if (!err) {
                changePassword(user)
                    .then(() => {
                        this.setState({
                            visibleModal: false
                        }, () => this.props.form.resetFields())
                    });
            }
        });
    };

    async componentDidMount() {
        const res = await getProfile();
        let emailNot = [],
            smsNot = [];

        for (let key in res.emailNotifications) {
            if (res.emailNotifications[key] === true) {
                emailNot.push(key)
            }
        }

        for (let key in res.phoneNotifications) {
            if (res.phoneNotifications[key] === true) {
                smsNot.push(key)
            }
        }


        this.setState({
            ...res,
            emailNotifications: emailNot,
            phoneNotifications: smsNot
        })
    }

    render() {
        const {firstName, lastName, patronymic, email, visibleModal, emailNotifications, phoneNotifications, avatarImage, webSite, phone} = this.state;
        const {getFieldDecorator} = this.props.form;

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
                                               name='firstName'
                                               value={firstName || ''}
                                               onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>Фамилия</label>
                                        <input type="text"
                                               name='lastName'
                                               value={lastName || ''}
                                               onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>Отчество</label>
                                        <input type="text"
                                               name='patronymic'
                                               value={patronymic || ''}
                                               onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>E-mail</label>
                                        <input type="email"
                                               name='email'
                                               value={email || ''}
                                               onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>Телефон</label>
                                        <input type="tel"
                                               name='phone'
                                               value={phone || ''}
                                               onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>Веб-сайт</label>
                                        <input type="text"
                                               name='webSite'
                                               value={webSite || ''}
                                               onChange={this.handleChangeInput}
                                        />
                                    </div>
                                </div>

                                <div className={styles.userInfo}>
                                    <div className={styles.ChangeAvatar}>
                                        <div className={styles.userAvatar}>
                                            <img src={avatarImage ? avatarImage : defaultAvatar} alt=""/>
                                            <Dropzone onDrop={this.onDrop} accept=".png, .svg, .jpg">
                                                {({getRootProps, getInputProps}) => (
                                                    <div {...getRootProps({className: 'dropzone'})}>
                                                        <input {...getInputProps()} />
                                                        <button className={styles.uploadBtn}><Icon type="camera" /></button>
                                                    </div>
                                                )}
                                            </Dropzone>
                                        </div>
                                        <div className={styles.userAvatarInfo}>
                                            <h3>Изменить аватар</h3>
                                            <span>Размер аватара должен быть не меньше 150х150 пикселей</span>

                                            <button type='button' className={styles.btnPrimary}
                                                    onClick={() => this.setState({visibleModal: true})}>Изменить пароль
                                            </button>
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

                                        <CheckboxGroup options={smsOptions} value={phoneNotifications}
                                                       onChange={e => this.handleChangeCheckbox(e, 'phone')}/>
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
                    <Form onSubmit={this.handleUpdatePassword} className={styles.Form}>
                        <FormItem>
                            {getFieldDecorator("oldPassword", {
                                rules: [
                                    {required: true, message: "Пожалуйста введите Ваш старый пароль!"},
                                ]
                            })(
                                <Input
                                    placeholder="Старый пароль"
                                />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator("newPassword", {
                                rules: [{required: true, message: "Пожалуйста введите Ваш пароль!"}]
                            })(
                                <Input
                                    type="password"
                                    placeholder="Новый пароль"
                                />
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator("confirmPassword", {
                                rules: [{required: true, message: "Пожалуйста введите Ваш пароль!"}]
                            })(
                                <Input
                                    type="password"
                                    placeholder="Подтвердите пароль"
                                />
                            )}
                        </FormItem>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.loginFormButton}
                        >
                            Сохранить
                        </Button>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
}

const WrappedNormalProfileForm = Form.create()(ProfileSettings);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    updateProfile: (user) => dispatch(updateProfile(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalProfileForm);




