var React = require('react');
var {Text, View, Modal, TouchableHighlight, AsyncStorage} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var SideMenu = require('react-native-side-menu');

import Menu from './components/Menu';
import Location from './Location';

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      view: null,
      modal: false,
      user: {
        profile: {
          name: ""
        }
      }
    }
  }

  toggleMenu() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  
  componentDidMount() {
    AsyncStorage.getItem('user').then((response) => {
      if (response) {
        let user = JSON.parse(response);
        this.setState({
          user: user
        })        
      }
    }).done()
  }

  renderView() {
    if (this.state.view != null)  {
      switch (this.state.view) {
        case 'payment':
          return <Payment onRequestClose={() => this.setState({modal: false})}/>
        case 'history':
          return <History onRequestClose={() => this.setState({modal: false})}/>
        case 'help':
          return <Help onRequestClose={() => this.setState({modal: false})}/>
        case 'settings':
          return <Settings onRequestClose={() => this.setState({modal: false})}/>
        case 'about':
          return <About onRequestClose={() => this.setState({modal: false})}/>
      }      
    }
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      modal: true,
      view: item,
    });
  }

  updateMenuState(isOpen) {
    this.setState({isOpen});
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} user={this.state.user} navigator={this.props.navigator} />

    return (
      <SideMenu menu={menu} isOpen={this.state.isOpen} bounceBackOnOverdraw={true} onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <Location onPressMenu={this.toggleMenu}/>
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => this.setState({modal: false})}
          visible={this.state.modal}>
          {this.renderView()}
        </Modal>
      </SideMenu>
    )
  }
}

export default Main