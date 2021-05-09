import * as React from 'react';
import { View, Button, Text, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Login from './login/Login';
import AddTree from './add/AddTree';
import AddPlot from './add/AddPlot';
import SignUp from './login/SignUp';
import SignIn from './login/SignIn';
import Add from './add/Add';
import MyForest from './MyForest';
import SapFlow from './plots/SapFlow';
import Charts from './plots/Charts';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator style={styles.container}>
        <Stack.Screen name="Charts" component={Charts} key="charts" />
        <Stack.Screen name="TreeKeeper" component={Login} key ="login"/>
        <Stack.Screen name="Sign up" component={SignUp} key ="signup"/>
        <Stack.Screen name="Sign in" component={SignIn} key ="signin"/>
        <Stack.Screen name="My forest" component={MyForest} key ="myforest"/>
        <Stack.Screen name="Add a tree/plot" component={Add} key ="add"/>
        <Stack.Screen name="Add tree" component={AddTree} key ="addtree"/>
        <Stack.Screen name="Add plot" component={AddPlot} key ="addplot"/>
        <Stack.Screen name="Sap flow" component={SapFlow} key ="sapflow"/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C7D6D1',
    tintColor: '#0087B7',
    color: 'blue'
  },
});