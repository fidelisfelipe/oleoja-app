var React = require('react');
var {StyleSheet, View, Text, TextInput, Image, Dimensions, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Routes = require('./components/Routes')

class Forget extends React.Component {
  constructor(props) {
    console.log('_construct: Forget')
    super(props)
    this.state = {}
  }

  handleSignin() {
    this.props.navigator.jumpTo(Routes.Signin)
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
        </View>
        <View style={button}>
          <Text style={white}>ENVIAR SENHA</Text>
        </View>
        <View style={footer}>
          <Text style={gray}>Lembrei minha senha.</Text>
          <TouchableHighlight onPress={this.handleSignin.bind(this)} underlayColor="transparent">
            <Text style={white}> Entrar</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

module.exports = Forget