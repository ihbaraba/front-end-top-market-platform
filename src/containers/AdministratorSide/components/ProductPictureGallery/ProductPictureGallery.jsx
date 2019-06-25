import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'

import styles from './ProductPictureGallery.module.css'

class ProductPictureGallery extends Component {
  state = {
    currentImageIndex: 0,
    urlImageList: [],
    coverImageList: [],
    imageList: [],
    visible: false,
  }

  showModal = e => {

    const newCurentImageIndex = this.state.imageList.indexOf(
      this.state.imageList.find(
        el => el.url === e.target.src || el.imageDecoded === e.target.src
      )
    )

    this.setState({
      currentImageIndex: newCurentImageIndex,
      visible: true,
    })
  }

  handleOk = e => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  showDeleteConfirm() {
    Modal.confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('Image have to delete')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  showPrev = () => {
    const {
      imageList,
      currentImageIndex 
    } = this.state;

    const newCurentImageIndex = () => {
      if (currentImageIndex === 0) {
        return imageList.length - 1
      }
      return currentImageIndex - 1
    };

    this.setState({
      currentImageIndex: newCurentImageIndex(),
    })
  }

  showNext = () => {
    const newCurentImageIndex = () => {
      if (this.state.currentImageIndex === this.state.imageList.length - 1) {
        return 0
      }
      return this.state.currentImageIndex + 1
    };

    this.setState({
      currentImageIndex: newCurentImageIndex(),
    })
  }

  componentWillMount() {
    this.setState({
      urlImageList: [...this.props.urlImageList],
      coverImageList: [...this.props.coverImageList],
      imageList: [...this.props.urlImageList, ...this.props.coverImageList],
    })
  }
  // componentWillUpdate(){
  //   console.log(this.state);
  //   console.log([...this.props.urlImageList, ...this.props.coverImageList]);
  // }
  // componentWillUnmount(){
  //   console.log('component unmount');

  // }

  render() {
    const { visible, imageList, currentImageIndex } = this.state
    console.log(imageList[currentImageIndex])

    return (
      <>
        <ul className={styles.galleryList}>
          {/* VERSION 1 */}
          {/* {coverImageList.map(el => (
                <li className={styles.galleryItem}>
                    <img src={el.imageDecoded} alt=""/>
                </li>
            ))}

            {urlImageList.map(el => (
                <li className={styles.galleryItem}>
                    <img src={el.url} alt=""/>
                </li>
            ))} */}
          {/* VERSION 1 */}

          {/* VERSION 2 */}
          {imageList.map((el, i) => (
            <li
              className={styles.galleryItem}
              key={el.imageDecoded || el.url + i}
              index={i}
              onClick={this.showModal}
            >
              <img src={el.imageDecoded || el.url} alt="" />
            </li>
          ))}
          {/* VERSION 2 */}
        </ul>
        <Modal
          // title="Basic Modal"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.showDeleteConfirm}>
              Delete
            </Button>,
          ]}
        >
          <p>
            {currentImageIndex + 1} of {imageList.length}
          </p>
          <div className={styles.overViewBlock}>
            <p onClick={this.showPrev}> {"< Prev..."} </p>
            <img
              src={
                imageList[currentImageIndex].url ||
                imageList[currentImageIndex].imageDecoded ||
                ''
              }
              alt=""
              className={styles.overViewBlock__img}
            />
            <p onClick={this.showNext}> Next... > </p>
          </div>
        </Modal>
      </>
    )
  }
}

ProductPictureGallery.propTypes = {
  coverImageList: PropTypes.array.isRequired,
  urlImageList: PropTypes.array.isRequired,
}

export default ProductPictureGallery
