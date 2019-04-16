import React, {Component} from 'react'
import {Tabs} from 'antd';

import GeneralInformation from './GeneralInformation';
import Documents from "./Documents";
import AboutCompany from "./AboutCompany";
import CompanyPitch from "./CompanyPitch";

const TabPane = Tabs.TabPane;

class CompanySettings extends Component {

    callback = (key) => {
        console.log(key);
    };


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
                    <AboutCompany />
                </TabPane>

                <TabPane tab="Питч о компании" key="4">
                    <CompanyPitch />
                </TabPane>
            </Tabs>
        );
    }
}


export default CompanySettings;





