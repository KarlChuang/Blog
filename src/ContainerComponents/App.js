import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StoryList from '../PresentationComponents/StoryList';
import { initFirstPage } from '../ActionCreators/ActionCreator';
import TopBar from '../PresentationComponents/TopBar';

/*
class Input extends React.Component {
  render() {
    return (
      <div>
        <textarea ref={(node) => { this.node = node; }} onChange={() => console.log(encodeURIComponent(this.node.value.toString()))} />
      </div>
    );
  }
}
*/

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
    return (
      <BrowserRouter>
        <div>
          {/* <Input /> */}
          <TopBar />
          <Switch>
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
                  <StoryList list={newList} onClickStory={this.props.onClickStory} tag="Most Like" />
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
});

const mapDispatchToLinkProps = dispatch => ({
  initPage: () => {
    fetch('/api/storyList').then(response =>
      response.json(),
    ).then((json) => {
      dispatch(initFirstPage(json));
    });
  },
});

export default connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps,
)(App);
