import React from 'react'
import { createTabNavigator, createStackNavigator } from 'react-navigation'
import Cart from './screens/Cart'
import Login from './screens/Login'
import Register from './screens/Register'
import Scan from './screens/Scan'
import CheckoutAddress from './screens/CheckoutAddress'
import CheckoutSummary from './screens/CheckoutSummary'
import OrderPlaced from './screens/OrderPlaced'
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
* A navigator for the cart and checkout
* screen
*/
const CartNavigator = createStackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: {
      title: 'Cart'
    }
  },
  CheckoutAddress: {
    screen: CheckoutAddress,
    navigationOptions: {
      title: 'Choose Delivery Address'
    }
  },
  CheckoutSummary: {
    screen: CheckoutSummary,
    navigationOptions: {
      title: 'Order Summary'
    }
  },
  OrderPlaced: {
    screen: OrderPlaced,
    navigationOptions: {
      header: null
    }
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
    screen: CartNavigator,
    navigationOptions: {
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
