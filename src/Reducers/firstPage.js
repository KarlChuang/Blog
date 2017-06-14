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

const newStoryTags = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TAG':
      return [...state, action.newTag];
    case 'CLEAR_TAG':
      return [];
    default:
      return state;
  }
};

const newStoryDefault = {
  title: '',
  authorId: 0,
  subtitle: '',
  content: '',
  tags: [],
};

const newStory = (state = newStoryDefault, action) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return { ...state, title: action.title };
    case 'UPDATE_SUBTITLE':
      return { ...state, subtitle: action.subtitle };
    case 'UPDATE_CONTENT':
      return { ...state, content: action.content };
    case 'CLEAR_UPDATE':
      return newStoryDefault;
    default:
      return state;
  }
};

export { firstPage, readStory, MessageReducer, handleId, newStoryTags, newStory };
