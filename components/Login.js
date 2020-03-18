
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
import Notes from './Notes'
import { NavigationContainer } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
class Login extends React.Component {
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
                this.props.navigation.navigate('Notes')
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
            </View>
        )
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
export default createAppContainer( createStackNavigator({
  Login : Login,
  Notes : Notes,
}));