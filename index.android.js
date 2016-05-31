var React = require('react');
var {AppRegistry, View, Navigator, Dimensions, AsyncStorage} = require('react-native');
var Routes = require('./src/components/Routes');
var Spinner = require('react-native-spinkit');

import Main from './src/Main'
import Signin from './src/Signin'
import Signup from './src/Signup'
import Forget from './src/Forget'

import WebSocket from './src/components/WebSocket';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	connected: false,
    	loggedIn: null,
    	loaded: false,
    	initialRoute: null
    }
    console.log('CONSTRUCT STATE')
    console.log(this.state)
  }

  componentDidMount() {
    WebSocket.connect((err, wasReconnect) => {
      let connected = true;
      if (err) connected = false;
      this.setState({ connected: connected });
    });

		setTimeout(() => { 
    	AsyncStorage.getItem('userId').then((response) => {
		  	let loggedIn = response
	      if (loggedIn) {
		      this.setState({
		        loggedIn: loggedIn,
		        initialRoute: Routes.Stack[0],
		        loaded: true
		      })      	
	      } else {
	 	      this.setState({
		        loggedIn: null,
		        initialRoute: Routes.Stack[1],
		        loaded: true
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