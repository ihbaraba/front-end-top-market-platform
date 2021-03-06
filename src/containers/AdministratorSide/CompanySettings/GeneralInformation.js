import React, {Component} from 'react';
import {Tabs, Checkbox, Form, Button, Select} from 'antd';
import styles from './CompanySettings.module.css';
import {getProfile, updateProfile, getSelectParams} from "../../../actions/companyActions";
import {notification} from "antd/lib/index";
import nike from "../../../img/defaultimage.png";
import Dropzone from 'react-dropzone';


const Option = Select.Option,
    FormItem = Form.Item;

class GeneralInformation extends Component {
    state = {
        aboutCompany: '',
        address: '',
        dealer: false,
        distributor: false,
        email: '',
        exporter: false,
        importer: false,
        isInternetShop: false,
        isOfflineShop: false,
        manufacturer: false,
        name: '',
        officialRepresentative: false,
        phone: '',
        retailNetwork: false,
        subDealer: false,
        town: '',
        logoDecoded: '',
        url: '',
        whoSeeContact: '',
        workingConditions: '',
        updateImage: false,
    };

    handleUpdateCompanyProfile = e => {
        e.preventDefault();

        let letNewState = {...this.state};

        delete letNewState.activityArea;
        delete letNewState.companyType;
        delete letNewState.serviceIndustry;

        if (!this.state.updateImage) {
            delete letNewState.avatar
        }

        updateProfile(letNewState)
            .then(() => {
                    notification.success({
                        message: 'Сохранено',
                    });
                    this.setState({
                        updateImage: false,
                    })
                }
            )
    };

    onDrop = (file) => {
        this.getBase64(file[0], (result) => {
            this.setState({
                logoDecoded: result,
                updateImage: true
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
    }

    handleChangeInput = ({target: {name, value}}) => {
        this.setState({
            [name]: value
        })
    };

    handleChangeCheckbox = (value, name) => {
        this.setState({
            [name]: value.target.checked
        })
    };

    handleChangeSelect = (value, name) => {
        console.log(value);
        this.setState({
            [name]: value
        })
    };


    async componentDidMount() {
        const [profile, companyType, activityArea, serviceIndustry] = await Promise.all([getProfile(), ...getSelectParams()]);

        this.setState({
            ...profile,
            companyTypeOptions: companyType.results,
            activityAreaOptions: activityArea.results,
            serviceIndustryOptions: serviceIndustry.results
        })
    }

    render() {
        const {
            name,
            town,
            email,
            phone,
            whoSeeContact,
            address,
            url,
            workingConditions,
            isInternetShop,
            isOfflineShop,
            retailNetwork,
            distributor,
            manufacturer,
            importer,
            dealer,
            subDealer,
            exporter,
            officialRepresentative,
            logoDecoded,

            activityAreaOptions = [],
            companyTypeOptions = [],
            serviceIndustryOptions = []
        } = this.state;

        return (
            <Form onSubmit={this.handleUpdateCompanyProfile} className={styles.Form}>
                <div className={styles.firstColumn}>
                    <div className='section-title'>
                        <h3 className={styles.title}>Общая информация</h3>
                        <span className={styles.sectionDescription}>
                            Эта информация нужна для начала работ. Ее будут видеть другие участники системы.
                        </span>
                    </div>

                    <FormItem>
                        <label htmlFor="">Название компании</label>
                        <input
                            type="text"
                            name='name'
                            value={name || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

                    {/*<FormItem>*/}
                    {/*<label htmlFor="">Сферы деятельности</label>*/}

                    {/*<Select onChange={e => this.handleChangeSelect(e, 'activityArea')} required*/}
                    {/*value={activityArea}>*/}
                    {/*{activityAreaOptions.map(item => (*/}
                    {/*<Option key={item.id} value={item.id}>{item.name}</Option>*/}
                    {/*))}*/}
                    {/*</Select>*/}
                    {/*</FormItem>*/}

                    {/*<FormItem>*/}
                    {/*<label htmlFor="">Сферы услуг</label>*/}

                    {/*<Select onChange={e => this.handleChangeSelect(e, 'serviceIndustry')} required*/}
                    {/*value={serviceIndustry}>*/}
                    {/*{serviceIndustryOptions.map(item => (*/}
                    {/*<Option key={item.id} value={item.id}>{item.name}</Option>*/}
                    {/*))}*/}
                    {/*</Select>*/}
                    {/*</FormItem>*/}

                    <FormItem>
                        <label htmlFor="">Город (территориальное размещение)</label>
                        <input
                            type="text"
                            name='town'
                            value={town || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

                    <FormItem>
                        <label htmlFor="">Адрес</label>
                        <input
                            type="text"
                            name='address'
                            value={address || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

                    {/*<FormItem>*/}
                    {/*<label htmlFor="">Тип компании</label>*/}

                    {/*<Select onChange={e => this.handleChangeSelect(e, 'companyType')} required value={companyType}>*/}
                    {/*{companyTypeOptions.map(item => (*/}
                    {/*<Option key={item.id} value={item.id}>{item.name}</Option>*/}
                    {/*))}*/}
                    {/*</Select>*/}
                    {/*</FormItem>*/}

                    <FormItem>
                        <label htmlFor="">URL</label>
                        <input
                            type="text"
                            name='url'
                            value={url || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

                    <FormItem>
                        <label htmlFor="">Условия работы </label>
                        <input
                            type="text"
                            name='workingConditions'
                            value={workingConditions || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

                    <div className={styles.CheckboxGroup, styles.type}>
                        <h3 className={styles.typeTitle}>Тип деятельности для розничной торговли:</h3>

                        <Checkbox
                            checked={isInternetShop}
                            onChange={e => {
                                this.handleChangeCheckbox(e, 'isInternetShop')
                            }}
                        >
                            Интернет-магазин
                        </Checkbox>

                        <Checkbox
                            checked={isOfflineShop}
                            onChange={e => {
                                this.handleChangeCheckbox(e, 'isOfflineShop')
                            }}
                        >
                            Оффлайн-магазин
                        </Checkbox>

                        <Checkbox
                            checked={retailNetwork}
                            onChange={e => {
                                this.handleChangeCheckbox(e, 'retailNetwork')
                            }}
                        >
                            Розничная сеть
                        </Checkbox>
                    </div>


                    <div className={styles.CheckboxGroup, styles.type}>
                        <h3 className={styles.typeTitle}>Тип деятельности для оптовой торговли:</h3>

                        <Checkbox
                            checked={distributor}
                            onChange={e => {
                                this.handleChangeCheckbox(e, 'distributor')
                            }}
                        >
                            Дистрибьютор
                        </Checkbox>

                        <Checkbox
                            checked={manufacturer}
                            onChange={e => {
                                this.handleChangeCheckbox(e, 'manufacturer')
                            }}
                        >
                            Производитель
                        </Checkbox>

                        <Checkbox
                            checked={importer}
                            onChange={e => {
                                this.handleChangeCheckbox(e, 'importer')
                            }}
                        >
                            Импортер
                        </Checkbox>

                        <Checkbox
                            checked={dealer}
                            onChange={e => {
                                this.handleChangeCheckbox(e, 'dealer')
                            }}
                        >
                            Дилер
                        </Checkbox>

                        <Checkbox
                            checked={subDealer}
                            onChange={e => {
                                this.handleChangeCheckbox(e, 'subDealer')
                            }}
                        >
                            Субдилер
                        </Checkbox>

                        <Checkbox
                            checked={exporter}
                            onChange={e => {
                                this.handleChangeCheckbox(e, 'exporter')
                            }}
                        >
                            Экспортер
                        </Checkbox>

                        <Checkbox
                            checked={officialRepresentative}
                            onChange={e => {
                                this.handleChangeCheckbox(e, 'officialRepresentative')
                            }}
                        >
                            Официальный представитель
                        </Checkbox>
                    </div>
                </div>

                <div className={styles.secondColumn}>
                    <div>
                        <div className={styles.logo}>
                            <div className={styles.logoImg}>
                                <img src={logoDecoded ? logoDecoded : nike} alt="nike"/>
                            </div>
                            <div className={styles.logoInfo}>
                                <h4 className={styles.formTitle}>Логотип</h4>
                                <p>Логотип должен быть в формате: JPEG,SVG,PNG</p>

                                <Dropzone onDrop={this.onDrop} accept=".png, .svg, .jpg">
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps({className: 'dropzone'})}>
                                            <input {...getInputProps()} />
                                            <button className={styles.download}>Загрузить логотип</button>
                                        </div>
                                    )}
                                </Dropzone>

                            </div>
                        </div>

                        <div className='section-title'>
                            <h3 className={styles.title}>Контактные данные</h3>
                        </div>

                        <FormItem>
                            <label htmlFor="">Телефон</label>
                            <input
                                type="text"
                                name='phone'
                                value={phone || ''}
                                onChange={this.handleChangeInput}
                            />
                        </FormItem>

                        <FormItem>
                            <label htmlFor="">E-mail</label>
                            <input
                                type="text"
                                name='email'
                                value={email || ''}
                                onChange={this.handleChangeInput}
                            />
                        </FormItem>

                        {/*<FormItem>*/}
                        {/*<label htmlFor="">Кому видны контактные данные ?</label>*/}
                        {/*<input*/}
                        {/*type="text"*/}
                        {/*name='whoSeeContact'*/}
                        {/*value={whoSeeContact || ''}*/}
                        {/*onChange={this.handleChangeInput}*/}
                        {/*/>*/}
                        {/*</FormItem>*/}
                    </div>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.loginFormButton}
                    >
                        Сохранить
                    </Button>

                </div>

            </Form>
        )
    }

}

const WrappedNormalGeneralInformationForm = Form.create()(GeneralInformation);


export default WrappedNormalGeneralInformationForm;