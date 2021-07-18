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
  BackHandler,
  Alert,
  Modal,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
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
    color: 'grey',
  },
  placeholderColor: 'grey',
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

export default class CompanySelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      animating: false,
      ALLCATEGORIES: [],
      ALLBRANCHE: [],
      selectcompany: '',
      selectbranch: '',
      ActualCategory: [],
      selectcompanyId: 0,
      branchhide: false,
      userid: this.props.navigation.getParam('userid'),
      getList: false,
      selectedbranchId: 0,
      picker1: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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

  async componentDidMount() {
    console.log('userid>>>', this.state.userid);

    //  await AsyncStorage.setItem('userId', this.props.navigation.getParam('userid'))
  }

  handleBackButtonClick() {
    Alert.alert('Leackage Survey Exit', 'You want to exit app?', [
      {text: 'No', onPress: () => null},
      {text: 'Yes', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  }

  APISELECTCompany = () => {
    this.setState({animating: true});

    fetch('https://leackagesurveyapp.com/APIMaster/GetCompanyList', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        var data = responseJson.result;
        // console.log("list", data);

        if (responseJson.result === []) {
          // console.log('False', responseJson.result);
          this.setState({animating: false});
        } else {
          this.setState({animating: false});
          console.log('Succes companys', responseJson.result);
          var ALLCATEGORIES = [];

          // var test = {label:'Select Company',value:0};
          // ALLCATEGORIES.push(test)
          for (var j = 0; j < data.length; j++) {
            console.log('list 1', data[j]);
            var cat = {};
            cat['label'] = data[j]['companyName'];
            // cat["value"] = data[j]["idCompany"];
            cat['value'] = data[j]['companyName'];

            ALLCATEGORIES.push(cat);
          }

          this.setState(
            () => ({
              ALLCATEGORIES: ALLCATEGORIES,
              ActualCategory: responseJson.result,
            }),
            () => {
              // console.log("List Companyyyyyyyyyyyyyy", ALLCATEGORIES);
            },
          );
        }
      });
  };

  APISelectBranch = () => {
    this.setState({animating: true});

    this.setState({branchhide: true});

    fetch(
      `https://leackagesurveyapp.com/APIMaster/GetBranchListByUser?idCompany=${
        this.state.selectcompanyId
      }&idUser=${this.state.userid}`,
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
        var data = responseJson.result;
        // console.log("list", data);

        if (responseJson.result === []) {
          // console.log('False', responseJson.result);
          this.setState({animating: false});
        } else {
          this.setState({animating: false});
          console.log(
            'Success Branchsss????????????????????????????????',
            responseJson.result,
          );
          var ALLBRANCHE = [];
          // var test = {label:'Select Company',value:0};
          // ALLCATEGORIES.push(test)
          for (var j = 0; j < data.length; j++) {
            // console.log("list 1", data[j]);
            var cat = {};
            cat['label'] = data[j]['branchName'];
            cat['value'] = data[j]['idBranch'];

            ALLBRANCHE.push(cat);
          }

          this.setState(
            () => ({
              ALLBRANCHE: ALLBRANCHE,
            }),
            () => {
              // console.log("List", ALLBRANCHE);
            },
          );
        }
      });
  };

  changeValue = (value, index) => {
    console.log('value>', value);
    console.log('index>', index);
    var data = this.state.ActualCategory[0].idCompany;

    console.log('asa>>>>>>>>>>>>>>>>>>>>>>.', value);
    if (value === undefined) {
    } else {
      this.setState({selectcompany: value});

      this.setState({
        selectcompanyId: this.state.ActualCategory[index - 1].idCompany,
      });
      this.setState({branchhide: true});
    }
  };

  selecyBranch = (value, index) => {
    console.log('value>', value);

    // console.log("index>",index -1);
    const iindex = index - 1;
    // console.log("index value>",this.state.ALLBRANCHE[0].label);
    //  this.setState({selectbranch:this.state.ALLBRANCHE[0].label})
    if (value === undefined) {
    } else {
      console.log('lll', this.state.ALLBRANCHE[index - 1].value);
      this.setState({
        selectbranch: this.state.ALLBRANCHE[index - 1].label,
        selectedbranchId: value,
      });

      this.setState({getList: true});
      // this.props.navigation.navigate('GetLeackagrList',{userid:this.state.userid})
    }
    //  this.props.navigation.navigate('GetLeackagrList',{userid:this.state.userid})
  };

  NextScreen = async () => {
    this.props.navigation.navigate('GetLeackagrList', {
      userid: this.state.userid,
    });
    AsyncStorage.setItem(
      'selectedcompany',
      this.state.selectcompanyId.toString(),
    );
    AsyncStorage.setItem(
      'selectedbranch',
      this.state.selectedbranchId.toString(),
    );
    AsyncStorage.setItem('userID', this.state.userid.toString());

    // setTimeout(async() => {
    //   const datass = await AsyncStorage.getItem('selectedbranch');
    //   console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>',datass)
    // }, 2000);
  };

  render() {
    const animating = this.state.animating;

    return (
      <ImageBackground
        source={require('../assets/backs.jpg')}
        style={{width: '100%', hight: 120, flex: 1, justifyContent: 'center'}}>
        <View style={{height: 100, width: 100}}>
          <Modal
            animationType="slide"
            transparent={false}
            style={{height: 100, width: 100}}
            visible={this.state.animating}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            {this.state.animating ? (
              <ActivityIndicator
                style={{alignSelf: 'center', marginTop: 10, flex: 1}}
                animating={animating}
                size="large"
                color="#6A3FB2"
              />
            ) : null}
          </Modal>
        </View>

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
          <Text
            style={{
              alignSelf: 'flex-start',
              marginStart: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#6A3FB2',
              width: '90%',
              marginBottom: 15,
            }}>
            Select Company:
          </Text>

          <TouchableOpacity
            onPress={() => this.APISELECTCompany()}
            style={{
              height: 40,
              width: '100%',
            }}>
            <RNPickerSelect
              style={pickerStyle}
              placeholder={{
                label: 'Select Company',
              }}
              touchableWrapperProps={() => console.log('Press')}
              onValueChange={(value, index) => this.changeValue(value, index)}
              onOpen={() => this.APISELECTCompany()}
              textInputProps={() => console.log('Press')}
              items={this.state.ALLCATEGORIES}>
              <TouchableOpacity
                onPress={() => this.APISELECTCompany()}
                style={{
                  marginTop: 0,
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '#6A3FB2',
                  borderRadius: 10,
                  padding: 6,
                  // backgroundColor: 'grey',
                }}>
                <Text
                  // onPress={() => this.APISELECTCompany()}
                  style={{
                    alignSelf: 'flex-start',
                    marginStart: 10,
                    fontSize: 18,
                    width: '100%',
                  }}>
                  {this.state.selectcompanyId === 0
                    ? 'Select Company From Here'
                    : this.state.selectcompany}
                </Text>
              </TouchableOpacity>
            </RNPickerSelect>
          </TouchableOpacity>

          {this.state.branchhide === false ? null : (
            <View>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  marginStart: 10,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#6A3FB2',
                  marginTop: 15,
                  marginBottom: 15,
                }}>
                Select Branch:
              </Text>
              <RNPickerSelect
                style={pickerStyle}
                placeholder={{
                  label: 'Select Branch',
                }}
                onValueChange={(value, index) =>
                  this.selecyBranch(value, index)
                }
                onOpen={() => this.APISelectBranch()}
                items={this.state.ALLBRANCHE}>
                <TouchableOpacity
                  onPress={() => this.APISelectBranch()}
                  style={{
                    marginTop: 0,
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#6A3FB2',
                    borderRadius: 10,
                    padding: 6,
                  }}>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      marginStart: 10,
                      fontSize: 18,
                    }}>
                    {this.state.selectbranch === ''
                      ? 'Select Branch'
                      : this.state.selectbranch}
                  </Text>
                </TouchableOpacity>
              </RNPickerSelect>
              {this.state.getList === false ? null : (
                <View
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginTop: 15,
                    alignSelf: 'center',
                    marginTop: 22,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.NextScreen()}
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
                      Get List
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.NextScreen()}>
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
  ViewSelectPicker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
