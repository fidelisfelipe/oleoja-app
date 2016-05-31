var React = require('react');
var {Text, View, MapView, Dimensions} = require('react-native');
var MapView = require('react-native-maps');
var WebSocket = require('./WebSocket')

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: {},
      loaded: false,
    }
    this.handleRegionChange = this.handleRegionChange.bind(this)
  }

  componentDidMount() {
    WebSocket.subscribe('drivers');

    var observer = WebSocket.observe('drivers');
        observer.added = () => this.updateDrivers(_.cloneDeep(_.values(WebSocket.collections.drivers)));
        observer.changed = () => this.updateDrivers(_.cloneDeep(_.values(WebSocket.collections.drivers)));
        observer.removed = () => this.updateDrivers(_.cloneDeep(_.values(WebSocket.collections.drivers)));
  }

  updateDrivers: function(rows) {
    console.log(rows)
    this.setState({
      drivers: rows,
      loaded: true,
    });
  }

  render() {
    let style = {
      position: 'absolute',
	  top: 0,
	  left: 0,
	  right: 0,
	  bottom: 0
    }
    let mapStyle = {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    }
    let marker = {
    	latlng: {latitude: 37.78825, longitude: -122.4324},
    	title: 'Test',
    	description: 'Este é um texto do marker'
    }
    return (
      <View style={style}>
        <MapView style={mapStyle}
          //onRegionChange={this.handleRegionChange}
          //minDelta={0.001}
          //maxDelta={0.002}
          scrollEnabled={this.props.scroll}
          zoomEnabled={this.props.zoom}
          pitchEnabled={this.props.pitch}
          rotationEnabled={this.props.rotate}
          {...this.props} />
      </View>
    )
  }
}

export default Map
