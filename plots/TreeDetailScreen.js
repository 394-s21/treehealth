import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Foundation } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Charts from './Charts';




export default function TreeDetailScreen({ navigation }) {
  const treeInfo = {
    treeSpecies: 'American Elm',
    treeLocation: '4100 IL-53, Lisle',
    treeDiameter: 'Diameter: 3ft',
    treeSensor: 'Sensor: e7vi3',
    average: '8.5'
  }
  const [selectedView, setSelectedView] = useState('daily')
  const [selectedTime, setSelectedTime] = useState('Mar 1')
  const days = ['Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5']
  const weeks = ['Feb 28 - Mar 6', 'Mar 7-13', 'Mar 14-20']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  

  function DropdownTwo() {
    var timeRange = days
    if (selectedView == "daily") {
      timeRange = days
    } else if (selectedView == "weekly") {
      timeRange = weeks
    } else if (selectedView == "monthly") {
      timeRange = months
    }


    return (
      <Picker
        selectedValue={selectedTime}
        style={{ height: vh(10), width: vw(40), backgroundColor: '#38735D', color: 'white', borderRadius: 5, padding: 10 }}
        onValueChange={setSelectedTime}
      >
        {timeRange.map((item, id) => (
          <Picker.Item key={item, id} label={item} value={item} />
        ))}
      </Picker>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.filler}></Text>
      <Text style={styles.paragraph}>
        <Text style={styles.paragraph}></Text>
        <View style={styles.info}>
          <View style={styles.add}>
            <Text> {treeInfo.treeSpecies}</Text>
            <Text> {treeInfo.treeDiameter}</Text>
            <Text> {treeInfo.treeSensor}</Text>
            <Text> {treeInfo.treeLocation}</Text>
          </View>
          <View style={styles.add}>
            <Text style={styles.inline}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: 5 }}>{treeInfo.average}</Text>
              <Text>cm/hr</Text>
            </Text>
            <Text >Average</Text>
          </View>
        </View>
        {/* <Charts style={styles.plot} /> */}
        {/*<View style={styles.plot}></View>*/}
        <View style={{ textAlign: 'center', marginBottom: 10, flex: 10}}>
          <View style={styles.filterDiv}>
            <Picker
              selectedValue={selectedView}
              style={{ height: vh(10), width: vw(40), backgroundColor: '#38735D', color: 'white', borderRadius: 5, padding: 10 }}
              onValueChange={setSelectedView}
            >
              <Picker.Item label="daily" value="daily" />
              <Picker.Item label="weekly" value="weekly" />
              <Picker.Item label="monthly" value="monthly" />
            </Picker>
            <View><DropdownTwo /></View>
          </View>
        </View>
        
        
        <Charts timeRange={selectedView} spiState={checkboxSPIState} spoState={checkboxSPOState} />
      </Text>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paragraph: {
    textAlign: 'center',
    flex: 20
  },
  parragraph: {
    textAlign: 'center',
    flex: 5
  },
  filler: {
    flex: 1,
  },
  info: {
    width: vw(90),
    height: vh(15),
    flexDirection: 'row',
    textAlign: 'left',
    margin: vh(1),
    justifyContent: 'space-between',
    flex: 5
  },
  add: {
    alignItems: "center",
    fontSize: 16,
    backgroundColor: "#38735D",
    color: 'white',
    padding: 5,
    fontWeight: 'normal',
    width: vw(43),
    height: vh(15),
    paddingTop: vh(2),
    paddingBottom: vh(2),
    borderRadius: 5
  },
  filterDiv: {
    width: vw(90),
    height: vw(20),
    flexDirection: 'row',
    textAlign: 'left',
    margin: vh(1),
    justifyContent: 'space-between'
  },
  plot: {
    flex: 5,
    width: vw(90),
    backgroundColor: 'pink',
    height: vh(20)
  },
  inline: {
    flexDirection: 'row',
  }
});
