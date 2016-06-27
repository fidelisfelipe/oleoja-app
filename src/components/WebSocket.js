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

WebSocket.onAuthResponse = (err, res) => {
  if (res) {
    let { id, token, tokenExpires } = res;
    AsyncStorage.setItem('userId', id.toString());
    AsyncStorage.setItem('loginToken', token.toString());
    AsyncStorage.setItem('loginTokenExpires', tokenExpires.toString());
    WebSocket.getUser(id.toString(), (err, res) => {
      AsyncStorage.setItem('user', JSON.stringify(res));
    })
  } else {
    AsyncStorage.multiRemove(['user', 'userId', 'loginToken', 'loginTokenExpires']);
  }
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