var React = require('react');
var {StyleSheet, View, Text, TextInput, Image, Dimensions, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Navbar = require('./components/Navbar');
var windowSize = Dimensions.get('window');

class History extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let container = {flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F4'}
    let header = {justifyContent: 'center'}
    let body = {flex: 1, margin: 12}
    let close = {position: 'absolute', top: 32, left: 15, width: 30, height: 25, paddingLeft: 4}
    let closeIcon = {fontSize: 22, color: '#000', width: 40, height: 24}
    
    let boxStyle = {backgroundColor: 'white', borderWidth: 1, borderColor: "rgba(225,225,225,1)", borderRadius: 4, marginTop: 10}
    let boxInnerStyle = {flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10, height: 80, borderBottomWidth: 1, borderColor: "rgba(225,225,225,1)"}
    let boxTextContainerStyle = {flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 8}
    let kmStyle = {position: 'absolute', top: 45, left: 8, justifyContent: 'center', alignItems: 'center', width: 52}

    let iconStyle = {fontSize: 26, fontWeight: "bold", opacity: 60 / 100}
    let textStyle = {fontSize: 12, color: 'rgba(0, 0, 0, 1)'}
    let textKmStyle = {fontSize: 10, color: 'rgba(0, 0, 0, 1)', fontWeight: '400'}

    let driverAvatar = {width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: "#fff", marginBottom: 50}

    return (
      <View style={container}>
        <View style={header}>
          <Navbar title="HISTÓRICO DE TROCAS" modal={true}/>
          <TouchableHighlight onPress={this.props.onRequestClose} underlayColor="transparent" style={close}>
            <Icon name="clear" style={closeIcon} />
          </TouchableHighlight>
        </View>
        <View style={body}>
          <View style={boxStyle}>
            <View style={boxInnerStyle}>
              <Image source={require('./images/User.png')} style={driverAvatar} />
              <View style={kmStyle}>
                <Text style={textKmStyle}>21.114</Text>
                <Text style={textKmStyle}>km</Text>
              </View>
              <View style={boxTextContainerStyle}>
                <Text style={[textStyle, {fontWeight: '600', paddingBottom: 5}]}>27/06/2016 14:31</Text>
                <Text style={[textStyle, {fontWeight: '600', paddingBottom: 5}]}>SQN 410 Asa Norte</Text>
                <Text style={[textStyle, {fontWeight: '100'}]}>AUDI A4</Text>
              </View>
            </View>
          </View>
          <View style={boxStyle}>
            <View style={boxInnerStyle}>
              <Image source={require('./images/User.png')} style={driverAvatar} />
              <View style={kmStyle}>
                <Text style={textKmStyle}>12.221</Text>
                <Text style={textKmStyle}>km</Text>
              </View>
              <View style={boxTextContainerStyle}>
                <Text style={[textStyle, {fontWeight: '600', paddingBottom: 5}]}>03/04/2016 11:23</Text>
                <Text style={[textStyle, {fontWeight: '600', paddingBottom: 5}]}>Esplanada dos Ministerios</Text>
                <Text style={[textStyle, {fontWeight: '100'}]}>AUDI A4</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = History