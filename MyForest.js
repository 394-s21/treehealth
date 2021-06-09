import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { ListItem } from 'react-native-elements'
import { CommonActions } from '@react-navigation/native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';


export default function MyForest({navigation}) {
  // Initialize screen as showing list of trees
  const [selectedValue, setSelectedValue] = useState('tree')

  // Initialize trees and plots
  const trees = ['Tree 1', 'Tree 2', 'Tree 3', 'Tree 4', 'Tree 5', 'Tree 6']
  const plots = ['Plot 1', 'Plot 2', 'Plot 3', 'Plot 4', 'Plot 5']

  function TreeOrPlot() {
    var list = selectedValue === 'tree' ? trees : plots
    // Create list of either trees or plots depending on selectedValue
    return (
      <View>
        {list.map((item, id) => (
          <ListItem key={id} bottomDivider containerStyle={{ backgroundColor: '#EBEBEB', borderRadius: 5 }} onPress={() => navigation.navigate('Tree Detail')}>
            <View style={styles.list}>
              <View style={{ flexDirection: 'row', }}>
                <FontAwesome name='tree' color="gray" size={20} style={{ marginRight: 10, }} />
                <ListItem.Content >
                  <ListItem.Title>{item}</ListItem.Title>
                </ListItem.Content>
              </View>
              <FontAwesome name='chevron-right' color="#38735D" size={10} style={{ marginRight: 10, marginTop: 3 }} />
            </View>
          </ListItem>
        ))}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.filler}></Text>
      <View style={{ textAlign: 'center', marginBottom: 10 }}>
        <View style={styles.filterDiv}>
          <Text style={{ fontSize: 25, marginTop: 10 }}> Filter by </Text>
          <View style={{ marginTop: 5 }}>
            <View style={styles.dropdown}>
              {/* Picker to switch between trees and plots */}
              <Picker
                mode="dropdown"
                placeholdericoncolor={'#E2E2E2'}
                value={selectedValue}
                style={{ height: 50, width: 150, backgroundColor: '#38735D', color: 'white', borderRadius: 5, padding: 10 }}
                onValueChange={setSelectedValue}
              >
                <Picker.Item label="tree" value="tree" />
                <Picker.Item label="plot" value="plot" />
              </Picker>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.paragraph}>

        <SafeAreaView style={styles.containerScroll}>
          <ScrollView style={styles.scrollView}>
            <View>
              <TreeOrPlot />
            </View>
          </ScrollView>
        </SafeAreaView>

      </Text>
      <Text style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', flex: 7}}>
        {/* Navigate to a page to add a tree or plot */}
        <TouchableHighlight onPress={() =>
          navigation.dispatch(
            CommonActions.navigate({
              name: 'Add a tree/plot',

            })
          )}>
          <View style={styles.add}>
            <FontAwesome name='plus' color="white" size={40} />
            <Text style={{ color: 'white' }}>Add tree/plot</Text>
          </View>
        </TouchableHighlight>
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  paragraph: {
    textAlign: 'center',
    flex: 20
  },
  filler: {
    flex: 1,
  },
  add: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    backgroundColor: "#38735D",
    color: 'white',
    padding: 5,
    fontWeight: 'normal',
    width: vw(30),
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
  },
  filterDiv: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
    fontSize: 16,
    fontWeight: 'normal',
    width: vw(90),
    borderRadius: 5,
    flexDirection: 'row',
    textAlign: 'left',
    margin: vh(1),
    justifyContent: 'space-between'
  },
  containerScroll: {
    height: vh(50),
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    padding: 8
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: vw(80),
  }
});