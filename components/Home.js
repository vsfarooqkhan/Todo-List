import React from 'react'
import {Button, TextInput, Alert, View, Text} from 'react-native';
import * as firebase from "firebase";
import { myFirebase } from './firebaseConfig';
const [value] = 'Useless Placeholder';
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email:'test@mail.com',
                        pass : 'lkjlkj'
        }
    }
    btnClicked =() => {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then(result =>  {
                Alert.alert(result)
                this.setState({ uid: result.user.uid })
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
    render() {
          
        return(
            <View>
                <Text>Home Screen</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.onChangeText(text)}
                    value={this.state.email}
                    />
                    <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.onChangePass(text)}
                    value={this.state.pass}
                    />
                <Button title ={this.props.welcome} onPress = {this.btnClicked}/>
            </View>
        )
    }
};