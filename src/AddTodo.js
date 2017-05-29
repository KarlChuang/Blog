import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/ActionCreator';

let todoID = 0;

const AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input type="text" ref={(node) => { input = node; }} />
      <button
        onClick={() => {
          dispatch(addTodo(input.value, todoID));
          todoID += 1;
          input.value = '';
        }}
      >
        Add todo
      </button>
    </div>
  );
};

export default connect()(AddTodo);
