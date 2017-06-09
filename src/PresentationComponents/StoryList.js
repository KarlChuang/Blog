import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.h1`
  font-size: 30px;
  font-weight: 900;
  margin: 0;
  overflow-wrap: break-word;
  hyphens: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  margin-bottom: 15px;
`;

const Content = styled.h2`
  font-size: 20px;
  color: rgb(115, 115, 115);
  margin: 0;
  height: 33px;
  overflow-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: pre-wrap;
  margin-bottom: 5px;
`;

const Image = styled.img`
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 10px;
`;

const Block = styled.div`
  font-family: cursive;
  width: 84%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 1%;
  padding-right: 3%;
  padding-left: 3%;
  @media (max-width: 600px) {
    width: 94%;
    margin-left: 0;
    margin-right: 0;
  }
`;

const Detail = styled.div`
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
  line-height: 18px;
  @media (max-width: 600px) {
    display: block;
  }
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

const Tags = styled.div`
  width: 13%;
  float: right;
  font-size: 13px;
  margin-top: 10px;
  margin-left: 2%;
`;

const TagButton = styled.button`
  max-width: 100%;
  display: block;
  border: 0;
  font-size: 12px;
  margin: 5px;
  background-color: rgba(0, 150, 136, 0.28);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 5px;
`;

const TagTitle = styled.div`
  font-family: cursive;
  width: 84%;
  margin-left: 8%;
  margin-right: 8%;
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 30px;
  font-weight: 700;
  @media (max-width: 600px) {
    width: 100%;
    margin-left: 20px;
    margin-right: 0;
    margin-top: 40px;
  }
`;

const mapArray = (array) => {
  const mapTags = [];
  for (let i = 0; i < 5 && i < array.length; i += 1) {
    mapTags[i] = (<Link to={`/tag/${array[i]}/`}><TagButton key={array[i]}>{array[i]}</TagButton></Link>);
  }
  return mapTags;
};

const StoryBlock = ({ id, title, content, author, time, like, view, tags }) => (
  <Block>
    <div style={{ width: '84%', display: 'inline-block' }}>
      <a href={`/story/${id}`} style={{ color: 'black', textDecoration: 'none' }}>
        <Title>
          {title}
        </Title>
        <Content>
          {content}
        </Content>
      </a>
      <Image src={author.imgLink} alt="" />
      <div style={{ display: 'inline-block' }}>
        <Detail style={{ display: 'block' }}>
          {author.name}
        </Detail>
        <Detail style={{ width: '100px', display: 'block' }}>
          {time}
        </Detail>
      </div>
      <ButtomBar>
        <Detail2>
          like {like}
        </Detail2>
        <Detail2>
          view {view}
        </Detail2>
      </ButtomBar>
    </div>
    <Tags>
      { mapArray(tags) }
    </Tags>
  </Block>
);
StoryBlock.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  author: React.PropTypes.instanceOf({
    name: React.PropTypes.string,
    imgLink: React.PropTypes.string,
  }).isRequired,
  time: React.PropTypes.string.isRequired,
  like: React.PropTypes.number.isRequired,
  view: React.PropTypes.number.isRequired,
  tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

const StoryList = ({ list, tag }) => (
  <div>
    {
      (tag) ? (
        <TagTitle>{tag}</TagTitle>
      ) : null
    }
    {
      list.map(story => (
        <StoryBlock
          key={story.id}
          id={story.id}
          title={story.title}
          content={story.subtitle}
          author={story.author} time={story.time}
          like={story.likeNum}
          view={story.view}
          tags={story.tags}
        />
      ))
    }
  </div>
);
StoryList.defaultProps = {
  tag: '',
};
StoryList.propTypes = {
  tag: React.PropTypes.string,
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

export default StoryList;
