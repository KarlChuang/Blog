import React, { Component } from 'react';
import styled from 'styled-components';
import TopBar from '../PresentationComponents/TopBar';
import MessageList from '../PresentationComponents/MessageList';

const Story = styled.div`
  width: 100%;
  background-color: white;
  overflow-wrap: break-word;
  -webkit-box-orient: vertical;
  hyphens: auto;
  white-space: pre-wrap;
  font-family: cursive;
`;

const Title = styled.h1`
  max-width: 750px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 50px;
  font-weight: 900;
  @media (max-width: 800px) {
    font-size: 35px;
    margin-left: 30px;
    margin-right: 30px;
  }
`;

const Subtitle = styled.h3`
  max-width: 750px;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 30px;
  color: rgb(160, 144, 144);
  @media (max-width: 800px) {
    font-size: 21px;
    margin-left: 30px;
    margin-right: 30px;
  }
`;

const Content = styled.div`
  margin-top: 10px;
  max-width: 750px;
  margin: auto;
  font-size: 23px;
  @media (max-width: 800px) {
    font-size: 20px;
    margin-left: 30px;
    margin-right: 30px;
  }
`;

const TagButton = styled.button`
  border: 0;
  font-size: 12px;
  margin: 5px;
  background-color: rgba(0, 150, 136, 0.28);
`;

const Detail = styled.div`
  display: inline-block;
  margin-right: 10px;
  font-size: 18px;
  margin-bottom: 8px;
  line-height: 18px;
  @media (max-width: 400px) {
    display: block;
  }
`;

const Image = styled.img`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;

const Tags = styled(Content)`
  margin-top: 30px;
`;

const Author = styled(Content)`
  margin-top: 30px;
  padding-bottom: 50px;
`;

const Detail2 = styled(Detail)`
  width: 80px;
  @media (max-width: 600px) {
    display: inline-block;
  }
`;

const ButtomBar = styled.div`
  display: inline-block;
  @media (max-width: 600px) {
    width: 100%;
    text-align: center;
    display: block;
  }
`;

const MessegeBoard = styled.div`
  width: 100%;
  padding-bottom: 50px;
  background-color: rgb(214, 219, 222);
`;

class StoryPage extends Component {
  constructor(props) {
    super(props);
    this.props.initPage(this.props.id);
    this.props.initMessageBoard(this.props.id);
  }
  render() {
    const id = Number(this.props.id);
    const story = this.props.story;
    const messages = this.props.messages;
    const addMessage = this.props.addMessage;
    const handleId = this.props.handleId;
    console.log(handleId.messageId);
    return (
      <Story>
        <TopBar type="story" />
        <Title>{story.title}</Title>
        <Subtitle>{story.subtitle}</Subtitle>
        <Content>{story.content}</Content>
        <Tags>
          {story.tags.map(tag => <a href={`/tag/${tag}`}><TagButton key={tag}>{tag}</TagButton></a>)}
        </Tags>
        <Author>
          <Image src={story.author.imgLink} alt="" />
          <div style={{ display: 'inline-block' }}>
            <Detail style={{ display: 'block' }}>
              {story.author.name}
            </Detail>
            <Detail style={{ width: '100px', display: 'block' }}>
              {story.time}
            </Detail>
          </div>
          <ButtomBar>
            <Detail2>
              like {story.likeNum}
            </Detail2>
            <Detail2>
              view {story.view}
            </Detail2>
          </ButtomBar>
        </Author>
        <MessegeBoard>
          <MessageList
            messageData={messages}
            handleNew={newMessage => addMessage(handleId.messageId, 'Karl Chuang', './karl.png', newMessage, id)}
          />
        </MessegeBoard>
      </Story>
    );
  }
}

StoryPage.propTypes = {
  initPage: React.PropTypes.func.isRequired,
  id: React.PropTypes.number.isRequired,
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

export default StoryPage;
