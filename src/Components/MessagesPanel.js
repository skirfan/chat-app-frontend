import React, { Component } from "react";
import Message from "./Message";

class MessagesPane extends Component {
  render() {
    let list = (
      <div classname="no-content-message">There is no messages to show</div>
    );
    if (this.props.channel && this.props.channel.messages) {
      list = this.props.channel.messages.map((m) => (
        <Message key={m.id} id={m.id} sendername={m.senderName} text={m.text} />
      ));
    }
    return (
      <div className="messages-panel">
        <div className="meesages-list">{list}</div>
        <div className="messages-input">
          <input type="text" />
          <button>Send</button>
        </div>
      </div>
    );
  }
}

export default MessagesPane;
