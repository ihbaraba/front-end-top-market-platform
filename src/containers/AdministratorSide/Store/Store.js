import React, {Component} from 'react'
import 'antd/dist/antd.css';
import styles from './Store.module.css'
import nike from "../../../img/nike.jpg";

class Store extends Component {

    state = {
        phoneNumber: ''
    };

    handleChangeInput = (name) => ({target: {value}}) => {
        this.setState({
            [name]: value
        })
    };

    render() {
        const {
            phoneNumber
        } = this.state;
        return (
            <div className='page'>
                <h3 className='page-title'>Управление интернет магазином (Находится в разработке)</h3>

                <form className='page-content'>
                    {/*<div className={styles.domen}>*/}
                    {/*<div>*/}
                    {/*<div className={styles.inputsGroup}>*/}
                    {/*<label>Домен или поддомен</label>*/}
                    {/*<select>*/}
                    {/*<option>Домен</option>*/}
                    {/*<option>Поддомен</option>*/}
                    {/*</select>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*<label>Имя домена</label>*/}
                    {/*<input type="text"/>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className={styles.radioBtns}>*/}
                    {/*<div className={styles.radio}>*/}
                    {/*<input type="radio" id="radio01" name="radio"/>*/}
                    {/*<label htmlFor="radio01">Топ продаж</label>*/}
                    {/*</div>*/}
                    {/*<div className={styles.radio}>*/}
                    {/*<input type="radio" id="radio02" name="radio"/>*/}
                    {/*<label htmlFor="radio02">Без товара</label>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}

                    <h4 className={styles.formTitle}>Информация в «Хэдере»</h4>
                    <div className={styles.headerInfo}>
                        <div>
                            <div className={styles.input}>
                                <label>Номер телефона 1 (до 6 включительно)</label>
                                <input
                                    type="tel"
                                    placeholder="+38 (096) 933 - 45 - 43"
                                    value={phoneNumber}
                                    onChange={this.handleChangeInput('phoneNumber')}
                                />
                                {/*<button className={styles.add} onClick={this.add}>+</button>*/}
                            </div>
                            <div className={styles.input}>
                                <label>Раздел навигации 1 (до 6 включительно)</label>
                                <input type="text" placeholder="Доставка и оплата"/>
                                {/*<button className={styles.add} onClick={this.add}>+</button>*/}
                            </div>

                            {/*<div className={styles.input}>*/}
                            {/*<label>Функция Call-back</label>*/}
                            {/*<select>*/}
                            {/*<option>Включена</option>*/}
                            {/*<option>выключена</option>*/}
                            {/*</select>*/}
                            {/*</div>*/}
                        </div>

                        {/*<div className={styles.logo}>*/}
                        {/*<div className={styles.logoImg}>*/}
                        {/*<img src={nike} alt="nike"/>*/}
                        {/*</div>*/}
                        {/*<div className={styles.logoInfo}>*/}
                        {/*<h4 className={styles.formTitle}>Логотип</h4>*/}
                        {/*<p>Логотип должен быть в формате: JPEG,SVG,PNG</p>*/}
                        {/*<button className={styles.download}>Загрузить логотип</button>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                    </div>

                    <h4 className={styles.formTitle}>Информация в «Футере»</h4>

                    <div className={styles.footerInfo}>
                        <div className={styles.input}>
                            <label>Номер телефона 1 (до 6 включительно)</label>
                            <input type="tel" placeholder="+38 (096) 933 - 45 - 43"/>
                            {/*<button className={styles.add} onClick={this.add}>+</button>*/}
                        </div>
                        <div className={styles.input}>
                            <label>Раздел навигации 1 (до 6 включительно)</label>
                            <input type="text" placeholder="Доставка и оплата"/>
                            {/*<button className={styles.add} onClick={this.add}>+</button>*/}
                        </div>
                        <div>
                            <label>Facebook</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label>Instagram</label>
                            <input type="text"/>
                        </div>
                        <div>
                            <label>Linkedin</label>
                            <input type="text"/>
                        </div>
                    </div>

                    {/*<h4 className={styles.formTitle}>Выберите дизайн-шаблон</h4>*/}
                    {/*<div className={styles.choiceDesign}>*/}
                    {/*<label>*/}
                    {/*<input type="radio" name="template" value="blue"/>*/}
                    {/*<img src={nike}/>*/}
                    {/*</label>*/}
                    {/*<label>*/}
                    {/*<input type="radio" name="template" value="pink"/>*/}
                    {/*<img src={nike}/>*/}
                    {/*</label>*/}
                    {/*<label>*/}
                    {/*<input type="radio" name="template" value="purple"/>*/}
                    {/*<img src={nike}/>*/}
                    {/*</label>*/}
                    {/*<label>*/}
                    {/*<input type="radio" name="template" value="orange"/>*/}
                    {/*<img src={nike}/>*/}
                    {/*</label>*/}

                    {/*</div>*/}
                    <button className={styles.create}>Создать</button>
                </form>
            </div>
        );
    }
}

export default Store;





