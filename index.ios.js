var React = require('react');
var Spinner = require('react-native-spinkit');
var {AppRegistry, View, Navigator, Dimensions, AsyncStorage} = require('react-native');
var Routes = require('./src/components/Routes');
var Signin = require('./src/Signin');
var Signup = require('./src/Signup');
var Forget = require('./src/Forget');
var Main = require('./src/Main');
var Oleoja = require('./src/api/Oleoja');

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	connected: false,
    	loggedIn: false,
    	loaded: false,
    	user: {profile: {}},
    	initialRoute: null
    }
  }

  componentWillMount() {
    Oleoja.connect((err, wasReconnect) => {
      let connected = false;
      if (err) {
        console.log('Meteor Not Connected')
        connected = false;
      } else {
        console.log('Meteor Connected')
        connected = true;
      }
      this.setState({ connected: connected });
    });

		setTimeout(() => {
    	this.userWillMount();
    }, 1500);
	}

  userWillMount() {
    AsyncStorage.getItem('user').then((response) => {
      if (response) {
        let user = JSON.parse(response);
        this.setState({
          loggedIn: user._id,
          initialRoute: Routes.Stack[0],
          loaded: true,
          user: user
        })        
      } else {
        this.setState({
          loggedIn: null,
          initialRoute: Routes.Stack[1],
          loaded: true,
          user: {profile: {}}
        })
      }
    }).done()
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'Signin':
        return <Signin navigator={navigator}/>
      case 'Signup':
        return <Signup navigator={navigator}/>
      case 'Forget':
        return <Forget navigator={navigator}/>
      case 'Main':
        return <Main navigator={navigator} user={navigator.props.user}/>
      default:
        return <Signin navigator={navigator}/>
    }  
  }

  configureScene(route) {
    var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

    var CustomSceneConfig = Object.assign({}, BaseConfig, {
      springTension: 100,
      springFriction: 1,
    })

    return CustomSceneConfig
  }

  render() {
  	let container = {
			flex: 1,
  		justifyContent: 'center',
  		alignItems: 'center',
  		backgroundColor: '#AB1806',
  	}

  	let spinner = {
  		marginBottom: 50
		}

		if (!this.state.loaded) {
			return (
				<View style={container}>
        	<Spinner style={spinner} isVisible={true} size={150} type="Pulse" color="#FFFFFF"/>
        </View>
			)
    } else {
	  	return (
  		  <Navigator
          user={this.state.user}
          userWillMount={() => this.userWillMount()}
	        renderScene={this.renderScene}
	        initialRoute={this.state.initialRoute}
	        initialRouteStack={Routes.Stack}
	        configureScene={this.configureScene} />
  		)
    }
  }
}

AppRegistry.registerComponent('OleoJa', () => Index)