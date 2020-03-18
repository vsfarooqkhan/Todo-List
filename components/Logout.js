import React from 'react';
import * as firebase from "firebase";
import 'firebase/firestore';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { myFirebase } from './firebaseConfig';
import axios from 'axios'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  TextInput,
  Button,
  StatusBar,
  Image,
  Linking,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import Home from '../App'
import { NavigationContainer } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      pass : '',
    }
  }
  componentDidMount() {
      firebase.auth().signOut()
      this.props.navigation.navigate('Home')
    }
  render() {
    return(
      <>
        
      </>
    )
    }
}
const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color : 'steelblue'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default createAppContainer( createStackNavigator({
  Logout : Logout,
}));