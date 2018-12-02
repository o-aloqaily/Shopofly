import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons';

const Alert = (props) => {
	const { viewStyles, textStyles, alertContainer } = styles
	return (
    <View style={alertContainer}>
      <View style={viewStyles}>
        <Feather name="alert-circle" size={24} color="white" />
        <Text style={textStyles}>{props.text}</Text>
      </View>
    </View>
	)
}

const styles = {
  viewStyles: {
    borderRadius: 20,
    backgroundColor: 'red',
    padding: 5,
    paddingLeft: 15,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    opacity: 0.7
  },
  textStyles: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Roboto-Medium'
  },
  alertContainer: {
    width: '80%',
    height: 35,
    alignSelf: 'center',
    marginBottom: 30,
  }
}

export { Alert }
