import React, {Component} from 'react';
import {Icon} from 'antd';
import {getDocuments, uploadDocuments} from "../../../actions/companyActions";
import styles from './CompanySettings.module.css';

import Dropzone from 'react-dropzone'
import {notification} from "antd";

class Documents extends Component {
    state = {
        type: '',
        documentsFromServer: {},
        passport: [],
        ukStatistic: [],
        certificate: [],
        taxPayer: [],
        payerRegister: [],
        payerCertificate: []
    };

    onDrop = async (files) => {
        const typeDoc = this.state.type;
        let uploadType = '';

        console.log(files);

        switch (typeDoc) {
            case 'passport':
                uploadType = 'passDocDecoded';
                break;

            case 'ukStatistic':
                uploadType = 'ukDocDecoded';
                break;

            case 'certificate':
                uploadType = 'certDocDecoded';
                break;

            case 'taxPayer':
                uploadType = 'taxDocDecoded';
                break;

            case 'payerRegister':
                uploadType = 'payerRegDocDecoded';
                break;

            case 'payerCertificate':
                uploadType = 'payerCertDocDecoded';
                break;

            default:
                break
        }

        let arrFiles = [];

        await files.forEach(file => {
            this.getBase64(file, (result) => {
                arrFiles.push({[uploadType]: result})
            });
        });

        setTimeout(() => {
            this.handleUploadDocuments({[typeDoc]: arrFiles})
        }, 100)
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

    handleUploadDocuments = (doc) => {
        uploadDocuments(doc)
            .then(() => notification.success({
                    message: 'Сохранено',
                })
            )
            .then(() => this.getDocuments())
    };

    getDocuments = async () => {
        const res = await getDocuments();
        this.setState({documentsFromServer: res})
    };

    async componentDidMount() {
        this.getDocuments();
    }

    render() {
        const documents = [
                {
                    title: 'Паспорт',
                    description: '(стр. 1, 2, 3 и место регистрации личности)',
                    typeDoc: 'passport',
                    imgType: 'passDocDecoded'
                },
                {
                    title: 'Справка Государственного комитета статистики Украины',
                    description: '(если договор подписывается с юр.лицом - обязательно, если с \n' +
                        'физ.лицом - в случае, если такую справку получало это лицо)',
                    typeDoc: 'ukStatistic',
                    imgType: 'ukDocDecoded'
                },
                {
                    title: 'Свидетельство о гос.регистрации или выписка с ЕГРПОУ',
                    description: '',
                    typeDoc: 'certificate',
                    imgType: 'certDocDecoded'
                },
                {
                    title: 'Справка 4 Учета плательщика налогов',
                    description: '',
                    typeDoc: 'taxPayer',
                    imgType: 'taxDocDecoded'
                },
                {
                    title: 'Свидетельство, выписка плательщика налога на добавленную \n' +
                        'стоимость, выписка из реестра плательщиков НДС',
                    description: '',
                    typeDoc: 'payerRegister',
                    imgType: 'payerRegDocDecoded'
                },
                {
                    title: 'Свидетельство плательщика единого налога',
                    description: '(если лицо является плательщиком по упрощенной системе)',
                    typeDoc: 'payerCertificate',
                    imgType: 'payerCertDocDecoded'
                },
            ],
            {documentsFromServer} = this.state;

        return (
            <div>
                <h4 className={styles.information}>Изображение должно быть в форматах jpeg или png. Размер файла до
                    2Мб</h4>

                {documents.map((item) => (
                    <div key={item.typeDoc} className={styles.documentBlock}>
                        <div className="title">
                            <h6 className={styles.documentTitle}>{`${item.title}  (Загружено ${documentsFromServer[item.typeDoc] ? documentsFromServer[item.typeDoc].length : 0} документов)`} </h6>
                            <span className={styles.description}>{item.description}</span>

                            <div className={styles.docImg}>
                                {documentsFromServer[item.typeDoc] ? documentsFromServer[item.typeDoc].map(item1 => (
                                    <img src={item1[item.imgType]} alt=""/>
                                )) : ''}
                            </div>
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

                {/*<button onClick={this.handleUploadDocuments} className={styles.save}>Сохранить</button>*/}
            </div>
        )
    }
}

export default Documents;