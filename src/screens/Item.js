import React from 'react'
import { View } from 'react-native'
import { Card, Button } from '../components';



const Item = (props) => {

    // Destructuring
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
          // TODO put the full info of the item
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
