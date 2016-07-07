var React = require('react');
var {StyleSheet, View, Navigator, Text, TextInput, Image, Alert, Dimensions, AsyncStorage, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Util = require('lodash');
var Routes = require('./components/Routes');
var Oleoja = require('./api/Oleoja');

import ModalPicker from 'react-native-modal-picker';

class Signup extends React.Component {
  constructor(props) {
    console.log('_construct: Signup')
    AsyncStorage.multiRemove(['userState', 'vehicleState'])
    super(props)
    this.state = {
      initialRoute: Steps.User,
      brands: []
    }
  }

  componentWillMount() {
    Oleoja.subscribe('brands');

    var observer = Oleoja.observe('brands');

    observer.added = () => this.updateSet(Util.cloneDeep(Util.values(Oleoja.collections.brands)));
    observer.changed = () => this.updateSet(Util.cloneDeep(Util.values(Oleoja.collections.brands)));
    observer.removed = () => this.updateSet(Util.cloneDeep(Util.values(Oleoja.collections.brands)));
  }

  updateSet(rows) {
    this.setState({
      brands: rows
    });
  }

  handleSignup() {
    AsyncStorage.multiGet(['userState', 'vehicleState']).then((res) => {
      let data = {}
      res.map((result, i, store) => {
        i == 0 ? (data.user = JSON.parse(result[1])) : (data.vehicle = JSON.parse(result[1]))
      })
      Oleoja.signUpWithEmail(data, (err, res) => {
        if (err && err.reason) {
          Alert.alert('Ocorreu um Erro!', err.reason, [{text: 'OK'}])
        } else {
          Oleoja.loginWithEmail(data.user.email, data.user.password, (err, res) => {
            if (res) {
              let { id, token, tokenExpires } = res;
              AsyncStorage.setItem('userId', id.toString());
              AsyncStorage.setItem('loginToken', token.toString());
              AsyncStorage.setItem('loginTokenExpires', tokenExpires.toString());
              Oleoja.getUser(id.toString(), (err, res) => {
                AsyncStorage.multiRemove(['userState', 'vehicleState'])
                AsyncStorage.setItem('user', JSON.stringify(res));
                this.props.navigator.jumpTo(Routes.Main)
              })
            } else {
              AsyncStorage.multiRemove(['user', 'userId', 'loginToken', 'loginTokenExpires']);
            }
          })
        }
      })
    }).done()
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
          handleSignup={this.handleSignup}
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
    AsyncStorage.setItem('userState', JSON.stringify(this.state));
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
              autoCapitalize="none"
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
    this.state = {
      brands: [],
      models: []
    }
  }

  handleSignup() {
    AsyncStorage.setItem('vehicleState', JSON.stringify(this.state));
    this.props.steps.props.handleSignup();
  }

  handleUser() {
    this.props.steps.jumpTo(Steps.User)
  }

  listFuels() {
    let index = 0;

    let fuels = [
      { key: index++, label: 'Flex' },
      { key: index++, label: 'Gasolina ' },
      { key: index++, label: 'Alcool' },
      { key: index++, label: 'Diesel' },
      { key: index++, label: 'GNV' }
    ];

    return fuels;
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

  listModels(brand) {
    let models = [];

    if (this.props.steps.props.listBrands.length > 0) {
      for (var i in this.props.steps.props.listBrands) {
        if (this.props.steps.props.listBrands[i].name == brand) {
          for (var j in this.props.steps.props.listBrands[i].models) {
            models.push({
              key: this.props.steps.props.listBrands[i].models[j].name,
              label: this.props.steps.props.listBrands[i].models[j].name
            })
          }
        }
      }
    }
    return models;
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
              data={this.listModels(this.state.brand)}
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
              //keyboardType="numeric"
              //returnKeyType='done'
              maxLength={4}
              placeholder="Ano de fabricação"
              value={this.state.year}
              onChangeText={(year) => this.setState({year: year})}
              placeholderTextColor="#FFF" />
          </View>
          <View style={styles.row}>
            <ModalPicker
              data={this.listFuels()}
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

module.exports = Signup