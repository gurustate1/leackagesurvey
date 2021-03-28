import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';

const AddtoCartBuyNow = ({addttocart, buyNow, isAvailable}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={addttocart}
        style={{
          elevation: 4,
          backgroundColor: isAvailable === true ? '#FC6748' : '#FC6748',
          borderRadius: 50,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '47%',
        }}>
        <Image
          style={{
            height: 50,
            width: 50,
            resizeMode: 'center',
          }}
        />
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            fontSize: 16,
            end: 10,
            color: isAvailable === true ? 'white' : 'white',
          }}>
          Add to bucket
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={buyNow}
        style={{
          backgroundColor: isAvailable === true ? '#251BCD' : '#6A3FB2',
          borderRadius: 50,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '47%',
          elevation: 4,
          alignSelf: 'center',
        }}>
        <Image
          style={{
            height: 50,
            width: 50,
            resizeMode: 'center',
          }}
        />
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            fontSize: 16,
            end: 10,
            color: isAvailable === true ? 'white' : 'white',
          }}>
          Buy Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddtoCartBuyNow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  addcardtouchable: {
    backgroundColor: '#DAEBF2',
    width: '50%',
  },
  addcarttext: {
    padding: 15,
    alignSelf: 'center',
    fontSize: 16,
  },
  buynowtouchable: {
    backgroundColor: '#4A608C',
    width: '50%',
  },
  buynowtext: {
    padding: 15,
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
  },
});
