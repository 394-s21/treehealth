import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
// import { ListItem, Icon } from 'react-native-elements'
// import { NavigationContainer, CommonActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// import { Foundation } from '@expo/vector-icons';
// import {Picker} from '@react-native-picker/picker';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryScatter, VictoryZoomContainer, VictoryTooltip } from '../Victory';
import { createContainer } from '../Victory';
// import {createContainer} from '../Victory.web';
// import { VictoryTooltip} from 'victory';
import JsonParser from "./JsonParser";
import { Line } from 'react-native-svg';
import SapFlow from './SapFlow';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LineChart from './LineChart';

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export default function Charts({ navigation, timeRange }) {

    var chartAspectWidth = vw(95);

    // Environment
    var rawEnvData = require('../data/forestryplot_spruce_met.json')

    // VPD
    var vpdDistinctColor = "blue";
    var vpdLineColor = "#00a3de";
    // TODO: What unit of measure is VPD?
    var vpdValues = JsonParser(rawEnvData, "VPD", vpdDistinctColor, "VPD", "kPa");
    var vpdDataHourly = vpdValues[0];
    var vpdDataDaily = vpdValues[1];

    // Temp
    var tempDistinctColor = "blue";
    var tempLineColor = "#00a3de";
    var tempValues = JsonParser(rawEnvData, "Temp", tempDistinctColor, "Temp", "°C");
    var tempDataHourly = tempValues[0];
    var tempDataDaily = tempValues[1];

    // Rain
    var rainDistinctColor = "blue";
    var rainLineColor = "#00a3de";
    // TODO: What unit of measure is Rain?
    var rainValues = JsonParser(rawEnvData, "Rain", rainDistinctColor, "Rain", "mm?");
    var rainDataHourly = rainValues[0];
    var rainDataDaily = rainValues[1];

    // var rawSpruceData = require('../data/102_norwayspruce.json');

    return (
        <View style={styles.container}>
            <SapFlow timeRange={timeRange}/>
            {/* VPD graph */}
            <LineChart
                label={'VPD'}
                hourlyData={vpdDataHourly}
                dailyData={vpdDataDaily}
                lineColor={vpdLineColor}
                timeRange={timeRange}
            />
            {/* Temp graph */}
            <LineChart
                label={'Temp'}
                hourlyData={tempDataHourly}
                dailyData={tempDataDaily}
                lineColor={tempLineColor}
                timeRange={timeRange}
            />
            {/* Rain graph */}
            <LineChart
                label={'Rain'}
                hourlyData={rainDataHourly}
                dailyData={rainDataDaily}
                lineColor={rainLineColor}
                timeRange={timeRange}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingLeft: Platform.OS === "android" ? vw(50) : 0,
        paddingRight: Platform.OS === "ios" ? vw(50) : 0
    },
});
