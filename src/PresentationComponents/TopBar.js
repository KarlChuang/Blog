import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TopBarDiv = styled.div`
  font-family: cursive;
  height: 100px;
  min-width: 216px;
  @media (max-width: 600px) {
    text-align: center;
    margin-bottom: 35px;
  }
`;

const Title = styled.h1`
  display: inline-block;
  text-align: center;
  margin-left: 30px;
  @media (max-width: 600px) {
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
  @media (max-width: 600px) {
    width: 21%;
    margin-top: 0;
    margin-bottom: 10px;
    margin-left: 2%;
    margin-right: 2%;
    font-size: 12px;
  }
`;


const TopBar = ({ type }) => (
  <TopBarDiv>
    <Title>
      <a style={{ textDecoration: 'none', color: 'black' }} href="/">
        <div style={{ fontSize: '35px' }}>Blog</div>
        <div style={{ fontSize: '15px' }}>Sharing & Reading</div>
      </a>
    </Title>
    <ButtonStoryChanger>User</ButtonStoryChanger>
    { /*
    {(type === 'story') ? null : (<ButtonStoryChanger><Link style={{ textDecoration: 'initial' }} to="/like">Most like</Link></ButtonStoryChanger>)}
    {(type === 'story') ? null : (<ButtonStoryChanger><Link style={{ textDecoration: 'initial' }} to="/view">Most view</Link></ButtonStoryChanger>)}
    {(type === 'story') ? null : (<ButtonStoryChanger><Link style={{ textDecoration: 'initial' }} to="/">latest</Link></ButtonStoryChanger>)}
    */ }
  </TopBarDiv>
);

export default TopBar;
