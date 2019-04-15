import React, {Component} from 'react';
import {Form, Icon, Input, Button, Select} from "antd";
import {Link} from 'react-router-dom';

import styles from './Registration.module.css';

import {registration} from '../../../actions/userActions';

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
                        this.props.history.push('/')
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
                    {getFieldDecorator("role", {
                        rules: [
                            {required: true, message: "Please input your email!"},
                        ]
                    })(
                        <Select>
                            <Option value='CONTRACTOR'>поставщик</Option>
                            <Option value='PARTNER'>партнер</Option>
                        </Select>
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

                <FormItem>
                    {getFieldDecorator("confirmPassword", {
                        rules: [{required: true, message: "Please input your Password!"}]
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                            type="password"
                            placeholder="Password"
                        />
                    )}
                </FormItem>

                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.loginFormButton}
                >
                    Create account
                </Button>

                <Link to='/'>I have account</Link>
            </Form>
        );
    }
}

const WrappedNormalRegistrationForm = Form.create()(Registration);

export default WrappedNormalRegistrationForm;