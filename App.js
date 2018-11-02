import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyApp from './src/Navigator'
import { Font } from 'expo';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Coves-Bold': require('./assets/fonts/CovesBold.otf'),
      'Coves-Light': require('./assets/fonts/CovesLight.otf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      this.state.fontLoaded ? <MyApp /> : null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
