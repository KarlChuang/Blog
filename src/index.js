import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import './index.css';
import { todoReducer, filterReducer } from './Reducers/Reducer';
import App from './PresentationComponents/App';

const allReducer = combineReducers({ todos: todoReducer, visibilityFilter: filterReducer });
const store = createStore(allReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
