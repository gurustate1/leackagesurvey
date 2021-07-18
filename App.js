import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Splash from './src/screen/splash';
import login from './src/screen/login';
import Home from './src/screen/Home';
import CompanySelection from './src/screen/CompanySelection';
import {Image} from 'react-native';
import GetLeackagrList from './src/screen/GetLeakageList';
import AddLeackageSurvey from './src/screen/AddLeackageSurvey';
import EditSurvey from './src/screen/EditSurvey';

const AuthNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation, twt}) => ({
        tabBarIcon: ({tintColor}) => (
          <Image
            style={{
              alignSelf: 'center',
              height: 25,
              width: 25,
              resizeMode: 'contain',
              top: 2,
            }}
          />
        ),
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const MainNavigator = createStackNavigator(
  {
    Main: {
      screen: AuthNavigator,
      navigationOptions: ({navigation}) => ({}),
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Splash: {screen: Splash},
    login: {screen: login},
    CompanySelection: {screen: CompanySelection},
    GetLeackagrList: {screen: GetLeackagrList},
    AddLeackageSurvey: {screen: AddLeackageSurvey},
    EditSurvey: {screen: EditSurvey},
    MainNavigator: {screen: MainNavigator},
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const NavApp = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return <NavApp />;
  }
}

export default App;
