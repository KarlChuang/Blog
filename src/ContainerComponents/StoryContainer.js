import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { BrowserRouter, Route } from 'react-router-dom';
import StoryPage from '../PresentationComponents/StoryPage';
import { readStoryAction } from '../ActionCreators/ActionCreator';

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

const StoryContainer = ({ story, initPage }) => {
  const decodeStory = decodeData(story);
  return (
    <BrowserRouter>
      <Route
        path="/story/:id"
        render={({ match }) => (
          <StoryPage
            id={match.params.id}
            initPage={initPage}
            story={decodeStory}
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
});

const mapDispatchToLinkProps = dispatch => ({
  initPage: (id) => {
    fetch(`/api/story/${id}`).then(response =>
      response.json(),
    ).then((json) => {
      dispatch(readStoryAction(json));
    });
  },
});

export default connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps,
)(StoryContainer);
