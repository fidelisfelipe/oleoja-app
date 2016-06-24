var React = require('react');
var Spinner = require('react-native-spinkit');
var {AppRegistry, View, Navigator, Dimensions, AsyncStorage} = require('react-native');

import WebSocket from './src/components/WebSocket';
import Routes from './src/components/Routes'
import Signin from './src/Signin'
import Signup from './src/Signup'
import Forget from './src/Forget'
import Main from './src/Main'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	connected: false,
    	loggedIn: false,
    	loaded: false,
    	user: {},
    	initialRoute: null
    }
  }

  componentWillMount() {
    WebSocket.connect((err, wasReconnect) => {
      let connected = true;
      if (err) connected = false;
      this.setState({ connected: connected });
    });

    /*
     *  Retornar initialRoute padrao para [1]
     */
		setTimeout(() => { 
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
		        user: null
	  	    })
	      }
	    }).done()
    }, 1500);
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
        return <Main navigator={navigator}/>
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
	        renderScene={this.renderScene}
	        initialRoute={this.state.initialRoute}
	        initialRouteStack={Routes.Stack}
	        configureScene={this.configureScene} />
  		)
    }
  }
}

AppRegistry.registerComponent('OleoJa', () => Index)