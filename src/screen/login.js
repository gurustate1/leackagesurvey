import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Image,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'Renish99',
      password: 'renish@123',
      animating: false,
    };
  }

  closeActivityIndicator = () => {
    this.setState({animating: false});
  };

  StorageKey = async () => {
    SharedPreferences.getItem('key', function(value) {});
  };

  login = async () => {
    Keyboard.dismiss();
    this.setState({animating: true});
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      alert('Need to Fill all The Requirements!');
      this.setState({animating: false});
    } else {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      };
      fetch(
        `https://leackagesurveyapp.com/APIMaster/UserLogin?userName=${
          this.state.email
        }&password=${this.state.password}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.errorMessage === null) {
            console.log('response>>>', responseJson);
            this.props.navigation.navigate('CompanySelection', {
              userid: responseJson.result.idUser,
            });
            console.log('Suceess>>>>>', responseJson.result.idUser);
            console.log('Suceess>>>>>', responseJson.result.idUser);
            AsyncStorage.setItem('login', 'true');
            this.setState({animating: false});
          } else {
            this.setState({animating: false});
            alert(responseJson.errorMessage);
            console.log('Fail', responseJson.errorMessage);
          }
        });
    }
  };

  render() {
    const animating = this.state.animating;
    return (
      <ImageBackground
        source={require('../assets/backs.jpg')}
        style={{width: '100%', hight: 120, flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            alignSelf: 'center',
            elevation: 5,
            padding: 25,
            borderRadius: 15,
            backgroundColor: '#ffffff',
            marginTop: 30,
          }}>
          <Image
            style={{
              height: 100,
              width: 100,
              alignSelf: 'center',
              marginBottom: 15,
            }}
            source={require('../assets/loginicon.png')}
          />
          <Text
            style={{
              alignSelf: 'center',
              marginStart: 10,
              fontSize: 30,
              fontWeight: 'bold',
              color: '#6A3FB2',
            }}>
            Admin Login
          </Text>
          <TextInput
            onChangeText={text => this.setState({email: text})}
            value={this.state.email}
            placeholderTextColor="#6A3FB2"
            placeholder="Username"
            style={styles.textinputstyle}
          />
          <TextInput
            secureTextEntry
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
            placeholderTextColor="#6A3FB2"
            placeholder="Password"
            style={styles.textinputstyle}
          />
          {/* <Text
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
            style={{
              fontSize: 15,
              marginTop: 10,
              alignSelf: 'flex-end',
              color: '#6A3FB2',
              marginEnd: 10,
            }}>
            Forget Password?
          </Text> */}
          {this.state.animating ? (
            <ActivityIndicator
              style={{alignSelf: 'center', marginTop: 10}}
              animating={animating}
              size="large"
              color="#6A3FB2"
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 15,
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => this.login()}
                style={{
                  backgroundColor: '#6A3FB2',
                  borderRadius: 35,
                  alignSelf: 'center',
                  width: '90%',
                }}>
                <Text
                  style={{
                    padding: 13,
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 18,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.login()}>
                {/* <Image
                  style={{
                    hight: 55,
                    width: 55,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={require('../assets/nextbtn.png')}
                /> */}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  textinputstyle: {
    borderColor: '#6A3FB2',
    paddingStart: 20,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    borderRadius: 25,
    width: 300,
  },
});
