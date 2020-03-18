import React from 'react'
import {Button,SafeAreaView, StyleSheet, TextInput, Alert, View, Text} from 'react-native';
import * as firebase from "firebase";
import { myFirebase } from './firebaseConfig';
import HomePage from './HomePage'
import AppNavigator from './AppNavigator'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const [value] = 'Useless Placeholder';

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    marginVertical: 20,
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color : 'skyblue'
  },
  labelText : {
      fontSize : 18,
      fontWeight : 'bold',
      color: 'red'
  },
});

class Login extends React.Component {
    render() {
        return(
            <SafeAreaView>
            <View>
                <Button title = "Go Back to Home" onPress = {() => this.props.navigation.navigate('Home')} />
            </View>
            <View>
                <Button title = "Login" onPress = {() => this.props.navigation.navigate('Login')} />
            </View>
            </SafeAreaView>
        )
    }
}
export default createAppContainer( createStackNavigator({
  Login : Login,
}));