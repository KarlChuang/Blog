const initFirstPage = stories => ({
  type: 'INIT_PAGE',
  stories,
});

const readStoryAction = story => ({
  type: 'INIT_STORY',
  story,
});

const initMessages = messages => ({
  type: 'INIT_MESSAGE',
  messages,
});

const addMessage = (id, authorName, authorImgLink, content, time) => ({
  type: 'ADD_MESSAGE',
  newMessage: {
    author: {
      name: encodeURIComponent(authorName),
      imgLink: encodeURIComponent(authorImgLink),
    },
    content: encodeURIComponent(content),
    time,
    id,
  },
});

const handleIdInit = (storyId, messageId) => ({
  type: 'INIT_ID',
  storyId,
  messageId,
});

const handleStoryId = () => ({
  type: 'STORY_ID',
});

const handleMessageId = () => ({
  type: 'MESSAGE_ID',
});

const addTag = tag => ({
  type: 'ADD_TAG',
  newTag: tag,
});

const clearTag = () => ({
  type: 'CLEAR_TAG',
});

const updateTitle = title => ({
  type: 'UPDATE_TITLE',
  title,
});

const updateSubtitle = subtitle => ({
  type: 'UPDATE_SUBTITLE',
  subtitle,
});

const updateContent = content => ({
  type: 'UPDATE_CONTENT',
  content,
});

const clearUpdate = () => ({
  type: 'CLEAR_UPDATE',
});

export {
  initFirstPage,
  readStoryAction,
  initMessages,
  addMessage,
  handleIdInit,
  handleStoryId,
  handleMessageId,
  addTag,
  clearTag,
  updateTitle,
  updateSubtitle,
  updateContent,
  clearUpdate,
};
