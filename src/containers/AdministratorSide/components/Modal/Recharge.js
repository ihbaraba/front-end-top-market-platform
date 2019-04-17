import React, {Component} from 'react'
import styles from './Modal.module.css'
import {Modal} from "antd";



class Recharge extends Component {

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
                <button className={styles.replenish} onClick={this.showModal}>Пополнить</button>
                <Modal
                    title="Пополнение баланса"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className={styles.buyPackage}
                    footer={false}
                >
                    <div className={styles.modalContent}>
                        <p>Для того чтобы пополнить баланс на Вашем аккаунте,
                            Вы можете воспользоваться двумя способами опалаты :
                            Пополение баланса с помощью карты или же оплата на счет фактуры.
                        </p>
                    </div>
                    <div className={styles.payActions}>
                        <button className={styles.payBtn}>Оплатить через LiqPay</button>
                        <button className={styles.payBtn}>Отправить счет фактуру на e-mail</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Recharge;





