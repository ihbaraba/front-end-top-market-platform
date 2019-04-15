import React, {Component} from 'react';
import {Form, Icon, Input, Button} from "antd";
import {Link} from 'react-router-dom';
import styles from './Reset.module.css';

import {resetPassword} from '../../../actions/userActions';

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

                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.loginFormButton}
                >
                    Reset
                </Button>

                <Link to='/'>Login</Link>
            </Form>
        );
    }
}

const WrappedNormalResetForm = Form.create()(ResetPassword);

export default WrappedNormalResetForm;