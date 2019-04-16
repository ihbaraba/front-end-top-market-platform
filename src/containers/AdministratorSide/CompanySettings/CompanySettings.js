import React, {Component, Fragment} from 'react'
import {Tabs, Checkbox, Form} from 'antd';
import styles from './CompanySettings.module.css'


import GeneralInformation from './GeneralInformation';
import Documents from "./Documents";

const TabPane = Tabs.TabPane,
    CheckboxGroup = Checkbox.Group,
    FormItem = Form.Item;


class CompanySettings extends Component {

    callback = (key) => {
        console.log(key);
    };





    // handleSaveProfile = async (e) => {
    //     e.preventDefault();
    //
    //     await updateProfile(this.state);
    // };


    render() {
        return (
            <Tabs onChange={this.callback} type="card">
                <TabPane tab="Основные данные" key="1">
                    <GeneralInformation
                    />
                </TabPane>

                <TabPane tab="Документы" key="2">
                    <Documents />
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





