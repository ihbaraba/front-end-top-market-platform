import React, {Component} from 'react';
import {Form, Button} from 'antd';
import styles from './CompanySettings.module.css';
import {getCompanyPitch, updateCompanyPitch} from "../../../actions/companyActions";
import {notification} from "antd";

const FormItem = Form.Item;


class CompanyPitch extends Component {
    state = {
        whoAreYou: '',
        guru: '',
        forWhom: '',
        difference: '',
        goodPartner: '',
        future: ''
    };

    handleChangeInput = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        })
    };

    handleUpdateCompanyPitch = (e) => {
        e.preventDefault();

        updateCompanyPitch(this.state)
            .then(() => notification.success({
                    message: 'Сохранено',
                })
            )
    };

    async componentDidMount() {
      const res = await getCompanyPitch();

      this.setState(res)
    };

    render() {
        const {
            whoAreYou,
            guru,
            forWhom,
            difference,
            goodPartner,
            future
        } = this.state;

        return (
            <Form onSubmit={this.handleUpdateCompanyPitch} className={styles.Form, styles.pitch}>
                <div>
                    <FormItem>
                        <label htmlFor="">Кто вы?</label>
                        <input
                            type="text"
                            name='whoAreYou'
                            value={whoAreYou || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

                    <FormItem>
                        <label htmlFor="">В чем вы Гуру?</label>
                        <input
                            type="text"
                            name='guru'
                            value={guru || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

                    <FormItem>
                        <label htmlFor="">Для кого работает ваша компания?</label>
                        <input
                            type="text"
                            name='forWhom'
                            value={forWhom || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

                    <FormItem>
                        <label htmlFor="">Чем отличаетесь от конкурентов?</label>
                        <input
                            type="text"
                            name='difference'
                            value={difference || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

                    <FormItem>
                        <label htmlFor="">Мы классные партнеры, потому что:</label>
                        <input
                            type="text"
                            name='goodPartner'
                            value={goodPartner || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

                    <FormItem>
                        <label htmlFor="">Какой будет ваша компания через 5 лет?</label>
                        <input
                            type="text"
                            name='future'
                            value={future || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

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

export default CompanyPitch;