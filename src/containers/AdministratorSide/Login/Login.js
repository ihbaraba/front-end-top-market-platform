import React, {Component} from 'react';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    render() {
        return (
            <form action="">
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email"/>
                </div>

                <div>
                    <label htmlFor="">Password</label>
                    <input type="password"/>
                </div>
            </form>
        )
    }
}

export default Login;