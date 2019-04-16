import React, {Component} from 'react';
import {Icon} from 'antd';
import {getDocuments} from "../../../actions/companyActions";
import styles from './CompanySettings.module.css';

import Dropzone from 'react-dropzone'

class Documents extends Component {
    state = {};

    onDrop = (file, type) => {
        this.getBase64(file[0], (result) => {
            this.setState({
                avatarImage: result
            })
        });
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

    async componentDidMount() {
        const res = getDocuments();

        this.setState(res)
    }

    render() {
        const documents = [
            {
                title: 'Паспорт',
                description: '(стр. 1, 2, 3 и место регистрации личности)',
                type: 'passport'
            },
            {
                title: 'Справка Государственного комитета статистики Украины',
                description: '(если договор подписывается с юр.лицом - обязательно, если с \n' +
                'физ.лицом - в случае, если такую справку получало это лицо)',
                type: 'ukStatistic'
            },
            {
                title: 'Свидетельство о гос.регистрации или выписка с ЕГРПОУ',
                description: '',
                type: 'certificate'
            },
            {
                title: 'Справка 4 Учета плательщика налогов',
                description: '',
                type: 'taxPayer'
            },
            {
                title: 'Свидетельство, выписка плательщика налога на добавленную \n' +
                'стоимость, выписка из реестра плательщиков НДС',
                description: '',
                type: 'payerRegister'
            },
            {
                title: 'Свидетельство плательщика единого налога',
                description: '(если лицо является плательщиком по упрощенной системе)',
                type: 'payerCertificate'
            },
        ];

        return (
            <div>
                Изображение должно быть в форматах pdf. jpeg или png. размер файла до 2Мб

                {documents.map((item) => (
                    <div key={item.type} >
                        <div className="title">
                            {item.title}

                            <span className="description">{item.description}</span>
                        </div>

                        <Dropzone onDrop={e => this.onDrop(e, item.type)} accept=".png, .svg, .jpg">
                            {({getRootProps, getInputProps}) => (
                                <div {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <Icon type="plus-circle" theme="filled" />
                                </div>
                            )}
                        </Dropzone>
                    </div>
                ))}

            </div>
        )
    }
}

export default Documents;