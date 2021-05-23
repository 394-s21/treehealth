import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
// import { ListItem, Icon } from 'react-native-elements'
// import { NavigationContainer, CommonActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// import { Foundation } from '@expo/vector-icons';
// import {Picker} from '@react-native-picker/picker';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryScatter, VictoryZoomContainer, VictoryTooltip} from '../Victory';
import {createContainer} from '../Victory';
// import {createContainer} from '../Victory.web';
// import { VictoryTooltip} from 'victory';
import JsonParser from "./JsonParser";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LineChart from './LineChart';

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export default function Charts({ navigation, timeRange}) {

    var chartAspectWidth = vw(95);

    // Sap Flow Sycamore
    var rawSFMData = require('../data/SFM2I102_sycamore.json');

    var inDistinctColor = "black";
    var inLineColor = "#00a3de";
    var inValues = JsonParser(rawSFMData, "Corrected In (cm/hr)", inDistinctColor, "Sap Flow In", "cm/hr");
    var sfmInDataHourly = inValues[0];
    var sfmInDataDaily = inValues[1];

    var outDistinctColor = "#00a3de";
    var outLineColor = "#7c270b";
    var outValues = JsonParser(rawSFMData, "Corrected Out (cm/hr)", outDistinctColor, "Sap Flow Out", "cm/hr");
    var sfmOutDataHourly = outValues[0];
    var sfmOutDataDaily = outValues[1];

    var [combinedSfmHourly, setCombinedSfmHourly] = useState([...sfmInDataHourly, ...sfmOutDataHourly])
    var [combinedSfmDaily, setCombinedSfmDaily] = useState([...sfmInDataDaily, ...sfmOutDataDaily])


    // TODO: Un-hardcode the if statement for daily vs weekly in charts
    console.log(sfmInDataDaily.slice(sfmInDataDaily.length - 7))
    console.log(sfmOutDataDaily.slice(sfmOutDataDaily.length - 7))
    console.log(combinedSfmDaily.slice(combinedSfmDaily.length - 7))

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

    const [checkboxSPIState, setSPICheckboxState] = useState(true);
    const [checkboxSPOState, setSPOCheckboxState] = useState(true);

    useEffect(() => {
        if (checkboxSPIState && checkboxSPOState) {
            setCombinedSfmHourly([...sfmInDataHourly, ...sfmOutDataHourly])
            setCombinedSfmDaily([...sfmInDataDaily, ...sfmOutDataDaily])
        } else if (checkboxSPOState) {
            setCombinedSfmDaily(sfmOutDataDaily)
            setCombinedSfmHourly(sfmOutDataHourly)
        } else if (checkboxSPIState) {
            setCombinedSfmDaily(sfmInDataDaily)
            setCombinedSfmHourly(sfmInDataHourly)
        } else {
            setCombinedSfmDaily([])
            setCombinedSfmHourly([])
        }
    },[checkboxSPIState, checkboxSPOState]);

    // var rawSpruceData = require('../data/102_norwayspruce.json');


    return (
        <View style={styles.container}>
            {/* Hourly graph */}
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
                {checkboxSPIState && <VictoryLine data={timeRange === 'daily' ? sfmInDataHourly : sfmInDataDaily.slice(sfmInDataDaily.length - 7)} style={{ data: { stroke: inLineColor } }}
                    x="time"
                    y="data" />}
                {checkboxSPOState && <VictoryLine data={timeRange === 'daily' ? sfmOutDataHourly : sfmOutDataDaily.slice(sfmOutDataDaily.length - 7)} style={{ data: { stroke: outLineColor } }}
                    x="time"
                    y="data" />}
                <VictoryScatter data={timeRange === 'daily' ? combinedSfmHourly : combinedSfmDaily.slice(combinedSfmDaily.length - 7)} style={{ data: { fill: ({ datum }) => datum.color } }}
                    x="time"
                    y="data"
                    labels={({ datum }) => [`${datum.desc}: ${datum.data} ${datum.units}`, `Time: ${datum.time}`]}
                    labelComponent={<VictoryTooltip renderInPortal={false} />}
                />
            </VictoryChart>
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
