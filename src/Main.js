var React = require('react');
var {Text, View, Modal, TouchableHighlight, AsyncStorage} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var SideMenu = require('react-native-side-menu');
var Loading = require('./components/Loading');
var Menu =require('./components/Menu');
var Location = require('./Location');
var Vehicle = require('./Vehicle');
var Payment = require('./Payment');
var History = require('./History');
var About = require('./About');
var Help = require('./Help');

class Main extends React.Component {
  constructor(props) {
    console.log('_construct: Main')
    super(props)
    this.state = {
      loading: true,
      opened: false,
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
      opened: !this.state.opened,
    });
  }
  
  renderView() {
    if (this.state.view != null)  {
      switch (this.state.view) {
        case 'vehicle':
          return <Vehicle user={this.props.user} onRequestClose={() => this.setState({modal: false})}/>
        case 'payment':
          return <Payment user={this.props.user} onRequestClose={() => this.setState({modal: false})}/>
        case 'history':
          return <History user={this.props.user} onRequestClose={() => this.setState({modal: false})}/>
        case 'help':
          return <Help user={this.props.user} onRequestClose={() => this.setState({modal: false})}/>
        case 'about':
          return <About user={this.props.user} onRequestClose={() => this.setState({modal: false})}/>
      }      
    }
  }

  onMenuItemSelected = (item) => {
    this.setState({
      opened: false,
      modal: true,
      view: item,
    });
  }

  updateMenuState(opened) {
    this.setState({opened});
  }

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} user={this.props.user} navigator={this.props.navigator} />
    return (
      <SideMenu menu={menu} isOpen={this.state.opened} bounceBackOnOverdraw={true} onChange={(opened) => this.updateMenuState(opened)}>
        <Location onPressMenu={this.toggleMenu.bind(this)} user={this.props.user}/>
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

module.exports = Main