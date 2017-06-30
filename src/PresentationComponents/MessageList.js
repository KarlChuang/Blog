import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Message from './Message';

const AppDiv = styled.div`
  max-width: 750px;
  margin: auto;
`;

const TopBoard = styled.div`
  padding-top: 30px;
  padding-bottom: 40px;
  padding-right: 30px;
  border-radius: 8px;
`;

const AddBar = styled.div`
  margin: auto;
  padding-top: 30px;
  width: 88%;
  @media (max-width: 550px) {
    width: 95%
  }
`;

const Input = styled.div`
  width:  calc(100% - 60px);
  display: inline-flex;
  height: 70px;
  border: 0;
  padding-left: 6px;
  vertical-align: top;
  @media (max-width: 550px) {
    width: 100%
  }
`;

const AddButton = styled.button`
  border: 0;
  margin-left: 5px;
  height: 73.5px;
  background-color: rgb(175, 160, 114);
  font-weight: 400;
  color: white;
  @media (max-width: 550px) {
    display: none;
  }
`;

const textAreaStyle = {
  height: '70px',
  width: '100%',
  fontSize: '17px',
  fontFamily: 'cursive',
  fontWeight: '700',
  border: '0',
  resize: 'none',
};


const MessageArray = (InputArray) => {
  const DataRender = InputArray.map((message) => {
    const newMessage = {
      name: message.author.name,
      imgLink: message.author.imgLink,
      time: message.time,
      content: message.content,
      id: message.id,
    };
    return (
      <Message
        key={message.id}
        message={newMessage}
      />
    );
  });
  return DataRender;
};

class MessageList extends Component {
  render() {
    const { messageData, handleNew } = this.props;
    const DataRender = MessageArray(messageData);
    return (
      <AppDiv>
        <AddBar>
          <Input>
            <textarea style={textAreaStyle} ref={(input) => { this.textInput = input; }} />
          </Input>
          <AddButton onClick={() => { handleNew(this.textInput.value); this.textInput.value = ''; }}>Reply</AddButton>
        </AddBar>
        <TopBoard>
          {DataRender}
        </TopBoard>
        {
      /* <Text
            title="New Message"
            show={this.state.show}
            onClick={this.handleClick.bind(this)}
            onCancel={this.handleCancel.bind(this)}
          /> */
        }
      </AppDiv>
    );
  }
}

MessageList.propTypes = {
  messageData: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imgLink: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  handleNew: PropTypes.func.isRequired,
};

export default MessageList;

