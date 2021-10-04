import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Reduc Config
import { Provider } from 'react-redux'; // untuk menghungkan antara action, reducer dan component
import { createStore } from 'redux'; // untuk membuat global store untuk reducer
import { Reducers } from './reducers'

const storeReducer = createStore(Reducers)

ReactDOM.render(
  <Provider store={storeReducer}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
