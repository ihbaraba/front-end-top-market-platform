import React, {Component} from 'react';
import styles from './ContractorProducts.module.css';
import {getDownloadsStatus} from '../../../actions/productsActions';


class DownloadHistory extends Component {
    state = {
        results: []
    };

    async componentDidMount() {
        const res = await getDownloadsStatus();

        this.setState(res)
    }

    render() {
        const {results} = this.state;

        return (
            <div className={styles.historyPage}>
                {results.map(item => (
                    <div>
                        {item.description}
                    </div>
                ))}
            </div>
        )
    }
}

export default DownloadHistory;