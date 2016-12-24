import { Component } from 'preact';
import debug from 'debug';
// import axios from 'axios';
import { bind } from 'decko';
import { route } from 'preact-router';

import app from '../../feather';

const log = debug('app:ui:pages:signup');

class Login extends Component {
  @bind
  handleSubmit() {
    log(this.state);
    this.setState({ disabled: true });
    
    app.authenticate({
      strategy: 'local',
      email   : this.state.email,
      password: this.state.password,
    }).then((res) => {
      log('Authenticated', res);
      return app.passport.verifyJWT(res.accessToken);
    }).then((payload) => {
      log('JWT Payload', payload);
      return app.service('users').get(payload.userId);
    }).then((user) => {
      app.set('user', user);
      log('User', app.get('user'));
      route('/chat');
    }).catch((e) => {
      log('ERROR', e);
    });
    
    // axios.post('/auth/local', {
    //   email   : this.state.email,
    //   password: this.state.password,
    // }).then((res) => {
    //   log(res);
    // }).catch((err) => {
    //   log(err);
    // });
  }
  
  render({}, { email, password, disabled }) {
    return (
      <main class="login container">
        <div class="row">
          <div class="col-12 col-6-tablet push-3-tablet text-center">
            <h1 class="font-100">Welcome Back</h1>
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
              <button type="submit" class="button button-primary block login"
                      disabled={disabled}>
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default Login;
