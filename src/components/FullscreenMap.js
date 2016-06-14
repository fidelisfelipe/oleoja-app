var React = require('react');
var {Text, View, MapView, Dimensions, ListView} = require('react-native');
var MapView = require('react-native-maps');
var WebSocket = require('./WebSocket')
var _ = require('lodash');

import DDPClient from 'ddp-client';

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => !_.isEqual(row1, row2),
      }),
      loaded: false,
    }
    //this.handleRegionChange = this.handleRegionChange.bind(this)
  }

  componentDidMount() {
    var ddpClient = new DDPClient({url: 'ws://localhost:3000/websocket'});

    ddpClient.connect(() => ddpClient.subscribe('drivers'));
    console.log(ddpClient.collections.drivers);
    // observe the lists collection
    var observer = ddpClient.observe('drivers');
    observer.added = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.drivers)));
    observer.changed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.drivers)));
    observer.removed = () => this.updateRows(_.cloneDeep(_.values(ddpClient.collections.drivers)));
  }

  updateRows(rows) {
    console.log(rows)
    this.setState({
      drivers: rows,
      loaded: true,
    });
  }

  renderDriver(driver) {
    return (
      <View style={styles.container}>
        <Text>{driver.name}</Text>
        <Text>{driver.email}</Text>
      </View>
    )
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderDriver}
      />
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
