import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const Checkout = ({subtotal, checkoutpress, shopMore}) => {
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        <TouchableOpacity onPress={checkoutpress} style={styles.checoutText}>
          <Text style={{color: 'white', alignSelf: 'center'}}>Checkout</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{ width: 120 }}>
                <Text style={{ padding: 10, alignSelf: "center", fontSize: 22, fontWeight: "bold", color: 'white' }}>
                    {'\u20B9'} {subtotal}
                </Text>
                <Text style={{ alignSelf: "center", bottom: 10, fontSize: 12, color: "white" }}>
                    Sub Total
            </Text>
            </View> */}
      <View style={{justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={shopMore}
          style={{
            backgroundColor: '#6A3FB2',
            alignSelf: 'flex-end',
            padding: 12,
            width: 150,
            borderRadius: 5,
            justifyContent: 'flex-end',
          }}>
          <Text style={{color: 'white', alignSelf: 'center'}}>Shop More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Checkout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    height: 60,
    borderTopColor: 'grey',
    borderWidth: 0.5,
    elevation: 5,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'space-around',
  },
  checoutText: {
    //1186CC
    backgroundColor: '#FC6748',
    alignSelf: 'flex-end',
    padding: 12,
    width: 150,
    borderRadius: 5,
    justifyContent: 'flex-end',
  },
});
