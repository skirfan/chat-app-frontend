import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div classname="message-item">
        <div>
          <b>{this.props.senderName}</b>
          <span>{this.props.text}</span>
        </div>
      </div>
    );
  }
}

export default Message;
