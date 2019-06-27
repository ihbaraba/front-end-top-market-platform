import React, {Component} from 'react'
import styles from './Instruction.module.css'
import ava from "../../../img/ava.png";
import img1 from "../../../img/img1.png";
import img2 from "../../../img/img2.png";
import img3 from "../../../img/img3.png";
import img4 from "../../../img/img4.png";
import img5 from "../../../img/img5.png";
import img6 from "../../../img/img6.png";
import img7 from "../../../img/img7.png";
import img8 from "../../../img/Screenshot.png";

import img9 from "../../../img/instru/1.png";
import img10 from "../../../img/instru/2.jpg";
import img11 from "../../../img/instru/3.png";
import img12 from "../../../img/instru/4.png";
import img13 from "../../../img/instru/5.png";

import {Tree} from 'antd';
import {getAllCategories} from '../../../actions/productsActions';
import file from '../../../img/instru/template.xlsx';

const {TreeNode} = Tree;


class Instruction extends Component {
    state = {
        categories: []
    };

    async componentDidMount() {
        const res = await getAllCategories();

        this.setState({
            categories: res
        })
    }

    render() {
        const {categories} = this.state;

        const renderCategories = (categories) => {
            return (
                categories.map(item => (
                    <TreeNode title={`${item.name} - ${item.id}`} key={item.id}>
                        {item.subcategories.length > 0 ? renderCategories(item.subcategories) : ''}
                    </TreeNode>
                ))
            )
        };

        return (
            <div>
                <h3 className={styles.title}>Инструкция по добавлению товаров</h3>

                <div className={styles.instructionBlock}>
                    <div className={styles.user}>
                        {/*<div className={styles.userAvatar}>*/}
                            {/*<img src={ava} alt=""/>*/}
                        {/*</div>*/}
                        {/*<div className={styles.userInfo}>*/}
                            {/*<span className={styles.name}>Hexagon</span>*/}
                            {/*<span className={styles.date}>13/03/2019  в 11:23</span>*/}
                        {/*</div>*/}
                    </div>
                    {/*<div className={styles.video}>*/}
                        {/*<iframe width="100%" height="100%" src="https://www.youtube.com/embed/KCCqqPqDqSY"*/}
                                {/*frameBorder="0"*/}
                                {/*allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"*/}
                                {/*allowFullScreen></iframe>*/}
                    {/*</div>*/}

                    <h5>Инструкция по добавлению товара вручную </h5>

                    <p>Добавление 1-го товара происходит через кнопку "Добавить товар". Открывается окно, в котором доступны
                        следующие <br/> вкладки:</p>
                    <ul className={styles.list}>
                        <li>Основая информация</li>
                        <li>Категории</li>
                        <li>Цена</li>
                        <li>Изображение</li>
                    </ul>

                    <p>После того, когда поля заполнены(изображение не обязательно), необходимо сохранить карточку товара.
                        Она появится в фильтре с товарами. Напротив каждого товара есть ручка, при клике на которую
                        открывается карточка товара с возможностью отредактировать информацию.
                    </p>



                    <div className={styles.img4}>
                        <img src={img4} alt="img4"/>
                    </div>
                    <div className={styles.img5}>
                        <img src={img5} alt="img5"/>
                    </div>
                    <div className={styles.img6}>
                        <img src={img6} alt="img6"/>
                    </div>
                    <div className={styles.img7}>
                        <img src={img7} alt="img7"/>
                    </div>

                    {/*-----------------------*/}
                    <h3 className={styles.title} style={{margin: '50px 0 30px 0'}}>Инструкция по импорту товаров через
                        Excel файл</h3>
                    <iframe width="1088" height="680" src="https://www.youtube.com/embed/wpS_Cn29ChA" frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    <a href={file} className={styles.link}>Скачать пример файла</a>

                    <p>Файл содержит следующие поля с данными о товаре которые необходимо заполнить.</p>
                    <strong>category_id</strong><br/>
                    <strong>id</strong><br/>
                    <strong>product_type</strong><br/>
                    <strong>brand</strong><br/>
                    <strong>name</strong><br/>
                    <strong>variety_type</strong><br/>
                    <strong>vendor_code</strong><br/>
                    <strong>warranty_duration</strong><br/>
                    <strong>vendor_country</strong><br/>
                    <strong>box_size</strong><br/>
                    <strong>count</strong><br/>
                    <strong>price</strong><br/>
                    <strong>description</strong><br/>
                    <strong>extra_description</strong><br/>
                    <strong>age_group</strong><br/>
                    <strong>material</strong><br/>

                    <img src={img9} alt="" style={{margin: '20px 0'}}/>


                    <p> В поле <strong>category_id</strong> необходимо ввести <strong>id</strong> категории товара
                        которой он соответствует.
                        Id необходимой категории можно найти в блоке <a href="#tree">категорий</a>:</p>

                    <img src={img10} alt="" style={{margin: '20px 0'}}/>

                    <p>
                        В поле <strong>id</strong> необходимо указать id товара который уже есть в системе topmarket в
                        этом случае данные
                        по товару обновятся или оставить поле <strong>id</strong> незаполненным. Если айди не указано -
                        система создаст
                        этот товар как новый.
                    </p>

                    <ul>
                        <li>Поле <strong>product_type</strong> должно содержать тип продукта, например “Мобільный
                            телефон Apple”
                        </li>
                        <li>В поле <strong>brand</strong> указывается название бренда</li>
                        <li>Поле <strong>name</strong> должно содержать имя продукта например “iPhone Xs Max”</li>
                        <li>Поле <strong>variety_type</strong> должно содержать разновидность продукта</li>
                        <li>Поле <strong>vendor_code</strong> должно содержать артикул продукта</li>
                        <li>Поле <strong>warranty_duration</strong> должно содержать срок гарантии (количество дней)
                        </li>
                        <li>В поле <strong>vendor_country</strong> необходимо указать страну производителя</li>
                        <li>Поле <strong>box_size</strong> удолжно содержать размер коробки товара</li>
                        <li>Поле <strong>count</strong> должно содержать количество товара, его остаток на складе</li>
                        <li>Поле <strong>price</strong> должно содержать цену товара</li>
                        <li>Поле <strong>description</strong> должно содержать полное описание товара</li>
                        <li>Поле <strong>extra_description</strong> может содержать дополнительное короткое описание
                            товара, является не обязательным полем
                        </li>
                        <li>Поле <strong>age_group</strong> может содержать возрастную категорию для этого товара,
                            является не обязательным полем
                        </li>
                        <li>Поле <strong>material</strong> может содержать название материала товара, является не
                            обязательным полем
                        </li>
                    </ul>

                    <p>После внесения товаров в Excel файл, выполните его загрузку.</p>


                    <div className={styles.img7}>
                        <img src={img13} alt="img7"/>
                    </div>


                    {/*-----------------------*/}
                    <h3 className={styles.title} style={{margin: '50px 0 30px 0'}}>Инструкция по импорту товаров c
                        Rozetka</h3>
                    <iframe width="1088" height="680" src="https://www.youtube.com/embed/8ew65FjJED0" frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    <p>Для того чтобы импортировать товары с Rozetka marketplace необходимо перейти в раздел “Товары”,
                        который находится в <a href="https://seller.rozetka.com.ua" target='_blank'>личном кабинете
                            Rozetka </a>
                        Для экспорта товаров в Excel нажмите кнопку “Загрузить файл”
                    </p>
                    <div className={styles.img7}>
                        <img src={img11} alt="img7"/>
                    </div>
                    <p>
                        Сохраните файл на вашем ПК. <br/>
                        Откройте файл в Excel и сохраните его с другим именем. (Файл -> Сохранить как...)<br/>
                        В разделе платформы “Мои товары” импортируйте сохраненный файл
                    </p>
                    <div className={styles.img7}>
                        <img src={img12} alt="img7"/>
                    </div>

                    <h3 className={styles.title} style={{margin: '30px 0 0 0'}}>Категории</h3>

                    <div id='tree'>
                        <Tree
                            showLine
                            multiple
                            defaultExpandedKeys={['0-0-0']}
                            onSelect={this.onSelect}
                        >
                            {renderCategories(categories)}
                        </Tree>
                    </div>
                </div>
            </div>
        );
    }
}

export default Instruction;





