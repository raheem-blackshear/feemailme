// import 'materialize-css/dist/css/materialize.min.css'
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';

// TODO Remove me after testing
// import axios from 'axios';
// window.axios = axios;

// Create redux store: (app reducers, initial state, middlewares)
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  // Wire up store to component hierarchy
  // App is a child component to Provider tag
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);
