import React, {useState} from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { Input } from 'react-native-elements';

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  console.log(username)
  console.log(password)
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        <Image style={styles.image} source={require('../logo.png')} />
      </Text>
      <Text style={styles.filler}></Text>
      <Text style={styles.paragraph}>
        <Input
          style={styles.textInput}
          onChangeText={setUsername}
          value={username}
          placeholder="Username*"
        />
        <Input
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="Password*"
          secureTextEntry={true}
        />
      </Text>
      <Text style={styles.filler}></Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button style={styles.insidebutton}
            title="SIGN IN"
            color="#38735D"
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate({
                  name: 'My forest',
                  key: 'my forest from sign up'
                })
              )}
          ></Button>
        </View>
      </View>
    </View>
  );
}

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
    flex: 3,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
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
    backgroundColor: '#EBEBEB',
    fontSize: 16,
    borderRadius: 5
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