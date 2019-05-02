import React, {Component} from 'react'
import styles from './Modal.module.css'
import { Modal } from 'antd';

class ProductModal extends Component {
    state = {
        visible: false
    };

    render() {
        return(
            <Modal
                title="iPhone XR 64GB Space Grey"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={false}
                className={styles.productCard}
            >
                <div className={styles.productInfo}>
                    <div className={styles.productInfoImg}>
                        {/*<img src={iphonexr} alt=""/>*/}
                    </div>

                    <div className={styles.specifications}>
                        <div className={styles.specificationsItems}>
                            <div>
                                <label>Поставщик</label>
                                <span>Nazar Market</span>
                            </div>
                            <div>
                                <label>Наличие</label>
                                <span>В наличии</span>
                            </div>
                            <div>
                                <label>Цена</label>
                                <span>23844.00 грн</span>
                            </div>
                        </div>
                        <div className={styles.specificationsItems}>
                            <div>
                                <label>Артикул</label>
                                <span>Jf21414dS</span>
                            </div>
                            <div>
                                <label>Категория</label>
                                <span>Телефоны, MP3, GPS</span>
                            </div>
                            <div>
                                <label>Бренд</label>
                                <span>Apple</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h5 className={styles.descriptionTitle}>Описание</h5>
                    <div className={styles.descriptionText}>
                        <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
                            Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                            В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
                            используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил
                            без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации
                            в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и,
                            в более недавнее время,  программы электронной вёрстки типа Aldus PageMaker, в шаблонах
                            которых используется Lorem Ipsum.</p>
                    </div>
                </div>

            </Modal>

        )
    }
}

export default ProductModal;