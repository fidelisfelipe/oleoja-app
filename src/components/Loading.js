var React = require('react');
var {View, Text} = require('react-native');

class Loading extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let loading = {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 100, height: 100, position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)'}
		return (
			<View style={loading}>
				<Text>Please wait</Text>
			</View>	
		)
	}
};

module.exports = Loading