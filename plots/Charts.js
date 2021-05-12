import React from 'react';
import { View, StyleSheet } from 'react-native';
// import { ListItem, Icon } from 'react-native-elements'
// import { NavigationContainer, CommonActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// import { Foundation } from '@expo/vector-icons';
// import {Picker} from '@react-native-picker/picker';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel} from '../Victory';


export default function Charts ({navigation}) {

    var rawSFMData = require('../data/SFM2I102_sycamore.json');
    var sfmInDataHourly = []
    var sfmInDataDaily = []
    var sfmOutDataHourly = []
    var sfmOutDataDaily = []

    var prevIn = 0
    var prevOut = 0

    for (const [key, value] of Object.entries(rawSFMData)) {

        if (value["Corrected In (cm/hr)"] != "") {
            var inside = parseFloat(value["Corrected In (cm/hr)"])
        } else {
            var inside = prevIn
        }

        if (value["Corrected Out (cm/hr)"] != "") {
            var outside = parseFloat(value["Corrected Out (cm/hr)"])
        } else {
            var outside = prevOut
        }

        let dateVal = key.split(",")[0]
        let timeVal = key.split(",")[1]

        if (dateVal == "2/2/2021") {
            sfmInDataHourly.push({time: timeVal.substring(1, timeVal.length-3), sapFlowIn: inside})
            sfmOutDataHourly.push({time: timeVal.substring(1, timeVal.length-3), sapFlowOut: outside})
        }

        if (timeVal == "0:00:00") {
            sfmInDataDaily.push({time: dateVal, sapFlowIn: inside})
            sfmOutDataDaily.push({time: dateVal, sapFlowOut: outside})
        }


        prevIn = inside
        prevOut = outside
    }

    console.log(sfmInDataHourly)

    return (
        <View style={styles.container}>
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryAxis offsetY={50}
                tickCount={6}
                />
                <VictoryAxis dependentAxis />
                <VictoryLabel x={40} y={20} style={[{ fill: '#00a3de' }]}
                    text={"Sap Flow In"}
                />
                <VictoryLabel x={40} y={35} style={[{ fill: '#7c270b' }]}
                    text={"Sap Flow Out"}
                />
                <VictoryLine data={sfmInDataHourly} style = {{data:{stroke: '#00a3de'}}}
                x="time"
                y="sapFlowIn" />
                <VictoryLine data={sfmOutDataHourly} style = {{data:{stroke: '#7c270b'}}}
                x="time"
                y="sapFlowOut" />
            </VictoryChart>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff"
    },    
  });