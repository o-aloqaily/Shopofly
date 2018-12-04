import React from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { Button } from '../components'

export default class CheckoutAddress extends React.Component {
    state = {
        items: []
    }

    loadItems() {
		AsyncStorage.getItem('cart')
		.then((cart) => this.setState({ cart: JSON.parse(cart) }))
		.catch((error) => console.log(error))
	}

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', padding: 5, alignItems: 'center', width: '100%', flex: 1 }}>
                <View style={{ borderColor: '#0080ff', borderWidth: 2, padding: 20, borderRadius: 5, marginBottom: 20, width: '100%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Entypo
                            name={'location'}
                            size={18}
                            color='#333'
                        />
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 18, color: '#333', paddingLeft: 10 }}>Home</Text>
                    </View>
                    <View style={{ backgroundColor: '#ddd', height: 1, width: '100%', marginTop: 20, marginBottom: 20 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '15%' }}>
                          <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#ccc' }}>Name</Text>
                        </View>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#333', paddingLeft: 50 }}>Mohammed Alsa'don</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ width: '15%' }}>
                          <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#ccc' }}>Address</Text>
                        </View>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#333', paddingLeft: 50 }}>4043 Algamh, Al Wadi</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ width: '15%' }}>
                          <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#ccc' }}>Name</Text>
                        </View>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#333', paddingLeft: 50 }}>+966582863901</Text>
                    </View>

                </View>
                <Button width='100%' label='Add New Address' borderRadius={5} color='#ddd' labelColor='#333' />

                <View style={{ position: 'absolute', bottom: 10, width: '100%' }}>
                    <Button width='100%' label='Continue' borderRadius={5} onClick={() => this.props.navigation.navigate('CheckoutSummary')} />
                </View>
            </View>
        )    
    }
}