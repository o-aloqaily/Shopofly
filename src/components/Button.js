import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

const Button = (props) => {
	const { container } = styles

  const propsStyles = {
    width: props.width || '80%',
    height: props.height || 50,
    backgroundColor: props.color || '#1fb19c',
		borderRadius: props.borderRadius || 20,
		alignSelf: props.align || 'center',
		justifyContent: 'center',
  }

	const labelStyle = {
			alignSelf: 'center',
			fontFamily: 'Roboto-Medium',
			color: props.labelColor || 'white',
			fontSize: 20,
		}


	return (
    <TouchableOpacity
      style={propsStyles}
      onPress={props.onClick}
    >
      {
				props.isLoading ? <ActivityIndicator color={'white'}/> : <Text style={labelStyle}>{ props.label }</Text>
			}
    </TouchableOpacity>
	)


}

const styles = {
	labelStyle: {
		alignSelf: 'center',
		fontFamily: 'Roboto-Medium',
		color: 'white',
		fontSize: 20,
	}
}

export { Button }
