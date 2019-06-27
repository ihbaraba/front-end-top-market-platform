import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Table, Popover, Icon} from 'antd';
import styles from './Categories.module.css'
import {getAllProducts, getAllCategories, copyProducts} from '../../../actions/productsActions';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Categories extends Component {
    state = {
        selectedRowKeys: [],
        products: [],
        categories: [],

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
        pageSize: 10,
        currentPage: 1
    };

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

    getProducts = async () => {
        const {currentPage, pageSize, filters: {category_id, name, brand, in_stock, vendor_code, min_price, max_price}} = this.state;
        const urlParams = [
            category_id ? `&category_id=${category_id}` : '',
            name ? `&name=${name}` : '',
            brand ? `&brand=${brand}` : '',
            in_stock ? `&in_stock=${in_stock}` : '',
            vendor_code ? `&vendor_code=${vendor_code}` : '',
            min_price ? `&min_price=${min_price}` : '',
            max_price ? `&max_price=${max_price}` : '',
        ];

        const url = `?page_size=${pageSize}&page=${currentPage + urlParams.join('')}`;
        const res = await getAllProducts(url);

        this.setState({
            products: res.results,
            count: res.count
        })
    };

    handleChangeTable = (pagination) => {
        this.setState({
            currentPage: pagination.current,
            pageSize: pagination.pageSize
        }, () => this.getProducts())
    };


    handleCopyProducts = async () => {
        let arr = [];

        await this.state.selectedRowKeys.forEach(item => {
            arr.push(this.state.products[item].id)
        });

        await copyProducts({
            productListIds: arr
        });

        this.getProducts();

        this.setState({
            selectedRowKeys: []
        });
    };

    handleChangeFilters = ({target: {name, value}}) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [name]: value
            }
        }, () => this.getProducts())
    };

    handleSelectCategory = (category) => {
        this.setState({
            filters: {
                ...this.state.filters,
                category_id: category.key
            }
        }, () => this.getProducts())
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.selectedCategory !== this.state.category_id) {
            this.setState({
                filters: {
                    ...this.state.filters,
                    category_id: nextProps.user.selectedCategory
                }
            }, () => this.getProducts())
        }
    }

    async componentDidMount() {
        this.getProducts();

        const res = await getAllCategories();
        this.setState({
            categories: res
        });
    };


    render() {
        const {selectedRowKeys, products, count, pageSize, currentPage, filters: {brand, name, vendor_code, min_price, max_price}} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            onSelection: this.onSelection,
        };

        const config = {
            pagination: {
                pageSize: pageSize,
                pageSizeOptions: [10, 20, 50],
                showSizeChanger: true,
                total: count,
                current: currentPage
            }
        };

        const columns = [
            {
                title: () => (
                    <div className='filter-field'>
                        <label>Название товара</label>
                        <input
                            type="text"
                            className={styles.productName}
                            name='name'
                            value={name}
                            onChange={this.handleChangeFilters}
                        />
                    </div>
                ),
                dataIndex: 'name',
                render: (name, item) => (
                    <div className='product-avatar'>
                        <div className="product-avatar-block">
                            <img
                                src={item.coverImages.length > 0 ? item.coverImages[0].imageDecoded : (item.imageUrls.length > 0 ? item.imageUrls [0].url : '')}
                                alt=""/>
                        </div>
                        <span>
                        {name}
                        </span>
                    </div>
                ),
                width: '20%'
            },
            {
                title: () => (
                    <div className='filter-field'>
                        <label>Артикул</label>
                        <input
                            type="text"
                            className={styles.productName}
                            name='vendor_code'
                            value={vendor_code}
                            onChange={this.handleChangeFilters}
                        />
                    </div>
                ),
                dataIndex: 'vendorCode',
            },
            {
                title: () => (
                    <div className='filter-field'>
                        <label>Бренд</label>
                        <input
                            type="text"
                            className={styles.productName}
                            name='brand'
                            value={brand}
                            onChange={this.handleChangeFilters}
                        />
                    </div>
                ),
                dataIndex: 'brand',
                width: '15%'
            },
            {
                title: () => (
                    <div className='filter-field'>
                        <label>Категория</label>

                        <select className={styles.availability} onChange={({target: {value}}) => this.setState({
                            filters: {
                                ...this.state.filters,
                                category: value
                            }
                        })}>
                            <option value=''>Все</option>
                        </select>
                    </div>

                ),
                dataIndex: 'category',
                render: (category) => (
                    <span>{category ? category.name : ''}</span>
                )
            },
            {
                title: () => (
                    <div className='filter-field'>
                        <label>Количество</label>
                        <select className={styles.availability}
                                onChange={({target: {value}}) => this.handleChangeFilters({
                                    target: {
                                        name: 'in_stock',
                                        value: value
                                    }
                                })}>
                            <option value=''>Все</option>
                            <option value={true}>В наличии</option>
                            <option value={false}>Нет в наличии</option>
                        </select>
                    </div>

                ),
                dataIndex: 'count',
            },
            {
                title: () => (
                    <div style={{display: 'flex'}}>
                        <div className='filter-field'>
                            <label>Цена от</label>
                            <input
                                type="number"
                                className={styles.productName}
                                name='min_price'
                                value={min_price * 1.05}
                                onChange={this.handleChangeFilters}
                            />
                        </div>
                        <div className='filter-field'>
                            <label>до</label>
                            <input
                                type="number"
                                className={styles.productName}
                                name='max_price'
                                value={max_price * 1.05}
                                onChange={this.handleChangeFilters}
                            />
                        </div>
                    </div>
                ),
                dataIndex: 'price',
            }
        ];

        return (

            <div className={styles.main}>
                <div>
                    <div className={styles.wrap}>
                        <h3 className={styles.title}>Все товары</h3>
                        <Link to="/admin/instruction_sellers" className={styles.howToAdd}>Как добавить товар?</Link>
                    </div>
                </div>
                <div className='page'>

                    <div className={`${styles.categories} page-content`}>
                        <div className={styles.categoriesBlock}>
                            <div className={styles.actions}>
                                <button
                                    disabled={selectedRowKeys.length === 0}
                                    className='btn'
                                    onClick={this.handleCopyProducts}>
                                    Добавить в мои товары
                                </button>

                                <button
                                    disabled
                                    className='btn'
                                    onClick={this.handleCopyProducts}>
                                    Добавить в мой магазин
                                </button>

                                <div className={styles.totalProducts}>
                                    Товаров: {count}
                                </div>
                            </div>

                            <Table
                                {...config}
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={products}
                                onChange={this.handleChangeTable}
                            />

                            <div className={styles.totalProductsBottom}>
                                Товаров: {count}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}


const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);





