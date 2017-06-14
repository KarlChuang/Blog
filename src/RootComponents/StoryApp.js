import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { readStory, MessageReducer, handleId } from '../Reducers/firstPage';
import StoryContainer from '../ContainerComponents/StoryContainer';

const allReducer = combineReducers({
  story: readStory,
  messages: MessageReducer,
  id: handleId,
});
const store = createStore(allReducer);

ReactDOM.render(
  <Provider store={store}>
    <StoryContainer />
  </Provider>,
  document.getElementById('root'),
);
