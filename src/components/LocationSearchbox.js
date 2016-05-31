var React = require('react');
var {Text, View, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');

class LocationSearchbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  locateMe() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.onPositionChange(position),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  
  render() {
    let style = {
      flex: 1,
      margin: this.props.margin || 0,
    }
    let searchboxStyle = {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: "rgba(225,225,225,1)",
      borderRadius: 4,
      height: 50,
    }
    let searchboxInnerStyle = {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    }
    let searchboxTextContainerStyle = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
    let iconStyle = {
      fontSize: 26,
      fontWeight: "bold",
      opacity: 60 / 100,
    }
    let labelStyle = {
      fontSize: 9,
      color: this.props.labelColor,
      marginTop: 2,
      marginBottom: 3,
      fontWeight: "600",
    }
    let textStyle = {
      fontSize: 14,
      color: this.props.textColor,
    }
    return (
      <View style={[style, this.props.style]}>
        <View style={searchboxStyle}>
          <View style={searchboxInnerStyle}>
            <Icon name="search" style={iconStyle} />
            <View style={searchboxTextContainerStyle}>
              {this.props.showLabel && <Text style={labelStyle}>{this.props.labelText}</Text>}
              <Text style={textStyle}>{this.state.address || this.props.defaultText}</Text>
            </View>
            <TouchableHighlight>
              <Icon name="gps-fixed" style={iconStyle} onPress={() => this.locateMe} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}
export default LocationSearchbox
