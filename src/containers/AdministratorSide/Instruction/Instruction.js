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
import file from '../../../img/example_product.xlsx';

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
                        <div className={styles.userAvatar}>
                            <img src={ava} alt=""/>
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.name}>Hexagon</span>
                            <span className={styles.date}>13/03/2019  в 11:23</span>
                        </div>
                    </div>
                    <div className={styles.video}>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/KCCqqPqDqSY"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                    </div>
                    <p>
                        Зайдите во вкладку «Все товары». Здесь находится полный каталог товаров поставщиков . Для вашего
                        удобства
                        вы можете фильтровать их по разным критериям (артикул, наличие, бренд, название, категория
                        товара, розничная
                        цена, топ-товары/товары со скидкой), а ещё выбрать интересующую вас категорию с помощью панели
                        слева. Обратите внимание,
                        что также вы можете выбрать товары, которые были добавлены за определённый период или за
                        последнюю неделю (Отобразить новинки).
                    </p>
                    <div className={styles.img1}>
                        <img src={img1} alt="img1"/>
                    </div>
                    <p>Полную информацию о товаре (фотографии, описание, опции) возможно увидеть, нажав на товар</p>
                    <div className={styles.img2}>
                        <img src={img2} alt="img2"/>
                    </div>
                    <p>После того как вы определились с категорией или определенными товарами, выделите их с помощью
                        галочки
                        (поштучно или массово). Максимальное количество отображаемых товаров на одной странице,
                        которые можно выбрать, не более 500.</p>
                    <p>Как только выделите товары, у вас активируется кнопка «Добавить в Мои товары». Нажмите её и все
                        выделенные
                        карточки попадут в ваш каталог (автоматически попадёте в данную вкладку).</p>
                    <p>Здесь также можете воспользоваться фильтрами, а также отредактировать карточку
                        товара под свой интернет-магазин. Важно! Цену изменять нельзя!</p>
                    <div className={styles.img3}>
                        <img src={img3} alt="img3"/>
                    </div>
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
                        Exel файл</h3>
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

                    <p>После внесения товаров в Exel файл, выполните его загрузку.</p>


                    <div className={styles.img7}>
                        <img src={img13} alt="img7"/>
                    </div>


                    {/*-----------------------*/}
                    <h3 className={styles.title} style={{margin: '50px 0 30px 0'}}>Инструкция по импорту товаров c
                        Rozetka</h3>
                    <p>Для того чтобы импортировать товары с Rozetka marketplace необходимо перейти в раздел “Товары”,
                        который находится в <a href="https://seller.rozetka.com.ua" target='_blank'>личном кабинете
                            Rozetka </a>
                        Для экспорта товаров в Exel нажмите кнопку “Загрузить файл”
                    </p>
                    <div className={styles.img7}>
                        <img src={img11} alt="img7"/>
                    </div>
                    <p>
                        Сохраните файл на вашем ПК. <br/>
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





