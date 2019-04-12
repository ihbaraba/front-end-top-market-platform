import React, {Component} from 'react';
import Routes from "./routes";
import './App.css';
import 'antd/dist/antd.css';
import 'axios-progress-bar/dist/nprogress.css';

class App extends Component {
    render() {
        return (
            <div className="App">
               <Routes/>
            </div>
        );
    }
}

export default App;





