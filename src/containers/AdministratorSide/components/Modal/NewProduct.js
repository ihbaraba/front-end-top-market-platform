import React, { Component } from "react";
import "antd/dist/antd.css";
import { Modal, Cascader, Tabs } from "antd";
import styles from "../../MyProducts/MyProducts.module.css";
import {
  createNewProduct,
  getFirstLevelCategories,
  updateProduct,
  getCategoriesById
} from "../../../../actions/productsActions";
import Dropzone from "react-dropzone";
import ProductPictureGallery from "../ProductPictureGallery/ProductPictureGallery"

const TabPane = Tabs.TabPane;

// const operations = <Button>Extra Action</Button>;

class NewProduct extends Component {
  state = {
    name: "",
    brand: "",
    vendorCode: "",
    count: "",
    category: "",
    description: "",
    price: "",
    imageUrls: [],
    coverImages: [],
    uploadImage: false,
    visible: false,
    activeTabKey: "1",
    categories: [],
    selectedCategories: []
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      name: "",
      brand: "",
      vendorCode: "",
      count: "",
      category: "",
      description: "",
      price: "",
      imageUrl: "",
      imageUrls: [],
      coverImages: [],
      uploadImage: false,
      visible: false,
      activeTabKey: "1",
      id: "",
      selectedCategories: []
    });

    this.props.onUpdateProduct();
  };

  onDrop = async files => {
    let arrFiles = this.state.coverImages.length ? [...this.state.coverImages] : [];

    await files.forEach(file => {
      this.getBase64(file, result => {
        arrFiles.push({
          imageDecoded: result
        });
      });
    });

    this.setState({
      coverImages: arrFiles,
      uploadImage: true
    },
    ()=>console.log("ADDed IMG:", this.state)
    );
  };

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      cb(reader.result);
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }

  handleChangeInput = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    },
    ()=>console.log("STATE: ", this.state)
    );
  };
  //   handleChangeImgUrl = (e) => {

  //   }

  handleCreateProduct = async e => {
    e.preventDefault();

    let newProduct = { ...this.state };

    await createNewProduct(newProduct);
    this.props.onUpdate();

    this.handleCancel();
  };

  updateProduct = async () => {
    await updateProduct({
      ...this.state,
      category: this.state.category.id
    });
    this.props.onUpdate();
    this.handleCancel();
  };

  onChangeCascader = e => {
    this.setState({
      selectedCategories: e,
      category: e[e.length - 1]
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.update) {
      this.setState({
        ...nextProps.product,
        visible: true
      });
    }
  }

  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    console.log(targetOption);

    const res = await getCategoriesById(targetOption.value);

    // load options lazily
    targetOption.loading = false;
    targetOption.children = res.map(item => ({
      label: item.name,
      value: item.id,
      isLeaf: !item.isHaveChildren
    }));

    this.setState({
      categories: [...this.state.categories]
    });
  };

  handleAddImageUrl = () => {
    this.state.imageUrl
    &&
    this.setState({
      imageUrl: "",
      imageUrls: [
        ...this.state.imageUrls,
        {
          url: this.state.imageUrl
        }
      ]
    },
    ()=>console.log("ADDed URL IMG:", this.state)
    );
  };

  // =====================================================================
  handleUpdateImages = (newCovers, newUrls) => {
    this.setState({
      coverImages: [ ...newCovers ],
      imageUrls: [ ...newUrls ]
    },
    () => console.log(this.state))
  }

  async componentDidMount() {
    const res = await getFirstLevelCategories();
    console.log(res);

    this.setState({
      categories: res.map(item => ({
        label: item.name,
        value: item.id,
        isLeaf: !item.isHaveChildren
      }))
    });
  }

  render() {
    const {
      id,
      name,
      brand,
      vendorCode,
      count,
      description,
      price,
      imageUrls,
      imageUrl,
      categories,
      selectedCategories,
      activeTabKey,
      coverImages,
      uploadImage
    } = this.state;

    return (
      <div>
        <button className="btn" onClick={this.showModal}>
          Добавить товар
        </button>

        <Modal
          title={id ? name : "Новый товар"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={false}
        >
          <div className="modal">
            <Tabs
              type="card"
              activeKey={activeTabKey}
              onChange={key => this.setState({ activeTabKey: key })}
            >
              <TabPane tab="Основная информация" key="1">
                <form className={styles.mainInfo}>
                  <div className={styles.inputsGroup}>
                    <div>
                      <label>Название товара</label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChangeInput}
                      />
                    </div>
                    <div>
                      <label>Бренд</label>
                      <input
                        type="text"
                        name="brand"
                        value={brand}
                        onChange={this.handleChangeInput}
                      />
                    </div>
                    <div>
                      <label>Артикул</label>
                      <input
                        type="text"
                        name="vendorCode"
                        value={vendorCode}
                        onChange={this.handleChangeInput}
                      />
                    </div>
                    <div>
                      <label>Количество</label>
                      <input
                        type="number"
                        name="count"
                        value={count}
                        onChange={this.handleChangeInput}
                      />
                    </div>
                  </div>
                  <div>
                    <label>Описание</label>
                    <textarea
                      name="description"
                      value={description}
                      onChange={this.handleChangeInput}
                    />
                  </div>

                  {id ? (
                    <button
                      type="button"
                      className={styles.save}
                      onClick={this.updateProduct}
                    >
                      Сохранить
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.save}
                      onClick={() => this.setState({ activeTabKey: "2" })}
                    >
                      Далее
                    </button>
                  )}
                </form>
              </TabPane>

              <TabPane tab="Категории" key="2">
                <form className={styles.selectCategory}>
                  <div>
                    <label>Выберите категорию для вашего товара</label>
                    <Cascader
                      value={selectedCategories}
                      options={categories}
                      onChange={this.onChangeCascader}
                      loadData={this.loadData}
                      changeOnSelect
                      placeholder="Please select"
                    />

                    {/*<select onChange={this.handleChangeSelect}>*/}
                    {/*{categories.map(item => (*/}
                    {/*<option key={item.id} value={item.id}>{item.name}</option>*/}
                    {/*))}*/}
                    {/*</select>*/}
                  </div>

                  {id ? (
                    <button
                      type="button"
                      className={styles.save}
                      onClick={this.updateProduct}
                    >
                      Сохранить
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.save}
                      onClick={() => this.setState({ activeTabKey: "3" })}
                    >
                      Далее
                    </button>
                  )}
                </form>
              </TabPane>

              <TabPane tab="Цена" key="3">
                <form className={styles.selectPrice}>
                  <div>
                    <label>Укажите цену для вашего товара (грн)</label>
                    <input
                      type="text"
                      name="price"
                      value={price}
                      onChange={this.handleChangeInput}
                    />
                  </div>

                  {id ? (
                    <button
                      type="button"
                      className={styles.save}
                      onClick={this.updateProduct}
                    >
                      Сохранить
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.save}
                      onClick={() => this.setState({ activeTabKey: "4" })}
                    >
                      Далее
                    </button>
                  )}
                </form>
              </TabPane>

              <TabPane tab="Изображение" key="4">
                <div className={styles.addPicture}>

                  {/* ATTENTION --------------------------------------------------------------------------------------- TESTING */}

                    {coverImages.length || imageUrls.length 
                      ? (() => {
                        // console.log(coverImages,imageUrls);
                        return <ProductPictureGallery 
                          coverImageList={coverImages} 
                          urlImageList={imageUrls} 
                          deleteImage={this.handleUpdateImages}
                          key={id}/>
                      })()
                      : null
                    }

                  {/* ATTENTION --------------------------------------------------------------------------------------- TESTING */}

                  <div className={styles.upload}>
                    <div>
                      <input type="file" name="uploadfile" id="addImg" />
                      <Dropzone onDrop={this.onDrop} accept=".png, .svg, .jpg">
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <label htmlFor="addImg">Добавить картинку</label>
                          </div>
                        )}
                      </Dropzone>
                    </div>

                    <div className={styles.addUrl}>
                      <input
                        type="text"
                        name="imageUrl"
                        value={imageUrl}
                        onChange={this.handleChangeInput}
                      />

                      <button
                        className={styles.addUrlBtn}
                        onClick={this.handleAddImageUrl}
                      >
                        Добавить URL
                      </button>
                    </div>
                  </div>

                  <div className={styles.uploadInfo}>
                    {uploadImage ? (
                      <span>Изображение загружено</span>
                    ) : (
                      <span>
                        Фотография должна быть не меньше 150х150 пикселей, и не
                        болше чем 1000х1000 пикселей.
                      </span>
                    )}

                    {id ? (
                      <button
                        type="button"
                        className={styles.save}
                        onClick={this.updateProduct}
                      >
                        Сохранить
                      </button>
                    ) : (
                      <button
                        className={styles.download}
                        onClick={this.handleCreateProduct}
                      >
                        Сохранить
                      </button>
                    )}
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NewProduct;
