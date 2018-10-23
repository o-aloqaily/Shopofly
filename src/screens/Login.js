import React, { Component } from 'react'
import { ImageBackground, View, TouchableOpacity, Text, AsyncStorage, Spinner } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Hideo } from 'react-native-textinput-effects';
import { Button } from '../components'
import * as API from '../API'
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Login extends Component {
	state = {
		email: 'nnawif@gmail.com',
		password: '123456',
		loading: false,
		showAlert: false,
		alertTitle: '',
		alertMessage: ''
	}

  onLogin = () => {
		const { email, password } = this.state
		this.setState({ loading: true })

    API.login(email, password)
    .then(async (token) => {
			await AsyncStorage.setItem('token', token)
			this.props.navigation.navigate('Home', { token })
			this.setState({ loading: false })
    })
    .catch((error) => {
			this.showAlert('Login Failed', 'Please make sure you submitted the correct email and password')
			this.setState({ loading: false })
		})
  }

	onRegister = () => {
		const { email, password } = this.state
		API.register(email, password)
		.then(async (data) => {
				await AsyncStorage.setItem('token', data.token)
				this.props.navigation.navigate('Home', { token: data.token })
		})
		.catch((error) => this.showAlert('Registration Failed',error.response.data["cause by"]))
	}

	showAlert = (alertTitle, alertMessage) => {
		this.setState({
			alertMessage,
			alertTitle,
			showAlert: true
		})
	}

	hideAlert = () => {
		this.setState({
			showAlert: false
		})
	}

	renderAlert() {
		const { showAlert, alertTitle, alertMessage } = this.state
		return (
			<AwesomeAlert
				show={showAlert}
				title={alertTitle}
				message={alertMessage}
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={true}
				showConfirmButton={true}
				confirmText="OK"
				confirmButtonColor="#1fb19c"
				onConfirmPressed={() => this.hideAlert()}
				messageStyle={{ textAlign: 'center' }}
			/>
		)
	}

  renderForm() {
		const { email, password } = this.state
		const { buttonContainer, formContainer, signUpButton, signUpText, boldText, inputContainer, inputStyle } = styles
    return (
      <View style={formContainer}>

				<View>
					<View style={inputContainer}>
						<Hideo
							iconClass={MaterialCommunityIcons}
							iconName={'email'}
							iconColor={'white'}
							iconBackgroundColor={'#1fb19c'}
							inputStyle={inputStyle}
							placeholder='email address...'
							value={email}
							onChangeText={(email) => this.setState({ email })}
							autoCapitalize='none'
						/>
					</View>

					<View style={inputContainer}>
						<Hideo
							iconClass={MaterialCommunityIcons}
							iconName={'key'}
							iconColor={'white'}
							iconBackgroundColor={'#1fb19c'}
							inputStyle={inputStyle}
							placeholder='password...'
							value={password}
							onChangeText={(password) => this.setState({ password })}
							secureTextEntry
							autoCapitalize='none'
						/>
					</View>
				</View>

					<View style={buttonContainer}>
						<Button
							label={'Login'}
							onClick={this.onLogin}
							isLoading={this.state.loading}
							/>
					</View>

        <TouchableOpacity
					style={signUpButton}
					onPress={this.onRegister}
				>
          <Text style={signUpText}>or <Text style={boldText}>Sign Up</Text></Text>
        </TouchableOpacity>

      </View>
    )
  }

	render() {
		return (
      <ImageBackground
        source={require('../../assets/splash.png')}
        style={{width: '100%', height: '100%' }}
      >
        { this.renderForm() }
				{ this.renderAlert()}
      </ImageBackground>

		)
	}
}

const styles = {
  formContainer: {
    top: 300
  },
  buttonContainer: {
    marginTop: 10
  },
  signUpButton: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center'
  },
  signUpText: {
    color: 'white',
    fontFamily: 'Coves-Light',
    opacity: 1,
    fontSize: 16,
    alignSelf: 'center'
  },
  dividerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  boldText: {
    fontFamily: 'Coves-Bold',
    fontWeight: '900'
  },
	inputStyle: {
		color: '#464949',
		fontFamily: 'Coves-Bold'
	},
	inputContainer: {
		width: '80%',
		height: 48,
		alignSelf: 'center',
		opacity: 0.8,
		marginBottom: 10
	},
}
