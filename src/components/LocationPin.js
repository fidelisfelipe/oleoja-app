var React = require('react');
var {Text, View, Image, Dimensions, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');

class LocationPin extends React.Component {
  constructor(props) {
    console.log('_construct: LocationPin')
    super(props)
    this.state = {}
  }

  render() {
    let backgroundColor = this.props.pinColor || "rgba(0,154,255,1)"
    let screenStyle = {height: 0, width: 0, top: 0, left: 0, position: "absolute", overflow: "visible"}
    let innerStyle = {height: Dimensions.get('window').height, width: Dimensions.get('window').width, justifyContent: "center", alignItems: "center", flex: 1}
    let top = -19 + Dimensions.get('window').height / 2 +  + (this.props.top || 0)
    let left = (Dimensions.get('window').width / 2) - 70
    let style = {borderRadius: 25, backgroundColor: backgroundColor, left: left, top: top, height: 21, position: 'absolute', flex: 1, flexDirection: 'row', alignItems: 'center', padding: 15}
    let textStyle = {fontSize: 16, color: this.props.textColor || 'white', backgroundColor: 'transparent', fontWeight: "400", alignItems: 'flex-start'}
    let iconStyle = {fontSize: 24, fontWeight: "bold", color: this.props.textColor || 'white', alignItems: 'flex-end', marginLeft: 5, marginRight: -12}
    let nubStyle = {width: 3, height: 20, backgroundColor: backgroundColor, top: top + 22, left: left + 78, position: 'absolute'}
    
    return (
      <View style={screenStyle} pointerEvents={'box-none'}>
        <View style={innerStyle}>
          <View style={style}>
            <Text style={textStyle}>{this.props.text || ""}</Text>
            <TouchableHighlight underlayColor="transparent" onPress={this.props.onPress}>
              <Icon name={this.props.icon} style={iconStyle} />
            </TouchableHighlight>
          </View>
          <View style={nubStyle}></View>
        </View>
      </View>
    )
  }
}

module.exports = LocationPin