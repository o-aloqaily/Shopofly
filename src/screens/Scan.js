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

      //TODO remove debug
      console.log(result.data)

      //TODO check if we need this condition
      if(/*scannedText &&*/ scannedText.toLowerCase().includes("shopofly")) {
        API.getItem(result.data)
        .then(async (response) => {
          const itemName = response.itemName
          const price = response.price
          const itemDescription = response.description

          const firstLine = `name: ${itemName}`
          const secondLine = `price: ${price}`
          const thirdLine = `description: ${itemDescription}`

          const fullDescription = firstLine + "\n" + secondLine + "\n\n" + thirdLine
          this.showAlert(fullDescription)
        }).catch((error) => {})
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

  //TODO check if this code is useful
  _maybeRenderUrl = () => {
    console.log("Maybe Render Url...")
    if (!this.state.lastScannedUrl) {
      return;
    }
    console.log("IT IS URL!! RENDER IT!!")
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});
