import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button } from '../components';



const Item = () => {
  //TODO Put dummy values instead of (this.props.navigation.state.params)
    const { itemName,
            price,
            supplier,
            description,
            quantity,
            imageUrl } = this.props.navigation.state.params

    const { container } = styles

		return (
      <View style={container}>
        <Card>
          <Text>TODO style this screen!!</Text>
        </Card>
      </View>
		)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export default Item
