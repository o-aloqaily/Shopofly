import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { Card, Button } from '../components';

const dimensions = Dimensions.get('window')
const width = dimensions.width


export default class Item extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.itemName
    }
  }

  render() {

    const { navigation } = this.props;
    const { container } = styles
    console.log("NAVIGATION: " + navigation);

    const { itemName,
            price,
            supplier,
            description,
            quantity,
            imageUrl } = this.props.navigation.state.params;

    console.log(imageUrl);
    console.log("PARAMS: " + navigation.state.params);

    return (
      <View style={container}>
        <Image
          style={ styles.image }
          source={{uri: imageUrl }}
        />
        <View style={styles.infoContainer}>
          <Text style ={styles.title} > {  itemName } </Text>
          <Text style ={styles.desc} > { description } </Text>
          <View style={styles.supplierPriceContainer}>
            <Text style ={styles.text} > { price } </Text>
            <Text style ={styles.text} > { supplier } </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#f1f1f1',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  image: {
    height: 300,
    width: width,
  },
  title: {
    fontFamily: 'Coves-Bold',
    fontSize: 32,
    color: '#1fb19c'
  },
  desc: {
    fontFamily: 'Coves-Light',
    fontSize: 20,
    marginTop: 10,
    color: '#545454'
  },
  text: {
    fontFamily: 'Coves-Bold',
    fontSize: 20,
    color: '#1fb19c'
  },
  infoContainer: {
    padding: 20
  },
  supplierPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  }
});
