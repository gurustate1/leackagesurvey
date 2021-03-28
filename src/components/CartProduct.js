import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const CartProduct = ({
  trackOrder,
  orderActive,
  cancleOrder,
  image,
  productname,
  productPrice,
  quantity,
  deleteval,
  increment,
  decrement,
  deletebtn,
  quantitynotincrese,
  orderDay,
  orderOnDate,
  orderOnTime,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity
          style={{
            padding: 10,
            justifyContent: 'flex-end',
          }}
          onPress={deleteval}>
          {deletebtn ? (
            orderActive === false ? (
              <Text style={{color: '#FF0000'}}>Order is canceled</Text>
            ) : null
          ) : (
            <Image
              source={require('../assets/delete.png')}
              style={{
                height: 30,
                marginTop: 5,
                marginEnd: 5,
                resizeMode: 'contain',
                width: 30,
                alignSelf: 'flex-end',
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* <Image source={{uri: image}} style={styles.productimg} /> */}
      <View style={{flexDirection: 'row', marginStart: 10}}>
        <View style={{width: 130, height: 130, marginStart: 10}}>
          {image === null ? (
            <Image
              source={require('../assets/glocerylogo.png')}
              style={styles.productimg}
            />
          ) : (
            <Image source={{uri: image}} style={styles.productimg} />
          )}
        </View>

        <View
          style={{
            alignSelf: 'center',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}>
          {quantitynotincrese ? (
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  paddingBottom: 12,
                  fontSize: 15,
                }}>
                Order on: {orderOnDate} - {orderOnTime}
              </Text>
            </View>
          ) : (
            <Text
              style={{alignSelf: 'center', marginTop: 10, paddingBottom: 12}}
            />
          )}
          {orderDay ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <TouchableOpacity
                onPress={trackOrder}
                style={{
                  width: '50%',
                  backgroundColor: '#4A608C',
                  borderBottomLeftRadius: 5,
                }}>
                <Text
                  style={{padding: 12, alignSelf: 'center', color: 'white'}}>
                  Track Order
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cancleOrder}
                style={{
                  width: '50%',
                  backgroundColor: '#DAEBF2',
                  borderBottomRightRadius: 5,
                }}>
                <Text style={{alignSelf: 'center', padding: 12}}>
                  Cancle Order
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <Text
            style={{
              fontSize: 18,
              alignSelf: 'center',
              maxWidth: 200,
              textAlign: 'center',
            }}>
            {productname}
          </Text>
          {quantitynotincrese ? (
            <View
              style={{
                marginBottom: 15,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 10,
              }}>
              <Text style={{alignSelf: 'center', fontSize: 20}}>
                (Quantity {quantity})
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 15,
              }}>
              <TouchableOpacity onPress={decrement} style={styles.incdectext}>
                <Image
                  source={require('../assets/minusicon.png')}
                  style={{
                    width: 30,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
              <Text style={{alignSelf: 'center', fontSize: 16}}>
                {quantity}
              </Text>
              <TouchableOpacity onPress={increment} style={styles.incdectext}>
                <Image
                  source={require('../assets/plusicon.png')}
                  style={{
                    width: 37,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          {productPrice === null ? (
            <Text style={styles.pricetext}>{'\u20B9'} 0</Text>
          ) : (
            <Text style={styles.pricetext}>
              {'\u20B9'} {productPrice}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default CartProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
  },
  productimg: {
    height: 120,
    resizeMode: 'contain',
    width: 120,
    alignSelf: 'flex-start',
  },
  pricetext: {
    fontSize: 22,
    alignSelf: 'center',
    color: '#266E73',
    marginBottom: 30,
    marginTop: 10,
  },
  incdectext: {
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
  },
});
