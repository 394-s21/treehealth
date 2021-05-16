import React from 'react';
import { View, StyleSheet } from 'react-native';
// import { ListItem, Icon } from 'react-native-elements'
// import { NavigationContainer, CommonActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// import { Foundation } from '@expo/vector-icons';
// import {Picker} from '@react-native-picker/picker';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryScatter} from '../Victory';
import {VictoryZoomContainer} from "victory-zoom-container";
import { VictoryTooltip, createContainer} from 'victory';

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export default function Charts ({navigation}) {

    var rawSFMData = require('../data/SFM2I102_sycamore.json');
    var sfmInDataHourly = []
    var sfmInDataDaily = []
    var sfmOutDataHourly = []
    var sfmOutDataDaily = []

    var prevIn = 0
    var prevOut = 0
    var counter = 0
    var missingIn = []
    var missingOut = []
    var inColor = '#00a3de'
    var outColor = '#7c270b'
    var inScattSize = 1
    var outScattSize = 1

    for (const [key, value] of Object.entries(rawSFMData)) {

        if (value["Corrected In (cm/hr)"] != "") {
            var inside = parseFloat(value["Corrected In (cm/hr)"])
        } else {
            var inside = undefined
            // missingIn.push(counter)
        }

        if (value["Corrected Out (cm/hr)"] != "") {
            var outside = parseFloat(value["Corrected Out (cm/hr)"])
        } else {
            var outside = undefined
            // missingOut.push(counter)
        }

        let dateVal = key.split(",")[0]
        let timeVal = key.split(",")[1]

        if (dateVal == "2/2/2021") {
            if (inside == undefined) {
                missingIn.push(counter)
                inside = prevIn
                inColor = 'red'
                inScattSize = 3
            }
            if (outside == undefined) {
                missingOut.push(counter)
                outside = prevOut
                outColor = 'red'
                outScattSize = 3
            }
            sfmInDataHourly.push({time: timeVal.substring(1, timeVal.length-3), sapFlowIn: inside, size: inScattSize, color: inColor})
            sfmOutDataHourly.push({time: timeVal.substring(1, timeVal.length-3), sapFlowOut: outside, size: outScattSize, color: outColor})
            
            inColor = '#00a3de'
            outColor = '#7c270b'
            inScattSize = 1
            outScattSize = 1
            counter++
        }

        if (timeVal == "0:00:00") {
            sfmInDataDaily.push({time: dateVal, sapFlowIn: inside})
            sfmOutDataDaily.push({time: dateVal, sapFlowOut: outside})
        }


        prevIn = inside
        prevOut = outside
    }

    console.log(sfmInDataHourly)
    console.log(missingIn)
    console.log(missingOut)
   
    return (
        <View style={styles.container}>
            <VictoryChart theme={VictoryTheme.material} containerComponent = {<VictoryZoomVoronoiContainer/>}>
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
                <VictoryLine data={sfmInDataHourly} style = {{data: {stroke: '#00a3de'}}}
                x="time"
                y="sapFlowIn" />
                 <VictoryLine data={sfmOutDataHourly} style = {{data: {stroke: '#7c270b'}}}
                x="time"
                y="sapFlowOut" />
                <VictoryScatter data={sfmInDataHourly} style = {{data: {fill: ({ datum }) => datum.color}}}
                x="time"
                y="sapFlowIn"
                labels={({datum}) => [`Sap Flow In: ${datum.sapFlowIn} cm/hr`, `Time: ${datum.time}`]} 
                labelComponent={<VictoryTooltip/>}
                // size={({ active }) => active ? 5 : 1}
                />
                <VictoryScatter data={sfmOutDataHourly} style = {{data: {fill: ({ datum }) => datum.color}}}
                x="time"
                y="sapFlowOut"
                labels={({datum}) => [`Sap Flow Out: ${datum.sapFlowOut} cm/hr`, `Time: ${datum.time}`]} 
                labelComponent={<VictoryTooltip/>}
                // size={({ active }) => active ? 5 : 1} 
                />
               
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