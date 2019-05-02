import React, {Component} from 'react';
import styles from "../MyProducts/MyProducts.module.css";
import {Modal, Cascader, Tabs} from 'antd';
import Dropzone from 'react-dropzone';
import {updatePartnerProduct} from "../../../actions/productsActions";

const TabPane = Tabs.TabPane;

class EditProductWindow extends Component {
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
        uploadImage: false,
        visible: false,
        activeTabKey: '1',
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
            imageUrl: '',
            imageUrls: [{
                url: ''
            }],
            coverImages: [],
            uploadImage: false,
            visible: false,
            activeTabKey: '1',
            id: '',
            selectedCategories: []
        });

        this.props.onUpdate();
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
            coverImages: arrFiles,
            uploadImage: true
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
        this.setState({
            [name]: value
        })
    };

    updateProduct = async (e) => {
        e.preventDefault();

        await updatePartnerProduct({
            ...this.state,
            category: this.state.category.id
        });

        this.props.onUpdate();
        this.handleCancel();
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.product.id) {
            this.setState({
                ...nextProps.product,
                visible: true
            })
        }
    }


    render() {
        const {
            name,
            brand,
            vendorCode,
            count,
            description,
            price,
            imageUrls,
            imageUrl,
            categories,
            selectedCategories,
            activeTabKey,
            coverImages,
            uploadImage
        } = this.state;

        return (
            <Modal
                title={name}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={false}
            >
                <div className='modal'>
                    <Tabs type="card" activeKey={activeTabKey} onChange={key => this.setState({activeTabKey: key})}>
                        <TabPane tab="Основная информация" key="1">
                            <form className={styles.mainInfo} onSubmit={this.updateProduct}>
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
                                            required
                                            value={brand}
                                            onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>Артикул</label>
                                        <input
                                            type="text"
                                            required
                                            name='vendorCode'
                                            value={vendorCode}
                                            onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div>
                                        <label>Количество</label>
                                        <input
                                            type="number"
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

                                <button className={styles.save}>
                                    Сохранить
                                </button>
                            </form>
                        </TabPane>

                        <TabPane tab="Категории" key="2">
                            <form className={styles.selectCategory} onSubmit={this.updateProduct}>
                                <div>
                                    <label>Выберите категорию для вашего товара</label>
                                    <Cascader
                                        value={selectedCategories}
                                        options={categories}
                                        onChange={this.onChangeCascader}
                                        loadData={this.loadData}
                                        changeOnSelect
                                        placeholder="Please select"

                                    />


                                    {/*<select onChange={this.handleChangeSelect}>*/}
                                    {/*{categories.map(item => (*/}
                                    {/*<option key={item.id} value={item.id}>{item.name}</option>*/}
                                    {/*))}*/}
                                    {/*</select>*/}
                                </div>

                                <button className={styles.save}>
                                    Сохранить
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
                                        onClick={this.updateProduct}>
                                    Сохранить
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
                                        <input type="text" name='imageUrl'
                                               value={imageUrl}
                                               onChange={this.handleChangeInput}/>

                                        <button className={styles.addUrlBtn}
                                                onClick={this.handleAddImageUrl}>Добавить URL
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.uploadInfo}>
                                    {uploadImage ? <span>
                                            Изображение загружено
                                        </span> : <span>
                                            Фотография должна быть не меньше
                                            150х150 пикселей, и не болше чем
                                            1000х1000 пикселей.
                                        </span>}

                                    <button type='button' className={styles.save}
                                            onClick={this.updateProduct}>
                                        Сохранить
                                    </button>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </Modal>
        )
    }
}

export default EditProductWindow;