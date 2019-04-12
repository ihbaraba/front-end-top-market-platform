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
                console.log("Received values of form: ", user);

               login(user)
                    .then(() => {
                        this.props.history.push('/admin')
                    })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className={styles.Form}>
                <FormItem>
                    {getFieldDecorator("email", {
                        rules: [
                            {required: true, message: "Please input your email!"},
                        ]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{fontSize: 13}}/>}
                            placeholder="Email"
                        />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator("password", {
                        rules: [{required: true, message: "Please input your Password!"}]
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>

                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.loginFormButton}
                >
                    Log in
                </Button>

                Or <Link to='/registration'>register now!</Link>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm;