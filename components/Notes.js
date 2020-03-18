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
import Logout from './Logout'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class Notes extends React.Component {
  constructor(props) {
        super(props)
        this.state = {homePage : false,
                      value : 'firstdata',
                      title : ''}
        this.storeTodo = this.storeTodo.bind(this)
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(authUser => {
        authUser
            ? this.setState({ userName : authUser.email })
            : this.setState({ userName: null });
        });
    }
    onChangePass = (Text) => {
        this.setState({comment : Text})
    }
    onChangeTitle = (Text) => {
        this.setState({ title : Text})
    }
    storeTodo(){
      Alert.alert("Stored")
      const db = firebase.firestore();
        db.settings({
            
        });
        db.collection('todoData').doc(this.state.userName).collection('notes').doc(this.state.title).set({
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
        <Text> Title :</Text>
        <TextInput style={{ height: 50, width : 300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => this.onChangeTitle(text)}
      value={this.state.title} />  
        <Text> Comment :</Text>
        <TextInput style={{ height: 50, width : 300, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => this.onChangePass(text)}
      value={this.state.comment} />  
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
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
      </View>
    )
  }
}
const Drawer = createDrawerNavigator();

export default createAppContainer( createStackNavigator({
  Notes : Notes,
}));