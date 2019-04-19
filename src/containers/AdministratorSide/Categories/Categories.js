import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import {Table} from 'antd';
import styles from './Categories.module.css'
import CategoryList from "./CategoryList";
import {getAllProducts, getAllCategories} from '../../../actions/productsActions';

const columns = [
    {
        title: 'Название товара',
        dataIndex: 'name',
    },
    {
        title: 'Бренд',
        dataIndex: 'brand',
    },
    {
        title: 'Поставщик',
        dataIndex: 'provider',
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
        categories: []
    };

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

    getProducts = async () => {
        const res = await getAllProducts();
        this.setState({
            products: res.result
        })
    };

    async componentDidMount() {
        const res = await getAllCategories();
        this.setState({
            categories: res
        });

        this.getProducts();
    }


    render() {
        const {selectedRowKeys, products, categories} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            onSelection: this.onSelection,
        };

        return (
            <div>
                <div className={styles.top}>
                    <h3 className={styles.title}>Категории</h3>
                    <Link to="/admin/instruction" className={styles.howToAdd}>Как добавить товар?</Link>
                </div>
                <div className={styles.categories}>
                    <CategoryList
                        categories={categories}
                    />

                    <div className={styles.categoriesBlock}>
                        <div className={styles.actions}>
                            <button className={styles.addToMyProducts}>Добавить в мои товары</button>
                            {/*<button className={styles.downloadExel}>Загрузить Exel файл</button>*/}
                            <div className={styles.search}>
                                <input type="search" placeholder="Search"/>
                                <input type="submit" value=" "/>
                            </div>
                        </div>

                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={products}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Categories;





