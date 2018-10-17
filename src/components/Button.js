import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

const Button = (props) => {
	const { container, labelStyle } = styles

  const propsStyles = {
    width: props.width,
    height: props.height,
    backgroundColor: props.color
  }

	return (
    <TouchableOpacity
      style={[container]}
      onPress={props.onClick}
    >
      {
				props.isLoading ? <ActivityIndicator color={'white'}/> : <Text style={labelStyle}>{ props.label }</Text>
			}
    </TouchableOpacity>
	)
}

const styles = {
  container: {
    borderRadius: 20,
    width: '80%',
    height: 48,
    backgroundColor: '#1fb19c',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    alignSelf: 'center',
    fontFamily: 'Coves-Bold',
    color: 'white',
    fontSize: 20,
  }
}

export { Button }
