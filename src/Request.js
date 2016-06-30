var React = require('react');
var {StyleSheet, View, Text, TextInput, Image, Dimensions, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Navbar = require('./components/Navbar');
var LocationPin = require('./components/LocationPin');
var FullscreenMap = require('./components/FullscreenMap');
var LocationSearchbox = require('./components/LocationSearchbox');
var windowSize = Dimensions.get('window');

class Request extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      position: {coords: {latitude: null, longitude: null}},
      region: {
        latitude: -15.794229,
        longitude: -47.882166,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      address: ""
    }
  }
  
  render() {
    let style = {flex: 1}
    let backgroundStyle = {position: 'absolute'}
    let overlayStyle = {flex: 1, backgroundColor: 'transparent', justifyContent: 'space-between'}
    let toggleStyle = {position: 'absolute', bottom: 0}
    let menuStyle = {position: 'absolute', top: 32, left: 15, width: 30, height: 25, paddingLeft: 4}
    let menuIcon = {fontSize: 22, color: '#000', width: 22, height: 22}

    let styleRequest = {flex: 1, margin: 12}
    let requestBoxStyle = {backgroundColor: 'white', borderWidth: 1, borderColor: "rgba(225,225,225,1)", borderRadius: 4, height: 90}
    let requestBoxInnerStyle = {flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10, height: 40, borderBottomWidth: 1, borderColor: "rgba(225,225,225,1)"}
    let requestBoxTextContainerStyle = {flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5}
    let requestBoxButtonStyle = {flex: 1, alignItems: 'center', padding: 10}

    let iconStyle = {fontSize: 26, fontWeight: "bold", opacity: 60 / 100}
    let textStyle = {fontSize: 14, color: 'rgba(0, 0, 0, 1)'}
    let updateStyle = {fontSize: 10, color: 'rgba(0, 0, 0, 1)', opacity: 70 / 100}
    let buttonStyle = {backgroundColor: "rgba(244, 39, 36, 1)", alignItems: 'center', padding: 12, color: '#fff'}

    return (
      <View style={style} animation="fadeIn">
        <View style={backgroundStyle}>
          <FullscreenMap
            region={this.state.region}
            pitch={false}
            rotate={false}
            zoom={false}
            scroll={false}
            rotationEnabled={false} />
          <LocationPin
            text="ESTOU AQUI"
            pinColor={"#BB1904"}
            textColor={"rgba(255, 255, 255, 1)"}
            icon="my-location"
            top={0}
            left={0} />
        </View>
        <View style={overlayStyle} pointerEvents={'box-none'}>
          <View>
            <Navbar title="SOLICITAR TROCA" modal={true}/>
            <TouchableHighlight onPress={this.props.onRequestClose} underlayColor="transparent" style={menuStyle}>
              <Icon name="clear" style={menuIcon} />
            </TouchableHighlight>
            <LocationSearchbox
              margin={12}
              showLabel={true}
              labelText="LOCALIZAÇÂO"
              defaultText={this.state.address}
              labelColor={"rgba(0, 150, 86, 1)"}
              textColor={"rgba(0, 0, 0, 1)"} />
          </View>
        </View>
        <View>
          <View style={[styleRequest]}>
            <View style={requestBoxStyle}>
              <View style={requestBoxInnerStyle}>
                <Icon name="directions-car" style={iconStyle} />
                <View style={requestBoxTextContainerStyle}>
                  <Text style={textStyle}>{this.props.user.profile.vehicles[0].brand.toUpperCase()} {this.props.user.profile.vehicles[0].model.toUpperCase()}</Text>
                </View>
                <TouchableHighlight>
                  <Text style={updateStyle}>ALTERAR</Text>
                </TouchableHighlight>
              </View>
              <View style={requestBoxInnerStyle}>
                <Icon name="credit-card" style={iconStyle} />
                <View style={requestBoxTextContainerStyle}>
                  <Text style={textStyle}>CARTAO NUMERO</Text>
                </View>
                <TouchableHighlight>
                 <Text style={updateStyle}>ALTERAR</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={requestBoxButtonStyle}>
              <TouchableHighlight underlayColor="transparent">
                <Text style={buttonStyle}>SOLICITAR AGORA</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

module.exports = Request