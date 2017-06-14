import React from 'react';
import styled from 'styled-components';
import Message from './Message';

/*
  constructor() {
    super();
    this.state = {
      data: [],
      show: false,
      replyNums: 0,
      replyHover: false,
    };
    this.MessageArray = this.MessageArray.bind(this);
  }
  componentWillMount() {
    fetch('/api/comments').then(response => {
      return response.json();
    }).then(json => {
      this.setState({
        data: json.Messages,
      });
    });
  }
  handleClick(nameValue, contentValue) {
    let newData = this.state.data;
    const currentTime = new Date();
    const timeString = currentTime.getFullYear().toString() + '-' + (currentTime.getMonth()+1).toString() + '-' + currentTime.getDate().toString() + ' ' + currentTime.getHours().toString() + ':' + currentTime.getMinutes().toString();
    if (this.state.replyNums === 0) {
      newData.push({
        name: nameValue,
        time: timeString,
        content: contentValue,
        reply: [],
      });
    } else {
      let topData = [];   // 201 => 1 2
      let i = 0;
      let rem = [this.state.replyNums];
      while (rem[i] > 0.1) {
        rem[i+1] = (rem[i] / 100).toFixed(0);
        rem[i] = rem[i] % 100 - 1;
        i += 1;
      }
      i -= 1;
      topData[i] = newData[rem[i]];   // [] {2}
      for (let j = i-1; j >= 0; j -= 1) {
        topData[j] = topData[j+1].reply[rem[j]]; // {1} {2}
      }
      if (i <= 3) {
        topData[0].reply.push({
          name: nameValue,
          time: timeString,
          content: contentValue,
          reply: [],
        });
        for (let j = 1; j <= i; j += 1) {
          topData[j].reply[rem[j-1]] = topData[j-1];
        }
      } else {
        topData[1].reply.push({
          name: nameValue,
          time: timeString,
          content: contentValue,
          reply: [],
        });
        for (let j = 2; j <= i; j += 1) {
          topData[j].reply[rem[j-1]] = topData[j-1];
        }
      }
      newData[rem[i]] = topData[i];
    }

    this.setState({
      data: newData,
      show: false,
      replyNums: 0,
      replyHover: false,
    });

    fetch('/api/comments', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Messages: this.state.data }),
    });
  }
  handleCancel() {
    this.setState({
      show: false,
      replyNums: 0,
    });
  }
  handleReply(nums) {
    this.setState({
      show: true,
      replyNums: nums,
    });
  }
  handleNew() {
    this.setState({
      show: true,
    });
  }
  handleMouseIn() {
    this.setState({
      replyHover: true,
    });
    setTimeout(() => {
      this.setState({
        replyHover: false,
      });
    }, 1000);
  }
*/
/*
Message.propTypes = {
  message: {
    name: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    time: React.PropTypes.string.isRequired,
    handleReply: React.PropTypes.func.isRequired,
    nums: React.PropTypes.number.isRequired,
    replyData: React.PropTypes.array,
  },
};
*/

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

class MessageList extends React.Component {
  render() {
    const { messageData, handleNew } = this.props;
    const DataRender = MessageArray(messageData);
    return (
      <AppDiv>
        <AddBar>
          <Input><textarea style={textAreaStyle} ref={(input) => { this.textInput = input; }} /></Input>
          <AddButton onClick={() => { handleNew(this.textInput.value); this.textInput.value = ''; }}>Reply</AddButton>
        </AddBar>
        <TopBoard>
          {DataRender}
        </TopBoard>
        {/* <Text title="New Message" show={this.state.show} onClick={this.handleClick.bind(this)} onCancel={this.handleCancel.bind(this)} /> */}
      </AppDiv>
    );
  }
}

MessageList.propTypes = {
  messageData: React.PropTypes.arrayOf({
    message: {
      name: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired,
      time: React.PropTypes.string.isRequired,
      handleReply: React.PropTypes.func.isRequired,
      id: React.PropTypes.number.isRequired,
    },
  }).isRequired,
  handleNew: React.PropTypes.func.isRequired,
};

export default MessageList;

