import React, { Component } from 'react'
import { ImageBackground, View, TouchableOpacity, Text, AsyncStorage, Spinner } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Hideo } from 'react-native-textinput-effects';
import { Button } from '../components'
import * as API from '../API'

export default class Login extends Component {
	state = {
		email: '',
		password: '',
		loading: false
	}

  onLogin = () => {
		this.setState({ loading: true })
    API.login(this.state.email, this.state.password)
    .then(async (token) => {
			if (token != undefined) {
				await AsyncStorage.setItem('token', token)
				this.props.navigation.navigate('Home')
			} else {
				alert('Error logging in')
			}
			this.setState({ loading: false })
    })
    .catch((error) => {
			console.log('An error occured while logging in.. Please try again.')
			this.setState({ loading: false })
		})
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
					onPress={() => this.props.navigation.navigate('Register')}
				>
          <Text style={signUpText}>Dont have an account? <Text style={boldText}>Sign Up</Text></Text>
        </TouchableOpacity>

      </View>
    )
  }

	render() {
		const { background } = styles
		return (
      <ImageBackground
        source={require('../../assets/splash.png')}
        style={{width: '100%', height: '100%' }}
      >
        { this.renderForm() }
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
