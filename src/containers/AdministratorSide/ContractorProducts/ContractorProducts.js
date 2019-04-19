import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import {Table, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import styles from './ContractorProducts.module.css'
import CategoryList from "./CategoryList";
import {getContractorProducts, uploadXls} from '../../../actions/productsActions';
import NewProduct from "../components/Modal/NewProduct";

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
            <Icon type="edit" theme="filled"/>
        )
    }
];

class ContractorProducts extends Component {
    state = {
        selectedRowKeys: [],
        results: []
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
        this.getMyProducts()
    };

    getMyProducts = async () => {
        const res = await getContractorProducts();

        this.setState(res)
    };

    componentDidMount() {
        this.getMyProducts()
    }

    render() {
        const {selectedRowKeys, results} = this.state;
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
                            <NewProduct
                                onUpdate={this.getMyProducts}
                            />

                            <Dropzone onDrop={this.handleUploadFile} accept=".xls, .xlsx" multiple={false}>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()} />
                                        <button className={styles.downloadExel}>Загрузить Exel файл</button>
                                    </div>
                                )}
                            </Dropzone>

                            <button className={styles.downloadExel}
                                    onClick={() => this.props.history.push('/admin/products/download_history')}>
                                История загрузок
                            </button>
                            {/*<div className={styles.search}>*/}
                            {/*<input type="search" placeholder="Search"/>*/}
                            {/*<input type="submit" value=" "/>*/}
                            {/*</div>*/}
                        </div>

                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={results}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ContractorProducts;





