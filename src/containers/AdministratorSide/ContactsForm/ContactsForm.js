import React, {Component} from 'react'
import styles from './ContactsForm.module.css'



class ContactsForm extends Component {


    render() {

        return (
            <div>
                <form className={styles.contactForm}>
                    <h5 className={styles.title}>Контактная форма</h5>
                    <div>
                        <label>Имя</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Емеил</label>
                        <input type="email"/>
                    </div>
                    <div>
                        <label>Тема</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Сообщение</label>
                        <textarea></textarea>
                    </div>
                    <button className={styles.send}>Отправить</button>
                </form>
            </div>
        );
    }
}

export default ContactsForm;





