import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StoryList from '../PresentationComponents/StoryList';
import {
  initFirstPage,
  handleIdInit,
  handleStoryId,
  addTag,
  clearTag,
  updateTitle,
  updateSubtitle,
  updateContent,
  clearUpdate,
} from '../ActionCreators/ActionCreator';
import TopBar from '../PresentationComponents/TopBar';
import NewStory from '../PresentationComponents/NewStory';

const decodeData = (list) => {
  const newList = list.map((story) => {
    const newStory = story;
    newStory.author.name = decodeURIComponent(newStory.author.name);
    newStory.title = decodeURIComponent(newStory.title);
    newStory.subtitle = decodeURIComponent(newStory.subtitle);
    newStory.tags = story.tags.map(tag => decodeURIComponent(tag));
    newStory.time = newStory.time.split('T')[0];
    return newStory;
  });
  return newList;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.props.initPage();
  }
  render() {
    const list = decodeData(this.props.list);
    const id = this.props.id;
    const addNewStoryTag = this.props.addNewStoryTag;
    const newStoryTags = this.props.newStoryTags;
    const handleNewStoryTitleChange = this.props.handleNewStoryTitleChange;
    const handleNewStorySubtitleChange = this.props.handleNewStorySubtitleChange;
    const handleNewStoryContentChange = this.props.handleNewStoryContentChange;
    const newStory = this.props.newStory;
    const submitNewStory = this.props.submitNewStory;
    return (
      <BrowserRouter>
        <div>
          {/* <Input /> */}
          <TopBar />
          <Switch>
            <Route
              exact
              path="/newstory"
              render={() => (
                <NewStory
                  addTag={addNewStoryTag}
                  data={newStory}
                  tags={newStoryTags}
                  handleTitleChange={handleNewStoryTitleChange}
                  handleSubtitleChange={handleNewStorySubtitleChange}
                  handleContentChange={handleNewStoryContentChange}
                  handleSubmit={() =>
                    submitNewStory(
                      id.storyId,
                      newStory.title,
                      newStory.subtitle,
                      newStory.content,
                      1,
                      newStoryTags,
                    )
                    //  handleSubmit(title, subtitle, content, authorId, tags)
                  }
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => <StoryList list={list} onClickStory={this.props.onClickStory} />}
            />
            <Route
              path="/like"
              render={() => {
                const newList = list.sort((a, b) => {
                  if (a.likeNum > b.likeNum) {
                    return -1;
                  }
                  return 1;
                });
                return (
                  <StoryList
                    list={newList}
                    onClickStory={this.props.onClickStory}
                    tag="Most Like"
                  />
                );
              }}
            />
            <Route
              path="/view"
              render={() => {
                const newList = list.sort((a, b) => {
                  if (a.view > b.view) {
                    return -1;
                  }
                  return 1;
                });
                return (
                  <StoryList list={newList} tag="Most View" />
                );
              }}
            />
            <Route
              path="/tag/:name"
              render={({ match }) => {
                const newList = list.filter(entry => (
                  entry.tags.filter(tag => (tag === match.params.name)).length !== 0
                ));
                return (
                  <div>
                    <StoryList list={newList} tag={match.params.name} />
                  </div>
                );
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
App.propTypes = {
  initPage: React.PropTypes.func.isRequired,
  list: React.PropTypes.instanceOf({
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string.isRequired,
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
  list: state.storyList,
  id: state.id,
  newStoryTags: state.newStoryTags,
  newStory: state.newStory,
});

const mapDispatchToLinkProps = dispatch => ({
  initPage: () => {
    fetch('/api/handleid').then(response =>
      response.json(),
    ).then((json) => {
      dispatch(handleIdInit(json.storyId, json.messageId));
    });
    fetch('/api/storyList').then(response =>
      response.json(),
    ).then((json) => {
      dispatch(initFirstPage(json));
    });
  },
  addNewStoryTag: (tag) => {
    dispatch(addTag(tag));
  },
  handleNewStoryTitleChange: (title) => {
    dispatch(updateTitle(title));
  },
  handleNewStorySubtitleChange: (subtitle) => {
    dispatch(updateSubtitle(subtitle));
  },
  handleNewStoryContentChange: (content) => {
    dispatch(updateContent(content));
  },
  submitNewStory: (id, title, subtitle, content, authorId, tags) => {
    if (title) {
      const now = new Date();
      const time = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      fetch('/api/addStory', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title: encodeURIComponent(title),
          subtitle: encodeURIComponent(subtitle),
          content: encodeURIComponent(content),
          authorId,
          tags: tags.map(tag => encodeURIComponent(tag)),
          time,
        }),
      }).then(() => {
        dispatch(handleStoryId());
        dispatch(clearTag());
        dispatch(clearUpdate());
        window.location.assign('/');
      });
    }
  },
});

export default connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps,
)(App);
