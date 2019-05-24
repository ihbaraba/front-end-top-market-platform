import React, {Component, Fragment} from 'react'
import styles from './AdditionalServices.module.css'
import 'antd/dist/antd.css';
import {Modal} from 'antd'

import edit from '../../../img/edit-document.svg';
import customer from '../../../img/customer.svg';
import megaphone from '../../../img/megaphone.svg';
import handgrip from '../../../img/handgrip.svg';


class AdditionalServices extends Component {
    state = {
        visible: false
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {visible} = this.state;

        return (
            <Fragment>
                <div className='page'>
                    <h3 className='page-title'>Дополнительные услуги (Находится в разработке)</h3>

                    <div className={styles.servicesBlock}>
                        <div className={styles.servicesItem}>
                            <div className={styles.item}>
                                <div className={styles.itemImg}>
                                    <img src={edit} alt="edit"/>
                                </div>
                                <h5 className={styles.itemTitle}>Копирайтинг <br/> для Вашего магазина</h5>
                                <p className={styles.itemDescription}>Lorem Ipsum - это текст-"рыба",
                                    часто используемый в печати и вэб-дизайне. </p>
                            </div>

                            <button className='btn m-0' onClick={this.showModal}>Заказать</button>
                        </div>

                        <div className={styles.servicesItem}>
                            <div className={styles.item}>
                                <div className={styles.itemImg}>
                                    <img src={customer} alt="edit"/>
                                </div>
                                <h5 className={styles.itemTitle}>SEO оптимизация <br/> для Вашего магазина</h5>
                                <p className={styles.itemDescription}>Lorem Ipsum - это текст-"рыба",
                                    часто используемый в печати и вэб-дизайне. </p>
                            </div>

                            <button className='btn m-0' onClick={this.showModal}>Заказать</button>
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

                            <button className='btn m-0' onClick={this.showModal}>Заказать</button>
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

                            <button className='btn m-0' onClick={this.showModal}>Заказать</button>
                        </div>
                    </div>
                </div>

                <div className="payModal">
                    <Modal
                        title="Покупка пакета"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        className={styles.buyPackage}
                        footer={false}
                    >
                        <div className={styles.modalContent}>
                            <p>Для того чтобы приобрести пакет доступа на Вашем аккаунте,
                                Вы можете воспользоваться двумя способами оплаты :
                                Оплата с помощью сервиса LiqPay или же оплата с помощью
                                банковской карты.
                            </p>
                        </div>
                        <div className={styles.payActions}>
                            <form method="POST" action="https://www.liqpay.ua/api/3/checkout"
                                  accept-charset="utf-8">
                                <input type="hidden" name="data" value="{{ data }}"/>
                                <input type="hidden" name="signature" value="{{ signature }}"/>

                                <button className='btn'>Оплатить через LiqPay</button>
                            </form>

                            <button className='btn' onClick={this.handleSendInvoice}>
                                Отправить счет фактуру на e-mail
                            </button>
                        </div>
                    </Modal>
                </div>
            </Fragment>

        );
    }
}

export default AdditionalServices;





