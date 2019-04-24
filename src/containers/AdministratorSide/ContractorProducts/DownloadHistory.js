import React, {Component, Fragment} from 'react';
import styles from './ContractorProducts.module.css';
import {Icon} from 'antd';
import moment from 'moment';
import {getDownloadsStatus} from '../../../actions/productsActions';


class DownloadHistory extends Component {
    state = {
        files: []
    };

    async componentDidMount() {
        const res = await getDownloadsStatus();

        this.setState({
            files: res
        })
    }

    render() {
        const {files} = this.state;

        return (
            <Fragment>
                <div className={styles.top}>
                    <h3 className={styles.title}>История загрузок</h3>
                </div>

                <div className={styles.historyPage}>
                    {files.map((item, index) => (
                        <div key={index} className={styles.fileBlock}>
                            <span className={styles.fileName}>
                           <a href={`https://api.topmarket.club${item.xlsFile}`}>
                               {item.xlsFile.split('/')[item.xlsFile.split('/').length - 1]}
                           </a>

                                <span className={styles.errorsBlock}>
                                {item.errors}
                            </span>
                            </span>
                            <span className={styles.date}>
                                {moment(item.created).format('DD-MM-YYYY')}
                            </span>

                            {item.isUploaded ? <Icon type="check" className={styles.icon}/> : ''}
                        </div>
                    ))}
                </div>
            </Fragment>
        )
    }
}

export default DownloadHistory;