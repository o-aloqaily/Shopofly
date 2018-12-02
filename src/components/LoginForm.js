import React, { Component } from 'react'
import { View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Hideo } from 'react-native-textinput-effects';

const LoginForm = (props) => {

		const { inputContainer, inputStyle } = styles
		return (
      <View>
        <View style={inputContainer}>
          <Hideo
            iconClass={MaterialCommunityIcons}
            iconName={'email'}
            iconColor={'white'}
            iconBackgroundColor={'#1fb19c'}
            inputStyle={inputStyle}
            placeholder='email address...'
            value={props.email}
            onChangeText={(email) => props.updateEmail(email)}
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
            value={props.password}
            onChangeText={(password) => props.updatePassword(password)}
            secureTextEntry
            autoCapitalize='none'
          />
        </View>
      </View>
		)
}

const styles = {
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
}

export { LoginForm }
