var React = require('react');
var {StyleSheet, View, Text, TextInput, Image, Dimensions, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Routes = require('./components/Routes')

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSignin() {
    this.props.navigator.jumpTo(Routes.Signin)
  }

  handleForget() {
    this.props.navigator.jumpTo(Routes.Forget)
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
      <View style={container}>
        <Image style={background} source={require("./images/Background.jpg")} />
        <View style={header}>
          <Image style={logo} source={require("./images/Logo.png")} />
        </View>
        <View style={form}>
          <View style={row}>
            <Icon name="person-outline" style={icon} />
            <TextInput 
              style={input}
              placeholder="Nome Completo"
              maxLength={100}
              placeholderTextColor="#FFF" />
          </View>
          <View style={row}>
            <Icon name="phonelink-ring" style={icon} />
            <TextInput 
              style={input}
              keyboardType="phone-pad"
              maxLength={11}
              placeholder="Número de Celular"
              placeholderTextColor="#FFF" />
          </View>
          <View style={row}>
            <Icon name="mail-outline" style={icon} />
            <TextInput 
              style={input}
              maxLength={100}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#FFF" />
          </View>
          <View style={row}>
            <Icon name="lock-outline" style={icon} />
            <TextInput
              password={true}
              style={input}
              maxLength={14}
              placeholder="Senha"
              placeholderTextColor="#FFF" />
          </View>
          <View style={link}>
            <TouchableHighlight onPress={this.handleForget.bind(this)} underlayColor="transparent">
              <Text style={white}>Esqueceu sua senha?</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={button}>
          <Text style={white}>CADASTRAR</Text>
        </View>
        <View style={footer}>
          <Text style={gray}>Já tenho uma conta.</Text>
          <TouchableHighlight onPress={this.handleSignin.bind(this)} underlayColor="transparent">
            <Text style={white}> Entrar</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default Signup