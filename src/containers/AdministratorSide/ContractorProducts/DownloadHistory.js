import React, {Component, Fragment} from 'react';
import styles from './ContractorProducts.module.css';
import {Icon} from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {getDownloadsStatus} from '../../../actions/productsActions';
import progres from '../../../img/progress.gif';

class DownloadHistory extends Component {
    state = {
        files: []
    };

    interval = '';

    async componentDidMount() {
        getDownloadsStatus()
            .then(res => {
                this.setState({
                    files: res
                })
            });

        this.interval = setInterval(() => {
            getDownloadsStatus()
                .then(res => {
                    this.setState({
                        files: res
                    })
                })
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {files} = this.state;

        return (
            <Fragment>
                <div className={styles.top}>
                    <h3 className={styles.title}><Link to='/admin/products'>Мои товары</Link> -> История загрузок</h3>
                </div>

                <div className={styles.historyPage}>
                    {files.map((item, index) => (
                        <div key={index} className={styles.fileBlock}>
                            <span className={styles.fileName}>
                               <a href={`https://api.topmarket.ua${item.xlsFile}`}>
                                   {item.xlsFile.split('/')[item.xlsFile.split('/').length - 1]}
                               </a>

                                {item.totalProductsCount ? <span className={styles.errorsBlock}>
                               Загружено {item.totalProductsCount} товаров
                            </span> : ''}
                                <span className={styles.errorsBlock}>
                                {item.errors === 'No errors' ? '' : item.errors}
                            </span>
                            </span>
                            <span className={styles.date}>
                                {moment(item.created).format('DD-MM-YYYY HH:mm')}
                            </span>

                            <span className={styles.status}>
                                 {(item.isUploaded || item.errors || item.errors === 'No errors') ?
                                     <Icon type="check" className={styles.icon}/> : <img src={progres} alt=""/>}
                            </span>
                        </div>
                    ))}
                </div>
            </Fragment>
        )
    }
}

export default DownloadHistory;