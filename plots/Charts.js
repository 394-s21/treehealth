import * as React from 'react';
import { View, Button, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView, SafeAreaView, StatusBar } from 'react-native';
// import { ListItem, Icon } from 'react-native-elements'
// import { NavigationContainer, CommonActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// import { Foundation } from '@expo/vector-icons';
// import {Picker} from '@react-native-picker/picker';
import {VictoryBar, VictoryChart, VictoryTheme} from '../Victory';


function Charts ({navigation}) {

    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ];

    return (
        <View style={styles.container}>
            <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryBar data={data} x="quarter" y="earnings" />
            </VictoryChart>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });

export default Charts;