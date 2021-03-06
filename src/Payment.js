var React = require('react');
var {StyleSheet, Alert, View, Text, TextInput, Image, Dimensions, Navigator, AsyncStorage, TouchableHighlight} = require('react-native');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Navbar = require('./components/Navbar');
var Loading = require('./components/Loading');
var Routes = require('./components/Routes');
var Oleoja = require('./api/Oleoja');
var windowSize = Dimensions.get('window');

class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      initialRoute: Steps.List,
      payments: []
    }
  }

  componentWillMount() {
    this.paymentsWillMount()
  }
  
  paymentsWillMount() {
    Oleoja.listPayments(this.props.user.services.iugu, (err, res) => {
      if (res) {
        AsyncStorage.setItem('payments', JSON.stringify(res));
        AsyncStorage.getItem('payments').then((response) => {
          if (response) {
            let payments = JSON.parse(response);
            this.setState({
              payments: payments,
              loading: false
            })        
          }
        }).done()
      } else {
        AsyncStorage.remove('payments');
      }
    })
  }

  configureScene(route) {
    var BaseConfig = Navigator.SceneConfigs.PushFromRight;

    var CustomSceneConfig = Object.assign({}, BaseConfig, {
      springTension: 100,
      springFriction: 1,
    })

    return CustomSceneConfig
  }
  
  renderScene(route, navigator) {
    switch (route.name) {
      case 'PaymentList':
        return <PaymentList navigator={navigator.props.parent} steps={navigator}/>
      case 'PaymentForm':
        return <PaymentForm navigator={navigator.props.parent} steps={navigator}/>
      default:
        return <PaymentList navigator={navigator.props.parent} steps={navigator}/>
    }  
  }

  render() {
    if (this.state.loading) {
      return (<Loading/>)
    } else {
      return (
        <Navigator
            user={this.props.user}
            parent={this.props.navigator}
            payments={this.state.payments}
            paymentsWillMount={() => this.paymentsWillMount()}
            renderScene={this.renderScene}
            initialRoute={this.state.initialRoute}
            initialRouteStack={Steps.Stack}
            configureScene={this.configureScene}
            onRequestClose={this.props.onRequestClose}>
        </Navigator>
      )
    }
  }
}

class PaymentList extends React.Component {
  constructor(props) {
    super(props)
  }

  handleForm() {
    this.props.steps.jumpTo(Steps.Form)
  }

  renderPayments() {
    let payments = [];

    for (var i in this.props.steps.props.payments) {
      let payment = this.props.steps.props.payments[i];
      payments.push(
        <View style={styles.boxInnerStyle} key={i}>
          <Icon name="credit-card" style={styles.iconStyle} />
          <View style={styles.boxTextContainerStyle}>
            <Text style={styles.textStyle}>{payment.data.display_number}</Text>
          </View>
          <TouchableHighlight>
           <Text style={styles.updateStyle}>{payment.data.brand}</Text>
          </TouchableHighlight>
        </View>
      )
    }
    return payments
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Navbar title="FORMAS DE PAGAMENTO" modal={true}/>
          <TouchableHighlight onPress={this.props.steps.props.onRequestClose} underlayColor="transparent" style={styles.close}>
            <Icon name="clear" style={styles.closeIcon} />
          </TouchableHighlight>
        </View>
        <View style={styles.body}>
          <View style={styles.boxStyle}>
            {this.renderPayments()}
            <TouchableHighlight onPress={this.handleForm.bind(this)} underlayColor="transparent">
              <View style={styles.boxInnerStyle}>
                <Icon name="add" style={styles.iconStyle} />
                <View style={styles.boxTextContainerStyle}>
                  <Text style={styles.textStyle}>ADICIONAR PAGAMENTO</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

class PaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '',
      name: '',
      expiration: '',
      cvv: ''
    }
  }
  
  handleList() {
    this.props.steps.jumpTo(Steps.List)
  }

  handleSave() {
    let data = {}
    data.user = this.props.steps.props.user._id;
    data.number = this.state.number;
    data.name = this.state.name;
    data.expiration = this.state.expiration;
    data.cvv = this.state.cvv;

    Oleoja.savePayment(data, (err, res) => {
      if (res && res.errors) {
        Alert.alert('Ocorreu um Erro!', res.errors.data.join(''), [{text: 'OK'}])
      } else {
        this.props.steps.props.paymentsWillMount()
        this.props.steps.jumpTo(Steps.List)
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Navbar title="ADICIONAR PAGAMENTO" modal={true}/>
          <TouchableHighlight onPress={this.handleList.bind(this)} underlayColor="transparent" style={styles.close}>
            <Icon name="clear" style={styles.closeIcon} />
          </TouchableHighlight>
        </View>
        <View style={styles.body}>
          <View style={styles.boxStyle}>
            <View style={styles.boxInnerStyle}>
              <Icon name="person" style={styles.iconStyle} />
              <TextInput 
                ref="name"
                style={styles.input}
                placeholder="TITULAR DO CARTÃO"
                onChangeText={(name) => this.setState({name: name})} />
            </View>
            <View style={styles.boxInnerStyle}>
              <Icon name="credit-card" style={styles.iconStyle} />
              <TextInput 
                ref="number"
                style={styles.input}
                keyboardType="numeric"
                placeholder="NÚMERO DO CARTÃO"
                onChangeText={(number) => this.setState({number: number})} />
            </View>
            <View style={styles.boxInnerStyle}>
              <Icon name="date-range" style={styles.iconStyle} />
              <TextInput 
                ref="expiration"
                style={styles.input}
                keyboardType="numeric"
                placeholder="MM/AAAA"
                onChangeText={(expiration) => this.setState({expiration: expiration})} />
            </View>
            <View style={styles.boxInnerStyle}>
              <Icon name="security" style={styles.iconStyle} />
              <TextInput 
                ref="cvv"
                style={styles.input}
                keyboardType="numeric"
                placeholder="CCV"
                onChangeText={(cvv) => this.setState({cvv: cvv})} />
            </View>
          </View>
          <TouchableHighlight onPress={this.handleSave.bind(this)} underlayColor="transparent">
            <View style={styles.button}>
              <Text style={styles.white}>Cadastrar</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F4'},
  header: {justifyContent: 'center'},
  body: {flex: 1, margin: 12},
  close: {position: 'absolute', top: 32, left: 15, width: 30, height: 25, paddingLeft: 4},
  input: {position: 'absolute', left: 61, top: 12, right: 0, height: 20, fontSize: 14, color: "#000"},
  button: {backgroundColor: '#E81810', padding: 18, alignItems: 'center', marginTop: 10},
  white: {color: "#FFF"},
  closeIcon: {fontSize: 22, color: '#000', width: 40, height: 24},
  boxStyle: {backgroundColor: 'white', borderWidth: 1, borderColor: "rgba(225,225,225,1)", borderRadius: 4},
  boxInnerStyle: {flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10, height: 42, borderBottomWidth: 1, borderColor: "rgba(225,225,225,1)"},
  boxTextContainerStyle: {flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 5},
  iconStyle: {fontSize: 26, fontWeight: "bold", opacity: 60 / 100},
  textStyle: {fontSize: 14, color: 'rgba(0, 0, 0, 1)'},
  updateStyle: {fontSize: 10, color: 'rgba(0, 0, 0, 1)', opacity: 70 / 100}
})

var Steps = {
  List: {"id": 0, "name": "PaymentList"},
  Form: {"id": 1, "name": "PaymentForm"},
}

Steps.Stack = [
  Steps.List, 
  Steps.Form
]

module.exports = Payment