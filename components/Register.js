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

import { NavigationContainer } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      pass : '',
    }
    this.registerMail = this.registerMail.bind(this)
  }
  registerMail() {
      const db = firebase.firestore();
        db.settings({
            
        });
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then(result =>  {
                this.setState({ uid: result.user.uid })
                Alert.alert(result.user.uid)
                db.collection("users").doc(this.state.uid).set({
                })
      })
    }
    onChangeText = (Text) => {
        this.setState({email : Text})
    }
    onChangePass = (Text) => {
        this.setState({pass : Text})
    }
  render() {
    return(
      <View>
        <Text style = {styles.loginText}>Login using Email and PassWord</Text>
        <Button title = "Go Back to Home" onPress = {() => this.props.navigation.navigate('Test')} />
        <Text style = {styles.labelText}> Email : </Text>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.onChangeText(text)}
            value={this.state.email}
        />
        <Text style = {styles.labelText}> PassWord : </Text>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.onChangePass(text)}
            value={this.state.pass}
        />
        <Button title ="Register" onPress = {this.registerMail}/>
      </View>
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
  Register : Register,
}));