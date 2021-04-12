import React, { Component } from "react";

class ChatFeed extends Component {
  componentDidUpdate() {
    let messageDiv = document.getElementById("messages");
    messageDiv.scrollToTop = messageDiv.scrollHeight;
  }

  displayMessages = (messages) => {
    return messages.map((message) => {
      // const avatar = this.whichAvatar(message);
      return (
        <ChatMessage
          key={message.id}
          message={message}
          //avatar={avatar}
          currentUser={this.props.currentUser}
        />
      );
    });
  };

  //   whichAvatar = (message) => {
  //     const user = this.props.room.users.data.find(
  //       (user) => parseInt(user.id) === message.user_id
  //     );
  //     return user.attributes.avatar_url;
  //   };

  render() {
    return (
      <div id="chat-feed">
        <h3>Chat Feed:</h3>
        <div id="messages">
          {this.props.room.messages ? (
            this.displayMessages(this.props.room.attributes.messages)
          ) : (
            <h3>This room has no messages yet - be the first to post!</h3>
          )}
        </div>
      </div>
    );
  }
}

export default ChatFeed;
