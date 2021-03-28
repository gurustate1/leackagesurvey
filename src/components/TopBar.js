import React from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const TopBar = ({
  counter,
  product,
  onPressCart,
  title,
  onBack,
  titlewithcart,
  shop,
  opensearch,
  openFilter,
  onPressDrawer,
  home,
  onPressSearch,
}) => {
  return (
    <View style={{padding: 15, backgroundColor: 'white'}}>
      {shop ? (
        <View style={styles.childContainer}>
          <TouchableOpacity
            style={{height: 30, width: 30, justifyContent: 'center'}}
            onPress={onPressDrawer}>
            <Image
              source={require('../assets/nav.png')}
              style={{
                height: 32,
                resizeMode: 'contain',
                width: 50,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              alignSelf: 'center',
              fontSize: 17,
              alignSelf: 'center',
              paddingStart: 10,
            }}>
            {titlewithcart}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                height: 30,
                alignSelf: 'center',
                justifyContent: 'flex-start',
              }}
              onPress={onPressCart}>
              <Image
                source={require('../assets/addtocart.png')}
                style={{
                  alignSelf: 'center',
                  height: 30,
                  resizeMode: 'contain',
                  width: 45,
                }}
              />
              {counter === 0 ? (
                <View />
              ) : (
                <View
                  style={{
                    bottom: 32,
                    justifyContent: 'center',
                    alignSelf: 'flex-end',
                    height: 18,
                    width: 18,
                    backgroundColor: '#1186CC',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{alignSelf: 'center', color: 'white', fontSize: 9}}>
                    {counter}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : title ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={onBack}
            style={{
              height: 25,
              width: 50,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/backarrow.png')}
              style={{
                height: 30,
                resizeMode: 'contain',
                width: 30,
                alignSelf: 'flex-start',
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              alignSelf: 'center',
              fontSize: 17,
              alignSelf: 'center',
              marginEnd: 35,
            }}>
            {title}
          </Text>
          <View />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {product ? (
            <TouchableOpacity
              onPress={onBack}
              style={{
                height: 25,
                width: 50,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/backarrow.png')}
                style={{
                  height: 30,
                  resizeMode: 'contain',
                  width: 30,
                  alignSelf: 'flex-start',
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{height: 30, width: 40, justifyContent: 'center'}}
              onPress={onPressDrawer}>
              <Image
                source={require('../assets/nav.png')}
                style={{
                  height: 32,
                  resizeMode: 'contain',
                  width: 50,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          )}
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 17,
              alignSelf: 'center',
              color: home ? '#4A608C' : '#000000',
              fontWeight: home ? 'bold' : 'normal',
            }}>
            {titlewithcart}
          </Text>

          <TouchableOpacity
            style={{
              height: 30,
              alignSelf: 'center',
              justifyContent: 'flex-start',
              start: 50,
            }}
            onPress={onPressSearch}>
            <Image
              source={require('../assets/searchicon.png')}
              style={{
                alignSelf: 'center',
                height: 30,
                resizeMode: 'contain',
                width: 45,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 30,
              alignSelf: 'center',
              justifyContent: 'flex-start',
            }}
            onPress={onPressCart}>
            <Image
              source={require('../assets/addtocart.png')}
              style={{
                alignSelf: 'center',
                height: 30,
                resizeMode: 'contain',
                width: 45,
              }}
            />

            {counter === 0 ? (
              <View />
            ) : (
              <View
                style={{
                  bottom: 32,
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  height: 18,
                  width: 18,
                  backgroundColor: '#1186CC',
                  borderRadius: 10,
                }}>
                <Text
                  style={{alignSelf: 'center', color: 'white', fontSize: 9}}>
                  {counter}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginStart: 5,
  },
  searchimg: {
    height: 25,
    marginEnd: 10,
    resizeMode: 'contain',
    width: 25,
  },
});
