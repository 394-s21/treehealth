import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import { vw, vh } from 'react-native-expo-viewport-units';


export default class Add extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
    <View style={styles.container}>
      <Text style={styles.filler}></Text>
      <Text style={styles.buttons}>
        {/* Button to Add a tree */}
        <Button buttonStyle={{backgroundColor: '#38735D', width: vw(60), padding: 15}}
          raised
          title="Add Tree"
          onPress={() =>
          this.props.navigation.dispatch(
            CommonActions.navigate({
              name: 'Add tree',
            })
          )}
          ></Button>
          <View style={{height: vh(20)}} />
          {/* Button to Add a plot */}
          <Button buttonStyle={{backgroundColor: '#38735D', width: vw(60), padding: 15}}
          title="Add Plot"
          raised
          onPress={() =>
          this.props.navigation.dispatch(
            CommonActions.navigate({
              name: 'Add plot',
            })
          )}
          ></Button>
      </Text>
      <Text style={styles.filler}></Text>
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
    flex: 2,
  },
  buttons: {
    flex: 3,
    justifyContent: 'center',
    textAlign: 'center'
  }
});