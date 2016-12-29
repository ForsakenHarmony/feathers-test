import { Component } from 'preact';
import debug from 'debug';
import { bind } from 'decko';
import { route } from 'preact-router';
import app from '../../feather';

const log = debug('app:ui:pages:signup');

class Signup extends Component {
  @bind
  handleSubmit() {
    log(this.state);
    this.setState({ disabled: true });
    
    app.service('users').create({
      email   : this.state.email,
      password: this.state.password,
    }).then((user) => {
      log(user);
      route('/login');
    }).catch((err) => {
      log(err);
    });
  }
  
  render({}, { email, password, disabled }) {
    return (
      <main class="login container">
        <div class="row">
          <div class="col-12 col-6-tablet push-3-tablet text-center">
            <h1 class="font-100">Create an Account</h1>
          </div>
        </div>
        <div class="row">
          <div
            class="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop text-center">
            <form class="form" method="post" action="javascript:"
                  onSubmit={this.handleSubmit}>
              <fieldset>
                <input class="block" type="email" name="email"
                       value={email}
                       onChange={this.linkState('email')}
                       placeholder="email"/>
              </fieldset>
              <fieldset>
                <input class="block" type="password" name="password"
                       value={password}
                       onChange={this.linkState('password')}
                       placeholder="password"/>
              </fieldset>
              <button type="submit"
                      class="button button-primary block signup"
                      disabled={disabled}>
                Signup
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default Signup;
