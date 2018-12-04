import React from 'react'
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Button } from '../components'

export default class CheckoutAddress extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="md-checkmark" size={64} color="#00e600" />
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 24, color: '#333' }}>Order placed!</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                    <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16, color: '#0080ff', marginTop: 20 }}>Click here to go back to cart</Text>
                </TouchableOpacity>
            </View>
        )    
    }
}