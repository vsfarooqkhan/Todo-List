/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }
import React from 'react';
import * as firebase from "firebase";
import 'firebase/firestore';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { myFirebase } from './components/firebaseConfig';
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
import Comments from './components/Notes'
import Login from './components/Login'
import Register from './components/Register'
import { NavigationContainer } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
class App extends React.Component {
  constructor(props) {
        super(props)
        this.state = {homePage : false,
                      value : 'firstdata'}
        this.gotoLogin = this.gotoLogin.bind(this)
        //this.gotoHome = this.gotoHome.bind(this)
        this.gotoRegister = this.gotoRegister.bind(this) 
    }
    gotoLogin(){
      this.props.navigation.navigate('Login')
    }
    gotoRegister() {
      this.props.navigation.navigate('Register')
    }
    // gotoHome() {
    //   this.props.navigation.navigate('Test')
    // }
  render() {
    const {
        user,
        
        } = this.props;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style = {styles.container}>
        <Text style={styles.titleText}>
                    {'Welcome to Tudoo'}{'\n'}{'\n'}
                </Text>

        <Button onPress = {this.gotoLogin} title = "Existing User ? Login" style = {{color : 'black'}} color="#3e3ab7"/>
        <Button onPress = {this.gotoRegister} title = "New User ? Register here" />
        {/* <Button onPress = {this.gotoHome} title = "Link to another com"/> */}
      </SafeAreaView>
    </>
  );
  }
};
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
const db = firebase.firestore();
db.settings({
    
});


export default createAppContainer( createStackNavigator({
  Home : App,
  Register : Register,
  Login : Login,
}));