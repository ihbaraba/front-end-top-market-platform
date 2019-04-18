import React, {Component} from 'react';
import {Icon} from 'antd';
import {getDocuments, uploadDocuments} from "../../../actions/companyActions";
import styles from './CompanySettings.module.css';

import Dropzone from 'react-dropzone'

class Documents extends Component {
    state = {
        type: '',
        passport: [],
        ukStatistic: [],
        certificate: [],
        taxPayer: [],
        payerRegister: [],
        payerCertificate: []
    };

    onDrop = async (files) => {
        const typeDoc = this.state.type;
        let arrFiles = [];

        await files.forEach(file => {
            this.getBase64(file, (result) => {
                arrFiles.push(result)
            });
        });


        this.setState({
            [typeDoc]: arrFiles
        })
    };

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    handleUploadDocuments = () => {
        uploadDocuments(this.state)
    };


    async componentDidMount() {
        const res = getDocuments();

        this.setState(res)
    }

    render() {
        const documents = [
            {
                title: 'Паспорт',
                description: '(стр. 1, 2, 3 и место регистрации личности)',
                typeDoc: 'passport'
            },
            {
                title: 'Справка Государственного комитета статистики Украины',
                description: '(если договор подписывается с юр.лицом - обязательно, если с \n' +
                'физ.лицом - в случае, если такую справку получало это лицо)',
                typeDoc: 'ukStatistic'
            },
            {
                title: 'Свидетельство о гос.регистрации или выписка с ЕГРПОУ',
                description: '',
                typeDoc: 'certificate'
            },
            {
                title: 'Справка 4 Учета плательщика налогов',
                description: '',
                typeDoc: 'taxPayer'
            },
            {
                title: 'Свидетельство, выписка плательщика налога на добавленную \n' +
                'стоимость, выписка из реестра плательщиков НДС',
                description: '',
                typeDoc: 'payerRegister'
            },
            {
                title: 'Свидетельство плательщика единого налога',
                description: '(если лицо является плательщиком по упрощенной системе)',
                typeDoc: 'payerCertificate'
            },
        ];

        return (
            <div>
                <h4 className={styles.information}>Изображение должно быть в форматах pdf. jpeg или png. размер файла до 2Мб</h4>

                {documents.map((item) => (
                    <div key={item.typeDoc} className={styles.documentBlock}>
                        <div className="title">
                            <h6 className={styles.documentTitle}>{item.title}</h6>
                            <span className={styles.description}>{item.description}</span>
                        </div>

                        <Dropzone onDrop={this.onDrop} accept=".png, .svg, .jpg">
                            {({getRootProps, getInputProps}) => (
                                <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    {this.state[item.typeDoc].length > 0 ?
                                        <Icon type="check-circle" theme="filled"/>
                                        :
                                        <Icon type="plus-circle" theme="filled"
                                              onClick={() => this.setState({type: item.typeDoc})}/>}


                                </div>
                            )}
                        </Dropzone>
                    </div>
                ))}

                <button onClick={this.handleUploadDocuments} className={styles.save}>Сохранить</button>
            </div>
        )
    }
}

export default Documents;