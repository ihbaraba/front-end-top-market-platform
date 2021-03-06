import React, {Component} from 'react'
import { Collapse } from 'antd';
import styles from './KnowledgeBase.module.css'
import 'antd/dist/antd.css';


const Panel = Collapse.Panel;

function callback(key) {
    console.log(key);
}




class KnowledgeBase extends Component {
    render() {
        return (
            <div className='page'>
                <h3 className='page-title'>База знаний (Находится в разработке)</h3>

                <div className={styles.search}>
                    <input type="search" placeholder="Search" />
                    <input type="submit" value=" "/>
                </div>
                <Collapse accordion className={styles}> 
                    <Panel header="Что такое Lorem Ipsum?" key="1">
                        <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
                            Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                            В то время некий безымянный печатник создал большую коллекцию размеров и форм
                            шрифтов, используя Lorem Ipsum для распечатки образцов.
                            Lorem Ipsum не только успешно пережил без заметных изменений пять веков,
                            но и перешагнул в электронный дизайн</p>
                    </Panel>
                    <Panel header="Что такое Lorem Ipsum?" key="2">
                        <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
                            Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                            В то время некий безымянный печатник создал большую коллекцию размеров и форм
                            шрифтов, используя Lorem Ipsum для распечатки образцов.
                            Lorem Ipsum не только успешно пережил без заметных изменений пять веков,
                            но и перешагнул в электронный дизайн</p>
                    </Panel>
                    <Panel header="Что такое Lorem Ipsum?" key="3">
                        <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
                        Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                        В то время некий безымянный печатник создал большую коллекцию размеров и форм
                        шрифтов, используя Lorem Ipsum для распечатки образцов.
                        Lorem Ipsum не только успешно пережил без заметных изменений пять веков,
                        но и перешагнул в электронный дизайн</p>
                    </Panel>
                    <Panel header="Что такое Lorem Ipsum?" key="4">
                        <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
                            Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                            В то время некий безымянный печатник создал большую коллекцию размеров и форм
                            шрифтов, используя Lorem Ipsum для распечатки образцов.
                            Lorem Ipsum не только успешно пережил без заметных изменений пять веков,
                            но и перешагнул в электронный дизайн</p>
                    </Panel>
                    <Panel header="Что такое Lorem Ipsum?" key="5">
                        <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
                            Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                            В то время некий безымянный печатник создал большую коллекцию размеров и форм
                            шрифтов, используя Lorem Ipsum для распечатки образцов.
                            Lorem Ipsum не только успешно пережил без заметных изменений пять веков,
                            но и перешагнул в электронный дизайн</p>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default KnowledgeBase;





