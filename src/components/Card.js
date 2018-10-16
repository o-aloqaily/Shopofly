import React from 'react'
import { View } from 'react-native'

const Card = (props) => {
	return (
    <View style={[props.style, { backgroundColor: 'white', borderRadius: 20}]}>
      { props.children }
    </View>
	)
}

export { Card }
