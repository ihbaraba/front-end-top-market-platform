import React, {Component} from 'react'
// import styles from './MyProducts.module.css'
import 'antd/dist/antd.css';
import {Modal} from 'antd';
import styles from "../../MyProducts/MyProducts.module.css";
import stylesModal from "./Modal.module.css";
import {Tabs} from 'antd';
import {createNewProduct, getAllCategories, updateProduct} from '../../../../actions/productsActions';
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
        imageUrls: [],
        coverImages: [],

        visible: false,
        activeTabKey: '1',
        categories: []
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
            name: '',
            brand: '',
            vendorCode: '',
            count: '',
            category: '',
            description: '',
            price: '',
            imageUrls: [],
            coverImages: [],

            visible: false,
            activeTabKey: '1',
            id: ''
        });
    };

    onDrop = async (files) => {
        let arrFiles = [];

        await files.forEach(file => {
            this.getBase64(file, (result) => {
                arrFiles.push({
                    imageDecoded: result
                })
            });
        });

        this.setState({
            coverImages: arrFiles
        })
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
        console.log(value);
        console.log(name);
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

        this.handleCancel();
    };

    updateProduct = async () => {
        await updateProduct(this.state);

        this.props.onUpdate();
    };

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log(prevState);
    //     console.log(nextProps);
    //     if (nextProps.update) {
    //         return {
    //             ...nextProps.product,
    //             visible: true
    //         };
    //     }
    //     else return null;
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.update) {
            this.setState({
                ...nextProps.product,
                visible: true
            })
        }
    }

    async componentDidMount() {
        const res = await getAllCategories();
        console.log(res);
        this.setState({
            categories: res
        })
    }

    render() {
        const {
            id,
            name,
            brand,
            vendorCode,
            count,
            category,
            description,
            price,
            imageUrls,
            categories,
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

                                    {id ?
                                        <button type='button' className={styles.save}
                                                onClick={this.updateProduct}>
                                            Сохранить
                                        </button>
                                        :
                                        <button type='button' className={styles.save}
                                                onClick={() => this.setState({activeTabKey: '2'})}>
                                            Далее
                                        </button>
                                    }
                                </form>
                            </TabPane>

                            <TabPane tab="Категории" key="2">
                                <form className={styles.selectCategory}>
                                    <div>
                                        <label>Выберите категорию для вашего товара</label>
                                        <select onChange={this.handleChangeSelect}>
                                            {categories.map(item => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
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





