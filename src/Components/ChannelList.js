import React, { Component } from "react";
import Channel from "./Channel";

class ChannelList extends Component {
  handleClick = (id) => {
    this.props.onSelectChannel(id);
  };
  render() {
    const data = this.props.channels;
    let list = "There is no channel to show.";
    if (this.props.channels) {
      list = this.props.channels.map((c, i) => {
        return (
          <Channel
            key={c.id}
            id={c.id}
            name={c.name}
            participants={c.participants}
            onClick={this.handleClick}
          />
        );
      });
    }
    return <div className="channel-list">{list}</div>;
  }
}

export default ChannelList;
