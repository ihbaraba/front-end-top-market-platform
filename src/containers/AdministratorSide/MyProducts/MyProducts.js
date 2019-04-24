import React, {Component} from 'react'
import {Tabs} from 'antd';
import styles from './MyProducts.module.css'
import 'antd/dist/antd.css';
import copyLink from "../../../img/link-symbol.svg";
import {Table, Popover} from 'antd';
import PriceListTable from "../components/PriceListTable/PriceListTable";
import InactiveGoodsTable from "../components/InactiveGoodsTable/InactiveGoodsTable";
import Products from "../components/Products/Products";
import NewProduct from "../components/Modal/NewProduct";
import {getPartnerProducts, generateYml} from '../../../actions/productsActions';


import { Menu, Dropdown, Icon } from 'antd';

const TabPane = Tabs.TabPane;


function callback(key) {
    console.log(key);
}

const menu = (
    <Menu>
        {/*<Menu.Item key="0">*/}
            {/*<a href="http://www.alipay.com/">1st menu item</a>*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item key="1">*/}
            {/*<a href="http://www.taobao.com/">2nd menu item</a>*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Divider />*/}
        {/*<Menu.Item key="3">3rd menu item</Menu.Item>*/}

        <div className={styles.addYml}>
            <div className={styles.top}>
                <h5>Выберите YML для вашего магазина</h5>
            </div>
            <div className={styles.body}>
                <div>
                    <label>Стандартная</label>
                    <input type="text"/>
                    <button className={styles.copy}>Копировать</button>
                </div>
                <div>
                    <label>Для Prom.ua</label>
                    <input type="text"/>
                    <button className={styles.copy}>Копировать</button>
                </div>
                <div>
                    <label>Для Rozetka</label>
                    <input type="text"/>
                    <button className={styles.copy}>Копировать</button>
                </div>
                <div>
                    <label>Для Top Market</label>
                    <input type="text"/>
                    <button className={styles.copy}>Копировать</button>
                </div>
            </div>
        </div>
    </Menu>
);



class MyProducts extends Component {
    state = {
        products: [],
        selectedProducts: [],

        rozetkaUrl: '',
        promUrl: ''
    };

    getMyProducts = async () => {
        const res = await getPartnerProducts();

        this.setState({
            products: res.results
        })
    };

    handleGenerateYml = async () => {
        console.log(this.state.selectedProducts);
        let arr = [];
        await this.state.selectedProducts.forEach(item => {
            arr.push(this.state.products[item].id);
        });

        const [rozetka, prom] = await Promise.all([
            generateYml({
                ymlType: 'rozetka',
                productIds: arr
            }),

            generateYml({
                ymlType: 'prom',
                productIds: arr
            }),
        ]);

        this.setState({
            rozetkaUrl: rozetka,
            promUrl: prom
        })
    };

    componentDidMount() {
        this.getMyProducts();
    }




    render() {
        const {products, selectedProducts, promUrl, rozetkaUrl} = this.state;

        const popoverContent = (
            <div>
                <h4>Для Prom.ua</h4>
                <span>{promUrl}</span>

                <h4>Для Rozetka</h4>
                <span>{rozetkaUrl}</span>
            </div>
        );

        return (
            <div>
                <h3 className={styles.title}>Мои товары</h3>
                <Tabs onChange={callback} type="card">
                    <TabPane tab={`Товари в продажу ${products.length}`} key="1">
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
                        <div className={styles.inactiveGoodsTable}>
                            <div className={styles.productsBtns}>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <button className={styles.actbtn}>Добавить в YML</button>
                                </Dropdown>
                                {/*<NewProduct/>*/}
                                {/*<button className={styles.actbtn}>Загрузить Exel файл</button>*/}
                            </div>

                            <Products
                                products={products}
                                onSelectedProducts={e => this.setState({selectedProducts: e})}
                            />
                        </div>
                    </TabPane>

                    <TabPane tab="Неактивні товари (233)" key="2">
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
                        <div className={styles.inactiveGoodsTable}>
                            <div className={styles.productsBtns}>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <button className={styles.actbtn}>Добавить в YML</button>
                                </Dropdown>
                                {/*<NewProduct/>*/}
                                {/*<button className={styles.actbtn}>Загрузить Exel файл</button>*/}
                            </div>
                            <InactiveGoodsTable/>
                        </div>
                    </TabPane>
                    <TabPane tab="Прайс-лист" key="3">
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
                    <TabPane tab="Управління товарами" key="4">
                        <div className={styles.management}>
                            <a href="#" className={styles.uploadList} download>Загрузить список производителей в
                                Exel</a>
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
            </div>
        );
    }
}

export default MyProducts;





