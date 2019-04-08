import React, {Component} from 'react'
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import styles from './Categories.module.css'
import CategoryList from "./CategoryList";




class Categories extends Component {



    render() {

        return (
            <div>
                <div className={styles.top}>
                    <h3 className={styles.title}>Категории</h3>
                    <Link to="/" className={styles.howToAdd}>Как добавить товар?</Link>
                </div>
                <div>
                    <CategoryList/>
                </div>
            </div>
        );
    }
}

export default Categories;





