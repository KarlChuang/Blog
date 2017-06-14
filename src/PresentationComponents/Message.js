import React from 'react';
import styled from 'styled-components';

const Mes = styled.div`
  margin-left: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: 0;
  border-top: 1px;
  border-style: solid;
  border-color: rgba(0,0,0,0.3);
`;

const Content = styled.div`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
  word-break: break-word;
  margin-bottom: 20px;
`;

const Detail = styled.div`
  display: inline-block;
  margin-right: 10px;
  font-size: 18px;
  margin-bottom: 8px;
  line-height: 18px;
`;

const Image = styled.img`
  display: inline-block;
  min-width: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
  margin-top: 12px;
  @media (max-width: 400px) {
    min-width: 0;
    width: 0;
    margin-right: 0px;
  }
`;

/*
<Reply onClick={() => onReply(message.nums)}>
      <ReplyButton>reply</ReplyButton>
    </Reply>
*/

const Message = ({ message }) => (
  <Mes>
    <div style={{ display: 'inline-flex' }}>
      <Image src={'./notLogin.jpg'/* message.imgLink */} alt="" />
      <div style={{ display: 'inline-block' }}>
        <Detail style={{ marginRight: '10px' }}>
          {'未登入'/* message.name */}
        </Detail>
        <Detail style={{ fontSize: '14px' }}>
          {message.time}
        </Detail>
        <Content>{message.content}</Content>
      </div>
    </div>
  </Mes>
);

Message.propTypes = {
  message: {
    name: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    time: React.PropTypes.string.isRequired,
    handleReply: React.PropTypes.func.isRequired,
    id: React.PropTypes.number.isRequired,
  },
  onReply: React.PropTypes.func.isRequired,
};
Message.defaultProps = {
  message: {
    name: '',
    content: '',
    time: '',
    handleReply: () => { },
    id: 0,
  },
};

export default Message;
