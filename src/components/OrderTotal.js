import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const OrderTotal = ({}) => {
  return (
    <View style={{padding: 20}}>
      <TextInput
        placeholderTextColor="#6A3FB2"
        style={styles.textinputaddress}
        placeholder="1052/6, Sec 8/E, Gandhi Nagar."
      />
    </View>
  );
};
export default OrderTotal;
const styles = StyleSheet.create({
  parrentview: {
    padding: 10,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  edittouchable: {
    backgroundColor: '#4A608C',
    padding: 10,
    width: 70,
    borderRadius: 5,
  },
  textinputaddress: {
    borderColor: '#4A608C',
    borderWidth: 1,
    borderRadius: 5,
    paddingStart: 15,
  },
});
