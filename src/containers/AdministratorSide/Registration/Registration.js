import React, {Component} from 'react';
import {Form, Input, Button, Radio} from "antd";
import {Link} from 'react-router-dom';
import {Modal} from 'antd';

import styles from './Registration.module.css';

import {registration} from '../../../actions/userActions';
import logo from "../../../img/logo2.png";

const FormItem = Form.Item,
    RadioButton = Radio.Button,
    RadioGroup = Radio.Group;

class Registration extends Component {
    state = {
        role: 'CONTRACTOR'
    };

    onChange = (e) => {
        this.setState({
            role: e.target.value
        })
    };

    success = () => {
        Modal.success({
            title: 'Регистрация успешна',
            content: 'Для подтверждения вашего адреса электронной почты мы отправили вам письмо',
            onOk() {
                window.location.href = `${window.location.origin}/login`;
            },
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, user) => {
            if (!err) {
                registration({
                    ...user,
                    role: this.state.role
                })
                    .then(res => {
                        this.success()

                        // window.open(res.confirmUrl,'_blank');
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
                            <img src={logo} alt="logo"/>SMART Lead 2.0
                        </div>
                        <Link to='/login'>
                            <button className={styles.regBtn}>Войти</button>
                        </Link>
                    </header>
                </div>

                <Form onSubmit={this.handleSubmit} className={styles.Form}>
                    <h3 className={styles.title}>Регистрация</h3>

                    <div className={styles.selectedRole}>
                        <RadioGroup onChange={this.onChange} defaultValue="CONTRACTOR">
                            <RadioButton value="CONTRACTOR">Поставщик</RadioButton>
                            <RadioButton value="PARTNER">Продавец</RadioButton>
                        </RadioGroup>
                    </div>

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
                        {getFieldDecorator("phone", {
                            rules: [
                                {required: true, message: "Введите Ваш номер тетефона!"},
                            ]
                        })(
                            <Input
                                type="tel"
                                placeholder="Phone"
                                // required
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