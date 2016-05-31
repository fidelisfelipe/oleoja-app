var React = require('react');
var {Text, Modal, TouchableHighlight} = require('react-native');
var {createAnimatableComponent, View} = require('react-native-animatable');
var Icon = require('react-native-vector-icons/MaterialIcons');

import Navbar from './components/Navbar'
import LocationPin from './components/LocationPin'
import FullscreenMap from './components/FullscreenMap'
import LocationSearchbox from './components/LocationSearchbox'
import ToggleButton from './components/ToggleButton'
import ToggleContainer from './components/ToggleContainer'
import ToggleItem from './components/ToggleItem'
import Request from './Request'

class Location extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      requestModal: false,
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

  searchRegionAddress(latlng) {
    let url = "https://maps.googleapis.com/maps/api/geocode/json?" +
        "latlng=" + latlng + "&key=" + "AIzaSyBodeCxWCFMML6JvWL8MW6ztpHJZBN8KTw" +
        "&result_type=street_address"
    let promise = fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
      let results = data.results
      if (results.length > 0) {
        this.setState({
          address: results[0].formatted_address.substring(0, 39).trim() + "...",
        })
      }
      return results;
    });
  }

  onPositionChange(position) {
    let region = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
    this.onRegionChange(region);
  }

  onRegionChange(region) {
  	let lat = region.latitude
    let lon = region.longitude
    let latlng = lat + ',' + lon
    this.searchRegionAddress(latlng)
    this.setState({ region });
  }

  render() {
    let style = {flex: 1}
    let backgroundStyle = {position: 'absolute'}
    let overlayStyle = {flex: 1, backgroundColor: 'transparent', justifyContent: 'space-between'}
    let toggleStyle = {position: 'absolute', bottom: 0}
    let menuStyle = {position: 'absolute', top: 32, left: 15}
    let menuIcon = {fontSize: 22, color: '#000', width: 18, height: 18}

    return (
      <View style={style} animation="fadeIn">
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => this.setState({requestModal: false})}
          visible={this.state.requestModal}>
          <Request onRequestClose={() => this.setState({requestModal: false})} />
        </Modal>
        <View style={backgroundStyle}>
          <FullscreenMap
            region={this.state.region}
            onRegionChange={(region) => this.onRegionChange(region)}
            pitch={true}
            rotate={true}
            zoom={true}
            scroll={true}
            rotationEnabled={true} />
          <LocationPin
            text="ESTOU AQUI"
            pinColor={"#BB1904"}
            textColor={"rgba(255, 255, 255, 1)"}
            onPress={() => this.setState({requestModal: true})}
            top={0}
            left={0} />
        </View>
        <View style={overlayStyle} pointerEvents={'box-none'}>
          <View>
            <Navbar title="ÓLEO JÁ" />
            <TouchableHighlight onPress={() => this.props.onPressMenu} underlayColor="#F9F9F9" style={menuStyle}>
              <Icon name="menu" style={menuIcon} />
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
        <ToggleContainer>
          <ToggleButton />
        </ToggleContainer>
      </View>
    )
  }
}

export default Location