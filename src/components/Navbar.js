var React = require('react');
var {Text, View} = require('react-native');

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    var style = {
      paddingTop: 20,
      height: 65,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderColor: "rgba(207,207,207,1)",
      justifyContent: 'center',
      alignItems: 'center',
    }

    var textStyle = {
      fontFamily: 'Nonserif',
      fontSize: this.props.modal ? 16 : 18,
      fontWeight: this.props.modal ? '900' : '100',
    }
    return (
      <View style={style}>
        <Text style={textStyle}>{this.props.title || "Title"}</Text>
      </View>
    )
  }
}

module.exports = Navbar