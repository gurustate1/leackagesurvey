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
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'react-native-image-picker';
const GOGOLEKEY = 'AIzaSyCK0xHJ6Wh9vna1O4mqKQV4xvR_1k6XeDM';
import ImgToBase64 from 'react-native-image-base64';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; //Map
import Geolocation from '@react-native-community/geolocation'; //Location Getting
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import RadioButtonRN from 'radio-buttons-react-native';

//Map Styling
var mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];

export default class EditSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      pipelinevalue: '',
      pipelineid: 0,
      pipeline: [
        {
          value: 1,
          label: 'MDPE',
        },
        {
          value: 2,
          label: 'SS',
        },
      ],
      selection: [
        {
          index: 1,
          label: 'UnderGround',
        },
        {index: 2, label: 'Above Ground'},
      ],
      pressureOfPipelineid: 0,
      pressureOfPipelinevalue: '',
      pressureOfPipeline: [
        {
          value: 1,
          label: '4 Bar',
        },
        {
          value: 2,
          label: '110 m Bar',
        },
        {
          value: 3,
          label: '21 m Bar',
        },
      ],
      diameterOfPipelinevalue: '',
      diameterOfPipelinevalueid: 0,
      diameterOfPipeline: [
        {
          value: 1,
          label: '20 mm',
        },
        {
          value: 2,
          label: '32 mm',
        },
        {
          value: 3,
          label: '63 mm',
        },
        {
          value: 4,
          label: '90 mm',
        },
        {
          value: 5,
          label: '110 mm',
        },
        {
          value: 6,
          label: '125 mm',
        },
        {
          value: 7,
          label: '160 mm',
        },
        {
          value: 8,
          label: '180 mm',
        },
      ],
      typesofleackvalue: '',
      typesofleackvalueid: 0,
      typesofleack: [
        {
          label: 'Underground',
          value: 1,
        },
        {
          label: 'Above Ground',
          value: 2,
        },
      ],
      ifundergroundvalue: '',
      ifundergroundvalueid: 0,
      ifUndergroundGround: [
        {
          label: 'TF',
          value: 1,
        },
        {
          label: 'Coupler Joints',
          value: 2,
        },
        {
          label: 'Pipeline Damage',
          value: 3,
        },
        {
          label: 'Rat Bite',
          value: 4,
        },
        {
          label: 'Material Failure',
          value: 5,
        },
        {
          label: 'Damage by other Utility Companies',
          value: 6,
        },
        {
          label: 'Others',
          value: 7,
        },
      ],
      ifAboveGroundvalue: '',
      ifAboveGroundvalueid: 0,
      ifAboveGround: [
        {
          label: 'Regulator outlet',
          value: 1,
        },
        {
          label: 'Anaconda',
          value: 2,
        },
        {
          label: 'Meter Inlet',
          value: 1,
        },
        {
          label: 'Meter Outlet',
          value: 1,
        },
        {
          label: 'Valve',
          value: 2,
        },
        {
          label: 'Elbow',
          value: 1,
        },
        {
          label: 'Coupler',
          value: 1,
        },
        {
          label: 'T',
          value: 1,
        },
        {
          label: 'Regulator Boost',
          value: 2,
        },
        {
          label: 'Meter Adapter',
          value: 1,
        },
      ],
      vegetationvalue: '',
      vegetationvalueid: 0,
      Vegetation: [
        {
          value: 1,
          label: 'Residence',
        },
        {
          value: 2,
          label: 'Commercial',
        },
        {
          value: 3,
          label: 'Industrial',
        },
        {
          value: 4,
          label: 'Open',
        },
      ],
      locationOfPipevalue: '',
      locationOfPipevalueid: 0,
      LocationofPipe: [
        {
          value: 1,
          label: 'Street',
        },
        {
          value: 2,
          label: 'Between Street & Sidewalk',
        },
        {
          value: 3,
          label: 'Under Sidewalk',
        },
        {
          value: 4,
          label: 'Lawn',
        },
        {
          value: 5,
          label: 'Basement',
        },
        {
          value: 6,
          label: 'Others',
        },
      ],
      CoverofPipelinevalue: '',
      CoverofPipelinevalueid: 0,
      CoverofPipeline: [
        {
          label: 'Concrete',
          value: 1,
        },
        {
          label: 'Asphalt',
          value: 2,
        },
        {
          label: 'Brick',
          value: 3,
        },
        {
          label: 'Gravel',
          value: 4,
        },
        {
          label: 'Soil',
          value: 5,
        },
        {
          label: 'Other',
          value: 6,
        },
      ],
      leakgrading: '',
      leakgradingid: 0,
      LeakGrading: [
        {
          value: 1,
          label: 'Grade-1',
        },
        {
          value: 2,
          label: 'Grade-2',
        },
        {
          value: 3,
          label: 'Grade-3',
        },
      ],
      animating: false,
      //Textinputs
      MainArea: '',
      SubArea: '',
      SourceofLeakge: '',
      ProbableCauseofLeak: '',
      DPIRREADINGWHENLEAKDETECTEDFIRST: '',
      DPIRREADINGUSINGBARHOLEPROBE: '',
      RMLDREADINGWHENLEAKDETECTEDFIRST: '',
      leakageStatus: '',
      image: '',
      userid: this.props.navigation.getParam('userid'),
      selectedcompany: '',
      selectedbranch: '',
      imagebase64: '',
      longitude: 72.5713621,
      latitude: 72.5713621,
      selectedground: 1,
      createdon: '',
      IdLeakageSurvey: 0,
      idUser: 0,
    };
  }

  async componentDidMount() {
    const selectedCompany = await AsyncStorage.getItem('selectedcompany');
    const selectedBranch = await AsyncStorage.getItem('selectedbranch');
    this.setState({
      selectedcompany: selectedCompany,
      selectedbranch: selectedBranch,
    });

    this.editcallapi();
  }

  editcallapi = () => {
    // console.log('Userid', this.state.userid);
    //userid
    fetch(
      `https://leackagesurveyapp.com/APIMaster/GetLeackageEntryById?idLeakageSurvey=${
        this.state.userid
      }`,
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
        // console.log('Calling Add Lickage', responseJson.result);
        if (responseJson.errorMessage === '') {
          this.setState({
            pipelinevalue: responseJson.result.pipeline,
            pressureOfPipelinevalue: responseJson.result.pressureOfPipeline,
            diameterOfPipelinevalue: responseJson.result.diameterOfPipeline,
            ifundergroundvalue: responseJson.result.ifUndergroundGround,
            ifAboveGroundvalue: responseJson.result.ifAboveGround,
            vegetationvalue: responseJson.result.vegetation,
            locationOfPipevalue: responseJson.result.locationOfPipe,
            CoverofPipelinevalue: responseJson.result.coverOfPipeline,
            leakgrading: responseJson.result.leakGrading,
            MainArea: responseJson.result.mainArea,
            image: responseJson.result.photo,
            ProbableCauseofLeak: responseJson.result.causeOfLeak,
            SubArea: responseJson.result.subAreaLocation,
            SourceofLeakge: responseJson.result.sourceOfLeakge,
            WhenLeack: responseJson.result.dpIRReadingWhenLeakDetectedFirst,
            DPIRREADINGUSINGBARHOLEPROBE:
              responseJson.result.dpIRReadingUsingBarHoleProbe,
            RMLDREADINGWHENLEAKDETECTEDFIRST:
              responseJson.result.rmldReadingWhenLeakDetectedFirst,
            latitude: parseFloat(responseJson.result.latitude),
            longitude: parseFloat(responseJson.result.longitude),
            IdLeakageSurvey: responseJson.result.IdLeakageSurvey,
            idUser: responseJson.result.idUser,
          });
          if (responseJson.result.ifUndergroundGround >= 0) {
            this.setState({selectedground: 1});
          } else if (responseJson.result.ifAboveGround >= 0) {
            this.setState({selectedground: 2});
          } else {
            this.setState({selectedground: 0});
          }
        } else {
        }
      });
  };

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
    this.props.navigation.navigate('GetLeackagrList');
    return true;
  }

  callPreshh = () => {
    this.props.navigation.navigate('GetLeackagrList', {id: 0});
  };

  login = async () => {
    Keyboard.dismiss();
    console.log(' this.state.ifAboveGroundvalueid', this.state.imagebase64);
    if (this.state.pipelinevalue === '') {
      alert('Need to Select Pipeline');
    } else if (this.state.pressureOfPipelinevalue === '') {
      alert('Need to Select Pressure of Pipeline');
    } else if (this.state.diameterOfPipelinevalue === '') {
      alert('Need to Select Diameter of Pipeline');
    } else if (this.state.vegetationvalue === '') {
      alert('Need to Select Vegitation');
    } else if (this.state.locationOfPipevalue === '') {
      alert('Need to Select Location');
    } else if (this.state.CoverofPipelinevalue === '') {
      alert('Need to Select Cover of Pipeline');
    } else if (this.state.leakgrading === '') {
      alert('Need to Select Leakgrading');
    } else if (this.state.MainArea === '') {
      alert('Need to Add Main Area');
    } else if (this.state.SubArea === '') {
      alert('Need to Add Sub Area');
    } else if (this.state.SourceofLeakge === '') {
      alert('Need to Add Source of Leakage');
    } else if (this.state.ProbableCauseofLeak === '') {
      alert('Need to Add Probable cause of leak');
    } else if (this.state.WhenLeack === '') {
      alert('Please fill all blanks!');
    } else if (this.state.DPIRREADINGUSINGBARHOLEPROBE === '') {
      alert('Please fill all blanks!');
    } else if (this.state.RMLDREADINGWHENLEAKDETECTEDFIRST === '') {
      alert('Please fill all blanks!');
    } else if (this.state.image === '') {
      alert('Please select image!');
    } else {
      let body = {};
      if (this.state.imagebase64 === '') {
        console.log('Going in Image defined no', this.state.image);
        body = JSON.stringify({
          IdLeakageSurvey: this.state.IdLeakageSurvey, //Static
          causeOfLeak: '2',
          coverOfPipeline: this.state.CoverofPipelinevalueid,
          createdBy: null,
          createdOn: new Date(),
          diameterOfPipeline: this.state.diameterOfPipelinevalueid,
          dpIRReadingUsingBarHoleProbe: this.state.DPIRREADINGUSINGBARHOLEPROBE,
          dpIRReadingWhenLeakDetectedFirst: this.state.WhenLeack,
          idBranch: parseInt(this.state.selectedbranch),
          idCompany: this.state.selectedcompany,
          idUser: this.state.idUser, //UserID
          ifAboveGround: this.state.ifAboveGroundvalueid,
          ifUndergroundGround: this.state.ifundergroundvalueid,
          latitude: this.state.latitude,
          leakGrading: this.state.leakgradingid,
          leakageStatus: 0, //Static
          locationOfPipe: this.state.locationOfPipevalueid,
          longitude: this.state.longitude,
          photo: this.state.image,
          photoExtension: '.jpg',
          mainArea: this.state.MainArea,
          pipeline: this.state.pipelineid,
          pressureOfPipeline: this.state.pressureOfPipelineid,
          rmldReadingWhenLeakDetectedFirst: this.state
            .RMLDREADINGWHENLEAKDETECTEDFIRST,
          sourceOfLeakge: this.state.SourceofLeakge,
          subAreaLocation: this.state.SubArea,
          typeOfLeak: this.state.typesofleackvalueid,
          vegetation: this.state.vegetationvalueid,
        });
        console.log('Body Edit 1>>', body);
        fetch(
          'https://leackagesurveyapp.com/APIMaster/AddOrUpdateLeackageEntry',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: body,
          },
        )
          .then(response => response.json())
          .then(responseJson => {
            console.log('Calling Add Lickage From Response', responseJson);
            if (responseJson.errorMessage === '') {
              Alert.alert('', 'Your Survey Added!', [
                {text: 'OK', onPress: () => this.callPreshh()},
              ]);
            } else {
            }
          });
      } else {
        console.log('Going in Image defined Tes');

        body = JSON.stringify({
          IdLeakageSurvey: this.state.IdLeakageSurvey, //Static
          causeOfLeak: '2',
          coverOfPipeline: this.state.CoverofPipelinevalueid,
          createdBy: null,
          createdOn: new Date(),
          diameterOfPipeline: this.state.diameterOfPipelinevalueid,
          dpIRReadingUsingBarHoleProbe: this.state.DPIRREADINGUSINGBARHOLEPROBE,
          dpIRReadingWhenLeakDetectedFirst: this.state.WhenLeack,
          idBranch: parseInt(this.state.selectedbranch),
          idCompany: this.state.selectedcompany,
          idUser: this.state.idUser, //UserID
          ifAboveGround: this.state.ifAboveGroundvalueid,
          ifUndergroundGround: this.state.ifundergroundvalueid,
          latitude: this.state.latitude,
          leakGrading: this.state.leakgradingid,
          leakageStatus: 0, //Static
          locationOfPipe: this.state.locationOfPipevalueid,
          longitude: this.state.longitude,
          photo: this.state.imagebase64,
          photoExtension: '.jpg',
          mainArea: this.state.MainArea,
          pipeline: this.state.pipelineid,
          pressureOfPipeline: this.state.pressureOfPipelineid,
          rmldReadingWhenLeakDetectedFirst: this.state
            .RMLDREADINGWHENLEAKDETECTEDFIRST,
          sourceOfLeakge: this.state.SourceofLeakge,
          subAreaLocation: this.state.SubArea,
          typeOfLeak: this.state.typesofleackvalueid,
          vegetation: this.state.vegetationvalueid,
        });
        // console.log('Body Edit 1>>', body);
        fetch(
          'https://leackagesurveyapp.com/APIMaster/AddOrUpdateLeackageEntry',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: body,
          },
        )
          .then(response => response.json())
          .then(responseJson => {
            // console.log('Calling Add Lickage From Response', responseJson);
            if (responseJson.errorMessage === '') {
              Alert.alert('', 'Your Survey Added!', [
                {text: 'OK', onPress: () => this.callPreshh()},
              ]);
            } else {
            }
          });
      }
    }
  };

  pipelinechange = (value, index) => {
    // console.log('value', value);
    if (value === undefined || value === null) {
    } else {
      this.setState({
        pipelinevalue: this.state.pipeline[index - 1].label,
        pipelineid: value,
      });
      // console.log('value>', this.state.pipeline[index - 1].label);
    }
  };

  changepresurepipeline = (value, index) => {
    // console.log('value', value);
    if (value === undefined || value === null) {
    } else {
      this.setState({
        pressureOfPipelinevalue: this.state.pressureOfPipeline[index - 1].label,
        pressureOfPipelineid: value,
      });
      // console.log('value>',this.state.pipeline[index].label);
    }
  };

  changediameterpipeline = (value, index) => {
    // console.log('value', value);
    if (value === undefined || value === null) {
    } else {
      this.setState({
        diameterOfPipelinevalue: this.state.diameterOfPipeline[index - 1].label,
        diameterOfPipelinevalueid: value,
      });
      // console.log('value>',this.state.pipeline[index].label);
    }
  };

  changediameterpipeline = (value, index) => {
    // console.log('value', value);
    if (value === undefined || value === null) {
    } else {
      this.setState({
        diameterOfPipelinevalue: this.state.diameterOfPipeline[index - 1].label,
        diameterOfPipelinevalueid: value,
      });
    }
  };

  changeifunderground = (value, index) => {
    // console.log('value', value);
    if (value === undefined || value === null) {
    } else {
      this.setState({
        ifundergroundvalue: this.state.ifUndergroundGround[index - 1].label,
        ifundergroundvalueid: value,
      });
      // console.log('value>',this.state.pipeline[index].label);
    }
  };

  changeifaboveground = (value, index) => {
    // console.log('value', value);
    if (value === undefined || value === null) {
    } else {
      this.setState({
        ifAboveGroundvalue: this.state.ifAboveGround[index - 1].label,
        ifAboveGroundvalueid: value,
      });
      // console.log('value>',this.state.pipeline[index].label);
    }
  };

  changevegetation = (value, index) => {
    // console.log('value', value);
    if (value === undefined || value === null) {
    } else {
      this.setState({
        vegetationvalue: this.state.Vegetation[index - 1].label,
        vegetationvalueid: value,
      });
      // console.log('value>',this.state.pipeline[index].label);
    }
  };

  chnagelocationpipe = (value, index) => {
    // console.log('value', value);
    if (value === undefined || value === null) {
    } else {
      this.setState({
        locationOfPipevalue: this.state.LocationofPipe[index - 1].label,
        locationOfPipevalueid: value,
      });
      // console.log('value>',this.state.pipeline[index].label);
    }
  };

  changecocerpipeline = (value, index) => {
    // console.log('value', value);
    if (value === undefined || value === null) {
    } else {
      this.setState({
        CoverofPipelinevalue: this.state.CoverofPipeline[index - 1].label,
        CoverofPipelinevalueid: value,
      });
      // console.log('value>',this.state.pipeline[index].label);
    }
  };

  changeleakgranding = (value, index) => {
    // console.log('value', value);
    if (value === undefined || value === null) {
    } else {
      this.setState({
        leakgrading: this.state.LeakGrading[index - 1].label,
        leakgradingid: value,
      });
      // console.log('value>',this.state.pipeline[index].label);
    }
  };

  selectImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        var temp;
        // You can display the image using either:
        //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        temp = response.data;
        let source = 'data:image/jpeg;base64,' + [response.data];

        //Or:
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        console.log('Image::>  ', source);
        ImgToBase64.getBase64String(source.uri)
          .then(base64String => {
            this.setState({imagebase64: base64String});

            // Send the base64String to server
          })
          .catch(err => console.log(err));

        this.setState({
          avatarSource: source,
          imgBase64: temp,
          image: response.uri,
        });
      }
    });
  };

  render() {
    const animating = this.state.animating;
    return (
      <View style={{flex: 1}}>
        <View style={styles.ViewImg}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{flex: 1, borderRadius: 5}}
            customMapStyle={mapStyle} //Map styling
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            followUserLocation={true}
            onRegionChange={null}>
            <MapView.Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </MapView>
        </View>
        <ScrollView>
          <ImageBackground
            source={require('../assets/backs.jpg')}
            style={{
              width: '100%',
              hight: 120,
              flex: 1,
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignSelf: 'center',
                elevation: 5,
                padding: 25,
                borderRadius: 15,
                backgroundColor: '#ffffff',
                marginTop: 30,
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: '#6A3FB2',
                  marginBottom: 15,
                }}>
                Edit Leackage Survey
              </Text>

              {/* Date Picker  */}
              <View style={{marginBottom: 15}}>
                <RNPickerSelect
                  style={pickerStyle}
                  // placeholder={{
                  //   label:"Select Company",
                  // }}
                  onValueChange={(value, index) =>
                    this.pipelinechange(value, index)
                  }
                  value={this.state.pipelinevalue}
                  // onOpen={() =>    this.APISELECTCompany()}
                  items={this.state.pipeline}>
                  <TouchableOpacity
                    // onPress={() => this.APISELECTCompany()}
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
                        marginStart: 15,
                        fontSize: 18,
                      }}>
                      {this.state.pipelinevalue === ''
                        ? 'Select Pipeline'
                        : this.state.pipelinevalue}
                    </Text>
                  </TouchableOpacity>
                </RNPickerSelect>
              </View>
              <View style={{marginBottom: 15}}>
                <RNPickerSelect
                  style={pickerStyle}
                  // placeholder={{
                  //   label:"Select Company",
                  // }}
                  value={this.state.pressureOfPipelinevalue}
                  onValueChange={(value, index) =>
                    this.changepresurepipeline(value, index)
                  }
                  // onOpen={() =>    this.APISELECTCompany()}
                  items={this.state.pressureOfPipeline}>
                  <TouchableOpacity
                    // onPress={() => this.APISELECTCompany()}
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
                        marginStart: 15,
                        fontSize: 18,
                      }}>
                      {this.state.pressureOfPipelinevalue === ''
                        ? 'Select Pressure Of Pipeline'
                        : this.state.pressureOfPipelinevalue}
                    </Text>
                  </TouchableOpacity>
                </RNPickerSelect>
              </View>
              <View style={{marginBottom: 15}}>
                <RNPickerSelect
                  style={pickerStyle}
                  // placeholder={{
                  //   label:"Select Company",
                  // }}
                  onValueChange={(value, index) =>
                    this.changediameterpipeline(value, index)
                  }
                  value={this.state.diameterOfPipelinevalue}
                  // onOpen={() =>    this.APISELECTCompany()}
                  items={this.state.diameterOfPipeline}>
                  <TouchableOpacity
                    // onPress={() => this.APISELECTCompany()}
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
                        marginStart: 15,
                        fontSize: 18,
                      }}>
                      {this.state.diameterOfPipelinevalue === ''
                        ? 'Select Diameter of Pipeline'
                        : this.state.diameterOfPipelinevalue}
                    </Text>
                  </TouchableOpacity>
                </RNPickerSelect>
              </View>

              <View style={{marginBottom: 15}}>
                <RadioButtonRN
                  data={this.state.selection}
                  style={{marginBottom: 15}}
                  initial={1}
                  selectedBtn={e => this.setState({selectedground: e.index})}
                />

                <View>
                  {this.state.selectedground === 1 ? (
                    <View style={{marginBottom: 0}}>
                      <RNPickerSelect
                        style={pickerStyle}
                        // placeholder={{
                        //   label:"Select Company",
                        // }}
                        onValueChange={(value, index) =>
                          this.changeifunderground(value, index)
                        }
                        value={this.state.ifundergroundvalue}
                        // onOpen={() =>    this.APISELECTCompany()}
                        items={this.state.ifUndergroundGround}>
                        <TouchableOpacity
                          // onPress={() => this.APISELECTCompany()}
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
                              marginStart: 15,
                              fontSize: 18,
                            }}>
                            {this.state.ifundergroundvalue === ''
                              ? 'Select If Underground'
                              : this.state.ifundergroundvalue}
                          </Text>
                        </TouchableOpacity>
                      </RNPickerSelect>
                    </View>
                  ) : (
                    <RNPickerSelect
                      style={pickerStyle}
                      value={this.state.ifAboveGroundvalue}
                      // placeholder={{
                      //   label:"Select Company",
                      // }}
                      onValueChange={(value, index) =>
                        this.changeifaboveground(value, index)
                      }
                      items={this.state.ifAboveGround}>
                      <TouchableOpacity
                        // onPress={() => this.APISELECTCompany()}
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
                            marginStart: 15,
                            fontSize: 18,
                          }}>
                          {this.state.ifAboveGroundvalue === ''
                            ? 'Select If Above Ground'
                            : this.state.ifAboveGroundvalue}
                        </Text>
                      </TouchableOpacity>
                    </RNPickerSelect>
                  )}
                </View>
              </View>

              <View style={{marginBottom: 15}}>
                <RNPickerSelect
                  style={pickerStyle}
                  value={this.state.vegetationvalue}
                  // placeholder={{
                  //   label:"Select Company",
                  // }}
                  onValueChange={(value, index) =>
                    this.changevegetation(value, index)
                  }
                  // onOpen={() =>    this.APISELECTCompany()}
                  items={this.state.Vegetation}>
                  <TouchableOpacity
                    // onPress={() => this.APISELECTCompany()}
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
                        marginStart: 15,
                        fontSize: 18,
                      }}>
                      {this.state.vegetationvalue === ''
                        ? 'Select Vegitaion'
                        : this.state.vegetationvalue}
                    </Text>
                  </TouchableOpacity>
                </RNPickerSelect>
              </View>

              <View style={{marginBottom: 15}}>
                <RNPickerSelect
                  value={this.state.locationOfPipevalue}
                  style={pickerStyle}
                  // placeholder={{
                  //   label:"Select Company",
                  // }}
                  onValueChange={(value, index) =>
                    this.chnagelocationpipe(value, index)
                  }
                  // onOpen={() =>    this.APISELECTCompany()}
                  items={this.state.LocationofPipe}>
                  <TouchableOpacity
                    // onPress={() => this.APISELECTCompany()}
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
                        marginStart: 15,
                        fontSize: 18,
                      }}>
                      {this.state.locationOfPipevalue === ''
                        ? 'Select Location Pipe'
                        : this.state.locationOfPipevalue}
                    </Text>
                  </TouchableOpacity>
                </RNPickerSelect>
              </View>

              <View style={{marginBottom: 15}}>
                <RNPickerSelect
                  style={pickerStyle}
                  value={this.state.CoverofPipelinevalue}
                  // placeholder={{
                  //   label:"Select Company",
                  // }}
                  onValueChange={(value, index) =>
                    this.changecocerpipeline(value, index)
                  }
                  // onOpen={() =>    this.APISELECTCompany()}
                  items={this.state.CoverofPipeline}>
                  <TouchableOpacity
                    // onPress={() => this.APISELECTCompany()}
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
                        marginStart: 15,
                        fontSize: 18,
                      }}>
                      {this.state.CoverofPipelinevalue === ''
                        ? 'Select Cover Pipeline'
                        : this.state.CoverofPipelinevalue}
                    </Text>
                  </TouchableOpacity>
                </RNPickerSelect>
              </View>

              <RNPickerSelect
                style={pickerStyle}
                placeholder={{
                  label: 'Select Company',
                }}
                value={this.state.leakgrading}
                onValueChange={(value, index) =>
                  this.changeleakgranding(value, index)
                }
                // onOpen={() =>    this.APISELECTCompany()}
                items={this.state.LeakGrading}>
                <TouchableOpacity
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
                      marginStart: 15,
                      fontSize: 18,
                    }}>
                    {this.state.leakgrading === ''
                      ? 'Select Leak Granding'
                      : this.state.leakgrading}
                  </Text>
                </TouchableOpacity>
              </RNPickerSelect>

              <TextInput
                onChangeText={text => this.setState({MainArea: text})}
                value={this.state.MainArea}
                placeholderTextColor="#6A3FB2"
                placeholder="Select Main Area"
                style={styles.textinputstyle}
              />

              <TouchableOpacity
                onPress={() => this.selectImage()}
                style={styles.textinputstyle}>
                {this.state.image === '' ? null : (
                  <Image
                    style={{height: 100, width: 100, alignSelf: 'center'}}
                    source={{uri: this.state.image}}
                  />
                )}
                <Text
                  style={{
                    padding: 5,
                    color: '#6A3FB2',
                    alignSelf:
                      this.state.image === '' ? 'flex-start' : 'center',
                  }}>
                  Select Image
                </Text>
              </TouchableOpacity>
              <TextInput
                onChangeText={text => this.setState({SubArea: text})}
                value={this.state.SubArea}
                placeholderTextColor="#6A3FB2"
                placeholder="Select Sub Area"
                style={styles.textinputstyle}
              />
              <TextInput
                onChangeText={text => this.setState({SourceofLeakge: text})}
                value={this.state.SourceofLeakge}
                placeholderTextColor="#6A3FB2"
                placeholder="Select Source of Leakge"
                style={styles.textinputstyle}
              />

              <TextInput
                onChangeText={text =>
                  this.setState({ProbableCauseofLeak: text})
                }
                value={this.state.ProbableCauseofLeak}
                placeholderTextColor="#6A3FB2"
                placeholder="Select Probable Cause of Leak"
                style={styles.textinputstyle}
              />

              <TextInput
                keyboardType="number-pad"
                onChangeText={text =>
                  this.setState({DPIRREADINGWHENLEAKDETECTEDFIRST: text})
                }
                value={this.state.RMLDREADINGWHENLEAKDETECTEDFIRST.toString()}
                placeholderTextColor="#6A3FB2"
                placeholder="Select READING WHEN LEAK DETECTED FIRST"
                style={styles.textinputstyle}
              />
              {/*  READING USING BAR HOLE PROBE */}
              <TextInput
                keyboardType="number-pad"
                onChangeText={text =>
                  this.setState({DPIRREADINGUSINGBARHOLEPROBE: text})
                }
                value={this.state.DPIRREADINGUSINGBARHOLEPROBE.toString()}
                placeholderTextColor="#6A3FB2"
                placeholder="Select READING USING BAR HOLE PROBE"
                style={styles.textinputstyle}
              />
              {/* RMLDREADINGWHENLEAKDETECTEDFIRST */}
              <TextInput
                keyboardType="number-pad"
                onChangeText={text =>
                  this.setState({RMLDREADINGWHENLEAKDETECTEDFIRST: text})
                }
                value={this.state.RMLDREADINGWHENLEAKDETECTEDFIRST.toString()}
                placeholderTextColor="#6A3FB2"
                placeholder="Select READING WHEN LEAK DETECTED FIRST"
                style={styles.textinputstyle}
              />
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
                      width: '40%',
                    }}>
                    <Text
                      style={{
                        padding: 13,
                        alignSelf: 'center',
                        color: 'white',
                        fontSize: 18,
                      }}>
                      Update
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.handleBackButtonClick()}
                    style={{
                      backgroundColor: 'red',
                      borderRadius: 35,
                      alignSelf: 'center',
                      width: '40%',
                      marginStart: 20,
                    }}>
                    <Text
                      style={{
                        padding: 13,
                        alignSelf: 'center',
                        color: 'white',
                        fontSize: 18,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ImageBackground>
        </ScrollView>
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
  ViewImg: {
    height: 250,
    marginRight: 20,
    marginLeft: 20,
  },
});
