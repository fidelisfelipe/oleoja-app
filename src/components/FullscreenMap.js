var React = require('react');
var {Text, View, MapView, Dimensions, ListView} = require('react-native');
var MapView = require('react-native-maps');
var Util = require('lodash');
var Oleoja = require('../api/Oleoja');

class Map extends React.Component {
  constructor(props) {
    console.log('_construct: Map')
    super(props)
    this.state = {
      markers: [],
      loaded: false,
    }
  }

  componentDidMount() {
    Oleoja.subscribe('drivers');

    var observer = Oleoja.observe('drivers');

    observer.added = () => this.updateRows(Util.cloneDeep(Util.values(Oleoja.collections.drivers)));
    observer.changed = () => this.updateRows(Util.cloneDeep(Util.values(Oleoja.collections.drivers)));
    observer.removed = () => this.updateRows(Util.cloneDeep(Util.values(Oleoja.collections.drivers)));
  }

  updateRows(rows) {
    this.setState({
      markers: rows,
      loaded: true,
    });
  }

  renderDrivers() {
    let drivers = [];

    for (var i in this.state.markers) {
      let marker = this.state.markers[i];
      drivers.push(
        <MapView.Marker 
          key={i}
          coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}} 
          title={marker.name} 
          image={require('../images/pin.png')}
          description={marker.email}/>
      )
    }
    return drivers
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
          annotations={this.state.markers}
          scrollEnabled={this.props.scroll}
          zoomEnabled={this.props.zoom}
          pitchEnabled={this.props.pitch}
          rotationEnabled={this.props.rotate}
          {...this.props}>
          {this.renderDrivers()}
          </MapView>
      </View>
    )
  }
}

module.exports = Map