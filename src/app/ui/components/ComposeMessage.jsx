import { Component } from 'preact';
import { bind } from 'decko';

import app from '../../feather';

export default class ComposeMessage extends Component {
  constructor(props) {
    super(props);
    
    this.state = { text: '' };
  }
  
  @bind
  updateText(ev) {
    this.setState({ text: ev.target.value });
  }
  
  @bind
  sendMessage() {
    // Get the messages service
    const messageService = app.service('messages');
    // Create a new message with the text from the input field
    messageService.create({
      text: this.state.text,
    }).then(() => this.setState({ text: '' }));
    
    // ev.preventDefault();
  }
  
  render() {
    return (
      <form className="flex flex-row flex-space-between" action="javascript:"
            onSubmit={this.sendMessage}>
        <input type="text" name="text" className="flex flex-1"
               value={this.state.text} onChange={this.updateText}/>
        <button className="button-primary" type="submit">Send</button>
      </form>
    );
  }
}
