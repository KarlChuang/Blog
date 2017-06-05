const firstPage = (state = [], action = { type: 'INIT_PAGE' }) => {
  switch (action.type) {
    case 'INIT_PAGE':
      return action.stories;
    default:
      return state;
  }
};

export { firstPage };
