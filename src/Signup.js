var React = require('react');
var {StyleSheet, View, Navigator, Text, TextInput, Image, Dimensions, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Routes = require('./components/Routes')

import ModalPicker from 'react-native-modal-picker'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialRoute: Steps.User
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
  
  renderScene(route, navigator) {
    switch (route.name) {
      case 'User':
        return <User navigator={navigator.props.parent} steps={navigator}/>
      case 'Vehicle':
        return <Vehicle navigator={navigator.props.parent} steps={navigator}/>
      default:
        return <User navigator={navigator.props.parent} steps={navigator}/>
    }  
  }

  render() {
    return (
      <Navigator
          parent={this.props.navigator}
          renderScene={this.renderScene}
          initialRoute={this.state.initialRoute}
          initialRouteStack={Steps.Stack}
          configureScene={this.configureScene}/>
      )
  }
}

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleVehicle() {
    this.props.steps.jumpTo(Steps.Vehicle)
  }

  handleSignin() {
    this.props.navigator.jumpTo(Routes.Signin)
  }

  handleForget() {
    this.props.navigator.jumpTo(Routes.Forget)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} source={require("./images/Background.jpg")} />
        <View style={styles.header}>
          <Image style={styles.logo} source={require("./images/Logo.png")} />
        </View>
        <View style={styles.form}>
          <View style={styles.row}>
            <Icon name="person-outline" style={styles.icon} />
            <TextInput 
              style={styles.input}
              placeholder="Nome Completo"
              maxLength={100}
              placeholderTextColor="#FFF" />
          </View>
          <View style={styles.row}>
            <Icon name="phonelink-ring" style={styles.icon} />
            <TextInput 
              style={styles.input}
              keyboardType="phone-pad"
              maxLength={11}
              placeholder="Número de Celular"
              placeholderTextColor="#FFF" />
          </View>
          <View style={styles.row}>
            <Icon name="mail-outline" style={styles.icon} />
            <TextInput 
              style={styles.input}
              maxLength={100}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#FFF" />
          </View>
          <View style={styles.row}>
            <Icon name="lock-outline" style={styles.icon} />
            <TextInput
              password={true}
              style={styles.input}
              maxLength={14}
              placeholder="Senha"
              placeholderTextColor="#FFF" />
          </View>
        </View>
        <TouchableHighlight onPress={this.handleVehicle.bind(this)} underlayColor="transparent">
          <View style={styles.button}>
            <Text style={styles.white}>CADASTRAR</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.footer}>
          <Text style={styles.gray}>Já tenho uma conta.</Text>
          <TouchableHighlight onPress={this.handleSignin.bind(this)} underlayColor="transparent">
            <Text style={styles.white}> Entrar</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

class Vehicle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleUser() {
    this.props.steps.jumpTo(Steps.User)
  }

  render() {
    let index = 0;
    const data = [
      { key: index++, label: 'Red Apples' },
      { key: index++, label: 'Cherries' },
      { key: index++, label: 'Cranberries' },
      { key: index++, label: 'Pink Grapefruit' },
      { key: index++, label: 'Raspberries' },
      { key: index++, label: 'Rhubarb' },
      { key: index++, label: 'Red Apples' },
      { key: index++, label: 'Cherries' },
      { key: index++, label: 'Cranberries' },
      { key: index++, label: 'Pink Grapefruit' },
      { key: index++, label: 'Raspberries' },
      { key: index++, label: 'Rhubarb' },
      { key: index++, label: 'Red Apples' },
      { key: index++, label: 'Cherries' },
      { key: index++, label: 'Cranberries' },
      { key: index++, label: 'Pink Grapefruit' },
      { key: index++, label: 'Raspberries' },
      { key: index++, label: 'Rhubarb' },
      { key: index++, label: 'Red Apples' },
      { key: index++, label: 'Cherries' },
      { key: index++, label: 'Cranberries' },
      { key: index++, label: 'Pink Grapefruit' },
      { key: index++, label: 'Raspberries' },
      { key: index++, label: 'Rhubarb' },
      { key: index++, label: 'Red Apples' },
      { key: index++, label: 'Cherries' },
      { key: index++, label: 'Cranberries' },
      { key: index++, label: 'Pink Grapefruit' },
      { key: index++, label: 'Raspberries' },
      { key: index++, label: 'Rhubarb' },
      { key: index++, label: 'Red Apples' },
      { key: index++, label: 'Cherries' },
      { key: index++, label: 'Cranberries' },
      { key: index++, label: 'Pink Grapefruit' },
      { key: index++, label: 'Raspberries' },
      { key: index++, label: 'Rhubarb' },
      { key: index++, label: 'Tomatoes' }
    ];

    return (
      <View style={styles.container}>
        <Image style={styles.background} source={require("./images/Background.jpg")} />
        <View style={styles.header}>
          <Image style={styles.logo} source={require("./images/Logo.png")} />
        </View>
        <View style={styles.form}>
          <View style={styles.row}>
            <ModalPicker
              data={data}
              onChange={(option)=>{this.setState({textInputValue:option.label})}}>
              <Icon name="directions-car" style={styles.icon} />
              <TextInput
                editable={false}
                style={styles.select}
                placeholder="Marca do veículo"/>
            </ModalPicker>
          </View>
          <View style={styles.row}>
            <ModalPicker
              data={data}
              onChange={(option)=>{this.setState({textInputValue:option.label})}}>
              <Icon name="event-seat" style={styles.icon} />
              <TextInput
                editable={false}
                style={styles.select}
                placeholder="Modelo do veículo"/>
            </ModalPicker>
          </View>
          <View style={styles.row}>            
            <ModalPicker
              data={data}
              onChange={(option)=>{this.setState({textInputValue:option.label})}}>
              <Icon name="date-range" style={styles.icon} />
              <TextInput
                editable={false}
                style={styles.select}
                placeholder="Ano de fabricação"/>
            </ModalPicker>
          </View>
          <View style={styles.row}>
            <ModalPicker
              data={data}
              onChange={(option)=>{this.setState({textInputValue:option.label})}}>
              <Icon name="local-gas-station" style={styles.icon} />
              <TextInput
                editable={false}
                style={styles.select}
                placeholder="Tipo de combustível"/>
            </ModalPicker>
          </View>
        </View>
        <View style={styles.button}>
          <Text style={styles.white}>ENTRAR</Text>
        </View>
        <View style={styles.footer}>
        </View>
      </View>
    )
  }
}

var Steps = {
  User: {"id": 0, "name": "User"},
  Vehicle: {"id": 1, "name": "Vehicle"},
}

Steps.Stack = [
  Steps.User, 
  Steps.Vehicle
]

var styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column', backgroundColor: 'transparent'},
  background: {position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height},
  header: {padding: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'},
  logo: {width: 150, height: 150},
  form: {marginTop: 10, marginBottom: 10, flex: 1},
  row: {padding: 10, borderWidth: 1, borderBottomColor: '#CCC', borderColor: 'transparent'},
  icon: {fontSize: 24, fontWeight: "100", marginLeft: 15, width: 22, height: 22, color: "#D1D4DD"},
  input: {position: 'absolute', left: 61, top: 12, right: 0, height: 20, fontSize: 14, color: "#FFF"},
  select: {position: 'absolute', left: 51, top: 3, right: 0, height: 20, fontSize: 14, color: "#FFF"},
  link: {alignItems: 'flex-end', padding: 15},
  button: {backgroundColor: '#E81810', padding: 20, alignItems: 'center'},
  white: {color: "#FFF"},
  gray: {color: "#D1D4DD"},
  footer: {flexDirection: 'row', padding: 20, justifyContent: 'center', alignItems: 'center', flex: .15}
})

export default Signup