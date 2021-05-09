import * as React from 'react';
import { View, Button, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { FontAwesome } from '@expo/vector-icons';
import { Input } from 'react-native-elements';

const SpeciesTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <Input
      style={styles.textInput}
      onChangeText={text => onChangeText(text)}
      value={value}
      placeholder = "Species"
    />
  );
}

const LocationTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <Input
      style={styles.textInput}
      onChangeText={text => onChangeText(text)}
      value={value}
      placeholder = "Tree Location"
    />
  );
}

const DiameterTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <Input
      style={styles.textInput}
      onChangeText={text => onChangeText(text)}
      value={value}
      placeholder = "Tree Diameter (DBH)"
    />
  );
}

const SensorTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <Input
      style={styles.textInput}
      onChangeText={text => onChangeText(text)}
      value={value}
      placeholder = "Sap Flow Sensor ID"
    />
  );
}

const NotesTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <Input
      style={styles.NotesTextInput}
      onChangeText={text => onChangeText(text)}
      value={value}
      placeholder = "Notes"
      multiline={true}
    />
  );
}


export default class AddTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        filters: ['testFilter'],
        filterInput: ''
    }
  }

  handleAdd() {
    this.setState(prevState => ({
      filters: [...prevState.filters, this.state.filterInput],
      filterInput: ''
    }))
  }

  render() {
    return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerScroll}>
        <ScrollView style={styles.scrollView}>
        <Text style={styles.paragraph}>
          <SpeciesTextInput />
          <LocationTextInput />
          <DiameterTextInput />
          <SensorTextInput />
          <NotesTextInput />
          <View style={styles.filterContainer}>
            <View style={styles.filterDiv}>
            <Input
              style={styles.filterTextInput}
              containerStyle={{width: vw(60)}}
              onChangeText={text => this.setState({filterInput: text})}
              value={this.state.filterInput}
              placeholder = "Enter filter name"
            />
            <View style={{marginTop: 5}}>
              <Button
              onPress={() => this.handleAdd()}
              title="add"
              color="#38735D"
              backgroundColor='green'>
              </Button>
            </View>
          </View>
          <View style={styles.addedFiltersDiv}>
              {this.state.filters.map((item) => (
                  <Text style={styles.addedFilters}>{item}</Text>
                  ))}
            </View>
          </View>
          
            <TouchableHighlight onPress = {() => this.onClickSap()}>
              <View style={styles.sap}>
                <FontAwesome name='upload' color="white" size={40} /> 
                <Text style={{color: 'white', textAlign: 'center'}}>Upload sap flow data</Text>
              </View>
            </TouchableHighlight>
          </Text>
          </ScrollView>
        </SafeAreaView>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button style={styles.insidebutton}
          title="Save"
          color="#38735D"
          onPress={() =>
          this.props.navigation.dispatch(
            CommonActions.navigate({
              name: 'My forest',

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
    backgroundColor: 'white'
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection:"row",
    fontSize: 18,
  },
  button: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8
  },
  insidebutton: {
    padding: 10,
    width: vw(50),
    borderRadius: 5
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
  NotesTextInput: {
    padding: 10,
    margin: vh(1),
    width: vw(90),
    borderColor: 'gray',
    backgroundColor: '#EBEBEB',
    height: 120,
    borderRadius: 5
  },
  sap: {
    alignItems: "center",
    fontSize: 16,
    backgroundColor: "#38735D",
    color: 'white',
    padding: 5,
    fontWeight: 'normal',
    borderRadius: 20,
    width: vw(30),
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  filterTextInput: {
    padding: 15,
    height: 50,
    width: vw(20),
    backgroundColor: '#EBEBEB',
    fontSize: 16,
    borderRadius: 5
  },
  filterDiv: {
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
    justifyContent: 'space-between'
  },
  containerScroll: {
    height: vh(80),
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    padding: 8,
  },
  addedFilters: {
    fontSize: 16,
    fontWeight: 'normal',
    backgroundColor: '#EBEBEB',
    borderRadius: 5,
    padding: 3,
    margin: vh(1)
  },
  addedFiltersDiv: {
    flexDirection: 'row',
    textAlign: 'left',
    marginRight: vh(1),
    width: vw(90),
    flexWrap: 'wrap'
  },
  filterContainer: {
    flexDirection: 'column',
  }
});