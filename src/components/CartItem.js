import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SinglePickerMaterialDialog } from 'react-native-material-dialog'
import { Button } from './Button'
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
  const { imageUrl, itemName, price, quantity, supplier } = props.item
	const { itemContainer, imgContainer, img, nameStyle, infoContainer, supplierStyle, priceStyle } = styles
	return (
    <View>
      <View style={ props.checkout ? { flexDirection: 'row', justifyContent: 'space-between' } : itemContainer}>
        <View style={infoContainer}>
          <Text style={nameStyle}>{ itemName }</Text>
          <Text style={priceStyle}>{ price }</Text>
          <Text style={supplierStyle}>Sold by { supplier }</Text>
          <View style={{ flexDirection: 'row' }}>
            <Button
              label={props.quantity.label}
              color={'#f1f1f1'}
              borderRadius={5}
              width={50}
              onClick={() => props.showPicker()}
              labelColor={'#545454'}
              align={'flex-start'}
            />
            {
              props.checkout ? null : 
              <TouchableOpacity onPress={() => props.deleteItem(itemName)} style={{ width: 50, height: 50, backgroundColor: '#ff6666', marginLeft: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="ios-trash" size={32} color="white" />
              </TouchableOpacity>
            }
          </View>
        </View>
        <View style={imgContainer}>
          <Image style={img} source={{uri: imageUrl}} />
        </View>
      </View>
      <View style={{ alignItems: 'flex-start'}}>
      </View>
      {
        props.checkout ? null : 
        <SinglePickerMaterialDialog
        title={'Choose quantity'}
        items={[{ label: '1', value: 1 }, { label: '2', value: 2 }]}
        visible={props.singlePickerVisible}
        selectedItem={props.quantity}
        onCancel={() => props.hidePicker() }
        onOk={result => {
          console.log(result.selectedItem)
          props.hidePicker()
          props.updateQuantity(itemName, result.selectedItem.value );
        }}
      />
      }
      <View style={styles.line} />
    </View>

	)
}

const styles = {
  itemContainer: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imgContainer: {
    borderRadius: 100,
    width: 150,
    height: 150,
    overflow: 'hidden'
  },
  img: {
    width: 150,
    height: 150
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  nameStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#202020'
  },
  supplierStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    color: '#202020',
    marginTop: 20,
    marginBottom: 5
  },
  priceStyle: {
    marginTop: 10,
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    color: '#202020'
  },
  line: {
    backgroundColor: '#ddd',
    height: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
}

export { CartItem }
