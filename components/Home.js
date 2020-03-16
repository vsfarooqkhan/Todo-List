import React from 'react'
import {Button, Alert} from 'react-native';

export default class Home extends React.Component {
    btnClicked() {
            Alert.alert("Welcome")
        }
    render() {
        
        return(
            <Button title ={this.props.welcome} onPress = {this.btnClicked}/>
        )
    }
};