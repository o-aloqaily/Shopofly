import React, { Component } from 'react'
import { Text, AsyncStorage, View } from 'react-native'
import { getUserInfo } from '../API'

export default class Home extends Component {
	state = {
		name: '',
		email: '',
	}

	componentWillMount() {
		getUserInfo(this.props.navigation.state.params.token)
		.then((data) => this.setState({ name: data.name, email: data.email }))
		.catch((error) => console.log(error))
	}

	render() {
		return (
			<View style={{ justifyContent: 'center', flex: 1 }}>
				<Text style={{ alignSelf: 'center' }}>{this.state.name}</Text>
				<Text style={{ alignSelf: 'center' }}>{this.state.email}</Text>
			</View>
		)
	}
}
