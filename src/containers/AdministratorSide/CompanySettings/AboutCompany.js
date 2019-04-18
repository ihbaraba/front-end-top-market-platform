import React, {Component} from 'react';
import {Form, Button} from 'antd';
import styles from './CompanySettings.module.css';
import {getProfile, updateProfile} from "../../../actions/companyActions";


class AboutCompany extends Component {
    state = {
        aboutCompany: '',
    };

    handleUpdateCompanyProfile = e => {
        e.preventDefault();

        updateProfile({
            aboutCompany: this.state.aboutCompany
        });
    };

    handleChangeInput = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        })
    };

    async componentDidMount() {
        const profile = await getProfile();

        this.setState({
            ...profile
        })
    }

    render() {
        const {
            aboutCompany
        } = this.state;

        return (
            <Form onSubmit={this.handleUpdateCompanyProfile} className={styles.Form, styles.companyPage}>
                <div style={{width: '90%'}}>
                    <textarea
                        type="text"
                        name='aboutCompany'
                        value={aboutCompany || ''}
                        onChange={this.handleChangeInput}
                    />
                </div>
                <div className={styles.info}>
                    <p>Информация, которая будет отображена на странице компании, по адресу https://gofriends.pro/ru/company-marketplace-nazar-inc</p>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.loginFormButton}
                    >
                        Сохранить
                    </Button>
                </div>

            </Form>
        )
    }

}


export default AboutCompany;