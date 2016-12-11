import { Component } from 'preact';
import moment from 'moment';

import { PLACEHOLDER, dummyUser } from '../../constants';

export default class MessageList extends Component {
  // Render a single message
  renderMessage(message) {
    const sender = message.sentBy || dummyUser;
    
    return <div className="message flex flex-row">
      <img src={sender.avatar || PLACEHOLDER} alt={sender.email}
           className="avatar"/>
      <div className="message-wrapper">
        <p className="message-header">
          <span className="username font-600">{sender.email}</span>
          <span className="sent-date font-300">
      {moment(message.createdAt).format('MMM Do, hh:mm:ss')}
  </span>
        </p>
        <p className="message-content font-300">
          {message.text}
        </p>
      </div>
    </div>;
  }
  
  render() {
    return <main className="chat flex flex-column flex-1 clear">
      {this.props.messages.map(this.renderMessage)}
    </main>;
  }
}
