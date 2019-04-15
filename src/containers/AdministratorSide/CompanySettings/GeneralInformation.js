import React, {Component} from 'react';
import {Tabs, Table, Checkbox, Form, Icon, Input, Button} from 'antd';
import styles from './CompanySettings.module.css';


const TabPane = Tabs.TabPane,
    CheckboxGroup = Checkbox.Group,
    FormItem = Form.Item;

class GeneralInformation extends Component {

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleUpdatePassword} className={styles.Form}>
                <FormItem>
                    <label htmlFor="">Название компании</label>
                    {getFieldDecorator("oldPassword", {
                        rules: [
                            {required: true, message: ""},
                        ]
                    })(
                        <Input
                            placeholder="Old password"
                        />
                    )}
                </FormItem>

                <FormItem>
                    <label htmlFor="">Сферы деятельности</label>
                    {getFieldDecorator("newPassword", {
                        rules: [{required: true, message: "Please input your Password!"}]
                    })(
                        <Input
                            type="password"
                            placeholder="New password"
                        />
                    )}
                </FormItem>

                <FormItem>
                    <label htmlFor="">Сферы услуг</label>
                    {getFieldDecorator("confirmPassword", {
                        rules: [{required: true, message: "Please input your Password!"}]
                    })(
                        <Input
                            type="password"
                            placeholder="Confirm password"
                        />
                    )}
                </FormItem>

                <FormItem>
                    <label htmlFor="">Город (территориальное размещение)</label>
                    {getFieldDecorator("confirmPassword", {
                        rules: [{required: true, message: "Please input your Password!"}]
                    })(
                        <Input
                            type="password"
                            placeholder="Confirm password"
                        />
                    )}
                </FormItem>

                <FormItem>
                    <label htmlFor="">Адрес</label>
                    {getFieldDecorator("confirmPassword", {
                        rules: [{required: true, message: "Please input your Password!"}]
                    })(
                        <Input
                            type="password"
                            placeholder="Confirm password"
                        />
                    )}
                </FormItem>

                <FormItem>
                    <label htmlFor="">Тип компании</label>
                    {getFieldDecorator("confirmPassword", {
                        rules: [{required: true, message: "Please input your Password!"}]
                    })(
                        <Input
                            type="password"
                            placeholder="Confirm password"
                        />
                    )}
                </FormItem>

                <FormItem>
                    <label htmlFor="">URL</label>
                    {getFieldDecorator("confirmPassword", {
                        rules: [{required: true, message: "Please input your Password!"}]
                    })(
                        <Input
                            type="password"
                            placeholder="Confirm password"
                        />
                    )}
                </FormItem>

                <FormItem>
                    <label htmlFor="">Условия работы  </label>
                    {getFieldDecorator("confirmPassword", {
                        rules: [{required: true, message: "Please input your Password!"}]
                    })(
                        <Input
                            type="password"
                            placeholder="Confirm password"
                        />
                    )}
                </FormItem>

                <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.loginFormButton}
                >
                    Send
                </Button>
            </Form>
        )
    }

}

const WrappedNormalGeneralInformationForm = Form.create()(GeneralInformation);


export default WrappedNormalGeneralInformationForm;