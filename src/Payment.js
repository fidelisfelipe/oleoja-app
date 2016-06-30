var React = require('react');
var {StyleSheet, View, Text, TextInput, Image, Dimensions, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Navbar = require('./components/Navbar');
var windowSize = Dimensions.get('window');

class Payment extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let container = {flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F4'}
    let header = {justifyContent: 'center'}
    let body = {flex: 1, margin: 12}
    let close = {position: 'absolute', top: 32, left: 15, width: 30, height: 25, paddingLeft: 4}
    let closeIcon = {fontSize: 22, color: '#000', width: 40, height: 24}
    
    let boxStyle = {backgroundColor: 'white', borderWidth: 1, borderColor: "rgba(225,225,225,1)", borderRadius: 4}
    let boxInnerStyle = {flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10, height: 42, borderBottomWidth: 1, borderColor: "rgba(225,225,225,1)"}
    let boxTextContainerStyle = {flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5}

    let iconStyle = {fontSize: 26, fontWeight: "bold", opacity: 60 / 100}
    let textStyle = {fontSize: 14, color: 'rgba(0, 0, 0, 1)'}
    let updateStyle = {fontSize: 10, color: 'rgba(0, 0, 0, 1)', opacity: 70 / 100}

    return (
      <View style={container}>
        <View style={header}>
          <Navbar title="FORMAS DE PAGAMENTO" modal={true}/>
          <TouchableHighlight onPress={this.props.onRequestClose} underlayColor="transparent" style={close}>
            <Icon name="clear" style={closeIcon} />
          </TouchableHighlight>
        </View>
        <View style={body}>
          <View style={boxStyle}>
            <View style={boxInnerStyle}>
              <Icon name="credit-card" style={iconStyle} />
              <View style={boxTextContainerStyle}>
                <Text style={textStyle}>CARTAO NUMERO</Text>
              </View>
              <TouchableHighlight>
               <Text style={updateStyle}>ALTERAR</Text>
              </TouchableHighlight>
            </View>
            <View style={boxInnerStyle}>
              <Icon name="add" style={iconStyle} />
              <View style={boxTextContainerStyle}>
                <Text style={textStyle}>ADICIONAR PAGAMENTO</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = Payment