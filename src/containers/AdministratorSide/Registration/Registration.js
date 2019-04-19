import React, {Component} from 'react';
import {Form, Icon, Input, Button, Select, Dropdown} from "antd";
import {Link} from 'react-router-dom';

import styles from './Registration.module.css';

import {registration} from '../../../actions/userActions';
import logo from "../../../img/logo.png";
import notification from "../../../img/notification.svg";
import cart from "../../../img/cart.svg";
import dollar from "../../../img/dollar.svg";
import avatar from "../../../img/ava.png";
import Header from "../components/Header/Header";

const FormItem = Form.Item,
    Option = Select.Option;

class Registration extends Component {

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, user) => {
            if (!err) {
                console.log("Received values of form: ", user);
                registration(user)
                    .then(res => {
                        window.open(res.confirmUrl,'_blank');
                    })
                    .then(() => {
                        this.props.history.push('/login')
                    })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <div className='container'>
                    <header>
                        <div className={styles.logo}>
                            <img src={logo} alt=""/>
                        </div>
                        <Link to='/login'><button className={styles.regBtn}>Войти</button></Link>
                    </header>
                </div>
                <Form onSubmit={this.handleSubmit} className={styles.Form}>
                    <h3 className={styles.title}>Регистрация</h3>
                    <FormItem>
                        <label>Ваш email</label>
                        {getFieldDecorator("email", {
                            rules: [
                                {required: true, message: "Введите Ваш email!"},
                            ]
                        })(

                            <Input
                                // prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                placeholder="Email"
                            />
                        )}
                    </FormItem>

                    <FormItem>
                        <label>Номер телефона</label>
                        {getFieldDecorator("tel", {
                            rules: [
                                {required: true, message: "Введите Ваш номер тетефона!"},
                            ]
                        })(

                            <Input
                                type="tel"
                                placeholder="Phone"
                            />
                        )}
                    </FormItem>


                    <FormItem>
                        <label>Пароль</label>
                        {getFieldDecorator("password", {
                            rules: [{required: true, message: "Введите Ваш Password!"}]
                        })(
                            <Input
                                // prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </FormItem>

                    <FormItem>
                        <label>Повторите пароль</label>
                        {getFieldDecorator("confirmPassword", {
                            rules: [{required: true, message: "Введите Ваш Password!"}]
                        })(
                            <Input
                                // prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </FormItem>

                    <FormItem>
                        <label>Выберите роль</label>
                        {getFieldDecorator("role", {
                            rules: [
                                {required: true, message: "Please input your email!"},
                            ]
                        })(
                            <Select className={styles.role}>
                                <Option value='CONTRACTOR'>поставщик</Option>
                                <Option value='PARTNER'>партнер</Option>
                            </Select>
                        )}
                    </FormItem>

                    <div className={styles.actions}>
                        <Link to='/'>У меня уже есть аккаунт</Link>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.loginFormButton}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>

                </Form>
            </div>

        );
    }
}

const WrappedNormalRegistrationForm = Form.create()(Registration);

export default WrappedNormalRegistrationForm;