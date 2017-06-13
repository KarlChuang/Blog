import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';

class LogIn extends React.Component {
  handleClick() {
    fetch('/login').then((response) => {
      console.log(response);
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Log In</button>
      </div>
    );
  }
}

ReactDOM.render(
  <LogIn />,
  document.getElementById('root'),
);
