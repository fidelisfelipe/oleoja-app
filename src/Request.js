var React = require('react');
var {StyleSheet, View, Text, TextInput, Image, Dimensions, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');

var windowSize = Dimensions.get('window');

import Navbar from './components/Navbar'

class Request extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let container = {flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F4'}
    let header = {justifyContent: 'center'}
    let body = {backgroundColor: '#FFF', borderColor: "#E1E1E5", borderWidth: 1.2, borderRadius: 6, marginTop: 20, margin: 10}
    let footer = {borderRadius: 6, margin: 10}
    let row = {borderColor: "#E1E1E5", borderBottomWidth: 1.2, padding: 14}
    let icon = {fontSize: 18}
    let input = {position: 'absolute', left: 45, top: 12, right: 0, height: 20, fontSize: 14}
    let button = {backgroundColor: "rgba(244, 39, 36, 1)", alignItems: 'center', padding: 16}
    let close = {position: 'absolute', top: 32, left: 15}
    let closeIcon = {fontSize: 22, color: '#000', width: 40, height: 24}
    
    return (
      <View style={container}>
        <View style={header}>
          <Navbar title="SOLICITAR TROCA"/>
          <TouchableHighlight onPress={this.props.onRequestClose} underlayColor="transparent" style={close}>
            <Icon name="clear" style={closeIcon} />
          </TouchableHighlight>
        </View>
        <View style={body}>
          <View style={row}>
            <Icon name="layers" style={icon} />
            <TextInput 
              style={[input]}
              placeholder="Marca"/>
          </View>
          <View style={row}>
            <Icon name="directions-car" style={icon} />
            <TextInput 
              style={[input]}
              placeholder="Modelo" />
          </View>
          <View style={row}>
            <Icon name="phone" style={icon} />
            <TextInput 
              style={[input]}
              placeholder="Telefone de contato"/>
          </View>
        </View>
        <View style={footer}>
          <View style={button}>
            <Text>Solicitar</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default Request