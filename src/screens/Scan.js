import React, { Component } from 'react';
import { Linking, Dimensions, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import AwesomeAlert from 'react-native-awesome-alerts';
import * as API from '../API'

export default class App extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
    showAlert: false,
    alertMessage: '',
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  render() {
    if (this.state.hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    } else if (this.state.hasCameraPermission === false) {
        return <Text style={{ color: '#fff' }}>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}
            />

            <AwesomeAlert
            	show={this.state.showAlert}
            	title={"ITEM DESCRIPTION"}
            	message={this.state.alertMessage}
            	closeOnTouchOutside={true}
            	closeOnHardwareBackPress={true}
            	showConfirmButton={true}
            	confirmButtonColor="#448AFF"
            	confirmText="Preview"
              onConfirmPressed={() => this.loadItem()}
              cancelButtonColor="#FF5722"
            	cancelText="Close"
              onCancelPressed={() => this.hideAlert()}
              showCancelButton={true}
            	messageStyle={{ textAlign: 'left' }}
            />
        </View>
    );
  }

  // Handle QR code reader output
  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      this.setState({ lastScannedUrl: result.data })

      const scannedText = result.data
      const regex = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')
      if(regex.test(scannedText) && scannedText.toLowerCase().includes("shopofly")) {
        API.getItem(scannedText)
        .then(async (response) => {
          const itemName = response.itemName
          const price = response.price
          const supplier = response.supplier.supplierName

          const firstLine = `name: ${itemName}`
          const secondLine = `price: ${price}`
          const thirdLine = `supplier: ${supplier}`

          const fullDescription = firstLine + "\n" + secondLine + "\n" + thirdLine
          this.showAlert(fullDescription)
        })
        .catch((error) => {})
      }
    }
  }

  showAlert = (message) => {
    this.setState({
      showAlert: true,
      alertMessage: message
    })
  }

  hideAlert = () => {
    this.setState({
      showAlert: false,
      lastScannedUrl: null
    })
  }

  loadItem = () => {
    // TODO save item data from the first API request ()
    API.getItem(this.state.lastScannedUrl)
    .then(async (response) => {
      const itemName = response.itemName
      const price = response.price
      const supplier = response.supplier.supplierName
      const description = response.description
      const quantity = response.quantity
      // TODO pass all images to item.
      const imageUrl = response.image_url[0]

      this.props.navigation.navigate('Item', { itemName, price, supplier, description, quantity, imageUrl })
      this.hideAlert()
    })
    .catch((error) => {})
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
