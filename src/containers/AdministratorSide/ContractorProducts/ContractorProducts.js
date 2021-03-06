import React, { Component } from "react";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { Table, Icon, Popover, Tooltip } from "antd";
import Dropzone from "react-dropzone";
import styles from "./ContractorProducts.module.css";
import CategoryList from "./CategoryList";
import {
  getContractorProducts,
  uploadXls,
  getContractorCategories,
  removeContractorProduct,
  getDownloadsStatus
} from "../../../actions/productsActions";
import { getProfile, selectedCategory } from "../../../actions/userActions";
import NewProduct from "../components/Modal/NewProduct";
import { connect } from "react-redux";

class ContractorProducts extends Component {
  state = {
    haveRozetkaAkaunt: false,
    categories: [],
    selectedRowKeys: [],
    products: [],
    product: {},
    filters: {
      category_id: "",
      name: "",
      vendor_code: "",
      min_price: "",
      max_price: "",
      brand: "",
      in_stock: ""
    },

    count: 0,
    currentPage: 1,
    pageSize: 10,

    uploadExel: false,
    uploadRozetka: false,

    inStock: 0,
    notInStock: 0
  };

  getMyProducts = async () => {
    const {
      currentPage,
      pageSize,
      filters: {
        category_id,
        name,
        brand,
        in_stock,
        vendor_code,
        min_price,
        max_price
      }
    } = this.state;

    const urlParams = [
      category_id ? `&category_id=${category_id}` : "",
      name ? `&name=${name}` : "",
      brand ? `&brand=${brand}` : "",
      in_stock ? `&in_stock=${in_stock}` : "",
      vendor_code ? `&vendor_code=${vendor_code}` : "",
      min_price ? `&min_price=${min_price}` : "",
      max_price ? `&max_price=${max_price}` : ""
    ];

    const url = `?page_size=${pageSize}&page=${currentPage +
      urlParams.join("")}`;

    const [all, inStock, notInStock] = await Promise.all([
      getContractorProducts(url),
      getContractorProducts(`?in_stock=${true}`),
      getContractorProducts(`?in_stock=${false}`)
    ]);

    this.setState({
      products: all.results,
      count: all.count,
      inStock: inStock.count,
      notInStock: notInStock.count
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleUploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append("xls_file", file[0]);
    formData.append("file_type", type);

    await uploadXls(formData);
    this.props.history.push("/admin/products/download_history");
    this.handleUpdate();
  };

  getCategories = async () => {
    const res = await getContractorCategories();

    this.setState({
      categories: res
    });
  };

  handleChangeFilters = ({ target: { name, value } }) => {
    this.setState(
      {
        filters: {
          ...this.state.filters,
          [name]: value
        }
      },
      () => this.getMyProducts()
    );
  };

  handleRemoveProducts = async () => {
    let idArr = [];
    await this.state.selectedRowKeys.forEach(item => {
      idArr.push(this.state.products[item].id);
    });

    console.log(idArr);
    await removeContractorProduct({ productListIds: idArr });

    this.handleUpdate();
  };

  handleChangeTable = pagination => {
    this.setState(
      {
        currentPage: pagination.current,
        pageSize: pagination.pageSize
      },
      () => this.getMyProducts()
    );
  };

  openProduct = product => {
    this.setState({
      product: product
    });
  };

  handleUpdate = () => {
    this.getMyProducts();
    this.getCategories();

    this.setState({
      selectedRowKeys: [],
      product: {}
    });
  };
  handleUpdateProduct = () => {
    this.setState({
      selectedRowKeys: [],
      product: {}
    });
  };

  handleSelectCategory = category => {
    this.setState(
      {
        filters: {
          ...this.state.filters,
          category_id: category.key
        }
      },
      () => this.getMyProducts()
    );
  };

  checkUploader = async () => {
    const res = await getDownloadsStatus();
    console.log("res: ", res);
    let innerArr = [],
      rozetkaArr = [];

    res.forEach(item => {
      if (item.fileType === "inner") {
        innerArr.push(item);
      } else {
        rozetkaArr.push(item);
      }
    });

    if (
      innerArr.every(
        item => item.isUploaded || item.errors || item.errors === "No errors"
      )
    ) {
      this.setState({
        uploadExel: true
      });
    }

    if (
      rozetkaArr.every(
        item => item.isUploaded || item.errors || item.errors === "No errors"
      ) ||
      rozetkaArr.length === 0
    ) {
      this.setState({
        uploadRozetka: true
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.selectedCategory !== this.state.category_id) {
      this.setState(
        {
          filters: {
            ...this.state.filters,
            category_id: nextProps.user.selectedCategory
          }
        },
        () => this.getMyProducts()
      );
    }
  }

  async componentDidMount() {
    this.getMyProducts();
    this.getCategories();
    this.checkUploader();

    const res = await getProfile();
    if (res.rozetkaPassword && res.rozetkaUsername) {
      this.setState({
        haveRozetkaAkaunt: true
      });
    }
  }

  render() {
    const {
      haveRozetkaAkaunt,
      selectedRowKeys,
      products,
      categories,
      product,
      count,
      currentPage,
      filters: { name, vendor_code, min_price, max_price, brand },
      uploadExel,
      uploadRozetka,
      inStock,
      notInStock,
      pageSize
    } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      onSelection: this.onSelection
    };
    const columns = [
      {
        title: () => (
          <div className="filter-field">
            <label>Название товара</label>
            <input
              type="text"
              className={styles.productName}
              name="name"
              value={name}
              onChange={this.handleChangeFilters}
            />
          </div>
        ),
        dataIndex: "name",
        render: (name, item) => (
          <div className="product-avatar">
            <div className="product-avatar-block">
              <img
                src={
                  item.coverImages.length > 0
                    ? item.coverImages[0].imageDecoded
                    : item.imageUrls.length > 0
                    ? item.imageUrls[0].url
                    : ""
                }
                alt=""
              />
            </div>
            <span>{name}</span>
          </div>
        ),
        width: "20%"
      },

      {
        title: () => (
          <div className="filter-field">
            <label>Артикул</label>
            <input
              type="text"
              className={styles.productName}
              name="vendor_code"
              value={vendor_code}
              onChange={this.handleChangeFilters}
            />
          </div>
        ),
        dataIndex: "vendorCode"
      },
      {
        title: () => (
          <div className="filter-field">
            <label>Бренд</label>
            <input
              type="text"
              className={styles.productName}
              name="brand"
              value={brand}
              onChange={this.handleChangeFilters}
            />
          </div>
        ),
        dataIndex: "brand",
        width: "15%"
      },
      {
        title: () => (
          <div className="filter-field">
            <label>Категория</label>

            <select
              className={styles.availability}
              onChange={({ target: { value } }) =>
                this.setState({
                  filters: {
                    ...this.state.filters,
                    category: value
                  }
                })
              }
            >
              <option value="">Все</option>
            </select>
          </div>
        ),
        dataIndex: "category",
        render: category => <span>{category ? category.name : ""}</span>
      },
      {
        title: () => (
          <div className="filter-field">
            <label>Количество</label>
            <select
              className={styles.availability}
              onChange={({ target: { value } }) =>
                this.handleChangeFilters({
                  target: {
                    name: "in_stock",
                    value: value
                  }
                })
              }
            >
              <option value="">Все</option>
              <option value={true}>В наличии</option>
              <option value={false}>Нет в наличии</option>
            </select>
          </div>
        ),
        dataIndex: "count"
      },
      {
        title: () => (
          <div style={{ display: "flex" }}>
            <div className="filter-field">
              <label>Цена от</label>
              <input
                type="number"
                className={styles.productName}
                name="min_price"
                value={min_price}
                onChange={this.handleChangeFilters}
              />
            </div>
            <div className="filter-field">
              <label>до</label>
              <input
                type="number"
                className={styles.productName}
                name="max_price"
                value={max_price}
                onChange={this.handleChangeFilters}
              />
            </div>
          </div>
        ),
        dataIndex: "price"
      },
      {
        title: "",
        dataIndex: "actions",
        render: (e, product) => (
          <button
            className="btn edit-btn"
            onClick={() => this.openProduct(product)}
          >
            Редактировать
          </button>
        )
      }
    ];

    const config = {
      pagination: {
        pageSize: pageSize,
        pageSizeOptions: [10, 20, 50],
        showSizeChanger: true,
        total: count,
        current: currentPage
      }
    };

    return (
      <div className="page">
        <div className={`page-title ${styles.top}`}>
          {/*<Popover placement="bottom" content={(*/}
          {/*<CategoryList*/}
          {/*categories={categories}*/}
          {/*onSelectCategory={this.handleSelectCategory}*/}
          {/*/>*/}
          {/*)}>*/}
          {/*<Icon type="bars"/>*/}
          {/*</Popover>*/}
          Категории
          <Link to="/admin/instruction" className={styles.howToAdd}>
            Как добавить товар?
          </Link>
        </div>

        <div className="page-content">
          <div className={styles.categoriesBlock}>
            <div className={styles.actions}>
              <NewProduct
                onUpdate={this.handleUpdate}
                onUpdateProduct={this.handleUpdateProduct}
                product={product}
                update={product.id ? true : false}
              />

              <Dropzone
                onDrop={e => this.handleUploadFile(e, "inner")}
                accept=".xls, .xlsx"
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <button className="btn" disabled={!uploadExel}>
                      Загрузить Excel файл
                    </button>
                  </div>
                )}
              </Dropzone>

              {!haveRozetkaAkaunt ? (
                <Tooltip title="Поля логин и пароль с «Rozetka marketplace» не заполнены">
                  <button className="btn" disabled>
                    Загрузить с Rozetka
                  </button>
                </Tooltip>
              ) : (
                <Dropzone
                  disabled={!uploadRozetka}
                  onDrop={e => this.handleUploadFile(e, "rozetka")}
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <button className="btn" disabled={!uploadRozetka}>
                        Загрузить с Rozetka
                      </button>
                    </div>
                  )}
                </Dropzone>
              )}

              <button
                className="btn"
                onClick={() =>
                  this.props.history.push("/admin/products/download_history")
                }
              >
                История загрузок
              </button>

              <div className={styles.totalProducts}>
                Товаров: {count}
                <span>-в наличии: {inStock}</span>
                <span>-нет в наличии: {notInStock}</span>
              </div>
            </div>

            <Table
              {...config}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={products}
              onChange={this.handleChangeTable}
            />

            <div className={styles.totalProductsBottom}>Товаров: {count}</div>

            <button
              className={`btn-remove ${styles.removeBtn}`}
              onClick={this.handleRemoveProducts}
            >
              Удалить товары
            </button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractorProducts);
