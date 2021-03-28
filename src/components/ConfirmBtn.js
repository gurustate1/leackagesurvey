import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

export const ConfirmBtn = ({
  textValue,
  onPressConfirm,
  bottom,
  contactus,
  payment,
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: bottom ? bottom : 20,
        end: 10,
        alignSelf: 'flex-end',
        width: '50%',
      }}>
      <TouchableOpacity
        onPress={payment ? onPressConfirm : contactus}
        style={styles.textValueStyle}>
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 16}}>
          {textValue}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ConfirmBtn;
const styles = StyleSheet.create({
  textValueStyle: {
    backgroundColor: '#6A3FB2',
    alignSelf: 'center',
    padding: 15,
    width: 150,
    borderRadius: 55,
    width: '90%',
  },
  checoutText: {
    backgroundColor: '#67C3FF',
    alignSelf: 'center',
    padding: 10,
    width: 150,
    borderRadius: 5,
  },
});
