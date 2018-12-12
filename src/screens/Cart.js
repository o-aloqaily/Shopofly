import React, { Component } from 'react'
import { Text, AsyncStorage, View, ScrollView, RefreshControl } from 'react-native'
import { getUserInfo } from '../API'
import { Button, CartItem } from '../components'
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Cart extends Component {
	state = {
		cart: [],
		singlePickerVisible: false,
		refreshing: false,
		showAlert: false,
		itemToBeDeleted: '',
		total: 0,
	}

	componentDidMount() {
		this.didFocusListener = this.props.navigation.addListener(
		  'didFocus',
		  () => { this.loadItems() },
		)
	}

	deleteItemFromStorage = async (itemName) => {
		await AsyncStorage.getItem('cart').then((cart) => {
			let newCart = JSON.parse(cart)
			for (let i in newCart) {
				if (newCart[i] != null) {
					if (newCart[i].itemName == itemName) {
						newCart[i] = null
						break;
					}
				}
			}
			AsyncStorage.setItem('cart', JSON.stringify(newCart)).then(() => {
				this.hideAlert()
				this.loadItems()
			})
			this.setState({ cart: newCart })
		})
	}

	deleteItem = (itemName) => {
		this.setState({ itemToBeDeleted: itemName, showAlert: true })
	}

	hidePicker = () => {
		this.setState({ singlePickerVisible: false })
	}

	showPicker = () => {
		this.setState({ singlePickerVisible: true })
	}

	loadItems() {
		AsyncStorage.getItem('cart')
		.then((cart) => this.setState({ cart: JSON.parse(cart), showAlert: false }))
		.catch((error) => console.log(error))
	}

	showAlert = () => {
		this.setState({
			showAlert: true
		})
	}

	hideAlert = () => {
		this.setState({
			showAlert: false
		})
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

	deleteFromCart = () => {
		this.setState({ showAlert: false }, () => this.deleteItemFromStorage(this.state.itemToBeDeleted))
	}

	render() {
		return (
			<ScrollView
				style={{ backgroundColor: 'white', height: '100%', width: '100%', flex: 1, }}
				contentContainerStyle={{ flex: 1 }}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this.loadItems.bind(this)}
					/>
				}
			>
				{
					this.state.cart ? this.state.cart.map((item, index) => {
						return (
							item ? <CartItem
								item={item}
								key={index}
								showPicker={this.showPicker}
								hidePicker={this.hidePicker}
								quantity={{ label: item.quantity+'', value: item.quantity }}
								singlePickerVisible={this.state.singlePickerVisible}
								updateQuantity={this.updateQuantity}
								deleteItem={(itemName) => this.deleteItem(itemName)}
								showDeleteAlert={this.showAlert}
							/> : null
						)
					}) : <Text style={{ color: 'black', alignSelf: 'center', marginTop: 200 }}>Your cart is empty.</Text>
				}
				{
					this.state.cart && this.state.cart.length > 0 ? <Button label='Checkout' borderRadius={5} onClick={() => this.props.navigation.navigate('CheckoutAddress')} /> : null
				}
				<AwesomeAlert
					show={this.state.showAlert}
					title={'Delete Item?'}
					message={'Item has been added to cart!'}
					closeOnTouchOutside={true}
					closeOnHardwareBackPress={true}
					showConfirmButton={true}
					confirmText="Yes"
					confirmButtonColor="#1fb19c"
					cancelText="Cancel"
					onCancelPressed={() => this.hideAlert()}
					onConfirmPressed={this.deleteFromCart}
					messageStyle={{ textAlign: 'center' }}
				/>
			</ScrollView>
		)
	}
}
