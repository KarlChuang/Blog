const AddEntry = list => list.concat([0]);

const AddEntry2 = list => [...list, 0];

const RemoveEntry = (list, index) => (
  list
  .slice(0, index)
  .concat(list.slice(index + 1))
);

const RemoveEntry2 = (list, index) => [
  ...list.slice(0, index), ...list.slice(index + 1),
];

const add = (list, index) => [
  ...list.slice(0, index), list[index] + 1, ...list.slice(index + 1),
];


describe('Deal with Array', () => {
  it('Add entry to Array', () => {
    const beforeArray = [];
    const afterArray = AddEntry(beforeArray);
    expect([0]).toEqual(expect.arrayContaining(afterArray));
  });
  it('Add entry to Array use ES6', () => {
    const beforeArray = [];
    const afterArray = AddEntry2(beforeArray);
    expect([0]).toEqual(expect.arrayContaining(afterArray));
  });
  it('Remove entry to Array', () => {
    const beforeArray = [1, 2, 3];
    const afterArray = RemoveEntry(beforeArray, 1);
    expect([1, 3]).toEqual(expect.arrayContaining(afterArray));
  });
  it('Remove entry to Array use ES6', () => {
    const beforeArray = [1, 2, 3];
    const afterArray = RemoveEntry2(beforeArray, 1);
    expect([1, 3]).toEqual(expect.arrayContaining(afterArray));
  });
  it('The Array[index]++', () => {
    const before = [1, 2, 3];
    const after = add(before, 1);
    expect([1, 3, 3]).toEqual(expect.arrayContaining(after));
  });
});

const addThingToObject = obj => (
  Object.assign({}, obj, {
    complete: !obj.complete,
  })
);

describe('Deal with object', () => {
  it('Add thing to object', () => {
    const before = {
      name: 'Karl',
      home: 'Yilan',
      age: 19,
      complete: false,
    };
    const after = {
      name: 'Karl',
      home: 'Yilan',
      age: 19,
      complete: true,
    };
    expect(
      addThingToObject(before),
    ).toEqual(after);
  });
});

//Action creator
const AddTodoActionCreator = (id, text) => ({
  type: 'ADD_TODO',
  id: id,
  text: text,
  completed: false,
});

const ToggleTodosActionCreator = (Id) => ({
  type: 'TOGGLE_TODO',
  id: Id,
});

// reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: action.completed,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) => {
        if (todo.id !== action.id) {
          return todo;
        }
        return {
          id: todo.id,
          text: todo.text,
          completed: !todo.completed,
        };
      });
    default:
      return state;
  }
};

describe('Deal with reducer', () => {
  it ('ADD_TODO with reducer', () => {
    const todoBefore = [];
    const todoAfter = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false,
      },
    ];
    expect(todos(todoBefore, AddTodoActionCreator(0, 'Learn Redux', false))).toEqual(todoAfter);
  });
  it ('TOGGLE_TODO with reducer', () => {
    const todoBefore = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false,
      },
      {
        id: 1,
        text: 'Learn React-Redux',
        completed: false,
      },
    ];
    const todoAfter = [
      {
        id: 0,
        text: 'Learn Redux',
        completed: false,
      },
      {
        id: 1,
        text: 'Learn React-Redux',
        completed: true,
      },
    ];
    expect(todos(todoBefore, ToggleTodosActionCreator(1))).toEqual(todoAfter);
  });
});
