import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import {Table} from 'antd';
import Dropzone from 'react-dropzone';
import styles from './ContractorProducts.module.css'
import CategoryList from "./CategoryList";
import {getContractorProducts, uploadXls} from '../../../actions/products';

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
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    }
];

class ContractorProducts extends Component {
    state = {
        selectedRowKeys: [],
        products: []
    };

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

    handleUploadFile = async (file) => {
        console.log(file[0]);

        const formData = new FormData();
        formData.append(
            'xls_file',
            file[0]
        );
        const res = await uploadXls(formData);
        console.log(res);
    };

    async componentDidMount() {
        const res = await getContractorProducts();

        this.setState(res)
    }

    render() {
        const {selectedRowKeys, products} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            // selections: [{
            //     key: 'all-data',
            //     text: 'Select All Data',
            //     onSelect: () => {
            //         this.setState({
            //             selectedRowKeys: [...Array(46).keys()], // 0...45
            //         });
            //     },
            // }, {
            //     key: 'odd',
            //     text: 'Select Odd Row',
            //     onSelect: (changableRowKeys) => {
            //         let newSelectedRowKeys = [];
            //         newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            //             if (index % 2 !== 0) {
            //                 return false;
            //             }
            //             return true;
            //         });
            //         this.setState({selectedRowKeys: newSelectedRowKeys});
            //     },
            // }, {
            //     key: 'even',
            //     text: 'Select Even Row',
            //     onSelect: (changableRowKeys) => {
            //         let newSelectedRowKeys = [];
            //         newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            //             if (index % 2 !== 0) {
            //                 return true;
            //             }
            //             return false;
            //         });
            //         this.setState({selectedRowKeys: newSelectedRowKeys});
            //     },
            // }],
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
                            <button className={styles.addToMyProducts}>Добавить товар</button>

                            <Dropzone onDrop={this.handleUploadFile} accept=".xls" multiple={false}>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()} />
                                        <button className={styles.downloadExel}>Загрузить Exel файл</button>
                                    </div>
                                )}
                            </Dropzone>

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

export default ContractorProducts;





