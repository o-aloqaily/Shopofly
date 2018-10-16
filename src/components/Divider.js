import React from 'react'
import { View } from 'react-native'

const Divider = (props) => {
  const propsStyles = {
    width: props.width
  }

  const divider = {
    backgroundColor: 'white',
    opacity: 0.7,
    height: 1,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  }

	return (
    <View style={[propsStyles, divider]} />
	)
}

export { Divider }
