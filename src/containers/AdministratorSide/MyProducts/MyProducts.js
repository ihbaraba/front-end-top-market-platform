import React, {Component} from 'react'
import {Tabs} from 'antd';
import styles from './MyProducts.module.css'
import 'antd/dist/antd.css';
import copyLink from "../../../img/link-symbol.svg";
import {Table, Popover, Tooltip} from 'antd';
import PriceListTable from "../components/PriceListTable/PriceListTable";
import InactiveGoodsTable from "../components/InactiveGoodsTable/InactiveGoodsTable";
import {getPartnerProducts, generateYml, getAllCategories} from '../../../actions/productsActions';
import CategoryList from "./CategoryList";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Menu, Dropdown, Icon, notification} from 'antd';
import EditProductWindow from './EditProductWindow';

const TabPane = Tabs.TabPane;


function callback(key) {
    console.log(key);
}

class MyProducts extends Component {
    state = {
        products: [],
        product: {},
        selectedProducts: [],
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
        currentPage: 1,
        rozetkaUrl: '',
        promUrl: ''
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
        const res = await getPartnerProducts(url);

        this.setState({
            products: res.results,
            count: res.count
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


    handleChangeTable = ({current}) => {
        this.setState({
            currentPage: current
        }, () => this.getMyProducts())
    };

    handleChangeFilters = ({target: {name, value}}) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [name]: value
            }
        })
    };

    handleCopied = () => {
        this.setState({copied: true});
        notification.success({
            message: 'Скопировано'
        });
    };

    handleOpenWindow = (product) => {
        this.setState({
            product
        })
    };

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedProducts: selectedRowKeys});
    };

    handleGenerateYml = async () => {
        let arr = [];
        await this.state.selectedProducts.forEach(item => {
            arr.push(this.state.products[item].id);
        });

        const [rozetka, prom] = await Promise.all([
            generateYml({
                ymlType: 'rozetka',
                productIds: arr
            }, 'rozetka'),

            generateYml({
                ymlType: 'prom',
                productIds: arr
            }, 'prom'),
        ]);

        this.setState({
            rozetkaUrl: rozetka,
            promUrl: prom
        })
    };

    async componentDidMount() {
        this.getMyProducts();


        const res = await getAllCategories();
        this.setState({
            categories: res
        });
    }


    render() {
        const {
            products,
            product,
            selectedProducts,
            promUrl,
            categories,
            rozetkaUrl,
            count,
            currentPage,
            filters: {
                brand,
                name,
                vendor_code,
                min_price,
                max_price
            },
        } = this.state;
        const rowSelection = {
            selectedProducts,
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

        const menu = (
            <Menu>
                <div className={styles.addYml}>
                    <div className={styles.top}>
                        <h5>Выберите YML для вашего магазина</h5>
                    </div>
                    <div className={styles.body}>
                        {/*<div>*/}
                        {/*<label>Стандартная</label>*/}
                        {/*<input type="text"/>*/}
                        {/*<button className={styles.copy}>Копировать</button>*/}
                        {/*</div>*/}
                        <div>
                            <label>Для Prom.ua</label>
                            <input type="text" value={promUrl.template} disabled/>


                            <CopyToClipboard text={promUrl.template}
                                             onCopy={() => this.handleCopied()}>
                                <button className={styles.copy}>Копировать</button>
                            </CopyToClipboard>
                        </div>
                        <div>
                            <label>Для Rozetka</label>
                            <input type="text" value={rozetkaUrl.template} disabled/>
                            <CopyToClipboard text={rozetkaUrl.template}
                                             onCopy={() => this.handleCopied()}>
                                <button className={styles.copy}>Копировать</button>
                            </CopyToClipboard>

                        </div>
                        {/*<div>*/}
                        {/*<label>Для Top Market</label>*/}
                        {/*<input type="text"/>*/}
                        {/*<button className={styles.copy}>Копировать</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </Menu>
        );


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
            },
            {
                title: '',
                dataIndex: 'actions',
                render: (actions, item) => (
                    <button className='btn edit-btn' onClick={() => this.handleOpenWindow(item)}>Редактировать</button>
                )
            }
        ];

        return (
            <div className='page'>
                <h3 className='page-title'>
                    <Popover placement="bottom" content={(
                        <CategoryList
                            categories={categories}
                            onSelectCategory={this.handleSelectCategory}
                        />
                    )}>
                        <Icon type="bars"/>
                    </Popover>

                    Мои товары
                </h3>

                <Tabs onChange={callback} type="card">
                    <TabPane tab={`Товари в продажу - ${products.length}`} key="1">

                        <div className={styles.inactiveGoodsTable}>
                            <div className={styles.productsBtns}>
                                {/*<Tooltip placement="bottom" title='Находится в разработке'>*/}
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <button onClick={this.handleGenerateYml} className='btn'
                                            disabled={selectedProducts.length < 1}>
                                        Добавить в YML
                                    </button>
                                </Dropdown>
                                {/*</Tooltip>*/}

                                {/*<NewProduct/>*/}
                                {/*<button className={styles.actbtn}>Загрузить Exel файл</button>*/}
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
                        </div>
                    </TabPane>

                    <TabPane tab="Неактивні товари - 0" key="2" disabled>
                        <div className={styles.inactiveGoodsTable}>
                            <div className={styles.productsBtns}>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <button onClick={this.handleGenerateYml} className='btn'>
                                        Добавить в YML
                                    </button>

                                </Dropdown>
                                {/*<NewProduct/>*/}
                                {/*<button className={styles.actbtn}>Загрузить Exel файл</button>*/}
                            </div>

                            <div className={styles.filter}>
                                <form>
                                    <div>
                                        <label>Код товара</label>
                                        <input type="text" className={styles.code}/>
                                    </div>
                                    <div>
                                        <label>Артикул</label>
                                        <input type="text" className={styles.vendorCode}/>
                                    </div>
                                    <div>
                                        <label>Название товара</label>
                                        <input type="text" className={styles.productName}/>
                                    </div>
                                    <div>
                                        <label>Категория</label>
                                        <select className={styles.category}>
                                            <option>Телефоны</option>
                                            <option>Телефоны</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Наличие</label>
                                        <select className={styles.availability}>
                                            <option>В наличии</option>
                                            <option>Нет в наличии</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Цена от</label>
                                        <input type="text" className={styles.priceMin}/>
                                    </div>
                                    <div>
                                        <label>До</label>
                                        <input type="text" className={styles.priceMax}/>
                                    </div>
                                    <div>
                                        <button className={styles.find}>Поиск</button>
                                    </div>
                                </form>
                            </div>

                            <InactiveGoodsTable/>
                        </div>
                    </TabPane>

                    <TabPane tab="Прайс-лист" key="3" disabled>
                        <div className={styles.priceList}>
                            <div>
                                <p>Тип источника</p>
                                <a href="#" className={styles.copyLink}><img src={copyLink} alt=""/> URL ссылка</a>
                            </div>
                            <div className={styles.priceAction}>
                                <div className={styles.url}>
                                    <label>URL на Прайс-лист</label>
                                    <input type="text"/>
                                </div>
                                <div className={styles.actionbtn}>
                                    <button className={styles.delete}>Удалить</button>
                                    <button className={styles.downloadBtn}>Загрузить</button>
                                </div>
                            </div>
                        </div>
                        <h3 className={styles.title}>Прайс-листы на валидации</h3>
                        <div className={styles.priceListTable}>
                            <PriceListTable/>
                        </div>
                    </TabPane>

                    <TabPane tab="Управління товарами" key="4" disabled>
                        <div className={styles.management}>
                            <a href="#" className={styles.uploadList} download>Загрузить список производителей в
                                Exсel</a>
                            <h3>Управление категориями и параметрами</h3>
                            <div className={styles.categories}>
                                <div>
                                    <label>Категория 1 уровня</label>
                                    <select></select>
                                </div>
                                <div>
                                    <label>Категория 2 уровня</label>
                                    <select></select>
                                </div>
                                <button className={styles.export}>Экспорт параметров</button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>

                <EditProductWindow
                    product={product}
                    onUpdate={() => {
                        this.setState({product: {}});
                        this.getMyProducts()
                    }}
                />
            </div>
        );
    }
}

export default MyProducts;





