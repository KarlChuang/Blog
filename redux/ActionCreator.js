const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  visibilityFilter: filter,
});

const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});

const addTodo = (value, id) => ({
  type: 'ADD_TODO',
  text: value,
  id,
  completed: false,
});

export { setVisibilityFilter, toggleTodo, addTodo };
