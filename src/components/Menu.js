var React = require('react');
var {ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var WebSocket = require('./WebSocket');
var Routes = require('./Routes')

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: 0
    }
  }

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  }

  handleLogout() {
    WebSocket.default.logout((err, res) => {
      this.props.navigator.jumpTo(Routes.Signin)
    })
  } 

  componentDidMount() {
    setTimeout(() => { 
      this.setState({opacity: 1})
    }, 1000);
  }

  render() {
  	let menu = {flex: 1, backgroundColor: '#080A1A'}
  	let header = {flexDirection: 'row', height: 90, backgroundColor: '#212331', paddingTop: 25, paddingLeft: 15}
  	let body = {height: Dimensions.get('window').height - 90, backgroundColor: '#080A1A'}
  	let headerText = {flex: 1, fontSize: 16, fontWeight: "400", alignItems: 'flex-end', color: '#D1D4DD', marginLeft: 10, paddingTop: 15}
  	let headerImage = {alignItems: 'flex-start', width: 50, height: 50}
  	let menuItem = {flexDirection: 'row', paddingTop: 10, paddingLeft: 10}
  	let menuIcon = {fontSize: 24, alignItems: 'flex-start', color: '#B0B0B8', width: 30, height: 30}
    let menuText = {flex: 1, fontSize: 16, fontWeight: "500", alignItems: 'flex-end', color: '#D1D4DD'}
    let logoutText = {flex: 1, fontSize: 15, fontWeight: "500", alignItems: 'flex-end', color: '#9497A2'}
    let line = {height: 1.2, marginBottom: -10, marginTop: 10, backgroundColor: '#212331'}

    return (
	    <ScrollView style={menu} opacity={this.state.opacity}>
  	 		<View style={header}>
   				<Image style={headerImage} source={require('../images/User.png')} />
   				<Text style={headerText}>{this.props.user.profile.name}</Text>
   			</View>
   			<View style={body}>
	        <TouchableOpacity style={menuItem} onPress={() => this.props.onItemSelected("payment")}>
	        	<View style={menuItem}>
  	        	<Icon name="card-giftcard" style={menuIcon} />
  	        	<Text style={menuText}>PAGAMENTO</Text>
  	        </View>
    	    </TouchableOpacity>

	        <TouchableOpacity style={menuItem} onPress={() => this.props.onItemSelected("payment")}>
	        	<View style={menuItem}>
  	        	<Icon name="slow-motion-video" style={menuIcon} />
  	        	<Text style={menuText}>HISTÓRICO</Text>
  	        </View>
    	    </TouchableOpacity>

	        <TouchableOpacity style={menuItem} onPress={() => this.props.onItemSelected("payment")}>
	        	<View style={menuItem}>
  	        	<Icon name="help-outline" style={menuIcon} />
  	        	<Text style={menuText}>AJUDA</Text>
  	        </View>
    	    </TouchableOpacity>

	        <TouchableOpacity style={menuItem} onPress={() => this.props.onItemSelected("payment")}>
	        	<View style={menuItem}>
  	        	<Icon name="settings" style={menuIcon} />
  	        	<Text style={menuText}>CONFIGURAÇÕES</Text>
  	        </View>
    	    </TouchableOpacity>

	        <TouchableOpacity style={menuItem} onPress={() => this.props.onItemSelected("payment")}>
	        	<View style={menuItem}>
  	        	<Icon name="people-outline" style={menuIcon} />
  	        	<Text style={menuText}>SOBRE</Text>
  	        </View>
    	    </TouchableOpacity>
          
          <View style={line} />

          <TouchableOpacity style={menuItem} onPress={this.handleLogout.bind(this)}>
            <View style={menuItem}>
              <Text style={logoutText}>Sair</Text>
            </View>
          </TouchableOpacity>
    	  </View>
      </ScrollView>
    )
  }
}

export default Menu