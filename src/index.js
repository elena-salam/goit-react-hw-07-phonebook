import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js'
import {Provider} from 'react-redux';
import store from './redux/store.js';
import './base.css';


ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));