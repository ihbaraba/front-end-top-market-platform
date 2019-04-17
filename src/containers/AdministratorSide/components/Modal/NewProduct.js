import React, {Component} from 'react'
// import styles from './MyProducts.module.css'
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import styles from "../../MyProducts/MyProducts.module.css";
import { Tabs } from 'antd';



const TabPane = Tabs.TabPane;

// const operations = <Button>Extra Action</Button>;


class NewProduct extends Component {

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
                <button className={styles.actbtn} onClick={this.showModal}>Добавить товар</button>
                <Modal
                    title="Новый товар"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={false}
                >
                    <div>
                        <Tabs>
                            <TabPane tab="Основная информация" key="1">
                                <form className={styles.mainInfo}>
                                    <div className={styles.inputsGroup}>
                                        <div>
                                            <label>Название товара</label>
                                            <input type="text"/>
                                        </div>
                                        <div>
                                            <label>Бренд</label>
                                            <input type="text"/>
                                        </div>
                                        <div>
                                            <label>Артикул</label>
                                            <input type="text"/>
                                        </div>
                                        <div>
                                            <label>Наличие</label>
                                            <input type="text"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label>Описание</label>
                                        <textarea></textarea>
                                    </div>
                                    <button className={styles.save}>Сохранить</button>
                                </form>
                            </TabPane>
                            <TabPane tab="Категории" key="2">
                               <form className={styles.selectCategory}>
                                    <div>
                                        <label>Выберите категорию для вашего товара</label>
                                        <select>
                                            <option value="">Телефоны</option>
                                            <option value="">MP3</option>
                                            <option value="">Ноутбуки</option>
                                        </select>
                                    </div>
                                   <button className={styles.save}>Сохранить</button>
                               </form>
                            </TabPane>
                            <TabPane tab="Цена" key="3">
                                <form className={styles.selectPrice}>
                                    <div>
                                        <label>Укажите цену для вашего товара (грн)</label>
                                        <input type="text"/>
                                    </div>
                                    <button className={styles.save}>Сохранить</button>
                                </form>
                            </TabPane>
                            <TabPane tab="Изображение" key="4">
                                <div className={styles.addPicture}>
                                    <div className={styles.upload}>
                                        <div>
                                            <input type="file" name="uploadfile" id="addImg"/>
                                            <label htmlFor="addImg">Добавить картинку</label>
                                        </div>
                                        <div className={styles.addUrl}>
                                            <input type="text"/>
                                            <button className={styles.addUrlBtn}>Добавить URL</button>
                                        </div>
                                    </div>
                                    <div className={styles.uploadInfo}>
                                        <span>
                                            Фотография должна быть не меньше
                                            150х150 пикселей, и не болше чем
                                            1000х1000 пикселей.
                                        </span>
                                        <button className={styles.download}>Загрузить</button>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default NewProduct;





