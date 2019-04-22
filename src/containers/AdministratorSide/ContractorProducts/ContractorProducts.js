import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import {Table, Icon} from 'antd';
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

        count: 0,
        currentPage: 1
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
        await uploadXls(formData);
        this.handleUpdate();
    };

    getCategories = async () => {
        const res = await getContractorCategories();

        this.setState({
            categories: res
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

    getMyProducts = async () => {
        const {currentPage} = this.state;

        const url = `?page=${currentPage}`;
        const res = await getContractorProducts(url);

        this.setState({
            products: res.results,
            count: res.count
        })
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
    }

    componentDidMount() {
        this.getMyProducts();
        this.getCategories();
    }

    render() {
        const {selectedRowKeys, products, categories, product, count, currentPage} = this.state;
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
                    <h3 className={styles.title}>Категории</h3>
                    <Link to="/admin/instruction" className={styles.howToAdd}>Как добавить товар?</Link>
                </div>

                <div className={styles.categories}>
                    <CategoryList
                        categories={categories}
                    />

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
                                        <button className={styles.downloadExel}>Загрузить Exel файл</button>
                                    </div>
                                )}
                            </Dropzone>

                            <button className={styles.downloadExel}
                                    onClick={() => this.props.history.push('/admin/products/download_history')}>
                                История загрузок
                            </button>

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





