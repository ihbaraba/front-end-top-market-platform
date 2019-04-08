import React, {Component} from 'react'
import 'antd/dist/antd.css';
import styles from './CompanySettings.module.css'
import { Tabs } from 'antd';
import GeneralInformation from "./GeneralInformation";
import CompanyPage from "./CompanyPage";
import Pitch from "./Pitch";
import Documents from "./Documents";


const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}


class CompanySettings extends Component {


    render() {

        return (
            <div>
                <h3 className={styles.title}>Настройки компании</h3>
                <Tabs onChange={callback} type="card">
                    <TabPane tab="Основные данные" key="1">
                       <GeneralInformation/>
                    </TabPane>
                    <TabPane tab="Документы" key="2">
                        <Documents/>
                    </TabPane>
                    <TabPane tab="Страница компании" key="3">
                        <CompanyPage/>
                    </TabPane>
                    <TabPane tab="Питч о компании" key="4">
                        <Pitch/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default CompanySettings;





