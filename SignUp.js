import * as React from 'react';
import { View, Button, Text, StyleSheet, TextInput, Image } from 'react-native';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import DatePicker from 'react-native-datepicker';
import { Input } from 'react-native-elements';


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        username: "",
        password: "",
        date: ''
    }
  }

  selectDate = (date) => {
    this.setState({date: date});
  }
  
  render() {
    return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        <Image style={styles.image} source={require('./logo.png')} />
      </Text>
      <Text style={styles.paragraph}>
        <Input
              style={styles.textInput}
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
              placeholder = "Email*"
        />
        <Input
              style={styles.textInput}
              onChangeText={text => this.setState({username: text})}
              value={this.state.username}
              placeholder = "Username*"
        />
        <Input
              style={styles.textInput}
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
              placeholder = "Password*"
              secureTextEntry={true}
        />
        <View style={styles.datePicker}>
          <Text style={{ marginTop: 7, color: 'gray', fontSize: 16 }}> Birthdate*&nbsp;&nbsp;</Text>
          <DatePicker
              style={{ width: vw(50) }}
              date={this.state.date}
              format="MM-DD-YYYY"
              minDate="01-01-1900"
              maxDate="01-01-2021"
              onDateChange={this.selectDate}
            />
        </View>
      </Text>
      <Text style={styles.filler}></Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button style={styles.insidebutton}
          title="SIGN UP"
          color="#38735D"
          backgroundColor='green'
          onPress={() =>
          this.props.navigation.dispatch(
            CommonActions.navigate({
              name: 'My forest',
              key: 'my forest from sign in'
            })
          )}
          ></Button>
        </View>
      </View>
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  filler: {
    flex: 1,
  },
  paragraph: {
    flex: 4,

    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    marginTop: 10,
  },
  buttons: {
    flex: 1,
    flexDirection:"row",
    fontSize: 18,
  },
  button: {
    justifyContent: 'center',
    flex: 1,
  },
  insidebutton: {
    padding: 10,
  },
  textInput: {
    padding: 15,
    margin: vh(1),
    height: 50,
    width: vw(90),
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#EBEBEB',
  },
  datePicker: {
    paddingTop: 5,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 15,
    height: 50,
    fontSize: 16,
    fontWeight: 'normal',
    width: vw(90),
    borderRadius: 5,
    backgroundColor: '#EBEBEB',
    flexDirection: 'row',
    textAlign: 'left',
    margin: vh(1),
    color: 'gray',
    justifyContent: 'space-between'
  },
  image: {
    width: 220,
    height: 120
  },
  logo: {
    flex: 2,
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
    color: '#38735D'
  }
});