import DDPClient from 'ddp-client';
import { AsyncStorage } from 'react-native';

let Oleoja = new DDPClient({
  host : "oleoja.com.br",
  port : 80,
  ssl  : true,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1',  // ['1', 'pre2', 'pre1'] available
  // Use a full url instead of a set of `host`, `port` and `ssl`
  // url: 'wss://example.com/websocket'
  // socketConstructor: WebSocket // Another constructor to create new WebSockets
});

Oleoja.getUser = (id, cb) => {
  return Oleoja.call("getUser", [id], cb)
}

Oleoja.signUpWithEmail = (params, cb) => {
  return Oleoja.call('saveUser', [params], cb);
};

Oleoja.loginWithEmail = (email, password, cb) => {
  let params = {
    user: {
      email: email
    },
    password: password
  };

  return Oleoja.call("login", [params], cb)
}

Oleoja.loginWithToken = (loginToken, cb) => {
  let params = { resume: loginToken };
  return Oleoja.call("login", [params], cb)
}

Oleoja.logout = (cb) => {
  AsyncStorage.multiRemove(['user', 'userId', 'loginToken', 'loginTokenExpires']).then((res) => {
    Oleoja.call("logout", [], cb)
  });
}

module.exports = Oleoja;