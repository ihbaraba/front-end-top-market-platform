import React, {Component} from 'react';
import {Tabs, Checkbox, Form, Button, Select} from 'antd';
import styles from './CompanySettings.module.css';
import {getProfile, updateProfile, getSelectParams} from "../../../actions/companyActions";


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
        logoDecoded: '',
        manufacturer: false,
        name: '',
        officialRepresentative: false,
        phone: '',
        retailNetwork: false,
        subDealer: false,
        town: '',
        url: '',
        webSite: '',
        whoSeeContact: '',
        workingConditions: '',
        activityArea: ''
    };

    handleUpdateCompanyProfile = e => {
        e.preventDefault();

        updateProfile(this.state);
    };

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
        this.setState({
            [name]: value
        })
    };


    async componentDidMount() {
        const [profile, companyType, activityArea, serviceIndustry] = await Promise.all([getProfile(), ...getSelectParams()]);

        this.setState({
            ...profile,
            companyTypeOptions: companyType,
            activityAreaOptions: activityArea,
            serviceIndustryOptions: serviceIndustry
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
            webSite,
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

            activityAreaOptions = [],
            companyTypeOptions = [],
            serviceIndustryOptions = []
        } = this.state;

        return (
            <Form onSubmit={this.handleUpdateCompanyProfile} className={styles.Form}>
                <div className={styles.firstColumn}>
                    <div className='section-title'>
                        Общая информация

                        <span className='section-description'>
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

                    <FormItem>
                        <label htmlFor="">Сферы деятельности</label>

                        <Select onChange={e => this.handleChangeSelect(e, 'activityArea')}>
                            {activityAreaOptions.map(item => (
                                <Option value={item.name}>{item.name}</Option>
                            ))}
                        </Select>
                    </FormItem>

                    <FormItem>
                        <label htmlFor="">Сферы услуг</label>

                        <Select onChange={e => this.handleChangeSelect(e, 'serviceIndustry')}>
                            {serviceIndustryOptions.map(item => (
                                <Option value={item.name}>{item.name}</Option>
                            ))}
                        </Select>
                    </FormItem>

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

                    <FormItem>
                        <label htmlFor="">Тип компании</label>

                        <Select onChange={e => this.handleChangeSelect(e, 'companyType')}>
                            {companyTypeOptions.map(item => (
                                <Option value={item.name}>{item.name}</Option>
                            ))}
                        </Select>
                    </FormItem>

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

                    <div className={styles.CheckboxGroup}>
                        <h3>Тип деятельности для розничной торговли:</h3>

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


                    <div className={styles.CheckboxGroup}>
                        <h3>Тип деятельности для оптовой торговли:</h3>

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
                    <div className='section-title'>
                        Контактные данные
                    </div>

                    <FormItem>
                        <label htmlFor="">Веб-сайт</label>
                        <input
                            type="text"
                            name='webSite'
                            value={webSite || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>

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

                    <FormItem>
                        <label htmlFor="">Кому видны контактные данные ?</label>
                        <input
                            type="text"
                            name='whoSeeContact'
                            value={whoSeeContact || ''}
                            onChange={this.handleChangeInput}
                        />
                    </FormItem>


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