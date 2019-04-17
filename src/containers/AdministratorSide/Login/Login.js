import React, {Component} from 'react';
import {Form, Icon, Input, Button} from "antd";
import {Link} from 'react-router-dom';

import styles from './Login.module.css';

import {login} from '../../../actions/userActions';

const FormItem = Form.Item;

class Login extends Component {

    handleSubmit = async (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, user) => {
            if (!err) {
                login(user)
                    .then(() => {
                        this.props.history.push('/admin/cabinet')
                    })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className={styles.Form}>
                <h3 className={styles.title}>Войти</h3>
                <FormItem>
                    <label>Ваш email</label>
                    {getFieldDecorator("email", {
                        rules: [
                            {required: true, message: "Please input your email!"},
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
                    {getFieldDecorator("password", {
                        rules: [{required: true, message: "Please input your Password!"}]
                    })(
                        <Input
                            // prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                            type="password"
                        />
                    )}
                </FormItem>



                <Link to='/reset_password' className={styles.reset}>
                    Забыл пароль
                </Link>




                <div className={styles.actions}>
                    <Link to='/registration' className={styles.registration}>Регистрация</Link>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.loginFormButton}
                    >
                        Войти
                    </Button>
                </div>





            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm;