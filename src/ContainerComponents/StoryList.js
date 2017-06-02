import React from 'react';
import { connect } from 'react-redux';
import StoryBlock from '../PresentationComponents/StoryBlock';

const StoryList = ({ list }) => (
  <div>
    {list.map(story => (
      <StoryBlock
        key={story.id}
        title={story.title}
        content={story.content}
        author={story.author} time={story.time}
        like={story.like}
        view={story.view}
        tags={story.tags}
      />))
    }
  </div>
);

export default StoryList;
