import React, { Component } from 'react'
import { ImageBackground, View, TouchableOpacity, Text, AsyncStorage } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Hideo } from 'react-native-textinput-effects';
import { Card, Button, Divider } from '../components'
import * as API from '../API'

export default class Login extends Component {
	state = {
    email: '',
    password: ''
	}

  onLogin = async (email, password) => {
    API.login(email, password)
    .then((token) => {
      await AsyncStorage.setItem('token', token)
    })
    .catch((error) => console.log('An error occured while logging in.. Please try again.'))
  }

  onRegister = () => {

  }

  renderForm() {
    return (
      <View style={formContainer}>

        <View style={inputContainer}>
          <Hideo
            iconClass={MaterialCommunityIcons}
            iconName={'email'}
            iconColor={'white'}
            iconBackgroundColor={'#1fb19c'}
            inputStyle={{ color: '#464949', fontFamily: 'Coves-Bold' }}
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
            inputStyle={{ color: '#464949', fontFamily: 'Coves-Bold' }}
            placeholder='password...'
            value={password}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry
            autoCapitalize='none'
          />
        </View>

        <View style={buttonContainer}>
          <Button label={'Login'} />
        </View>

        <TouchableOpacity style={signUpButton}>
          <Text style={signUpText}>Dont have an account? <Text style={boldText}>Sign Up</Text></Text>
        </TouchableOpacity>


      </View>
    )
  }

	render() {
		const { background, inputContainer, buttonContainer, formContainer,
              signUpButton, signUpText, dividerContainer, boldText } = styles
		const { email, password } = this.state
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
  inputContainer: {
    width: '80%',
    height: 48,
    alignSelf: 'center',
    opacity: 0.8,
    marginBottom: 10
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
  }
}
