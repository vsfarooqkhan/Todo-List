import React from 'react'
import {Button, StyleSheet, TextInput, Alert, View, Text} from 'react-native';
const styles = StyleSheet.create({
    container: {
    width : '100%',
    height: '100%',
  }
})
export default class HomePage extends React.Component {
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