import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import {Table, Icon, Popover, Tooltip} from 'antd';
import Dropzone from 'react-dropzone';
import styles from './ContractorProducts.module.css'
import CategoryList from "./CategoryList";
import {
    getContractorProducts,
    uploadXls,
    getContractorCategories,
    removeContractorProduct,
    getDownloadsStatus
} from '../../../actions/productsActions';
import {getProfile} from '../../../actions/userActions';
import NewProduct from "../components/Modal/NewProduct";

class ContractorProducts extends Component {
    state = {
        haveRozetkaAkaunt: false,
        categories: [],
        selectedRowKeys: [],
        products: [],
        product: {},
        filters: {
            category_id: '',
            name: '',
            vendor_code: '',
            min_price: '',
            max_price: '',
            brand: '',
            in_stock: ''
        },

        count: 0,
        currentPage: 1,

        uploadExel: false,
        uploadRozetka: false,
    };

    getMyProducts = async () => {
        const {currentPage, filters: {category_id, name, brand, in_stock, vendor_code, min_price, max_price}} = this.state;
        const urlParams = [
            category_id ? `&category_id=${category_id}` : '',
            name ? `&name=${name}` : '',
            brand ? `&brand=${brand}` : '',
            in_stock ? `&in_stock=${in_stock}` : '',
            vendor_code ? `&vendor_code=${vendor_code}` : '',
            min_price ? `&min_price=${min_price}` : '',
            max_price ? `&max_price=${max_price}` : '',
        ];

        const url = `?page=${currentPage + urlParams.join('')}`;
        const res = await getContractorProducts(url);

        this.setState({
            products: res.results,
            count: res.count
        })
    };


    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

    handleUploadFile = async (file, type) => {
        const formData = new FormData();
        formData.append(
            'xls_file',
            file[0]
        );
        formData.append(
            'file_type',
            type
        );

        await uploadXls(formData);
        this.props.history.push('/admin/products/download_history');
        this.handleUpdate();
    };

    getCategories = async () => {
        const res = await getContractorCategories();

        this.setState({
            categories: res
        })
    };

    handleChangeFilters = ({target: {name, value}}) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [name]: value
            }
        })
    };

    handleRemoveProducts = async () => {
        let idArr = [];
        await this.state.selectedRowKeys.forEach(item => {
            idArr.push(this.state.products[item].id)
        });

        console.log(idArr);
        await removeContractorProduct({productListIds: idArr});

        this.handleUpdate()
    };


    handleChangeTable = ({current}) => {
        this.setState({
            currentPage: current
        }, () => this.getMyProducts())
    };

    openProduct = (product) => {
        this.setState({
            product: product
        })
    };

    handleUpdate = () => {
        this.getMyProducts();
        this.getCategories();

        this.setState({
            selectedRowKeys: [],
            product: {}
        })
    };
    handleUpdateProduct = () => {
        this.setState({
            selectedRowKeys: [],
            product: {}
        })
    };

    handleSelectCategory = (category) => {
        this.setState({
            filters: {
                ...this.state.filters,
                category_id: category.key
            }
        }, () => this.getMyProducts())
    };

    checkUploader = async () => {
        const res = await getDownloadsStatus();
        let innerArr = [],
            rozetkaArr = [];

        res.forEach(item => {
            if (item.fileType === 'inner') {
                innerArr.push(item)
            } else {
                rozetkaArr.push(item)
            }
        });

        if (innerArr.every(item => item.isUploaded)) {
            this.setState({
                uploadExel: true
            })
        }

        if (rozetkaArr.every(item => item.isUploaded)) {
            this.setState({
                uploadRozetka: true
            })
        }

        console.log(res);
    };


    async componentDidMount() {
        this.getMyProducts();
        this.getCategories();
        this.checkUploader();

        const res = await getProfile();
        if (res.rozetkaPassword && res.rozetkaUsername) {
            this.setState({
                haveRozetkaAkaunt: true
            })
        }
    };

    render() {
        const {
            haveRozetkaAkaunt,
            selectedRowKeys,
            products,
            categories,
            product,
            count,
            currentPage,
            filters: {
                name,
                vendor_code,
                min_price,
                max_price,
                brand,
            },
            uploadExel,
            uploadRozetka
        } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            onSelection: this.onSelection,
        };


        const columns = [
            {
                title: 'Название товара',
                dataIndex: 'name',
                render: (name, item) => (
                    <span className='product-avatar'>
                <img
                    src={item.coverImages.length > 0 ? item.coverImages[0].imageDecoded : (item.imageUrls.length > 0 ? item.imageUrls [0].url : '')}
                    alt=""/>
                        {name}
            </span>
                )
            },
            {
                title: 'Артикул',
                dataIndex: 'vendorCode',
            },
            {
                title: 'Бренд',
                dataIndex: 'brand',
            },
            {
                title: 'Категория',
                dataIndex: 'category',
                render: (category) => (
                    <span>{category ? category.name : ''}</span>
                )
            },
            {
                title: 'Цена',
                dataIndex: 'price',
                render: (price) => (
                    <span>{price} грн</span>
                )
            },
            {
                title: 'Наличие',
                dataIndex: 'count',
            },
            {
                title: '',
                dataIndex: 'actions',
                render: (e, product) => (
                    <Icon onClick={() => this.openProduct(product)} type="edit" theme="filled"/>
                )
            }
        ];

        const config = {
            pagination: {
                pageSize: 10,
                total: count,
                current: currentPage
            }
        };

        return (
            <div className={styles.Page}>
                <div className={styles.top}>
                    <h3 className={styles.title}>
                        <Popover placement="bottom" content={(
                            <CategoryList
                                categories={categories}
                                onSelectCategory={this.handleSelectCategory}
                            />
                        )}>
                            <Icon type="bars"/>
                        </Popover>

                        Категории
                    </h3>
                    <Link to="/admin/instruction" className={styles.howToAdd}>Как добавить товар?</Link>
                </div>

                <div className={styles.categories}>
                    <div className={styles.categoriesBlock}>
                        <div className={styles.actions}>
                            <NewProduct
                                onUpdate={this.handleUpdate}
                                onUpdateProduct={this.handleUpdateProduct}
                                product={product}
                                update={product.id ? true : false}
                            />

                            <Dropzone onDrop={e => this.handleUploadFile(e, 'inner')} accept=".xls, .xlsx"
                                      multiple={false}>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()} />
                                        <button className='btn' disabled={!uploadExel}>Загрузить Exel файл</button>
                                    </div>
                                )}
                            </Dropzone>

                            <Dropzone onDrop={e => this.handleUploadFile(e, 'rozetka')} multiple={false}>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()} />
                                        {!haveRozetkaAkaunt ? <Tooltip title="Поля логин и пароль с «Rozetka marketplace» не заполнены">
                                                <button className='btn'
                                                        disabled>Загрузить с Rozetka
                                                </button>
                                            </Tooltip>
                                            :
                                            <button className='btn'
                                                    disabled={!uploadRozetka}>Загрузить с
                                                Rozetka</button>
                                        }

                                    </div>
                                )}
                            </Dropzone>

                            <button className='btn'
                                    onClick={() => this.props.history.push('/admin/products/download_history')}>
                                История загрузок
                            </button>

                            <div className={styles.totalProducts}>
                                Товаров: {count}
                            </div>

                        </div>

                        <div className={styles.filter}>
                            <div>
                                <label>Название товара</label>
                                <input
                                    type="text"
                                    className={styles.productName}
                                    name='name'
                                    value={name}
                                    onChange={this.handleChangeFilters}
                                />
                            </div>

                            <div>
                                <label>Артикул</label>
                                <input
                                    type="text"
                                    className={styles.productName}
                                    name='vendor_code'
                                    value={vendor_code}
                                    onChange={this.handleChangeFilters}
                                />
                            </div>

                            <div>
                                <label>Бренд</label>
                                <input
                                    type="text"
                                    className={styles.productName}
                                    name='brand'
                                    value={brand}
                                    onChange={this.handleChangeFilters}
                                />
                            </div>

                            <div>
                                <label>Наличие</label>
                                <select className={styles.availability}
                                        onChange={({target: {value}}) => this.setState({
                                            filters: {
                                                ...this.state.filters,
                                                in_stock: value
                                            }
                                        })}>
                                    <option value=''>Все</option>
                                    <option value={true}>В наличии</option>
                                    <option value={false}>Нет в наличии</option>
                                </select>
                            </div>

                            <div>
                                <label>Цена от</label>
                                <input
                                    type="number"
                                    className={styles.productName}
                                    name='min_price'
                                    value={min_price}
                                    onChange={this.handleChangeFilters}
                                />
                            </div>
                            <div>
                                <label>До</label>
                                <input
                                    type="number"
                                    className={styles.productName}
                                    name='max_price'
                                    value={max_price}
                                    onChange={this.handleChangeFilters}
                                />
                            </div>
                            <div>
                                <button className='btn' onClick={this.getMyProducts}>Поиск</button>
                            </div>
                        </div>

                        <Table
                            {...config}
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={products}
                            onChange={this.handleChangeTable}
                        />

                        <button className={`btn-remove ${styles.removeBtn}`}
                                onClick={this.handleRemoveProducts}>
                            Удалить товары
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContractorProducts;





