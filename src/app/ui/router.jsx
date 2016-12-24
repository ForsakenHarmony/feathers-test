import predux from 'preact-redux';
import Router from 'preact-router';

import store from './store/store';

import Index from './pages/Index.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';

const { Provider } = predux;

const App = () => (
  <Router>
    <Index path='/'/>
    <Signup path='/signup'/>
    <Login path='/login'/>
    <Chat path='/chat'/>
  </Router>
);

export const Wrapper = ({ app }) => (
  <Provider store={store()}>
    <app/>
  </Provider>
);

export default App;
