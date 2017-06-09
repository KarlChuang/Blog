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

export { firstPage, readStory };
