import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const ProductSuggetion = ({
  productname,
  price,
  onPressBuyNow,
  image,
  available,
}) => {
  return (
    <View style={{marginTop: 10, padding: 5, marginEnd: 2}}>
      <View style={styles.childContainer}>
        <Text
          style={{
            alignSelf: 'flex-end',
            fontSize: 12,
            color: '#FF0000',
            marginTop: 5,
            marginEnd: 5,
          }}>
          {available}
        </Text>
        {/* <Image source={{ uri: image }} style={styles.imageproduct}> */}
        <Image
          source={require('../assets/glocerylogo.png')}
          style={styles.imageproduct}
        />
        {/* </Image> */}
        <View
          style={{
            justifyContent: 'center',
            marginTop: 7,
            height: 62,
            marginBottom: 10,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: 10,
              maxWidth: 150,
            }}>
            {productname}
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              color: '#266E73',
              marginTop: 2,
              marginBottom: 12,
            }}>
            {'\u20B9'} {price}
          </Text>
        </View>
        {/* <TouchableOpacity onPress={onPressBuyNow} style={styles.buynowtouchable}>
                    <Text style={{ padding: 12.5, alignSelf: "center", color: 'white' }}>
                        Buy Now
                        </Text>
                </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ProductSuggetion;

const styles = StyleSheet.create({
  childContainer: {
    width: 170,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderColor: '#1186CC',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  imageproduct: {
    height: 130,
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 100,
  },
  buynowtouchable: {
    backgroundColor: '#8DB580',
    marginTop: 12,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
});
