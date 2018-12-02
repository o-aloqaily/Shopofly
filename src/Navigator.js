import React from 'react'
import { createTabNavigator, createStackNavigator } from 'react-navigation'
import Cart from './screens/Cart'
import Login from './screens/Login'
import Register from './screens/Register'
import Scan from './screens/Scan'
import Item from './screens/Item'
import Ionicons from 'react-native-vector-icons/Ionicons'


/*
* A navigator for the scan screen and item's page.
*/
const ScanNavigator = createStackNavigator({
  Scan: {
    screen: Scan,
    navigationOptions: {
      header: null
    }
  },
  Item: {
    screen: Item
  }
})


/*
* This is the Tab Navigator of our app,
* Which contains all tabs and related screens and configs
*/
const tabNavigator = createTabNavigator({
  Scan: {
    screen: ScanNavigator,
    navigationOptions: {
      header: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      header: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-cart' : 'ios-cart-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },

})



/*
* This is the main Navigator,
* If the user is logged in
* The user will be navigated to "App" through Login screen
* If not, the user will land on Login screen.
*/
const MyApp = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  },
  App: {
    screen: tabNavigator,
    navigationOptions: {
      header: null
    }
  },
})

export default MyApp
