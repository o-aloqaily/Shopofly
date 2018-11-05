import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Button } from '../components';



export default class Item extends Component {
  render() {
    const { navigation } = this.props;

    console.log("NAVIGATION: " + navigation);

    const { itemName,
            price,
            supplier,
            description,
            quantity,
            imageUrl } = navigation.getParam;

    console.log("PARAMS: " + navigation.state.params);

    const { container } = styles

    return (
      <View style={container}>
        <Card>
          <Text>TODO style this screen!!</Text>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});
