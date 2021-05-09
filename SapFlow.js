import * as React from 'react';
import { View, Button, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Foundation } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';


export default class SapFlow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.state = {
      treeSpecies: 'American Elm',
      treeLocation: '4100 IL-53, Lisle',
      treeDiameter: 'Diameter: 3ft',
      treeSensor: 'Sensor: e7vi3',
      average: '8.5',
      selectedView: 'daily',
      selectedTime: 'Mar 1',
      days: ['Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5'],
      weeks: ['Feb 28 - Mar 6', 'Mar 7-13', 'Mar 14-20'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'],
    }

  }

  handleDropdown(itemValue) {
    this.setState({selectedView: itemValue}, () => this.returnDropdownTwo());
  }

  handleDropdownTwo(itemValue) {
    this.setState({selectedTime: itemValue});
  }

  returnDropdownTwo() {
    if (this.state.selectedView == "daily"){
      return (
        <Picker
              selectedValue={this.state.selectedTime}
              style={{ height: 45, width: vw(40), backgroundColor: '#38735D', color: 'white', borderRadius: 5, padding: 10 }}
              onValueChange={(selectedValue) => this.handleDropdownTwo(selectedValue)}
            >
              {this.state.days.map((item, id) => (
                  <Picker.Item key={item, id} label={item} value={item} />
              ))}
            </Picker>  
      )
    } else if (this.state.selectedView == "weekly"){
      return (
        <Picker
              selectedValue={this.state.selectedTime}
              style={{ height: 45, width: vw(40), backgroundColor: '#38735D', color: 'white', borderRadius: 5, padding: 10 }}
              onValueChange={(selectedValue) => this.handleDropdownTwo(selectedValue)}
            >
              {this.state.weeks.map((item) => (
                  <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>  
      )
    } else {
      return (
        <Picker
              selectedValue={this.state.selectedTime}
              style={{ height: 45, width: vw(40), backgroundColor: '#38735D', color: 'white', borderRadius: 5, padding: 10 }}
              onValueChange={(selectedValue) => this.handleDropdownTwo(selectedValue)}
            >
              {this.state.months.map((item) => (
                  <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>  
      )
    }
  }

  render() {
    let dropdownTwo = this.returnDropdownTwo();
    return (
    <View style={styles.container}>
      <Text style={styles.filler}></Text>
      <Text style={styles.paragraph}>
        <View style={styles.plot}></View>
        <View style={{textAlign: 'center', marginBottom: 10}}>
          <View style={styles.filterDiv}>
            <Picker
              selectedValue={this.state.selectedView}
              style={{ height: 45, width: vw(40), backgroundColor: '#38735D', color: 'white', borderRadius: 5, padding: 10 }}
              onValueChange={(itemValue) => this.handleDropdown(itemValue)}
            >
              <Picker.Item label="daily" value="daily" />
              <Picker.Item label="weekly" value="weekly" />
              <Picker.Item label="monthly" value="monthly" />
            </Picker>
            <View>{dropdownTwo}</View>
          </View>
        </View>
        <Text style={styles.paragraph}>
        </Text>
        <View style={styles.info}>
          <View style={styles.add}>
                    <Text> {this.state.treeSpecies}</Text>
                    <Text> {this.state.treeDiameter}</Text>
                    <Text> {this.state.treeSensor}</Text>
                    <Text> {this.state.treeLocation}</Text>
          </View>
          <View style={styles.add}>
                    <Text style={styles.inline}>
                      <Text style={{fontSize: 30, fontWeight: 'bold', marginRight: 5}}>{this.state.average}</Text>
                      <Text>cm/hr</Text>
                    </Text>
                    <Text >Average</Text>
          </View>
        </View>
      </Text>
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paragraph: {
    textAlign: 'center',
    flex: 20
  },
  filler: {
    flex: 1,
  },
  info: {
    width: vw(90), 
    flexDirection: 'row', 
    textAlign: 'left', 
    margin: vh(1), 
    justifyContent: 'space-between', 
    flex: 7
  },
  add: {
    alignItems: "center",
    fontSize: 16,
    backgroundColor: "#38735D",
    color: 'white',
    padding: 5,
    fontWeight: 'normal',
    width: vw(43),
    paddingTop: vh(2),
    paddingBottom: vh(2),
    borderRadius: 5
  },
  filterDiv: {
    width: vw(90),
    flexDirection: 'row',
    textAlign: 'left',
    margin: vh(1),
    justifyContent: 'space-between'
  },
  plot: {
    width: vw(90),
    backgroundColor: 'pink',
    height: vh(50)
  },
  inline: {
    flexDirection: 'row',
  }
});