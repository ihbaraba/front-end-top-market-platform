import React from 'react';
import PropTypes from 'prop-types';

import styles from './ProductPictureGallery.module.css';


const ProductPictureGallery = (props) => {
    // console.log(props);
    const {urlImageList, coverImageList} = props;
    // console.log(urlImageList);
    // console.log(coverImageList);
    const imageList = [...urlImageList, ...coverImageList];

    return (
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
                {imageList.map((el, i )=> (
                    <li className={styles.galleryItem}>
                        <img src={el.imageDecoded || el.url} id={i===0 && "myImg"} alt=""/>
                    </li>
                ))}
            {/* VERSION 2 */}
            <li>
            </li>
        </ul>
    );
};

ProductPictureGallery.propTypes = {
    coverImageList: PropTypes.array.isRequired,
    urlImageList: PropTypes.array.isRequired,
};

export default ProductPictureGallery;