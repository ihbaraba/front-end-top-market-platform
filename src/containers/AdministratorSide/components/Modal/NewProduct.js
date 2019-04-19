import React, {Component} from 'react'
// import styles from './MyProducts.module.css'
import 'antd/dist/antd.css';
import {Modal} from 'antd';
import styles from "../../MyProducts/MyProducts.module.css";
import stylesModal from "./Modal.module.css";
import {Tabs} from 'antd';
import {createNewProduct} from '../../../../actions/productsActions';
import Dropzone from 'react-dropzone';

const TabPane = Tabs.TabPane;

// const operations = <Button>Extra Action</Button>;


class NewProduct extends Component {

    state = {
        name: '',
        brand: '',
        vendorCode: '',
        count: '',
        category: '',
        description: '',
        price: '',
        imageUrls: '',

        visible: false,
        activeTabKey: '1'
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
            activeTabKey: '1'
        });
    };

    onDrop = (file) => {
        this.getBase64(file[0], (result) => {
            this.setState({
                coverImages: result,
            })
        });
    };

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    handleChangeInput = ({target: {value, name}}) => {
        this.setState({
            [name]: value
        })
    };
    handleChangeSelect = (e) => {
        this.setState({
            category: e.target.value
        })
    };

    handleCreateProduct = async (e) => {
        e.preventDefault();

        const res = await createNewProduct(this.state);
        this.props.onUpdate();

        this.handleOk();
        this.setState({
            name: '',
            brand: '',
            vendorCode: '',
            count: '',
            category: '',
            description: '',
            price: '',

            visible: false,
            activeTabKey: '1'
        });
    };

    render() {
        const {
            name,
            brand,
            vendorCode,
            count,
            category,
            description,
            price,
            imageUrls,
            activeTabKey
        } = this.state;
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
                    <div className='modal'>
                        <Tabs type="card" activeKey={activeTabKey} onChange={key => this.setState({activeTabKey: key})}>
                            <TabPane tab="Основная информация" key="1">
                                <form className={styles.mainInfo}>
                                    <div className={styles.inputsGroup}>
                                        <div>
                                            <label>Название товара</label>
                                            <input
                                                type="text"
                                                name='name'
                                                value={name}
                                                onChange={this.handleChangeInput}
                                            />
                                        </div>
                                        <div>
                                            <label>Бренд</label>
                                            <input
                                                type="text"
                                                name='brand'
                                                value={brand}
                                                onChange={this.handleChangeInput}
                                            />
                                        </div>
                                        <div>
                                            <label>Артикул</label>
                                            <input
                                                type="text"
                                                name='vendorCode'
                                                value={vendorCode}
                                                onChange={this.handleChangeInput}
                                            />
                                        </div>
                                        <div>
                                            <label>Наличие</label>
                                            <input
                                                type="text"
                                                name='count'
                                                value={count}
                                                onChange={this.handleChangeInput}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label>Описание</label>
                                        <textarea
                                            name='description'
                                            value={description}
                                            onChange={this.handleChangeInput}
                                        />
                                    </div>

                                    <button type='button' className={styles.save}
                                            onClick={() => this.setState({activeTabKey: '2'})}>
                                        Далее
                                    </button>
                                </form>
                            </TabPane>

                            <TabPane tab="Категории" key="2">
                                <form className={styles.selectCategory}>
                                    <div>
                                        <label>Выберите категорию для вашего товара</label>
                                        <select onChange={this.handleChangeSelect}>
                                            <option value="1">Телефоны</option>
                                            <option value="2">MP3</option>
                                            <option value="3">Ноутбуки</option>
                                        </select>
                                    </div>

                                    <button type='button' className={styles.save}
                                            onClick={() => this.setState({activeTabKey: '3'})}>
                                        Далее
                                    </button>
                                </form>
                            </TabPane>

                            <TabPane tab="Цена" key="3">
                                <form className={styles.selectPrice}>
                                    <div>
                                        <label>Укажите цену для вашего товара (грн)</label>
                                        <input
                                            type="text"
                                            name='price'
                                            value={price}
                                            onChange={this.handleChangeInput}
                                        />
                                    </div>

                                    <button type='button' className={styles.save}
                                            onClick={() => this.setState({activeTabKey: '4'})}>
                                        Далее
                                    </button>
                                </form>
                            </TabPane>

                            <TabPane tab="Изображение" key="4">
                                <div className={styles.addPicture}>
                                    <div className={styles.upload}>
                                        <div>
                                            <input type="file" name="uploadfile" id="addImg"/>
                                            <Dropzone onDrop={this.onDrop} accept=".png, .svg, .jpg">
                                                {({getRootProps, getInputProps}) => (
                                                    <div {...getRootProps({className: 'dropzone'})}>
                                                        <input {...getInputProps()} />
                                                        <label htmlFor="addImg">Добавить картинку</label>
                                                    </div>
                                                )}
                                            </Dropzone>

                                        </div>
                                        <div className={styles.addUrl}>
                                            <input type="text" name='imageUrls' value={imageUrls}
                                                   onChange={this.handleChangeInput}/>
                                            <button className={styles.addUrlBtn}>Добавить URL</button>
                                        </div>
                                    </div>
                                    <div className={styles.uploadInfo}>
                                        <span>
                                            Фотография должна быть не меньше
                                            150х150 пикселей, и не болше чем
                                            1000х1000 пикселей.
                                        </span>
                                        <button className={styles.download}
                                                onClick={this.handleCreateProduct}>Сохранить
                                        </button>
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





