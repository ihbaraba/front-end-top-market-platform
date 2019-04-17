import React, {Component} from 'react';
import {Form, Icon, Input, Button} from "antd";
import {Link} from 'react-router-dom';
import styles from './Reset.module.css';

import {resetPassword} from '../../../actions/userActions';
import logo from "../../../img/logo.png";

const FormItem = Form.Item;

class ResetPassword extends Component {

    handleSubmit = async (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, user) => {
            if (!err) {
                resetPassword(user)
                    .then(() => {
                        this.props.history.push('/')
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
                        <Link to='/registration'><button className={styles.regBtn}>Регистрация</button></Link>
                    </header>
                </div>
                <Form onSubmit={this.handleSubmit} className={styles.Form}>
                    <h3 className={styles.title}>Восстановление пароля</h3>
                    <p>Введите ваш email, после этого вы получите письмо с инструкцией на вашу почту</p>
                    <FormItem>
                        <label>Ваш email</label>
                        {getFieldDecorator("email", {
                            rules: [
                                {required: true, message: "Пожалуйста введите Ваш Email"},
                            ]
                        })(
                            <Input
                                // prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                placeholder="Email"
                            />
                        )}
                    </FormItem>


                    <div className={styles.actions}>
                        <Link to='/'>Попробовать войти</Link>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.loginFormButton}
                        >
                            Отправить
                        </Button>
                    </div>




                </Form>
            </div>
        );
    }
}

const WrappedNormalResetForm = Form.create()(ResetPassword);

export default WrappedNormalResetForm;