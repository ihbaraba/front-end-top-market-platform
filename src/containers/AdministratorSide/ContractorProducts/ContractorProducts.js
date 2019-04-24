import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import {Table, Icon, Popover} from 'antd';
import Dropzone from 'react-dropzone';
import styles from './ContractorProducts.module.css'
import CategoryList from "./CategoryList";
import {
    getContractorProducts,
    uploadXls,
    getContractorCategories,
    removeContractorProduct
} from '../../../actions/productsActions';
import NewProduct from "../components/Modal/NewProduct";

class ContractorProducts extends Component {
    state = {
        categories: [],
        selectedRowKeys: [],
        products: [],
        product: {},
        filters: {
            category_id: '',
            name: '',
            vendor_code: '',
            min_price: '',
            max_price: ''
        },

        count: 0,
        currentPage: 1
    };

    getMyProducts = async () => {
        const {currentPage, filters: {category_id, name, vendor_code, min_price, max_price}} = this.state;
        const urlParams = [
            category_id ? `&category_id=${category_id}` : '',
            name ? `&name=${name}` : '',
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

    handleUploadFile = async (file) => {
        const formData = new FormData();
        formData.append(
            'xls_file',
            file[0]
        );
        await uploadXls(formData);
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

    componentDidMount() {
        this.getMyProducts();
        this.getCategories();
    };

    render() {
        const {
            selectedRowKeys,
            products,
            categories,
            product,
            count,
            currentPage,
            name,
            vendor_code,
            min_price,
            max_price,
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
                    <span className={styles.productName}>
                <img src={item.coverImages.length > 0 ? item.coverImages[0].imageDecoded : ''} alt=""/>
                        {name}
            </span>
                )
            },
            {
                title: 'Код товара',
                dataIndex: 'id',
            },
            {
                title: 'Бренд',
                dataIndex: 'brand',
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
                                product={product}
                                update={product.id ? true : false}
                            />

                            <Dropzone onDrop={this.handleUploadFile} accept=".xls, .xlsx" multiple={false}>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()} />
                                        <button className='btn'>Загрузить Exel файл</button>
                                    </div>
                                )}
                            </Dropzone>

                            <button className='btn'
                                    onClick={() => this.props.history.push('/admin/products/download_history')}>
                                История загрузок
                            </button>

                        </div>

                        <div className={styles.filter}>
                            <div>
                                <label>Код товара</label>
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
                                <label>Название товара</label>
                                <input
                                    type="text"
                                    className={styles.productName}
                                    name='name'
                                    value={name}
                                    onChange={this.handleChangeFilters}
                                />
                            </div>
                            {/*<div>*/}
                            {/*<label>Категория</label>*/}
                            {/*<select className={styles.category}>*/}
                            {/*<option>Телефоны</option>*/}
                            {/*<option>Телефоны</option>*/}
                            {/*</select>*/}
                            {/*</div>*/}
                            <div>
                                <label>Наличие</label>
                                <select className={styles.availability}>
                                    <option>В наличии</option>
                                    <option>Нет в наличии</option>
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





