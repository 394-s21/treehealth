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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Line } from 'react-native-svg';

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

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


export default function SapFlow({ timeRange }) {

    // Sap Flow Sycamore
    var rawSFMData = require('../data/SFM2I102_sycamore.json');
    var inDistinctColor = "black";
    var inLineColor = "#00a3de";
    var sfmInData = JsonParser(rawSFMData, "Corrected In (cm/hr)", inDistinctColor, "Sap Flow In", "cm/hr");
    
    var outDistinctColor = "#00a3de";
    var outLineColor = "#7c270b";
    var sfmOutData = JsonParser(rawSFMData, "Corrected Out (cm/hr)", outDistinctColor, "Sap Flow Out", "cm/hr");
    
    const [combinedSfmData, setCombinedSfmData] = useState([...sfmInData, ...sfmOutData])

    
    // TODO: Un-hardcode the if statement for daily vs weekly in charts
    console.log('In: ', sfmInData)
    console.log('Out: ', sfmOutData)
    // console.log(combinedSfmDaily.slice(combinedSfmDaily.length - 7))
    
    var chartAspectWidth = vw(85);
    
    const [tickSapFlow, setTickSapFlow] = useState(timeRange);
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
        if (points < dailyLimit) return "daily";
        else if (points > dailyLimit && points < weeklyLimit) return "weekly";
        else if (points > weeklyLimit && points < monthlyLimit) return "monthly";
        else if (points > monthlyLimit) return "yearly";
        return "error";
    }



    // TODO - Set as a parameter based on time range
    var startIndex = 0;


    const [checkboxSPIState, setSPICheckboxState] = useState(true);
    const [checkboxSPOState, setSPOCheckboxState] = useState(true);

    useEffect(() => {
        if (checkboxSPIState && checkboxSPOState) {
            setCombinedSfmData([...sfmInData, ...sfmOutData])
        } else if (checkboxSPOState) {
            setCombinedSfmData(sfmOutData)
        } else if (checkboxSPIState) {
            setCombinedSfmData(sfmInData)
        } else {
            setCombinedSfmData([])
        }
    }, [checkboxSPIState, checkboxSPOState]);

    return (
        <View>
            <BouncyCheckbox
                size={25}
                fillColor="blue"
                unfillColor="#FFFFFF"
                text="Sap Flow In"
                iconStyle={{ borderColor: "blue" }}
                onPress={() => setSPICheckboxState(!checkboxSPIState)}
            />
            <BouncyCheckbox
                size={25}
                fillColor="red"
                unfillColor="#FFFFFF"
                text="Sap Flow Out"
                iconStyle={{ borderColor: "red" }}
                onPress={() => setSPOCheckboxState(!checkboxSPOState)}
            />
            <VictoryChart width={chartAspectWidth} theme={VictoryTheme.material} containerComponent={
                <VictoryZoomVoronoiContainer
                    responsive={false}
                    zoomDomain={!limit ? {} : { x: [startIndex, limit] }}
                    onZoomDomainChange={(domain) => setTickSapFlow(determineTimeRange(domain))} />}>
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
                {checkboxSPIState && <VictoryLine data={sfmInData} style={{ data: { stroke: inLineColor } }}
                    x="time"
                    y="data" />}
                {checkboxSPOState && <VictoryLine data={sfmOutData} style={{ data: { stroke: outLineColor } }}
                    x="time"
                    y="data" />}
                <VictoryScatter data={combinedSfmData} style={{ data: { fill: ({ datum }) => datum.color } }}
                    x="time"
                    y="data"
                    labels={({ datum }) => [`${datum.desc}: ${datum.data} ${datum.units}`, `Time: ${handleTick(datum.time, tickSapFlow)}`]}
                    labelComponent={<VictoryTooltip />}
                />
            </VictoryChart>
        </View>
    )
}