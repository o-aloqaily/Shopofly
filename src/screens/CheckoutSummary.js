import React from 'react'
import { ScrollView, View, Text, AsyncStorage } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { Button, CartItem } from '../components'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as Global from '../Global.js'

export default class CheckoutAddress extends React.Component {
    state = {
        cart: [],
        singlePickerVisible: false,
        name: '',
        address: '',
        mobile_number: '',
        subtotal: 0,
        vatApprox: 0,
        totalPrice: 0
    }

    componentWillMount() {
        this.loadItems()

        const { name, address, mobile_number } = this.props.navigation.state.params.selectedAddress

        this.setState({ name, address, mobile_number })

    }

    loadItems() {
      AsyncStorage.getItem('cart')
    	.then((cart) => {
        console.log(cart);

        this.setState({ cart: JSON.parse(cart) })
        this.loadPriceInfo()

        console.log(this.state.cart);
      })
    	.catch((error) => console.log(error))
    }

    loadPriceInfo() {
      const subtotal = this.getSubtotal()
      const vatApprox = this.getVatApprox(subtotal)
      const totalPrice = subtotal + vatApprox

      this.setState({ subtotal, vatApprox, totalPrice })
    }
    getSubtotal() {
        let subtotal = 0

        for (let item of this.state.cart) {
            if (item.price) {
                 subtotal = subtotal + parseInt(item.price.substring(1)) * parseInt(item.quantity)

            }
        }

        return subtotal
    }

    getVatApprox(subtotal) {
      let vatApprox = Global.vat * subtotal
      vatApprox = Math.round(vatApprox * 100) / 100
      return vatApprox
    }

    placeOrder = async () => {
		await AsyncStorage.setItem('cart', JSON.stringify([]))
        this.props.navigation.navigate('OrderPlaced')
	}

  showPicker = () => {
		this.setState({ singlePickerVisible: true })
	}

  hidePicker = () => {
		this.setState({ singlePickerVisible: false })
	}

  updateQuantity = (itemName, newQty) => {
		let newCart = this.state.cart
		for (let i in newCart) {
			if (newCart[i].itemName == itemName) {
				newCart[i].quantity = newQty
				return;
			}
		}
		this.setState({ cart: newCart });
	}

    render() {
        var radio_props = [
            {label: 'Credit Card', value: 0 },
            {label: 'Cash on Delivery', value: 1 }
          ]
        return (
            <ScrollView
                style={{ backgroundColor: 'white', flex: 1, padding: 20 }}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 24, color: '#333', marginBottom: 20 }}>Payment Method</Text>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    onPress={() => console.log('a')}
                />
                <View style={styles.line} />
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 24, color: '#333', marginBottom: 20 }}>Deliver To</Text>
                <View style={{ flexDirection: 'row' }}>
                        <Entypo
                            name={'location'}
                            size={14}
                            color='#333'
                        />
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#333', paddingLeft: 10 }}>Home</Text>
                </View>
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#ccc',  }}>{this.state.name}</Text>
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#ccc', }}>{this.state.address}</Text>
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#ccc', }}>{this.state.mobile_number}</Text>
                <View style={styles.line} />
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 24, color: '#333', marginBottom: 20 }}>Review</Text>
                {
					this.state.cart ? this.state.cart.map((item, index) => {
						return (
							item ? <CartItem
								item={item}
								key={index}
								quantity={{ label: item.quantity+'', value: item.quantity }}
                showPicker={this.showPicker}
								hidePicker={this.hidePicker}
                singlePickerVisible={this.state.singlePickerVisible}
								// updateQuantity={this.updateQuantity}
                checkout
							/> : null
						)
					}) : null
                }
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '35%' }}>
                          <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: '#333' }}>SubTotal Price</Text>
                        </View>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#333', paddingLeft: 50 }}>${this.state.subtotal}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '35%' }}>
                          <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: '#333' }}>Shipping Rate</Text>
                        </View>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#333', paddingLeft: 50 }}>FREE</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '35%' }}>
                          <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: '#333' }}>VAT Approx.</Text>
                        </View>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#333', paddingLeft: 50 }}>${this.state.vatApprox}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '35%' }}>
                          <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: '#333' }}>Total Price</Text>
                        </View>
                        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 14, color: '#333', paddingLeft: 50 }}>${this.state.totalPrice}</Text>
                    </View>
                    <View style={styles.line} />
                    <Button width='100%' label='Confirm Order' borderRadius={5} onClick={() => this.placeOrder()} />



            </ScrollView>
        )
    }
}

const styles = {
    line: {
        backgroundColor: '#ddd',
        height: 1,
        width: '100%',
        marginTop: 20,
        marginBottom: 20
      },
}
