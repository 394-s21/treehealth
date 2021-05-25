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

// Sap Flow Sycamore
var rawSFMData = require('../data/SFM2I102_sycamore.json');
var inDistinctColor = "black";
var inLineColor = "#00a3de";
var sfmInData = JsonParser(rawSFMData, "Corrected In (cm/hr)", inDistinctColor, "Sap Flow In", "cm/hr");

var outDistinctColor = "#00a3de";
var outLineColor = "#7c270b";
var sfmOutData = JsonParser(rawSFMData, "Corrected Out (cm/hr)", outDistinctColor, "Sap Flow Out", "cm/hr");

var combinedSfmData= [...sfmInData, ...sfmOutData]

// Environment
var rawEnvData = require('../data/forestryplot_spruce_met.json')

// VPD
var vpdDistinctColor = "blue";
var vpdLineColor = "#00a3de";
// TODO: What unit of measure is VPD?
var vpdData = JsonParser(rawEnvData, "VPD", vpdDistinctColor, "VPD", "kPa");

// Temp
var tempDistinctColor = "blue";
var tempLineColor = "#00a3de";
var tempData = JsonParser(rawEnvData, "Temp", tempDistinctColor, "Temp", "°C");

// Rain
var rainDistinctColor = "blue";
var rainLineColor = "#00a3de";
// TODO: What unit of measure is Rain?
var rainData = JsonParser(rawEnvData, "Rain", rainDistinctColor, "Rain", "mm?");

function handleTick(t, tickType) {
    if (tickType === "daily") return `${getTimePortion(t, "|", 0)}`;
    else if (tickType === "weekly") return `${getTimePortion(t, "|", 1)}`;
    else if (tickType === "monthly") return `${getTimePortion(t, "|", 2)}`;
    else if (tickType === "yearly") return `${getTimePortion(t, "|", 3)}`;
    else return "error";
}

function getTimePortion(time, key, num) {
    if(typeof time === 'string' || time instanceof String) {
        var dummy = time;
        for(var i = 0; i < num; i++) {
            var index = dummy.indexOf(key);
            dummy = dummy.substring(index + 1);
        }
        var index = dummy.indexOf(key);
        if(index == -1) return dummy;
        return dummy.substring(0, index);
    }
    return "error"
}

export default function Charts({ navigation, timeRange }) {

    var chartAspectWidth = 750;
    
    // Amount of data points for a day
    const dailyLimit = 120;
    const weeklyLimit = 840;
    const monthlyLimit = 3360;

    var limit = dailyLimit;
    if (timeRange === "weekly") limit = weeklyLimit;
    else if (timeRange === "monthly") limit = monthlyLimit;
    else if (timeRange === "yearly") limit = null;
 
    function determineTimeRange(domain) {
        var points = domain["x"][1] - domain["x"][0];
        if(points < dailyLimit) return "daily";
        else if(points > dailyLimit && points < weeklyLimit) return "weekly";
        else if(points > weeklyLimit && points < monthlyLimit) return "monthly";
        else if(points > monthlyLimit) return "yearly";
        return "error";
    }

    // TODO - Set as a parameter based on time range
    var startIndex = 0;

    const [tickSapFlow, setTickSapFlow] = useState(timeRange);
    const [tickVpd, setTickVpd] = useState(timeRange);
    const [tickTemp, setTickTemp] = useState(timeRange);
    const [tickRain, setTickRain] = useState(timeRange);

    return (
        <View style={styles.container}>
            {/* Sap Flow graph */}
            <VictoryChart width={chartAspectWidth} theme={VictoryTheme.material} 
                containerComponent={
                    <VictoryZoomVoronoiContainer
                        responsive={false} 
                        zoomDomain={!limit ? {} : {x:[startIndex, limit]}} 
                        onZoomDomainChange={(domain) => setTickSapFlow(determineTimeRange(domain)) }/>}>
                <VictoryAxis 
                    offsetY={50}
                    tickCount={6}
                    tickFormat={(t) => handleTick(t, tickSapFlow)}
                />
                <VictoryAxis dependentAxis />
                <VictoryLabel x={40} y={20} style={[{ fill: inLineColor }]}
                    text={"Sap Flow In"}
                />
                <VictoryLabel x={40} y={35} style={[{ fill: outLineColor }]}
                    text={"Sap Flow Out"}
                />
                <VictoryLine data={sfmInData} style={{ data: { stroke: inLineColor } }}
                    x="time"
                    y="data" />
                <VictoryLine data={sfmOutData} style={{ data: { stroke: outLineColor } }}
                    x="time"
                    y="data" />
                <VictoryScatter data={combinedSfmData} style={{ data: { fill: ({ datum }) => datum.color } }}
                    x="time"
                    y="data"
                    labels={({ datum }) => [`${datum.desc}: ${datum.data} ${datum.units}`, `Time: ${handleTick(datum.time, tickSapFlow)}`]}
                    labelComponent={<VictoryTooltip />}
                />
            </VictoryChart>
            {/* VPD graph*/}
            <VictoryChart width={chartAspectWidth} theme={VictoryTheme.material} 
                containerComponent={
                    <VictoryZoomVoronoiContainer 
                        responsive={false} 
                        zoomDomain={!limit ? {} : {x:[startIndex, limit]}} 
                        onZoomDomainChange={(domain) => setTickVpd(determineTimeRange(domain)) }/>}>
                <VictoryAxis offsetY={50}
                    tickCount={6}
                    tickFormat={(t) => handleTick(t, tickVpd)}
                />
                <VictoryAxis dependentAxis />
                <VictoryLabel x={40} y={20} style={[{ fill: vpdLineColor }]}
                    text={"VPD"}
                />
                <VictoryLine data={vpdData} style={{ data: { stroke: vpdLineColor } }}
                    x="time"
                    y="data" />
                <VictoryScatter data={vpdData} style={{ data: { fill: ({ datum }) => datum.color } }}
                    x="time"
                    y="data"
                    labels={({ datum }) => [`${datum.desc}: ${datum.data} ${datum.units}`, `Time: ${handleTick(datum.time, tickVpd)}`]}
                    labelComponent={<VictoryTooltip />}
                />
            </VictoryChart>
            {/* Temp graph */}
            <VictoryChart width={chartAspectWidth} theme={VictoryTheme.material} 
                containerComponent={
                    <VictoryZoomVoronoiContainer 
                        responsive={false} 
                        zoomDomain={!limit ? {} : {x:[startIndex, limit]}} 
                        onZoomDomainChange={(domain) => setTickTemp(determineTimeRange(domain)) }/>}>
                <VictoryAxis offsetY={50}
                    tickCount={6}
                    tickFormat={(t) => handleTick(t, tickTemp)}
                />
                <VictoryAxis dependentAxis />
                <VictoryLabel x={40} y={20} style={[{ fill: tempLineColor }]}
                    text={"Temp"}
                />
                <VictoryLine data={tempData} style={{ data: { stroke: tempLineColor } }}
                    x="time"
                    y="data" />
                <VictoryScatter data={tempData} style={{ data: { fill: ({ datum }) => datum.color } }}
                    x="time"
                    y="data"
                    labels={({ datum }) => [`${datum.desc}: ${datum.data} ${datum.units}`, `Time: ${handleTick(datum.time, tickTemp)}`]}
                    labelComponent={<VictoryTooltip />}
                />
            </VictoryChart>
            {/* Rain graph */}
            <VictoryChart width={chartAspectWidth} theme={VictoryTheme.material} 
                containerComponent={
                    <VictoryZoomVoronoiContainer 
                        responsive={false} 
                        zoomDomain={!limit ? {} : {x:[startIndex, limit]}} 
                        onZoomDomainChange={(domain) => setTickRain(determineTimeRange(domain)) }/>}>
                <VictoryAxis offsetY={50}
                    tickCount={6}
                    tickFormat={(t) => handleTick(t, tickRain)}
                />
                <VictoryAxis dependentAxis />
                <VictoryLabel x={40} y={20} style={[{ fill: rainLineColor }]}
                    text={"Rain"}
                />
                <VictoryLine data={rainData} style={{ data: { stroke: rainLineColor } }}
                    x="time"
                    y="data" />
                <VictoryScatter data={rainData} style={{ data: { fill: ({ datum }) => datum.color } }}
                    x="time"
                    y="data"
                    labels={({ datum }) => [`${datum.desc}: ${datum.data} ${datum.units}`, `Time: ${handleTick(datum.time, tickRain)}`]}
                    labelComponent={<VictoryTooltip />}
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
