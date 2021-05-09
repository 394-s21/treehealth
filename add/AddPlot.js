import * as React from 'react';
import { View, Button, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Input } from 'react-native-elements';

const NicknameTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <Input
      style={styles.textInput}
      onChangeText={text => onChangeText(text)}
      value={value}
      placeholder = "Plot nickname"
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
      placeholder = "Plot location"
    />
  );
}

const NumberTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <Input
      style={styles.textInput}
      onChangeText={text => onChangeText(text)}
      value={value}
      placeholder = "Number of trees"
    />
  );
}

const NotesTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <Input
      style={styles.notesTextInput}
      onChangeText={text => onChangeText(text)}
      value={value}
      placeholder = "Notes"
      multiline={true}
    />
  );
}

const FilterTextInput = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <TextInput
      style={styles.filterTextInput}
      onChangeText={text => onChangeText(text)}
      value={value}
      placeholder = "Enter filter name"
    />
  );
}


export default class Login extends React.Component {
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
        <NicknameTextInput />
        <LocationTextInput />
        <NumberTextInput />
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
              {this.state.filters.map((item, id) => (
                  <Text style={styles.addedFilters} key={id}>{item}</Text>
                  ))}
            </View>

          </View>
      </Text>
      </ScrollView>
      </SafeAreaView>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button style={styles.insidebutton}
          onPress={() => this.props.navigation.navigate('My forest')}
          title="Save"
          color="#38735D"
          backgroundColor='green'>
          </Button>
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
    backgroundColor: '#EBEBEB',
    fontSize: 16,
    borderRadius: 5
  },
  notesTextInput: {
    padding: 15,
    margin: vh(1),
    height: 100, 
    width: vw(90),
    backgroundColor: '#EBEBEB',
  },
  filterTextInput: {
    padding: 15,
    height: 50,
    width: vw(60),
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
    height: vh(75),
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