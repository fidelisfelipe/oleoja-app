var React = require('react');
var {StyleSheet, View, Navigator, Text, TextInput, Image, Dimensions, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Util = require('lodash');
var Routes = require('./components/Routes');

import ModalPicker from 'react-native-modal-picker';
import WebSocket from './components/WebSocket';

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialRoute: Steps.User,
      brands: []
    }
  }

  componentDidMount() {
    WebSocket.connect(() => WebSocket.subscribe('brands'));

    var observer = WebSocket.observe('brands');

    observer.added = () => this.updateSet(Util.cloneDeep(Util.values(WebSocket.collections.brands)));
    observer.changed = () => this.updateSet(Util.cloneDeep(Util.values(WebSocket.collections.brands)));
    observer.removed = () => this.updateSet(Util.cloneDeep(Util.values(WebSocket.collections.brands)));
  }

  updateSet(rows) {
    this.setState({
      brands: rows
    });
  }

  handleSignup() {
    WebSocket.signUpWithEmail(this.state, (err, res) => {
      console.log(err)
      if (res) {
        this.props.navigator.jumpTo(Routes.Main)
      }
    })
  }

  setUser(state) {
    this.setState({user: state});
  }

  setVehicle(state) {
    this.setState({vehicle: state});
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
          listBrands={this.state.brands}
          renderScene={this.renderScene}
          setUser={(state) => this.setUser(state)}
          setVehicle={(state) => this.setVehicle(state)}
          handleSignup={() => this.handleSignup()}
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
    this.props.steps.props.setUser(this.state);
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
              ref="name"
              style={styles.input}
              maxLength={100}
              onChangeText={(name) => this.setState({name: name})}
              placeholder="Nome Completo"
              placeholderTextColor="#FFF" />
          </View>
          <View style={styles.row}>
            <Icon name="phonelink-ring" style={styles.icon} />
            <TextInput 
              ref="phone"
              style={styles.input}
              maxLength={11}
              keyboardType="phone-pad"
              onChangeText={(phone) => this.setState({phone: phone})}
              placeholder="Número de Celular"
              placeholderTextColor="#FFF" />
          </View>
          <View style={styles.row}>
            <Icon name="mail-outline" style={styles.icon} />
            <TextInput 
              ref="email"
              style={styles.input}
              maxLength={100}
              keyboardType="email-address"
              onChangeText={(email) => this.setState({email: email})}
              placeholder="Email"
              placeholderTextColor="#FFF" />
          </View>
          <View style={styles.row}>
            <Icon name="lock-outline" style={styles.icon} />
            <TextInput
              ref="password"
              password={true}
              style={styles.input}
              maxLength={14}
              onChangeText={(password) => this.setState({password: password})}
              placeholder="Senha"
              placeholderTextColor="#FFF" />
          </View>
        </View>
        <TouchableHighlight onPress={this.handleVehicle.bind(this)} underlayColor="transparent">
          <View style={styles.button}>
            <Text style={styles.white}>Cadastrar</Text>
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

  handleSignup() {
    this.props.steps.props.setVehicle(this.state);
    this.props.steps.props.handleSignup();
  }

  handleUser() {
    this.props.steps.jumpTo(Steps.User)
  }

  listBrands() {
    let brands = [];
    if (this.props.steps.props.listBrands.length > 0) {
      for (var i in this.props.steps.props.listBrands) {
        brands.push({
          key: this.props.steps.props.listBrands[i]._id,
          label: this.props.steps.props.listBrands[i].name
        })
      }      
    }
    return brands;
  }

  listModels() {
    let brands = [];
    if (this.props.steps.props.listBrands.length > 0) {
      for (var i in this.props.steps.props.listBrands) {
        brands.push({
          key: this.props.steps.props.listBrands[i]._id,
          label: this.props.steps.props.listBrands[i].name
        })
      }      
    }
    return brands;
  }

  render() {
    let index = 0;
    const companies = [
      { key: index++, label: 'FIAT' },
      { key: index++, label: 'Chevrolet' },
      { key: index++, label: 'Audi' },
      { key: index++, label: 'BMW' }
    ];
    
    index = 0;
    const cars = [
      { key: index++, label: 'FIAT - Palio' },
      { key: index++, label: 'Chevrolet - Cruze' },
      { key: index++, label: 'Audi - A4' },
      { key: index++, label: 'BMW - 320i' }
    ];

    index = 0;
    const fuel = [
      { key: index++, label: 'Flex' },
      { key: index++, label: 'Gasolina ' },
      { key: index++, label: 'Alcool' },
      { key: index++, label: 'Diesel' },
      { key: index++, label: 'GNV' }
    ];
    console.log(this.listBrands());
    //this.listModels(1);

    return (
      <View style={styles.container}>
        <Image style={styles.background} source={require("./images/Background.jpg")} />
        <View style={styles.header}>
          <Image style={styles.logo} source={require("./images/Logo.png")} />
        </View>
        <View style={styles.form}>
          <View style={styles.row}>
            <ModalPicker
              data={this.listBrands()}
              onChange={(option)=>{this.setState({brand: option.label})}}>
              <Icon name="directions-car" style={styles.icon} />
              <TextInput
                ref="brand"
                editable={false}
                style={styles.select}
                value={this.state.brand}
                placeholder="Marca do veículo"/>
            </ModalPicker>
          </View>
          <View style={styles.row}>
            <ModalPicker
              data={cars}
              onChange={(option)=>{this.setState({model: option.label})}}>
              <Icon name="event-seat" style={styles.icon} />
              <TextInput
                ref="model"
                editable={false}
                style={styles.select}
                value={this.state.model}
                placeholder="Modelo do veículo"/>
            </ModalPicker>
          </View>
          <View style={styles.row}>            
            <Icon name="date-range" style={styles.icon} />
            <TextInput 
              ref="year"
              style={styles.input}
              keyboardType="numeric"
              maxLength={4}
              placeholder="Ano de fabricação"
              value={this.state.year}
              onChangeText={(year) => this.setState({year: year})}
              placeholderTextColor="#FFF" />
          </View>
          <View style={styles.row}>
            <ModalPicker
              data={fuel}
              onChange={(option)=>{this.setState({fuel: option.label})}}>
              <Icon name="local-gas-station" style={styles.icon} />
              <TextInput
                ref="fuel"
                editable={false}
                style={styles.select}
                value={this.state.fuel}
                placeholder="Tipo de combustível"/>
            </ModalPicker>
          </View>
        </View>
        <TouchableHighlight onPress={this.handleSignup.bind(this)} underlayColor="transparent">
          <View style={styles.button}>
            <Text style={styles.white}>Entrar</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.footer}>
          <Text style={styles.gray}>Corrigir dados pessoais?</Text>
          <TouchableHighlight onPress={this.handleUser.bind(this)} underlayColor="transparent">
            <Text style={styles.white}> Voltar</Text>
          </TouchableHighlight>      
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