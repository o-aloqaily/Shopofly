import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import Scan from './screens/Scan'
import Item from './screens/Item'


const MyApp = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Scan: {
    screen: Scan,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Home,
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
  Item: {
    screen: Item
  }
})

export default MyApp
