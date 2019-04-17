import React, {Component} from 'react'
import 'antd/dist/antd.css';
import styles from './CompanySettings.module.css'

import {
    Upload, message, Button, Icon,
} from 'antd';


const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};



class Documents extends Component {



    render() {

        return (
            <div className={styles.documents}>
                <p>Изображение должно быть в форматах pdf. jpeg или png. размер файла до 2Мб</p>
                <div>
                    <h4>Паспорт</h4>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>
                </div>

            </div>
        );
    }
}

export default Documents;





