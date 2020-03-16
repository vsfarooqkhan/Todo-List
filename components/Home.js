import React from 'react'
import {Button, StyleSheet, TextInput, Alert, View, Text} from 'react-native';
import * as firebase from "firebase";
import { myFirebase } from './firebaseConfig';
import HomePage from './HomePage'
import AppNavigator from './AppNavigator'

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

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email:'test@mail.com',
                        pass : 'lkjlkj',
                        titleText : 'Transport',
                        homePage : false,
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
    render() {
          
        return(
            <View>
                <Text style = {styles.loginText}>Login using Email and PassWord</Text>

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
                <Button title ={this.props.welcome} onPress = {this.btnClicked}/>
                <Button title = {'Skip'} onPress = {this.backToHome} />
                {this.state.homePage ? <AppNavigator/> : null}
            </View>
        )
    }
};