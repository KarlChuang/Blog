const initFirstPage = stories => ({
  type: 'INIT_PAGE',
  stories,
});

const readStoryAction = story => ({
  type: 'INIT_STORY',
  story,
});

export { initFirstPage, readStoryAction };
