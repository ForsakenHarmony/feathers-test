import { Component } from 'preact';
import app from '../../feather';

export default class ComposeMessage extends Component {
  getInitialState() {
    return { text: '' };
  }
  
  updateText(ev) {
    this.setState({ text: ev.target.value });
  }
  
  sendMessage(ev) {
    // Get the messages service
    const messageService = app.service('messages');
    // Create a new message with the text from the input field
    messageService.create({
      text: this.state.text,
    }).then(() => this.setState({ text: '' }));
    
    ev.preventDefault();
  }
  
  render() {
    return (
      <form className="flex flex-row flex-space-between"
            onSubmit={this.sendMessage}>
        <input type="text" name="text" className="flex flex-1"
               value={this.state.text} onChange={this.updateText}/>
        <button className="button-primary" type="submit">Send</button>
      </form>
    );
  }
}
