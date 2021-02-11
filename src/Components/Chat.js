import React, { Component } from "react";
import ChannelList from "./ChannelList";
import "./chat.scss";
import MessagesPanel from "./MessagesPanel";
import axios from "axios";
import socketClient from "socket.io-client";

const SERVER = "http://localhost:8080";

class Chat extends Component {
  state = {
    channels: [{ id: 1, name: "first", participants: 10 }],
  };
  socket;

  componentDidMount() {
    this.loadChannels();
    this.configureSocket();
  }

  configureSocket = () => {
    var socket = socketClient(SERVER);
    socket.on("connection", () => {
      if (this.state.channel) {
        this.handleChannelSelect(this.state.channel.id);
      }
    });
    socket.on("channel", (channel) => {
      let channels = this.state.channels;
      channels.forEach((c) => {
        if (c.id === channel.id) {
          c.participants = channel.participants;
        }
      });
      this.setState({ channels });
    });
    socket.on("message", (message) => {
      let channels = this.state.channels;
      channels.forEach((c) => {
        if (c.id === message.channel_id) {
          if (!c.messages) {
            c.messages = [message];
          } else {
            c.messages.push(message);
          }
        }
      });
      this.setState({ channels });
    });
    this.socket = socket;
  };

  loadChannels = () => {
    axios.get("http://localhost:8080/getChannels").then((r) => {
      this.setState({ channels: r.data.channels });
    });
  };

  handleChannelSelect = (id) => {
    let channel = this.state.channels.find((c) => {
      return c.id === id;
    });
    this.setState({ channel });
    this.socket.emit("channel-join", id, (ack) => {});
  };

  render() {
    return (
      <div className="chat-app">
        <ChannelList
          channels={this.state.channels}
          onSelectChannel={this.handleChannelSelect}
        />
        <MessagesPanel />
      </div>
    );
  }
}

export default Chat;
