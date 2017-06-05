import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoryBlock from '../PresentationComponents/StoryBlock';
import { initFirstPage } from '../ActionCreators/ActionCreator';

class StoryList extends Component {
  constructor(props) {
    super(props);
    this.props.initPage();
  }
  render() {
    return (
      <div>
        {
          this.props.list.map((story) => {
            const author = story.author;
            author.name = decodeURIComponent(author.name);
            author.imgLink = decodeURIComponent(author.imgLink);
            const tags = story.tags.map(tag => decodeURIComponent(tag.name));
            return (
              <StoryBlock
                key={story.id}
                title={decodeURIComponent(story.title)}
                content={decodeURIComponent(story.subtitle)}
                author={author} time={story.time.split('T')[0]}
                like={story.likeNum}
                view={story.view}
                tags={tags}
              />
            );
          })
        }
      </div>
    );
  }
}

const mapStateToLinkProps = state => ({
  list: state.storyList,
});

const mapDispatchToLinkProps = dispatch => ({
  initPage: () => {
    fetch('/api/stories').then(response =>
      response.json(),
    ).then((json) => {
      // console.log(json);
      dispatch(initFirstPage(json));
    });
  },
});

export default connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps,
)(StoryList);
