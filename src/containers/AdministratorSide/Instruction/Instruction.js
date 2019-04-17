import React, {Component} from 'react'
import styles from './Instruction.module.css'
import  ava  from "../../../img/ava.png";
import  img1  from "../../../img/iphone.png";
import  img2  from "../../../img/iphone.png";
import  img3  from "../../../img/iphone.png";
import  img4  from "../../../img/iphone.png";
import  img5  from "../../../img/iphone.png";
import  img6  from "../../../img/iphone.png";
import  img7  from "../../../img/iphone.png";

class Instruction extends Component {


    render() {

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
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/KCCqqPqDqSY" frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                    </div>
                    <p>
                        Зайдите во вкладку «Все товары». Здесь находится полный каталог товаров поставщиков . Для вашего удобства
                        вы можете фильтровать их по разным критериям (артикул, наличие, бренд, название, категория товара, розничная
                        цена, топ-товары/товары со скидкой), а ещё выбрать интересующую вас категорию с помощью панели слева. Обратите внимание,
                        что также вы можете выбрать товары, которые были добавлены за определённый период или за последнюю неделю (Отобразить новинки).
                    </p>
                    <div className={styles.img1}>
                        <img src={img1} alt="img1"/>
                    </div>
                    <p>Полную информацию о товаре (фотографии, описание, опции) возможно увидеть, нажав на товар</p>
                    <div className={styles.img2}>
                        <img src={img2} alt="img2"/>
                    </div>
                    <p>После того как вы определились с категорией или определенными товарами, выделите их с помощью галочки
                        (поштучно или массово). Максимальное количество отображаемых товаров на одной странице,
                        которые можно выбрать, не более 500.</p>
                    <p>Как только выделите товары, у вас активируется кнопка «Добавить в Мои товары». Нажмите её и все выделенные
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
                </div>
            </div>
        );
    }
}

export default Instruction;





