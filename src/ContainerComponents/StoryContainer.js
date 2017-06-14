import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { BrowserRouter, Route } from 'react-router-dom';
import StoryPage from '../PresentationComponents/StoryPage';
import { readStoryAction, initMessages, addMessage, handleIdInit, handleMessageId } from '../ActionCreators/ActionCreator';

const decodeData = (story) => {
  const newStory = story;
  newStory.author.name = decodeURIComponent(newStory.author.name);
  newStory.author.imgLink = decodeURIComponent(newStory.author.imgLink);
  newStory.title = decodeURIComponent(newStory.title);
  newStory.subtitle = decodeURIComponent(newStory.subtitle);
  newStory.content = decodeURIComponent(newStory.content);
  newStory.tags = story.tags.map(tag => decodeURIComponent(tag));
  newStory.time = newStory.time.split('T')[0];
  return newStory;
};

const decodeMessages = (mes) => {
  const newMes = mes.map((message) => {
    const newMessage = message;
    newMessage.author.name = decodeURIComponent(newMessage.author.name);
    newMessage.author.imgLink = decodeURIComponent(newMessage.author.imgLink);
    newMessage.content = decodeURIComponent(newMessage.content);
    newMessage.time = newMessage.time.split('.')[0].replace('T', ' ');
    return newMessage;
  });
  return newMes;
};

const StoryContainer = ({
  story,
  initPage,
  handleId,
  messages,
  initMessageBoard,
  inputMessage,
}) => {
  const decodeStory = decodeData(story);
  const decodeMessage = decodeMessages(messages);
  return (
    <BrowserRouter>
      <Route
        path="/story/:id"
        render={({ match }) => (
          <StoryPage
            id={match.params.id}
            initPage={initPage}
            story={decodeStory}
            messages={decodeMessage}
            initMessageBoard={initMessageBoard}
            addMessage={inputMessage}
            handleId={handleId}
          />
        )}
      />
    </BrowserRouter>
  );
};

StoryContainer.propTypes = {
  initPage: React.PropTypes.func.isRequired,
  story: React.PropTypes.instanceOf({
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    author: React.PropTypes.instanceOf({
      name: React.PropTypes.string,
      imgLink: React.PropTypes.string,
    }).isRequired,
    time: React.PropTypes.string.isRequired,
    likeNum: React.PropTypes.number.isRequired,
    view: React.PropTypes.number.isRequired,
    tags: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

const mapStateToLinkProps = state => ({
  story: state.story,
  messages: state.messages,
  handleId: state.id,
});

const mapDispatchToLinkProps = dispatch => ({
  initPage: (id) => {
    fetch(`/api/story/${id}`).then(response =>
      response.json(),
    ).then((json) => {
      dispatch(readStoryAction(json));
    });
    fetch('/api/handleid').then(response =>
      response.json(),
    ).then((json) => {
      dispatch(handleIdInit(json.storyId, json.messageId));
    });
  },
  initMessageBoard: (storyId) => {
    fetch(`/api/messages/${storyId}`).then(response =>
      response.json(),
    ).then((json) => {
      dispatch(initMessages(json));
    });
  },
  inputMessage: (id, authorName, authorImgLink, content, storyId) => {
    if (content) {
      const now = new Date();
      const time = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      dispatch(addMessage(id, authorName, authorImgLink, content, time));
      dispatch(handleMessageId());
      fetch('/api/addmessage', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          author: {
            Name: encodeURIComponent(authorName),
            imgLink: encodeURIComponent(authorImgLink),
          },
          content: encodeURIComponent(content),
          time,
          replyToStory: storyId,
        }),
      });
    }
  },
});

export default connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps,
)(StoryContainer);
