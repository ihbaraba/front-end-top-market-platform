import React, {Component, Fragment} from 'react'
import styles from './ContactsForm.module.css'

import {sendContactForm} from '../../../actions/userActions';
import {notification} from "antd";

class ContactsForm extends Component {
    state = {
        name: '',
        email: '',
        subject: '',
        text: ''
    };

    handleSend = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'),
            {name, email, subject, text} = this.state;

        if (token) {
            await sendContactForm({
                subject: subject ? subject : '',
                text: text ? text : ''
            });
        } else {
            await sendContactForm({
                name: name ? name : '',
                email: email ? email : '',
                subject: subject ? subject : '',
                text: text ? text : ''
            });

        }

        notification.success({
            message: 'Отправлено',
        });

        this.setState({
            name: '',
            email: '',
            subject: '',
            text: ''
        })


    };

    handleChange = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        })
    };

    renderForm = () => {
        const token = localStorage.getItem('token'),
            {name, email, subject, text} = this.state;

        if (token) {
            return (
                <Fragment>
                    <div>
                        <label>Тема</label>
                        <input type="text"
                               value={subject}
                               name='subject'
                               onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Сообщение</label>
                        <textarea
                            value={text}
                            name='text'
                            onChange={this.handleChange}
                        />
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div>
                        <label>Имя</label>
                        <input type="text"
                               value={name}
                               name='name'
                               onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email"
                               value={email}
                               name='email'
                               onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Тема</label>
                        <input type="text"
                               value={subject}
                               name='subject'
                               onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Сообщение</label>
                        <textarea
                            value={text}
                            name='text'
                            onChange={this.handleChange}
                        />
                    </div>
                </Fragment>
            )
        }
    };

    render() {

        return (
            <div>
                <form className={styles.contactForm}>
                    <h5 className={styles.title}>Контактная форма</h5>
                    {this.renderForm()}
                    <button className={styles.send} onClick={this.handleSend}>Отправить</button>
                </form>
            </div>
        );
    }
}

export default ContactsForm;





