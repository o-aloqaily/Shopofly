import React, { Component } from 'react'
import { ImageBackground, View, SafeAreaView, TouchableOpacity, Text, AsyncStorage } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Hideo } from 'react-native-textinput-effects';
import { Button, Alert } from '../components'
import * as API from '../API'
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Register extends Component {
	state = {
		email: '',
		password: '',
    name: '',
		isEmailValid: true,
		isPassValid: true,
		showAlert: false,
		isLoading: false
	}

	showAlert = () => {
		this.setState({
			showAlert: true
		})
	}

	hideAlert = () => {
		this.setState({
			showAlert: false
		})
	}


  onRegister = () => {
    const { email, password } = this.state
		this.setState({ isLoading: true })
    API.register(email, password)
    .then(async (data) => {
			this.setState({ isLoading: false })
			console.log(data.token);
				await AsyncStorage.setItem('token', data.token)
				this.props.navigation.navigate('Home', { token: data.token })
    })
    .catch((error) => {
			this.setState({ isLoading: false, showAlert: true })
			console.log(error.response);
		})
  }

	validateEmail = (email) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		console.log(email , re.test(String(email).toLowerCase()));
		if (re.test(String(email).toLowerCase())) {
			this.setState({ isEmailValid: true })
		} else {
			this.setState({ isEmailValid: false })
		}
	}

	validatePassword = (password) => {
		console.log(password);
		if (password.length >= 6) {
			this.setState({ isPassValid: true })
		} else {
			this.setState({ isPassValid: false })
		}
	}

  renderForm() {
		const { email, password, address, name, phoneNumber, isEmailValid, isPassValid } = this.state
		const { buttonContainer, formContainer, signUpButton, signUpText, boldText, inputContainer, inputStyle, redShadow } = styles
		return (
      <View style={formContainer}>

				<View>
          <View style={inputContainer}>
            <Hideo
              iconClass={MaterialCommunityIcons}
              iconName={'account'}
              iconColor={'white'}
              iconBackgroundColor={'#1fb19c'}
              inputStyle={inputStyle}
              placeholder='full name...'
              value={name}
              onChangeText={(name) => this.setState({ name })}
            />
          </View>

					<View style={[inputContainer, !isEmailValid ? redShadow : null ]}>
						<Hideo
							iconClass={MaterialCommunityIcons}
							iconName={'email'}
							iconColor={'white'}
							iconBackgroundColor={'#1fb19c'}
							inputStyle={inputStyle}
							placeholder='email address...'
							value={email}
							onChangeText={(email) => this.setState({ email })}
							onEndEditing={(e) => this.validateEmail(e.nativeEvent.text)}
							autoCapitalize='none'
						/>
					</View>
					{
						!isEmailValid ? <Alert text={'Email is not valid! e.g. ex@ex.com'} /> : null
					}


					<View style={[inputContainer, !isPassValid ? redShadow : null ]}>
						<Hideo
							iconClass={MaterialCommunityIcons}
							iconName={'key'}
							iconColor={'white'}
							iconBackgroundColor={'#1fb19c'}
							inputStyle={inputStyle}
							placeholder='password...'
							value={password}
							onChangeText={(password) => this.setState({ password })}
							onEndEditing={(e) => this.validatePassword(e.nativeEvent.text)}
							secureTextEntry
							autoCapitalize='none'
						/>
					</View>
				</View>
				{
					!isPassValid ? <Alert text={'Password should be at least 6 characters'} /> : null
				}


        <View style={buttonContainer}>
          <Button
						label={'Register'}
						onClick={this.onRegister}
						isLoading={this.state.isLoading}
					/>
        </View>

        <TouchableOpacity
					style={signUpButton}
					onPress={() => this.props.navigation.navigate('Login')}
				>
          <Text style={signUpText}>Already have an account? <Text style={boldText}>Login</Text></Text>
        </TouchableOpacity>

      </View>
    )
  }

	renderAlert() {
		const { showAlert } = this.state
		return (
			<AwesomeAlert
				show={showAlert}
				title={'Registeration Failed'}
				message={'Please make sure you have a good connection and try again.'}
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

	render() {
		return (
      <ImageBackground
        source={require('../../assets/splash.png')}
        style={{width: '100%', height: '100%' }}
      >
        { this.renderForm() }
				{ this.renderAlert() }
      </ImageBackground>

		)
	}
}

const styles = {
  formContainer: {
    top: '40%'
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
    fontFamily: 'Roboto-Medium',
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
    fontFamily: 'Roboto-Medium',
    fontWeight: '900'
  },
	inputStyle: {
		color: '#464949',
		fontFamily: 'Roboto-Medium'
	},
	inputContainer: {
		width: '80%',
		height: 48,
		alignSelf: 'center',
		opacity: 0.8,
		marginBottom: 10
	},
	redShadow: {
		shadowColor: 'red',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1,
		shadowRadius: 10,
	}
}
