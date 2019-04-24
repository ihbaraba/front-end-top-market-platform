import React, {Component} from 'react';
import Header from "./components/Header/Header";



class UserSide extends Component {

    render() {
        return (
            <div >
                <Header/>

                <div className='size-container content'>
                    {this.props.children}
                </div>

            </div>
        );
    }
}

export default UserSide;




