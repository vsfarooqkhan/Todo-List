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

import { NavigationContainer } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Test from './components/Home'
class App extends React.Component {
  constructor(props) {
        super(props)
        this.state = {homePage : false,
                      value : 'firstdata'}
        this.btnClick = this.btnClick.bind(this)
        this.gotoLogin = this.gotoLogin.bind(this)
        this.gotoHome = this.gotoHome.bind(this)
        this.gotoRegister = this.gotoRegister.bind(this) 
    }
    async btnClick() {
      // Navigate to the HelloWorld view
      //this.props.navigation.navigate('Login')
      try {
        // Add any configuration settings here:
        
        await GoogleSignin.configure({
          scopes: ['profile', 'email'],
            androidClientId:"2269193232-9utjf52r5db5cvnqbvme74np4phb8olh.apps.googleusercontent.com",
        });
        
        //2269193232-9utjf52r5db5cvnqbvme74np4phb8olh.apps.googleusercontent.com
        //Firebase
        //897901111596-av1jbficpm2313paci9elsriahnfqs1h.apps.googleusercontent.com
        const data = await GoogleSignin.signIn();
        console.log(data)
        const currentUserData = GoogleSignin.getTokens().then((res)=>{
            var accessToken = res.accessToken;
            console.log(res)
        });
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, currentUserData.accessToken)
        // login with credential
        const currentUser = await firebase.auth().signInWithCredential(credential);
        console.info(JSON.stringify(currentUser.toJSON()));
      } catch (e) {
        console.error(e);
      }
    }
    onChangePass = (Text) => {
        this.setState({comment : Text})
    }
    gotoLogin(){
      this.props.navigation.navigate('Login')
    }
    gotoRegister() {
      this.props.navigation.navigate('Register')
    }
    gotoHome() {
      this.props.navigation.navigate('Test')
    }
  render() {
    const {
        user,
        
        } = this.props;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style = {styles.container}>
        {/* <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.btnClick}
          disabled={this.state.isSigninInProgress} /> */}
        <Text style={styles.titleText}>
                    {'Welcome to Tudoo'}{'\n'}{'\n'}
                </Text>

        <Button onPress = {this.gotoLogin} title = "Existing User ? Login" style = {{color : 'black'}} color="#3e3ab7"/>
        <Button onPress = {this.gotoRegister} title = "New User ? Register here" />
        <Button onPress = {this.gotoHome} title = "Link to another com"/>
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
      console.log(this.state.email)
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
class Comments extends React.Component {
  constructor(props) {
        super(props)
        this.state = {homePage : false,
                      value : 'firstdata'}
        this.storeTodo = this.storeTodo.bind(this)
    }
    storeTodo(){
      Alert.alert("Stored")
      const db = firebase.firestore();
        db.settings({
            
        });
        db.collection("todoData").doc('new').set({
          comment : this.state.comment,
          date : this.state.date,          
      })
      .then(function() {
          Alert.alert("Data has been stored")
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    }
  render() {
    return(
      <View>
        
        <Text> Comment :</Text>
        <TextInput style={{ height: 50, width : 300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => this.onChangePass(text)}
      value={this.state.value} />  
      <Text> Date :</Text>
      <DatePicker
        style={{width: 300, height : 50}}
        date={this.state.date}
        mode="datetime"
        is24Hour = {false}
        placeholder="select date"
        format="YYYY-MM-DD HH:MM"
        minDate="2020-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      <Button title = "Store" onPress ={this.storeTodo} />
      </View>
    )
  }
}
class HelloWorld extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello World!🤓</Text>
      </View>
    )
  }
}
class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email:'test@mail.com',
                        pass : 'lkjlkj',
                        titleText : 'Transport'
        }
        this.loginScreen = this.loginScreen.bind(this)
    }
    loginScreen() {
        this.setState({home : true})
    }

render() {
          
        return(
            <View style = {styles.container}>
                <Button style = {styles.container} title = "home" />
            </View>
        )
};
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email:'test@mail.com',
                        pass : 'lkjlkj',
                        titleText : 'Transport',
                        homePage : false,
                        stackOverFlow : [],
        }
    }
    btnClicked =() => {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).then(result =>  {
                Alert.alert(result.user.email)
                Alert.alert("Logged In")
            }).catch(error => {
                Alert.alert(error.message)
            })
        }
    onChangeText = (Text) => {
        this.setState({email : Text})
    }
    onChangePass = (Text) => {
        this.setState({pass : Text})
    }
    backToHome = () => {
        this.setState({homePage : true})
    }
    skipBtn = () => {
            axios.get('https://api.stackexchange.com/2.2/users/8240120?order=desc&sort=reputation&site=stackoverflow').then((response) => {
                this.setState({stackOverFlow : response.data.items})
                console.log(response.data.items)
            });
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
                <Button title ="Login" onPress = {this.btnClicked}/>
                <Button title = {'Skip'} onPress = {this.skipBtn} />
                    {this.state.stackOverFlow.map((i,index) => {
                      return(
                        <View>
                          <Text> {i.location} </Text>
                          <Text> {i.user_id} </Text>
                          <Text style={{color: 'blue'}}
                              onPress={() => Linking.openURL(i.link)}>
                          Open stackoverflow
                        </Text>
                          <Image
                            style={{width: 100, height: 100}}
                            source={{uri: i.profile_image}}
                          />
                          <Text> {i.display_name} </Text>
                        </View>
                      )
                    })
                    }
                {this.state.homePage ? <AppNavigator/> : null}
            </View>
        )
    }
};
export default createAppContainer( createStackNavigator({
  Home : App,
  HelloWorld,
  HomePage : HomePage,
  Login : Home,
  Comment : Comments,
  Register : Register,
  Test : Test

}));