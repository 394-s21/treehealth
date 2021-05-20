import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
// import { ListItem, Icon } from 'react-native-elements'
// import { NavigationContainer, CommonActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// import { Foundation } from '@expo/vector-icons';
// import {Picker} from '@react-native-picker/picker';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryScatter } from '../Victory';
import { VictoryZoomContainer } from "victory-zoom-container";
import { VictoryTooltip, createContainer } from 'victory';
import JsonParser from "./JsonParser";

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export default function Charts({ navigation }) {

    var chartAspectWidth = 750; 

    var rawSFMData = require('../data/SFM2I102_sycamore.json');

    var inDistinctColor = "black";
    var inLineColor = "#00a3de";
    var inValues = JsonParser(rawSFMData, "Corrected In (cm/hr)", inDistinctColor);
    var sfmInDataHourly = inValues[0];
    var sfmInDataDaily = inValues[1];

    var outDistinctColor = "#00a3de";
    var outLineColor = "#7c270b";
    var outValues = JsonParser(rawSFMData, "Corrected Out (cm/hr)", outDistinctColor);
    var sfmOutDataHourly = outValues[0];
    var sfmOutDataDaily = outValues[1];

    var combinedSfmHourly = [...sfmInDataHourly, ...sfmOutDataHourly]
    var combinedSfmDaily = [...sfmInDataDaily, ...sfmOutDataDaily]
    console.log(combinedSfmHourly)
    console.log(combinedSfmDaily)

    // var rawSpruceData = require('../data/102_norwayspruce.json');

    /*
    var rawSFMData = require('../data/SFM2I102_sycamore.json');
    var spruceData = require('../data/102_norwayspruce.json');
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
    */

    return (
        <View style={styles.container}>
            {/* Hourly graph */}
            <VictoryChart width={chartAspectWidth} theme={VictoryTheme.material} containerComponent={<VictoryZoomVoronoiContainer responsive={false}/>}>
                <VictoryAxis offsetY={50}
                    tickCount={6}
                />
                <VictoryAxis dependentAxis />
                <VictoryLabel x={40} y={20} style={[{ fill: inLineColor }]}
                    text={"Sap Flow In"}
                />
                <VictoryLabel x={40} y={35} style={[{ fill: outLineColor }]}
                    text={"Sap Flow Out"}
                />
                <VictoryLine data={sfmInDataHourly} style={{ data: { stroke: inLineColor } }}
                    x="time"
                    y="data" />
                <VictoryLine data={sfmOutDataHourly} style={{ data: { stroke: outLineColor } }}
                    x="time"
                    y="data" />
                <VictoryScatter data={combinedSfmHourly} style={{ data: { fill: ({ datum }) => datum.color } }}
                    x="time"
                    y="data"
                    labels={({ datum }) => [`Sap Flow Out: ${datum.data} cm/hr`, `Time: ${datum.time}`]}
                    labelComponent={<VictoryTooltip />}
                />
            </VictoryChart>
            {/* Daily graph */}
            {/* <VictoryChart width={chartAspectWidth} theme={VictoryTheme.material} containerComponent={<VictoryZoomVoronoiContainer responsive={false}/>}>
                <VictoryAxis offsetY={50}
                    tickCount={6}
                />
                <VictoryAxis dependentAxis />
                <VictoryLabel x={40} y={20} style={[{ fill: inLineColor }]}
                    text={"Sap Flow In"}
                />
                <VictoryLabel x={40} y={35} style={[{ fill: outLineColor }]}
                    text={"Sap Flow Out"}
                />
                <VictoryLine data={sfmInDataDaily} style={{ data: { stroke: inLineColor } }}
                    x="time"
                    y="data" />
                <VictoryLine data={sfmOutDataDaily} style={{ data: { stroke: outLineColor } }}
                    x="time"
                    y="data" />
                <VictoryScatter data={combinedSfmDaily} style={{ data: { fill: ({ datum }) => datum.color } }}
                    x="time"
                    y="data"
                    labels={({ datum }) => [`Sap Flow Out: ${datum.data} cm/hr`, `Time: ${datum.time}`]}
                    labelComponent={<VictoryTooltip />}
                />
            </VictoryChart> */}
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
