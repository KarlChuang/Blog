import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/Store';
import AddTodo from './AddTodo';
import VisibilityTodoList from './VisibilityTodoList';
import Footer from './Footer';
import './index.css';

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibilityTodoList />
    <Footer />
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root'),
);
