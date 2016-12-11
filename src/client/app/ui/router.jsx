import Router from 'preact-router';
import Index from './pages/Index.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';

const App = () =>
  <Router>
    <Index path='/'/>
    <Signup path='/signup'/>
    <Login path='/login'/>
  </Router>;

export default App;
