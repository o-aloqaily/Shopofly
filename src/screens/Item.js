import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, Dimensions, AsyncStorage } from 'react-native'
import { Card, Button } from '../components'
import { SinglePickerMaterialDialog } from 'react-native-material-dialog'
import AwesomeAlert from 'react-native-awesome-alerts';


const dimensions = Dimensions.get('window')
const width = dimensions.width

export default class Item extends Component {
  state = {
    quantity: { label: '1', value: 1 },
    singlePickerVisible: false,
    showAlert: false
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.itemName
    }
  }

  async addToCart() {
    const { itemName,
            price,
            supplier,
            description,
            imageUrl } = this.props.navigation.state.params
    const itemToBeAdded = { itemName, price, supplier, description, quantity: this.state.quantity.value, imageUrl }

    // try {
      let items = await AsyncStorage.getItem('cart')
      items = JSON.parse(items)
      if (items == null || items == [] || !items) {
        items = []
        items.push(itemToBeAdded)
        await AsyncStorage.setItem('cart', JSON.stringify(items))
        .then(() => this.showAlert())
        return
      }

      // itemIsInCart = items.filter(e => e.itemName === itemToBeAdded.itemName).length > 0
      itemIsInCart = false
      for (let i in items) {
        if (items[i] != null) {
          if (items[i].itemName == itemToBeAdded.itemName) {
            itemIsInCart = true;
            break;
          }
        }
      }
      console.log(items)
      if (itemIsInCart) {
        for (let i in items) {
          if (items[i] != null) {
            if (items[i].itemName === itemToBeAdded.itemName) {
              items[i].quantity = parseInt(items[i].quantity) + 1
              await AsyncStorage.setItem('cart', JSON.stringify(items))
              .then(() => this.showAlert())
              break;
            }
          }
        }
      } else {
        items.push(itemToBeAdded)
        await AsyncStorage.setItem('cart', JSON.stringify(items))
        .then(() => this.showAlert())
      }
      await AsyncStorage.setItem('cart', JSON.stringify(items))
      .then(() => this.showAlert())
    // } catch (error) {
    //   // error handling. TODO.
    //   console.log('ERROR')
    // }
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    })
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    })
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
      <View style={{ flex: 1}}>
      <ScrollView style={container}>
        <Image
          style={ styles.image }
          source={{uri: imageUrl }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.supplier} > From { supplier } </Text>
          <Text style={styles.title} > {  itemName } </Text>
          <View style={styles.priceLayerContainer}>
            <Text style={styles.price} > { price } </Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>BLACK FRIDAY DEAL</Text>
            </View>
          </View>
        </View>
        <View style={styles.line} />
        <View style={[styles.infoContainer, styles.addToCartContainer]}>
          <Button label={this.state.quantity.value} color={'#f1f1f1'} borderRadius={5} width={'20%'} onClick={() => this.setState({ singlePickerVisible: true })} labelColor={'#545454'} />
          <Button label={'ADD TO CART'} borderRadius={5} width={'78%'} onClick={() => this.addToCart()} />
        </View>
        <View style={styles.line} />
        <View style={styles.infoContainer}>
        <Text style={styles.title} >Description</Text>
        <Text style={styles.desc} > { description } </Text>
        </View>
        <SinglePickerMaterialDialog
          title={'Choose quantity'}
          items={[{ label: '1', value: 1 }, { label: '2', value: 2 },{ label: '3', value: 3},{ label: '4', value: 4},{ label: '5', value: 5}]}
          visible={this.state.singlePickerVisible}
          selectedItem={this.state.quantity}
          onCancel={() => this.setState({ singlePickerVisible: false })}
          onOk={result => {
            this.setState({ singlePickerVisible: false });
            this.setState({ quantity: result.selectedItem });
          }}
        />
      </ScrollView>
      <AwesomeAlert
        show={this.state.showAlert}
        title={'Added Item!'}
        message={'Item has been added to cart!'}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#1fb19c"
        onConfirmPressed={() => this.hideAlert()}
        messageStyle={{ textAlign: 'center' }}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  image: {
    height: 300,
    width: width,
  },
  title: {
    marginTop: 10,
    fontFamily: 'Roboto-Medium',
    fontSize: 22,
    color: '#202020'
  },
  desc: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    marginTop: 10,
    color: '#545454',
  },
  supplier: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#1fb19c'
  },
  price: {
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
    color: '#202020',
  },
  line: {
    backgroundColor: '#ddd',
    height: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  priceLayerContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  tag: {
    backgroundColor: '#66b266',
    borderRadius: 5,
    padding: 5,
    height: 25,
    alignSelf: 'center'
  },
  tagText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: 'white',
  },
  infoContainer: {
    padding: 10
  },
  addToCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
