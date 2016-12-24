import { Component } from 'preact';
import { route } from 'preact-router';
import app from '../../feather';

import { PLACEHOLDER } from '../../constants';

export default class UserList extends Component {
  logout() {
    app.logout().then(() => {
      route('/');
    });
  }
  
  render({ users }, {}) {
    return <aside
      className="sidebar col col-3 flex flex-column flex-space-between">
      <header className="flex flex-row flex-center">
        <h4 className="font-300 text-center">
          <span className="font-600 online-count">{users.length}</span> users
        </h4>
      </header>
      
      <ul className="flex flex-column flex-1 list-unstyled user-list">
        {users.map(user =>
          <li>
            <a className="block relative" href="#">
              <img src={user.avatar || PLACEHOLDER} className="avatar"/>
              <span className="absolute username">{user.email}</span>
            </a>
          </li>,
        )}
      </ul>
      <footer className="flex flex-row flex-center">
        <a href="#" className="logout button button-primary"
           onClick={this.logout}>
          Sign Out
        </a>
      </footer>
    </aside>;
  }
}
