var React = require('react');
var {StyleSheet, Text, TextInput, Image, Dimensions, TouchableHighlight, AsyncStorage} = require('react-native');
var {createAnimatableComponent, View} = require('react-native-animatable');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Routes = require('./components/Routes');
var Oleoja = require('./api/Oleoja');

class Signin extends React.Component {
  constructor(props) {
    console.log('_construct: Signin')
    super(props)
    this.state = {
      email: '',
      password: '',
      signedIn: false
    }
  }

  handleSignup() {
    this.props.navigator.jumpTo(Routes.Signup)
  }

  handleForget() {
    this.props.navigator.jumpTo(Routes.Forget)
  }

  handleSignin() {
    let {email, password} = this.state;
    
    Oleoja.loginWithEmail(email, password, (err, res) => {
      if (res) {
        let { id, token, tokenExpires } = res;
        AsyncStorage.setItem('userId', id.toString());
        AsyncStorage.setItem('loginToken', token.toString());
        AsyncStorage.setItem('loginTokenExpires', tokenExpires.toString());
        Oleoja.getUser(id.toString(), (err, res) => {
          AsyncStorage.setItem('user', JSON.stringify(res));
          this.props.navigator.props.userWillMount()
          this.props.navigator.jumpTo(Routes.Main)
        })
      } else {
        AsyncStorage.multiRemove(['user', 'payments', 'userId', 'loginToken', 'loginTokenExpires']);
      }
    })

    this.refs.email.setNativeProps({text: ''});
    this.refs.password.setNativeProps({text: ''});
  }

  render() {
    let container = {flex: 1, flexDirection: 'column', backgroundColor: 'transparent'}
    let background = {position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height}
    let header = {padding: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}
    let logo = {width: 150, height: 150}
    let form = {marginTop: 10, marginBottom: 10, flex: 1}
    let row = {padding: 10, borderWidth: 1, borderBottomColor: '#CCC', borderColor: 'transparent'}
    let icon = {fontSize: 24, fontWeight: "100", marginLeft: 15, width: 22, height: 22, color: "#D1D4DD"}
    let input = {position: 'absolute', left: 61, top: 12, right: 0, height: 20, fontSize: 14, color: "#FFF"}
    let link = {alignItems: 'flex-end', padding: 15}
    let button = {backgroundColor: '#E81810', padding: 20, alignItems: 'center'}
    let white = {color: "#FFF"}
    let gray = {color: "#D1D4DD"}
    let footer = {flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', flex: .15}

    return (
      <View style={container} animation="fadeIn">
        <Image style={background} source={require("./images/Background.jpg")} />
        <View style={header}>
          <Image style={logo} source={require("./images/Logo.png")} />
        </View>
        <View style={form}>
          <View style={row}>
            <Icon name="mail-outline" style={icon} />
            <TextInput 
              ref="email"
              style={input}
              keyboardType="email-address"
              placeholder="Email"
              onChangeText={(email) => this.setState({email: email})}
              placeholderTextColor="#FFF" />
          </View>
          <View style={row}>
            <Icon name="lock-outline" style={icon} />
            <TextInput
              ref="password"
              password={true}
              style={input}
              onChangeText={(password) => this.setState({password: password})}
              placeholder="Senha"
              placeholderTextColor="#FFF" />
          </View>
          <View style={link}>
            <TouchableHighlight onPress={this.handleForget.bind(this)} underlayColor="transparent">
              <Text style={white}>Esqueceu sua senha?</Text>
            </TouchableHighlight>
          </View>
        </View>
        <TouchableHighlight onPress={this.handleSignin.bind(this)} underlayColor="transparent">
          <View style={button}>
            <Text style={white}>ENTRAR</Text>
          </View>
        </TouchableHighlight>
        <View style={footer}>
          <Text style={gray}>Ainda não tem uma conta?</Text>
          <TouchableHighlight onPress={this.handleSignup.bind(this)} underlayColor="transparent">
            <Text style={white}> Cadastre-se</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

module.exports = Signin