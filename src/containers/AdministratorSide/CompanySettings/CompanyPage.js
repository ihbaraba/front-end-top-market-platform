import React, {Component} from 'react'
import 'antd/dist/antd.css';
import styles from './CompanySettings.module.css'







class CompanyPage extends Component {


    render() {

        return (
            <div>
                <form className={styles.companyPage}>
                    <textarea></textarea>
                    <div className={styles.info}>
                        <p>Информация, которая будет отображена на
                            странице компании, по адресу https://gofriends.pro/ru/company-marketplace-nazar-inc
                        </p>
                        <button className={styles.save}>Сохранить</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CompanyPage;





