import React from 'react';
import styled from 'styled-components';
import StoryList from '../ContainerComponents/StoryList';


const TopBar = styled.div`
  height: 100px;
  min-width: 216px;
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
    width: 20%;
    margin-top: 0;
    margin-left: 5%;
    margin-right: 5%;
    font-size: 12px;
  }
`;

class Input extends React.Component {
  render() {
    return (
      <div>
        <textarea ref={(node) => { this.node = node; }} onChange={() => console.log(encodeURIComponent(this.node.value.toString()))} />
      </div>
    );
  }
}

const App = () => (
  <div style={{ backgroundColor: 'rgba(251, 252, 253, 1)' }}>
    <Input />
    <TopBar>
      <Title>
        <div style={{ fontSize: '35px' }}>Blog</div>
        <div style={{ fontSize: '15px' }}>Sharing & Reading</div>
      </Title>
      <ButtonStoryChanger>User</ButtonStoryChanger>
      <ButtonStoryChanger>Most Like</ButtonStoryChanger>
      <ButtonStoryChanger>Most view</ButtonStoryChanger>
    </TopBar>
    <StoryList />
  </div>
);

export default App;
