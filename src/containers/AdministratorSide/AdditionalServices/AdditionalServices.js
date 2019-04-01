import React, {Component} from 'react'
import styles from './AdditionalServices.module.css'
import 'antd/dist/antd.css';

import edit from '../../../img/edit-document.svg';
import customer from '../../../img/customer.svg';
import megaphone from '../../../img/megaphone.svg';
import handgrip from '../../../img/handgrip.svg';



class AdditionalServices extends Component {
    render() {
        return (
            <div >
                <h3 className={styles.title}>Дополнительные услуги</h3>
                <div className={styles.servicesBlock}>
                    <div className={styles.servicesItem}>
                        <div className={styles.item}>
                            <div className={styles.itemImg}>
                                <img src={edit} alt="edit"/>
                            </div>
                            <h5 className={styles.itemTitle}>Копирайтинг <br /> для Вашего магазина</h5>
                            <p className={styles.itemDescription}>Lorem Ipsum - это текст-"рыба",
                                часто используемый в печати и вэб-дизайне. </p>
                        </div>
                        <button className={styles.order}>Заказать</button>
                    </div>
                    <div className={styles.servicesItem}>
                        <div className={styles.item}>
                            <div className={styles.itemImg}>
                                <img src={customer} alt="edit"/>
                            </div>
                            <h5 className={styles.itemTitle}>SEO оптимизация <br /> для Вашего магазина</h5>
                            <p className={styles.itemDescription}>Lorem Ipsum - это текст-"рыба",
                                часто используемый в печати и вэб-дизайне. </p>
                        </div>
                        <button className={styles.order}>Заказать</button>
                    </div>
                    <div className={styles.servicesItem}>
                        <div className={styles.item}>
                            <div className={styles.itemImg}>
                                <img src={megaphone} alt="edit"/>
                            </div>
                            <h5 className={styles.itemTitle}>Продвижение <br/> для Вашего магазина</h5>
                            <p className={styles.itemDescription}>Lorem Ipsum - это текст-"рыба",
                                часто используемый в печати и вэб-дизайне. </p>
                        </div>
                        <button className={styles.order}>Заказать</button>
                    </div>
                    <div className={styles.servicesItem}>
                        <div className={styles.item}>
                            <div className={styles.itemImg}>
                                <img src={handgrip} alt="edit"/>
                            </div>
                            <h5 className={styles.itemTitle}>Управление Вашим <br/> магазином</h5>
                            <p className={styles.itemDescription}>Lorem Ipsum - это текст-"рыба",
                                часто используемый в печати и вэб-дизайне. </p>
                        </div>
                        <button className={styles.order}>Заказать</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdditionalServices;





