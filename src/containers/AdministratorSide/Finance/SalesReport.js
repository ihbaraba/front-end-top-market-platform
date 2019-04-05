import React, {Component} from 'react'
import styles from './Finance.module.css'
import 'antd/dist/antd.css';
import { Table } from 'antd'
import  download  from "../../../img/download-button.svg";


const dataSource = [{
    key: '1',
    period: 'Февраль 2019',
    date: '03/03/2019 14:12',
}, {
    key: '2',
    period: 'Февраль 2019',
    date: '03/03/2019 14:12',
}, {
    key: '3',
    period: 'Февраль 2019',
    date: '03/03/2019 14:12',
}, {
    key: '4',
    period: 'Февраль 2019',
    date: '03/03/2019 14:12',
}, {
    key: '5',
    period: 'Февраль 2019',
    date: '03/03/2019 14:12',
},];

const columns = [ {
    title: 'Отчетный период',
    dataIndex: 'period',
    key: 'period',
}, {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
},  {
    render: () => (
        <span>
            <button className={styles.download}><img src={download} alt="download"/></button>
        </span>
    ),
}];

class SalesReport extends Component {

    render() {
        return (
            <div className={styles.salesReporttable}>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

export default SalesReport;





