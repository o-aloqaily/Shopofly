import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'


const MyApp = createStackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  },
  Register: {
    screen: Register
  }
}, {
  navigationOptions: {
    header: null
  }
})

export default MyApp
