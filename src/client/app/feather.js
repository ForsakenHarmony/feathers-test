import Client from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication/client';
import feathersocket from 'feathers-socketio/client';

// Establish a Socket.io connection to the local server
const socket = new Client();

// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const app = feathers()
  .configure(feathersocket(socket))
  .configure(hooks())
  // Use localStorage to store our login token
  .configure(authentication({
    storage: window.localStorage,
  }));

export default app;
