import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Table, Popover, Icon} from 'antd';
import styles from './Categories.module.css'
import CategoryList from "./CategoryList";
import {getAllProducts, getAllCategories, copyProducts} from '../../../actions/productsActions';

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
        title: 'Количество',
        dataIndex: 'count',
    },
    {
        title: 'Цена',
        dataIndex: 'price',
    }
];


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
        currentPage: 1
    };

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

    getProducts = async () => {
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
        const res = await getAllProducts(url);

        this.setState({
            products: res.results,
            count: res.count
        })
    };

    handleChangeTable = ({current}) => {
        this.setState({
            currentPage: current
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
        })
    };

    handleSelectCategory = (category) => {
        console.log(category);
        this.setState({
            filters: {
                ...this.state.filters,
                category_id: category.key
            }
        }, () => this.getProducts())
    };

    async componentDidMount() {
        this.getProducts();

        const res = await getAllCategories();
        this.setState({
            categories: res
        });
    };


    render() {
        const {selectedRowKeys, products, categories, count, currentPage, filters: {brand, name, vendor_code, min_price, max_price}} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            onSelection: this.onSelection,
        };

        const config = {
            pagination: {
                pageSize: 10,
                total: count,
                current: currentPage
            }
        };

        return (
            <div>
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

                    {/*<Link to="/admin/instruction" className={styles.howToAdd}>Как добавить товар?</Link>*/}
                </div>

                <div className={styles.categories}>
                    <div className={styles.categoriesBlock}>
                        <div className={styles.actions}>
                            <button
                                disabled={selectedRowKeys.length === 0}
                                className='btn'
                                onClick={this.handleCopyProducts}>
                                Добавить в мои товары
                            </button>

                            <div className={styles.totalProducts}>
                                Товаров: {products.length}
                            </div>

                            {/*<button className={styles.downloadExel}>Загрузить Exel файл</button>*/}
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
                                <select className={styles.availability} onChange={({target: {value}}) => this.setState({
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
                                <button className='btn' onClick={this.getProducts}>Поиск</button>
                            </div>
                        </div>


                        <Table
                            {...config}
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={products}
                            onChange={this.handleChangeTable}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Categories;





