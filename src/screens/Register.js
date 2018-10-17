import React, { Component } from 'react'
import { ImageBackground, View, TouchableOpacity, Text, AsyncStorage } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Hideo } from 'react-native-textinput-effects';
import { Button } from '../components'
import * as API from '../API'

export default class Register extends Component {
	state = {
		email: '',
		password: '',
    name: '',
    address: '',
    phoneNumber: ''
	}

  onRegister = () => {
    data = this.state
    API.register(data)
    .then(async (token) => {
			if (token != undefined) {
				await AsyncStorage.setItem('token', token)
				this.props.navigation.navigate('Home')
			}
			else {
				alert('Invalid input. Your password must be at least 6 characters and email must be formatted right.')
			}
    })
    .catch((error) => console.log('An error occured while registration.. Please try again.', error))
  }

  renderForm() {
		const { email, password, address, name, phoneNumber } = this.state
		const { buttonContainer, formContainer, signUpButton, signUpText, boldText, inputContainer, inputStyle } = styles
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

          <View style={inputContainer}>
            <Hideo
              iconClass={MaterialCommunityIcons}
              iconName={'key'}
              iconColor={'white'}
              iconBackgroundColor={'#1fb19c'}
              inputStyle={inputStyle}
              placeholder='phone number...'
              value={phoneNumber}
              onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
              autoCapitalize='none'
            />
          </View>

          <View style={inputContainer}>
            <Hideo
              iconClass={MaterialCommunityIcons}
              iconName={'account-location'}
              iconColor={'white'}
              iconBackgroundColor={'#1fb19c'}
              inputStyle={inputStyle}
              placeholder='address... (optional)'
              value={address}
              onChangeText={(address) => this.setState({ address })}
            />
          </View>

				</View>

        <View style={buttonContainer}>
          <Button
						label={'Register'}
						onClick={this.onRegister}
						isLoading={this.state.loading}
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
    top: 260
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
