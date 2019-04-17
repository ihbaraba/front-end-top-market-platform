import React, {Component} from 'react'
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import { Table } from 'antd';
import styles from './Categories.module.css'
import CategoryList from "./CategoryList";


const columns = [{

    render: (name, item) => (
        <span className={styles.productItemName}>
            <span className={styles.productImg}>
                <img src={item.product} alt=""/>
            </span>
            <span>
                {name}
            </span>
        </span>


    ),
    title: 'Название товара',
    dataIndex: 'name',
}, {
    title: 'Бренд',
    dataIndex: 'brand',
}, {
    title: 'Поставщик',
    dataIndex: 'provider',
}, {
    title: 'Цена',
    dataIndex: 'price',
}, {
    title: 'Прибыль',
    dataIndex: 'profit',
}, {
    title: 'Наличие',
    dataIndex: 'availability',
}];
// const data = [];
// for (let i = 0; i < 46; i++) {
//     data.push({
//         key: i,
//         name: `iPhone XR 64GB ${i}`,
//         brand: 'Apple',
//         provider: 'Rozetka',
//         price: '23844.00 грн',
//         profit: '839.00 грн',
//         availability: 'В наличии',
//     });
// }


class Categories extends Component {
    state = {
        selectedRowKeys: [],
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }


    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: 'Select All Data',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: [...Array(46).keys()], // 0...45
                    });
                },
            }, {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            onSelection: this.onSelection,
        };

        return (
            <div>
                <div className={styles.top}>
                    <h3 className={styles.title}>Категории</h3>
                    <Link to="/admin/instruction" className={styles.howToAdd}>Как добавить товар?</Link>
                </div>
                <div className={styles.categories}>
                    <CategoryList/>
                    <div className={styles.categoriesBlock}>
                       <div className={styles.actions}>
                           <button className={styles.addToMyProducts}>Добавить в мои товары</button>
                           <button className={styles.downloadExel}>Загрузить Exel файл</button>
                           <div className={styles.search}>
                               <input type="search" placeholder="Search" />
                               <input type="submit" value=" "/>
                           </div>
                       </div>
                        <Table rowSelection={rowSelection} columns={columns} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Categories;





