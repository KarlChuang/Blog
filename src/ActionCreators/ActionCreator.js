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

export {
  initFirstPage,
  readStoryAction,
  initMessages,
  addMessage,
  handleIdInit,
  handleStoryId,
  handleMessageId,
};
