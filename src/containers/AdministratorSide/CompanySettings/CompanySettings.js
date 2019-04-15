import React, {Component, Fragment} from 'react'
import {Tabs, Checkbox, Form} from 'antd';
import styles from './CompanySettings.module.css'

import {} from '../../../actions/userActions';

import GeneralInformation from './GeneralInformation';

const TabPane = Tabs.TabPane,
    CheckboxGroup = Checkbox.Group,
    FormItem = Form.Item;



class CompanySettings extends Component {
    state = {
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        avatarImage: '',
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
        this.getBase64(file[0], (result) => {
            this.setState({
                avatarImage: result
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

    // handleSaveProfile = async (e) => {
    //     e.preventDefault();
    //
    //     await updateProfile(this.state);
    // };
    //
    // handleUpdatePassword = async (e) => {
    //     e.preventDefault();
    //
    //     this.props.form.validateFields((err, user) => {
    //         if (!err) {
    //             changePassword(user)
    //                 .then(() => {
    //                     this.setState({
    //                         visibleModal: false
    //                     }, () => this.props.form.resetFields())
    //                 });
    //         }
    //     });
    // };
    //

    render() {
        return (
            <Tabs onChange={this.callback} type="card">
                <TabPane tab="Основные данные" key="1">
                    <GeneralInformation

                    />
                </TabPane>

                <TabPane tab="Документы" key="2">
                </TabPane>

                <TabPane tab="Страница компании" key="3">
                </TabPane>

                <TabPane tab="Питч о компании" key="4">
                </TabPane>
            </Tabs>
        );
    }
}



export default CompanySettings;





