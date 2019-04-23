import React, {Component} from 'react'
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import styles from './LearningModule.module.css'
import {Modal} from "antd";




class LearningModule extends Component {

    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {


        return (
            <div>
                <h3 className={styles.title}>Обучающий модуль (Находится в разработке)</h3>
                <div className={styles.learningModule}>
                    <div className={styles.previewImg}></div>
                    <div className={styles.aboutModule}>
                        <div className={styles.top}>
                            <h5>Основы торговли на маркетплейсе</h5>
                            <div className={styles.modulePrice}>3000 грн</div>
                        </div>
                        <div className={styles.description}>
                            <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати
                                и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов
                                на латинице с начала XVI века. В то время некий безымянный печатник
                                создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для
                                распечатки образцов. Lorem Ipsum не только успешно пережил без заметных
                                изменений пять веков, но и перешагнул в электронный дизайн. </p>
                        </div>
                        <button className={styles.buy} onClick={this.showModal}>Купить</button>
                    </div>
                </div>


                <div className="payModal">
                    <Modal
                        title="Покупка обучающего модуля"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        className={styles.buyPackage}
                        footer={false}
                    >
                        <div className={styles.modalContent}>
                            <p>Для того чтобы приобрести пакет достпуа на Вашем аккаунте,
                                Вы моете воспользоваться двумя способами опалаты :
                                Оплата с помощью сервиса LiqPay или же оплата с помощью
                                банковоской карты.
                            </p>
                        </div>
                        <div className={styles.payActions}>
                            <Link to="/admin/lessons"><button className={styles.payBtn}>Оплатить через LiqPay</button></Link>
                            <button className={styles.payBtn}>Отправить счет фактуру на e-mail</button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default LearningModule;





