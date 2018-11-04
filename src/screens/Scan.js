import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
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

    // If permission is granted:
    return (
        <View style={styles.container}>
            // TODO enhance qr code reader looks
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}
            />

            // TODO add onCancel and Cancel button to the alerts
            /***
            * 1- A button to load item page
            * 2- A button to close alert
            *
            * Note: you will create a loadItem() method to redirect to the screen "Item.js"
            */
            <AwesomeAlert
            	show={this.state.showAlert}
            	title={"ITEM DESCRIPTION"}
            	message={this.state.alertMessage}
            	closeOnTouchOutside={true}
            	closeOnHardwareBackPress={true}
            	showConfirmButton={true}
              // show*****Button={true} <--- ??
            	confirmText="OK"
            	confirmButtonColor="#1fb19c"
            	onConfirmPressed={() => this.hideAlert()}
            	messageStyle={{ textAlign: 'left' }}
            />
        </View>
    );
  }

  // Handle QR code reader output
  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring()
      this.setState({ lastScannedUrl: result.data })

      const scannedText = result.data
      const regex = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')
      if(regex.test(scannedText) && scannedText.toLowerCase().includes("shopofly")) {
        API.getItem(scannedText)
        .then(async (response) => {
          const itemName = response.itemName
          const price = response.price
          const supplier = response.supplier.supplierName
          const itemDescription = response.description

          const firstLine = `name: ${itemName}`
          const secondLine = `price: ${price}`
          const thirdLine = `supplier: ${supplier}`

          const fourthLine = `description: ${itemDescription}`

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});
