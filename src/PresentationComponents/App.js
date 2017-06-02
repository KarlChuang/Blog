import React from 'react';
import styled from 'styled-components';
import StoryList from '../ContainerComponents/StoryList';


const TopBar = styled.div`
  height: 100px;
  min-width: 200px;
  @media (max-width: 400px) {
    text-align: center;
  }
`;

const Title = styled.h1`
  display: inline-block;
  text-align: center;
  margin-left: 30px;
  @media (max-width: 400px) {
    margin-left: 0;
    display: block;
  }
`;

const ButtonStoryChanger = styled.button`
  float: right;
  padding: 0;
  background-color: rgba(0,0,0,0);
  border: 0;
  font-size: 15px;
  display: inline-block;
  margin-right: 12px;
  margin-top: 55px;
  @media (max-width: 400px) {
    width: 15%;
    margin-top: 0;
    margin-left: 5%;
    margin-right: 5%;
    font-size: 12px;
  }
`;

const List = [
  {
    id: 1,
    title: 'haha',
    content: 'fsgsjvsavksavklas fdsafdsjf fdjsavdsan dfsjnakvndsjka dsnjakndsa dsnjfkvsna dsajfndsjk sdafjdsakn sadfjks safnjs fdsja sajk sanj fdjsa njdsa jfdjska jvdsa vdjsa jvdsaj knjvsk jks',
    author: {
      name: 'Mary Haha',
      imgLink: './karl.png',
    },
    time: '2017-6-1',
    like: 1000,
    view: 5432,
    tags: [
      'tag1',
      'tag2',
      'tag3',
    ],
  }, {
    id: 2,
    title: 'haha2',
    content: '2fsgsjvsavksavklas',
    author: {
      name: 'Mary Haha',
      imgLink: './karl.png',
    },
    time: '2017-6-3',
    like: 100,
    view: 532,
    tags: [
      'tag2',
      'tag3',
      'tag4',
    ],
  }, {
    id: 3,
    title: 'haha3',
    content: '3fsgsjvsavksavklas',
    author: {
      name: 'Mary Haha',
      imgLink: './karl.png',
    },
    time: '2017-4-7',
    like: 10,
    view: 52,
    tags: [
      'tag4',
      'tag5',
      'tag6',
    ],
  }, {
    id: 4,
    title: 'haha4',
    content: '4fsgsjvsavksavklas',
    author: {
      name: 'Mary Haha',
      imgLink: './karl.png',
    },
    time: '2017-11-23',
    like: 102,
    view: 1344,
    tags: [
      'tag2',
      'tag3',
      'tag4',
      'tag11',
      'tagsgsfsvfdsvdfsdvfdsvdfs',
      'tagfvdsvfsvfsdvfvfdsvfdffdsgdsgfdsd',
      'tag gfds gfds gfsd gfds gfs',
      'tag8',
      'tag5',
      'tag6',
      'tag7',
      'tag6',
      'tag17',
      'tag9',
    ],
  }, {
    id: 5,
    title: 'haha5',
    content: '5fsgsjvsavksavklas',
    author: {
      name: 'Mary Haha',
      imgLink: './karl.png',
    },
    time: '2017-5-23',
    like: 10042,
    view: 521344,
    tags: [
      'tag1',
      'tag3',
      'tag5',
    ],
  },
];


const App = () => (
  <div>
    <TopBar>
      <Title>
        <div style={{ fontSize: '35px' }}>Blog</div>
        <div style={{ fontSize: '15px' }}>Sharing & Reading</div>
      </Title>
      <ButtonStoryChanger>User</ButtonStoryChanger>
      <ButtonStoryChanger>Write</ButtonStoryChanger>
      <ButtonStoryChanger>Author</ButtonStoryChanger>
      <ButtonStoryChanger>Topics</ButtonStoryChanger>
    </TopBar>
    <StoryList list={List} />
  </div>
);

export default App;
