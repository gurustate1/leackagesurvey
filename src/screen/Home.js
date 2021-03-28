import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ToastAndroid,
  BackHandler,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import TopBar from '../components/TopBar';
import SideDrawer from '../components/SideDrawer';
import Drawer from 'react-native-drawer';
import ConfirmBtn from '../components/ConfirmBtn';
console.disableYellowBox = true;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: '',
      Profile: '',
      ImageSource: '',
      usernameId: '',
      animating: false,
      cartCounter: 0,
      categoryList: [],
      uid: this.props.navigation.getParam('uid'),
      search: false,
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    //  this.getCounter();
  }

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  // componentWillUpdate() {
  //   // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  //   this.getCounter();
  // }

  componentDidMount() {
    SharedPreferences.getItem('uid', value => {
      // console.log('username', value);
      this.setState(() => ({username: value}), () => {});
    });

    this.setState({animating: true});
    // this.textInput.clear();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    const headers = {
      'content-type': 'application/json',
    };
    fetch('http://api.mahekinfotech.com/GetItemCategory', {
      method: 'GET',
      headers,
      redirect: 'follow',
    })
      .then(response => {
        // const statusCode = response.status;
        // console.log(statusCode);
        return response.json();
      })
      .then(responseJson => {
        //  console.log(responseJson);
        return responseJson;
      })
      .then(category => {
        this.setState({animating: false});
        this.setState({categoryList: category});
      })
      .catch(err => {
        console.log('err', err);
      });
    this.getCounter();
  }

  getCounter = () => {
    const headers = {
      'content-type': 'application/json',
    };
    fetch(
      `http://api.mahekinfotech.com/GetAddToCartData?UserID=${
        this.state.username
      }`,
      {
        method: 'GET',
        headers,
        redirect: 'follow',
      },
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        return responseJson;
      })
      .then(category => {
        this.setState({cartCounter: category.length});
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  closeActivityIndicator = () => {
    this.setState({animating: false});
  };

  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  toggleOpen = () => {
    this.setState({open: !this.state.open});
  };

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <SideDrawer
          TrackOrder={() => this.props.navigation.navigate('MyOrders')}
          FaQ={() => this.props.navigation.navigate('FaQ')}
          contactus={() => this.props.navigation.navigate('ContactUs')}
          about={() => this.props.navigation.navigate('About')}
        />
      </TouchableOpacity>
    );
  };

  // logoutAggree = () => {
  //   this.props.navigation.navigate('Register');

  //   firebase.auth().signOut();
  // };

  logout = () => {
    Alert.alert(
      'Logout',
      'You want to logout?',
      [
        {text: 'No', onPress: () => console.log('')},

        {text: 'Yes', onPress: () => this.logoutAggree()},
      ],
      {cancelable: false},
    );
  };

  aleartDeleteAcc = () => {
    Alert.alert(
      'Delete account',
      'You want to delete account?',
      [
        {text: 'No', onPress: () => console.log('')},

        {text: 'Yes', onPress: () => this.deleteAccount()},
      ],
      {cancelable: false},
    );
  };

  deleteAccount = () => {
    //  this.db = firebase.firestore();
    // const id = firebase.auth().currentUser;
    // const auth = firebase.auth();
    // auth.delete().then(docref => {
    //   this.db
    //     .collection('Users')
    //     .doc(id.uid)
    //     .delete()
    //     .then(docref => {
    //       this.db
    //         .collection('Shipping Details')
    //         .doc(id.uid)
    //         .delete()
    //         .then(docref => {
    //           ToastAndroid.showWithGravity(
    //             'Account Delete!',
    //             ToastAndroid.SHORT,
    //             ToastAndroid.CENTER,
    //           );
    //           firebase.auth().currentUser.delete();
    //           this.props.navigation.navigate('login');
    //         });
    //     });
    // });
  };

  faq = () => {
    this.props.navigation.navigate('Profile', {uid: this.state.username});
    this.closeControlPanel();
  };

  trackOrders = () => {
    this.props.navigation.navigate('ChangePassword');
    this.closeControlPanel();
  };

  aboutUs = () => {
    // this.props.navigation.navigate('About')
    this.closeControlPanel();
    ToastAndroid.showWithGravity(
      'This option is can open in updated version!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  confirmBtn = () => {
    this.props.navigation.navigate('ContactUs');
    this.closeControlPanel();
  };

  callLogout = () => {
    this.props.navigation.navigate('login', {logout: true}),
      SharedPreferences.setItem('key', 'no');
  };

  rendervalues = () => {
    return (
      <View
        style={{
          padding: 30,
          marginTop: 60,
          flex: 1,
          backgroundColor: '#ffffff',
        }}>
        <Text
          onPress={() => this.faq()}
          style={{fontSize: 20, marginBottom: 20, color: '#6A3FB2'}}>
          Profile
        </Text>

        <Text
          onPress={() =>
            this.props.navigation.navigate('MyOrders', {
              uid: this.state.username,
            })
          }
          style={{fontSize: 20, marginBottom: 20, color: '#6A3FB2'}}>
          My Orders
        </Text>

        {/* <Text
          //  onPress={() => this.aboutUs()}
          style={{fontSize: 20, marginBottom: 20, color: '#266E73'}}>
          About Us
        </Text> */}

        <Text
          // onPress={() => this.aboutUs()}
          style={{fontSize: 20, marginBottom: 20, color: '#6A3FB2'}}>
          Contact Us
        </Text>

        <Text
          onPress={() => this.callLogout()}
          style={{fontSize: 20, marginBottom: 20, color: '#6A3FB2'}}>
          Logout
        </Text>

        {/* <ConfirmBtn contactus={() => this.confirmBtn()} bottom={45} textValue="Support"></ConfirmBtn> */}
      </View>
    );
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          width: 200,
          height: 60,
          marginTop: 15,
          marginBottom: 15,
          borderRadius: 40,
          flexDirection: 'row',
          backgroundColor: '#6A3FB2',
          elevation: 5,
          justifyContent: 'center',
          marginStart: 12,
          start: 15,
        }}
        onPress={() =>
          this.props.navigation.navigate('Shop', {
            itemCat: item.Name,
            uid: this.state.username,
          })
        }>
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            fontSize: 18,
            maxWidth: 180,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {item.Name}
        </Text>

        {/* <View
          style={{
            height: 45,
            width: 45,
            backgroundColor: '#F497A7',
            alignSelf: 'center',
            marginEnd: 20,
            borderRadius: 50,
            justifyContent: 'center',
          }}>
          <Image
            style={{
              height: 25,
              marginStart: 3,
              width: 25,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </View> */}
      </TouchableOpacity>
    );
  };

  findCategory = text => {
    this.setState({animating: true});
    if (text.length < 1) {
      this.componentDidMount();
    }
    const headers = {
      'content-type': 'application/json',
    };
    fetch(`http://api.mahekinfotech.com/GetItemCategory?Category=${text}`, {
      method: 'GET',
      headers,
      redirect: 'follow',
    })
      .then(response => {
        // const statusCode = response.status;
        // console.log(statusCode);
        return response.json();
      })
      .then(responseJson => {
        //  console.log(responseJson);
        return responseJson;
      })
      .then(category => {
        this.setState({animating: false});
        this.setState({categoryList: category});
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  render() {
    const animating = this.state.animating;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: 'lightblue',
            height: '30%',
            width: '100%',
            position: 'absolute',
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 50,
          }}
        />
        <Drawer
          type="overlay"
          content={this.rendervalues()}
          ref={ref => (this._drawer = ref)}
          styles={styles.drawerStyle}
          tapToClose={true}
          openDrawerOffset={viewport => viewport.width - 250}
          closedDrawerOffset={-10}>
          <TopBar
            counter={this.state.cartCounter}
            onPressSearch={() =>
              this.setState({search: this.state.search === true ? false : true})
            }
            onPressDrawer={() => this.openControlPanel()}
            titlewithcart="GLOCERY STORE"
            onPressCart={() =>
              this.props.navigation.navigate('Cart', {uid: this.state.username})
            }
          />

          {this.state.search === true ? (
            <View style={{flexDirection: 'row'}}>
              <TextInput
                ref={input => {
                  this.textInput = input;
                }}
                onChangeText={text => this.findCategory(text)}
                style={{
                  alignSelf: 'flex-start',
                  width: '75%',
                  marginStart: 25,
                  paddingStart: 20,
                  borderRadius: 50,
                  borderColor: 'grey',
                  borderWidth: 1,
                }}
                placeholder="Search Category.."
              />
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => this.componentDidMount()}>
                <Image
                  style={{
                    start: 10,
                    height: 30,
                    width: 30,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={require('../assets/removesearch.png')}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          {this.state.animating === true ? (
            <ActivityIndicator
              style={{alignSelf: 'center'}}
              size="large"
              color="#1186CC"
            />
          ) : this.state.categoryList.length === 0 ? (
            <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 20}}>
              - No Category Found -{' '}
            </Text>
          ) : (
            <View style={{}}>
              <View
                style={{
                  height: 50,
                  width: 200,
                  justifyContent: 'center',
                  backgroundColor: '#6A3FB2',
                  marginTop: 15,
                  borderBottomRightRadius: 50,
                  borderTopEndRadius: 50,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#fff',
                    alignSelf: 'center',
                  }}>
                  Categories
                </Text>
              </View>

              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 6}}
                data={this.state.categoryList}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item, index) => this.renderItem(item, index)}
              />
            </View>
          )}
        </Drawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgprofiephoto: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 80,
  },
  texttouchable: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    padding: 15,
    marginStart: 30,
    marginEnd: 30,
    marginTop: 10,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageOptions: {
    height: 30,
    resizeMode: 'contain',
    width: 30,
  },
  imageNext: {
    height: 20,
    resizeMode: 'contain',
    width: 30,
  },
});
