const firstPage = (state = [], action = { type: 'INIT_PAGE' }) => {
  switch (action.type) {
    case 'INIT_PAGE':
      return action.stories;
    default:
      return state;
  }
};

const defaultStory = {
  title: '',
  subtitle: '',
  content: '',
  tags: [],
  time: '',
  author: {
    name: '',
    imgLink: '',
  },
  like: 0,
  view: 0,
};

const readStory = (state = defaultStory, action) => {
  switch (action.type) {
    case 'INIT_STORY':
      return action.story;
    default:
      return state;
  }
};

const MessageReducer = (state = [], action) => {
  const newState = state;
  switch (action.type) {
    case 'INIT_MESSAGE':
      return action.messages;
    case 'ADD_MESSAGE':
      newState.push(action.newMessage);
      return newState;
    default:
      return state;
  }
};

const handleId = (state = { storyId: 0, messageId: 0 }, action) => {
  const { storyId, messageId } = state;
  switch (action.type) {
    case 'INIT_ID':
      return {
        storyId: action.storyId,
        messageId: action.messageId,
      };
    case 'STORY_ID':
      return {
        storyId: storyId + 1,
        messageId: action.messageId,
      };
    case 'MESSAGE_ID':
      return {
        storyId: state.storyId,
        messageId: messageId + 1,
      };
    default:
      return state;
  }
};

export { firstPage, readStory, MessageReducer, handleId };
