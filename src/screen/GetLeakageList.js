import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  BackHandler,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pickerStyle = {
  inputIOS: {
    color: 'transparent',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    fontWeight: 'bold',
    fontSize: 22,
  },
  inputAndroid: {
    marginLeft: 10,
    color: 'transparent',
  },
  placeholderColor: 'transparent',
  underline: {borderTopWidth: 0},
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};

export default class GetLeackagrList extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      email: '',
      password: '',
      animating: false,
      ALLCATEGORIES: [],
      ALLBRANCHE: [],
      selectcompany: '',
      selectbranch: '',
      gelleackagelist: [],
      selectcompanyId: 0,
      branchhide: false,
      userid: 0,
      selectedbranch: 0,
      selectedcompany: 0,
    };
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    Alert.alert('', 'Your Want To Exit App?!', [
      {text: 'Yes', onPress: () => BackHandler.exitApp()},
      {text: 'No', onPress: () => null},
    ]);
    return true;
  }

  componentWillReceiveProps() {
    this.componentDidMount();
  }

  async componentDidMount() {
    const datass = await AsyncStorage.getItem('userID');
    this.setState({userid: datass});

    const selectedCompany = await AsyncStorage.getItem('selectedcompany');
    const selectedBranch = await AsyncStorage.getItem('selectedbranch');
    console.log('select company>>', selectedCompany);
    console.log('select Branch>>', selectedBranch);

    this.setState(
      () => ({
        selectedcompany: selectedCompany,
        selectedbranch: selectedBranch,
      }),
      () => this.APISELECTCompany(),
    );
  }

  async APISELECTCompany() {
    await fetch(
      `https://leackagesurveyapp.com/APIMaster/GetLeackageEntryListByUser?idUser=${
        this.state.userid
      }
      &leakageNo=&pipeline=0&pressureOfPipeline=0&diameterOfPipeline=0&typeOfLeak=0&leakGrading=0&leakageStatus=0&idBranch=${
        this.state.selectedbranch
      }&idCompany=${this.state.selectedcompany}`,
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
        var data = responseJson;
        console.log(',kkk', this.state.userid);
        if (responseJson.result === []) {
          this.setState({animating: false});
        } else {
          this.setState({animating: false});
          this.setState({gelleackagelist: responseJson.result});
        }
      });
  }

  changeValue = (value, index) => {
    var data = this.state.ActualCategory[0].idCompany;
    this.setState({selectcompanyId: this.state.ActualCategory[0].idCompany});
    this.setState({selectcompany: value});
    console.log('asa>>>>>>>>>>>>>>>>>>>>>>.', this.state.selectcompany);
    if (this.state.selectcompany === undefined) {
    } else {
      setTimeout(() => {
        this.APISelectBranch();
      }, 1000);
    }
  };

  selecyBranch = (value, index) => {
    console.log('value>', value);
    console.log('index>', index - 1);
    const iindex = index - 1;
    console.log('index value>', this.state.ALLBRANCHE[0].label);
    this.setState({selectbranch: this.state.ALLBRANCHE[0].label});
  };

  editprofile = item => {
    console.log('ITem Data', item);
    //userid
    this.props.navigation.navigate('EditSurvey', {
      userid: item.IdLeakageSurvey,
    });
  };

  renderItem = ({item, index}) => {
    return (
      <View
        style={{
          alignSelf: 'center',
          elevation: 5,
          padding: 25,
          borderRadius: 15,
          backgroundColor: '#ffffff',
          marginTop: 30,
          width: '90%',
        }}>
        <Text>Leackage Date: {item.LeackageDate}</Text>
        <Text>Cover of pipeline: {item.coverOfPipeline}</Text>
        <Text>Diameter of pipeline: {item.diameterOfPipeline}</Text>
        <Text>Leakage Status: {item.leakageStatus}</Text>
        <Text>Leakage Number: {item.leakageNo}</Text>
        <Text>Location pipe: {item.locationOfPipe}</Text>
        <Text>Main Area: {item.mainArea}</Text>
        <Text>Type Of Leak: {item.typeOfLeak}</Text>
        <Text>Vegetation: {item.vegetation}</Text>
        <TouchableOpacity
          onPress={() => this.editprofile(item)}
          style={{
            height: 40,
            marginTop: 40,
            width: '116%',
            backgroundColor: '#6A3FB2',
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Edit Leackage Entry
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  logout = async () => {
    await AsyncStorage.setItem('login', 'false');
    this.props.navigation.navigate('login');
  };

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: '#6A3FB2',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              marginStart: 20,
            }}>
            {' '}
            Leakage List
          </Text>
          <TouchableOpacity
            onPress={() => this.logout()}
            style={{justifyContent: 'center'}}>
            <Image
              source={{
                uri:
                  'https://1001freedownloads.s3.amazonaws.com/vector/thumb/98366/clarity-shutdown-icon.png',
              }}
              style={{
                height: 25,
                width: 25,
                alignSelf: 'center',
                marginEnd: 12,
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('AddLeackageSurvey', {
              userid: this.state.userid,
            })
          }
          style={{
            height: 50,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 50,
            backgroundColor: '#6A3FB2',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              marginStart: 20,
            }}>
            Add Leakage List
          </Text>
        </TouchableOpacity>

        <FlatList
          contentContainerStyle={{paddingBottom: 25}}
          data={this.state.gelleackagelist}
          renderItem={(item, index) => this.renderItem(item, index)}
        />
      </View>
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
  ViewSelectPicker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
