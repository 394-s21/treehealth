import  React from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';


export default function Login({navigation}) {

    return (
    <View style={styles.container}>
      <Text style={styles.filler}></Text>
      <Text style={styles.paragraph}>
        {/* Display TreeSearcher logo */}
        <Image style={styles.image} source={require('../logo.png')} />
      </Text>
      <Text style={styles.filler}></Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          {/* Click button to Sign Up */}
          <Button style={styles.insidebutton}
          title="Sign Up"
          color="#38735D"
          backgroundColor="green"
          onPress={() =>
          navigation.dispatch(
            CommonActions.navigate({
              name: 'Sign up',

            })
          )}>
          </Button>
        </View>
        <View style={styles.button}>
          {/* Click button to Sign In */}
          <Button style={styles.insidebutton}
          title="Sign In"
          color="#38735D"
          backgroundColor="green"
          onPress={() =>
          navigation.dispatch(
            CommonActions.navigate({
              name: 'Sign in',
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
    flex: 2,
    margin: 24,
    fontSize: 18,
    flexDirection:"column",
    textAlign: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection:"row",
    fontSize: 18,
  },
  button: {
    margin: 10,
    justifyContent: 'center',
    flex: 1,
  },
  insidebutton: {
    padding: 10,
    borderRadius: 5,
  },
  image: {
    width: 220,
    height: 120
  }
});