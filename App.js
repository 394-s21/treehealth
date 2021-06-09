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
import TreeDetailScreen from './plots/TreeDetailScreen';
import Charts from './plots/Charts';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator style={styles.container}>
        {/* Login Screen */}
        <Stack.Screen name="Treesearcher" component={Login} key="login" />
        {/* Sign Up Screen */}
        <Stack.Screen name="Sign up" component={SignUp} key="signup" />
        {/* Sign In Screen  */}
        <Stack.Screen name="Sign in" component={SignIn} key="signin" />
        {/* Screen Showing List of Trees */}
        <Stack.Screen name="My forest" component={MyForest} key="myforest" />
        {/* Add a Tree or Plot */}
        <Stack.Screen name="Add a tree/plot" component={Add} key="add" />
        {/* Add a Tree */}
        <Stack.Screen name="Add tree" component={AddTree} key="addtree" />
        {/* Add a Plot */}
        <Stack.Screen name="Add plot" component={AddPlot} key="addplot" />
        {/* Screen Showing Graphs and other Tree Info */}
        <Stack.Screen name="Tree Detail" component={TreeDetailScreen} key="treedetail" />
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