import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Table} from "antd";
import styles from './InactiveGoodsTable.module.css'
import iphone from "../../../../img/iphone.png";
import edit from "../../../../img/edit.svg";


const columns = [ {
    title: 'Код товара',
    dataIndex: 'productCode',
}, {
    title: 'Артикул',
    dataIndex: 'vendorCode',
}, {
    render: (productName, item) => (
        <span className={styles.productItemName}>
            <span className={styles.productImg}>
                <img src={item.product} alt=""/>
            </span>
            <span>
                {productName}
            </span>
        </span>


    ),
    title: 'Название товара',
    dataIndex: 'productName',
}, {
    title: 'Категория',
    dataIndex: 'category',
}, {
    title: 'Цена',
    dataIndex: 'price',
}, {
    title: 'Наличие',
    dataIndex: 'availability',
    render: (availability, item) => (
        <span className={styles.editBlock}>
            <span className={styles.availability}>
                {availability}
            </span>
            <button className={styles.edit}>
                <img src={item.edit} alt=""/>
            </button>
        </span>
    ),
},
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        productCode: '141515d3234',
        vendorCode: 'Jf21414dS',
        product: iphone,
        productName: `iPhone XR 64GB Space Grey ${i}`,
        category: 'Телефоны,MP3, GPS',
        price: '23844.00 грн',
        availability: `Нет в наличии.`,
        edit: edit,
    });
}

class InactiveGoodsTable extends Component {

    state = {
        selectedRowKeys: [], // Check here to configure the default column
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
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default InactiveGoodsTable;





