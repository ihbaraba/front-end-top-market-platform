import React, {Component} from 'react'
import 'antd/dist/antd.css';
import styles from './CompanySettings.module.css'







class Pitch extends Component {


    render() {

        return (
            <div className={styles.pitch}>
                <div>
                    <label>Кто вы?</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>В чем вы Гуру?</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Для кого работает ваша компания?</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Чем отличаетесь от конкурентов?</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Мы классные партнеры, потому что:</label>
                    <input type="text"/>
                </div>
                <div className={styles.last}>
                    <div>
                        <label>Какой будет ваша компания через 5 лет?</label>
                        <input type="text"/>
                    </div>
                    <button className={styles.save}>Сохранить</button>
                </div>
            </div>
        );
    }
}

export default Pitch;





