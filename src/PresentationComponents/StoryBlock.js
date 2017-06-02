import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 30px;
  margin: 0;
`;

const Content = styled.h2`
  font-size: 18px;
  color: rgb(115, 115, 115);
  margin: 0;
  height: 50px;
  word-wrap: break-word;
  hyphens: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  text-overflow: -o-ellipsis-lastline;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

const Image = styled.img`
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-right: 10px;
`;

const Block = styled.div`
  width: 84%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  background-color: rgb(241, 240, 231);
  padding: 1%;
  padding-right: 3%;
  padding-left: 3%;
  @media (max-width: 400px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;

const Detail = styled.div`
  display: inline-block;
  margin-right: 10px;
  font-size: 13px;
  line-height: 18px;
  @media (max-width: 400px) {
    display: block;
  }
`;

const Detail2 = styled(Detail)`
  width: 75px;
  @media (max-width: 500px) {
    width: 65px;
    display: inline-block;
  }
`;

const ButtomBar = styled.div`
  display: inline-block;
  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
    display: block;
  }
`;

const Tags = styled.div`
  width: 15%;
  float: right;
  font-size: 13px;
  margin-top: 10px;
`;

const Tag = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 2px;
`;

const mapArray = (array) => {
  const mapTags = [];
  for (let i = 0; i < 6 && i < array.length; i += 1) {
    mapTags[i] = (<Tag key={array[i]}>#{array[i]}</Tag>);
  }
  return mapTags;
};

const StoryBlock = ({ title, content, author, time, like, view, tags }) => (
  <Block>
    <div style={{ width: '84%', display: 'inline-block' }}>
      <div>
        <Title>
          {title}
        </Title>
        <Content>
          {content}
        </Content>
      </div>
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

export default StoryBlock;
