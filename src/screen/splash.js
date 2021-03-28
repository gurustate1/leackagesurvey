import React from 'react';
import {Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotogome: '',
    };
  }

  retrivedData = async () => {
    this.login();
  };

  async login() {
    const selectedCompany = await AsyncStorage.getItem('login');
    console.log('Selected', selectedCompany);
    if (selectedCompany === 'true') {
      this.props.navigation.navigate('GetLeackagrList');
    } else {
      this.props.navigation.navigate('login');
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.retrivedData();
    }, 2000);
  }

  render() {
    return (
      <View
        style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
        {/* <Image
          style={{height: 200, width: 200, alignSelf: 'center'}}
          source={require('../assets/glocerylogo.png')}
        /> */}
        <Text style={{alignSelf: 'center', color: '#6A3FB2', fontSize: 30}}>
          Leakage Survery
        </Text>
      </View>
    );
  }
}
