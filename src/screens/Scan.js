import React, { Component } from 'react';
import { Linking, Dimensions, Text, View, StyleSheet,
  TouchableOpacity, Image } from 'react-native';
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
            >
              <View style={styles.container}>
                <Text style={styles.description}>SCAN QR CODE</Text>
                <Image
                  style={styles.qr}
                  source={require('../../assets/scan.png')}
                />
              </View>
            </BarCodeScanner>

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
    // result.data !== this.state.lastScannedUrl
    if (true) {
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

const { width } = Dimensions.get('window')
const qrSize = width * 0.6
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  qr: {
    marginTop: '10%',
    marginBottom: '10%',
    width: qrSize,
    height: qrSize,
    alignSelf: 'center'
  },
  description: {
    fontSize: width * 0.09,
    marginTop: '10%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
    fontFamily: 'Roboto-Medium',
    alignSelf: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
});
