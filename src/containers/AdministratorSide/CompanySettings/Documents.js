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

        switch (typeDoc) {
            case 'passport':
                uploadType = 'passDocDecoded';
                break;

            case 'ukStatistic':
                uploadType = 'ukDoc';
                break;

            case 'certificate':
                uploadType = 'certDoc';
                break;

            case 'taxPayer':
                uploadType = 'taxDoc';
                break;

            case 'payerRegister':
                uploadType = 'payerRegDoc';
                break;

            case 'payerCertificate':
                uploadType = 'payerCertDoc';
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

        console.log(arrFiles);
        this.setState({
            documentsFromServer: {
                ...this.state.documentsFromServer,
                [typeDoc]: [...this.state.documentsFromServer[typeDoc], ...arrFiles]
            },
            [typeDoc]: arrFiles
        }, () => console.log(this.state))
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
            .then(() => notification.success({
                    message: 'Сохранено',
                })
            )
            .then(() => this.getDocuments())
    };

    getDocuments = async () => {
        const res = await getDocuments();
        console.log(res.passport.length);
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
                                {documentsFromServer[item.typeDoc] ? documentsFromServer[item.typeDoc].map(item => (
                                    <img src={item.passDocDecoded} alt=""/>
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

                <button onClick={this.handleUploadDocuments} className={styles.save}>Сохранить</button>
            </div>
        )
    }
}

export default Documents;