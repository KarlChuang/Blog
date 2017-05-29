import { createStore, combineReducers } from 'redux';
import { todoReducer, filterReducer } from './Reducer';

const allReducer = combineReducers({ todos: todoReducer, visibilityFilter: filterReducer });
const store = createStore(allReducer);

export default store;
