import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { firstPage } from '../Reducers/firstPage';
import App from '../ContainerComponents/App';

const allReducer = combineReducers({ storyList: firstPage });
const store = createStore(allReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
