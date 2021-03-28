import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const ShoppingProduct = ({
  hidebutton,
  productname,
  productprice,
  onPressCart,
  image,
  available,
  OfferPrice,
  offpercent,
}) => {
  return (
    <View style={{paddingStart: 22, paddingEnd: 22}}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: hidebutton ? 10 : 0,
          elevation: 2,
          borderBottomEndRadius: 10,
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
          borderColor: 'lightgrey',
          borderWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderBottomStartRadius: 10,
        }}>
        <View style={{padding: 10, width: '100%', alignSelf: 'flex-end'}}>
          {available ? (
            <TextTicker
              style={{
                fontSize: 15,
                marginStart: 10,
                color: '#FF0000',
                marginBottom: 15,
              }}
              duration={10000}
              loop
              repeatSpacer={10}
              marqueeDelay={100}>
              This Product is not available at this time. try some times later.
            </TextTicker>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <View style={{justifyContent: 'center', width: '70%'}}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 16,
                maxWidth: 300,
                textAlign: 'center',
              }}>
              {productname}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 20,
                  color: '#266E73',
                  fontWeight: 'bold',
                }}>
                {'\u20B9'} {productprice} Rs.
              </Text>
            </View>
          </View>

          {hidebutton ? (
            <View />
          ) : (
            <TouchableOpacity
              onPress={onPressCart}
              style={styles.buynowtouchable}>
              <Text style={{padding: 13, alignSelf: 'center', color: 'white'}}>
                Add to Bucket
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
export default ShoppingProduct;

const styles = StyleSheet.create({
  buynowtouchable: {
    backgroundColor: '#6A3FB2',
    borderRadius: 10,
    bottom: 10,
    alignSelf: 'center',
    end: 5,
    justifyContent: 'center',
    borderBottomStartRadius: 10,
  },
});
