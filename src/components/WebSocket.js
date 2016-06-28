import DDPClient from 'ddp-client';
import { AsyncStorage } from 'react-native';

var WebSocket = new DDPClient({url: 'ws://localhost:3000/websocket'});

WebSocket.getUser = (id, cb) => {
  return WebSocket.call("getUser", [id], cb)
}

WebSocket.signUpWithEmail = (params, cb) => {
  return WebSocket.call('saveUser', [params], cb);
};

WebSocket.loginWithEmail = (email, password, cb) => {
  let params = {
    user: {
      email: email
    },
    password: password
  };

  return WebSocket.call("login", [params], cb)
}

WebSocket.loginWithToken = (loginToken, cb) => {
  let params = { resume: loginToken };
  return WebSocket.call("login", [params], cb)
}

WebSocket.logout = (cb) => {
  AsyncStorage.multiRemove(['user', 'userId', 'loginToken', 'loginTokenExpires']).then((res) => {
    WebSocket.call("logout", [], cb)
  });
}

export default WebSocket

if (typeof process === 'undefined') process = {};
process.nextTick = setImmediate;