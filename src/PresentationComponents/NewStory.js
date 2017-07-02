import React, { Component } from 'react';
import styled from 'styled-components';

const NewStoryPage = styled.div`
  max-width: 750px;
  margin: auto;
  padding-top: 50px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const textareaStyle = {
  fontSize: '25px',
  width: '100%',
  height: '32px',
  paddingTop: '8px',
  paddingLeft: '10px',
  border: '0',
  resize: 'none',
};

const textareaStyle2 = {
  ...textareaStyle,
  fontSize: '17px',
  height: '26px',
};

const textareaStyle3 = {
  ...textareaStyle2,
  height: '400px',
  marginTop: '20px',
};

const textareaStyle4 = {
  ...textareaStyle2,
  marginTop: '20px',
  fontSize: '15px',
  width: '150px',
  height: '20px',
  paddingTop: '5px',
};

const AddTag = styled.button`
  margin-left: 10px;
  width: 30px;
  height: 30px;
  vertical-align: top;
  border: 0;
  margin-top: 20px;
  border-radius: 50%;
  background-color: rgba(119, 118, 118, 0.32);
  font-size: 20px;
  font-weight: 500;
  color: white;
  outline: none;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(49, 49, 49, 0.62);
    transition: background-color 0.3s;
  }
`;

const SubmitButton = styled.button`
  width: 200px;
  height: 30px;
  border: 0;
  border-radius: 10px;
  margin-top: 20px;
  float: right;
  color: white;
  font-size: 17px;
  font-weight: 600;
  outline: none;
  background-color: rgba(119, 118, 118, 0.32);
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(49, 49, 49, 0.62);
    transition: background-color 0.3s;
  }
`;

const Tag = styled.div`
  max-width: 150px;
  display: inline-block;
  font-size: 12px;
  margin: 5px;
  background-color: rgba(0, 150, 136, 0.28);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 5px;
  padding-right: 5px;
`;

class NewStory extends Component {
  render() {
    const {
      tags,
      addTag,
      data,
      handleTitleChange,
      handleSubtitleChange,
      handleContentChange,
      handleSubmit,
    } = this.props;
    return (
      <NewStoryPage>
        <div>
          <textarea
            onChange={e => handleTitleChange(e.target.value)}
            value={data.title}
            style={textareaStyle}
            placeholder="Title"
          />
        </div>
        <div>
          <textarea
            onChange={e => handleSubtitleChange(e.target.value)}
            value={data.subtitle}
            style={textareaStyle2}
            placeholder="Subtitle"
          />
        </div>
        <div>
          <textarea
            onChange={e => handleContentChange(e.target.value)}
            value={data.content}
            style={textareaStyle3}
            placeholder="Content"
          />
        </div>
        <div>
          <div style={{ display: 'inline-block' }}>
            { tags.map(tag => <Tag key={tag}>{tag}</Tag>) }
          </div>
          <textarea
            ref={(input) => { this.tagInput = input; }}
            style={textareaStyle4}
            placeholder="Tag"
          />
          <AddTag
            onClick={() => {
              if (this.tagInput.value) {
                addTag(this.tagInput.value);
                this.tagInput.value = '';
              }
            }}
          >+</AddTag>
        </div>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </NewStoryPage>
    );
  }
}

export default NewStory;
