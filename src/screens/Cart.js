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
		itemToBeDeleted: ''
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
		})
	}

	deleteItem = (itemName) => {
		this.setState({ itemToBeDeleted: itemName })
		this.showAlert()
	}

	hidePicker = () => {
		this.setState({ singlePickerVisible: false })
	}

	showPicker = () => {
		this.setState({ singlePickerVisible: true })
	}

	loadItems() {
		AsyncStorage.getItem('cart')
		.then((cart) => this.setState({ cart: JSON.parse(cart) }))
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

	render() {
		console.log();
		return (
			<ScrollView style={{ backgroundColor: 'white', flex: 1 }}
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
								deleteItem={this.deleteItem}
								showDeleteAlert={this.showAlert}
							/> : null
						)
					}) : null
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
					onConfirmPressed={() => this.deleteItemFromStorage(this.state.itemToBeDeleted)}
					messageStyle={{ textAlign: 'center' }}
				/>
			</ScrollView>
		)
	}
}
