import React, {Component} from 'react';
import Header from "./components/Header/Header";
import NavBar from './components/NavBar/NavBar';



class AdministratorSide extends Component {

    render() {
        return (
            <div className="admin-side">
               <Header/>

                <div className='container wrap'>
                    <NavBar/>

                    <div className='admin-content'>
                        {this.props.children}
                    </div>
                </div>

            </div>
        );
    }
}

export default AdministratorSide;
