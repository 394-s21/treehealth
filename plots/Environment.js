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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LineChart from './LineChart';

export default function Environment({timeRange}) {
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

    const [checkboxVpd, setCheckboxVpd] = useState(true)
    const [checkboxTemp, setCheckboxTemp] = useState(true)
    const [checkboxPrecipitation, setCheckboxPrecipitation] = useState(true)

    const FilterEnvironmentData = () => {
        return (
            <View>
                <BouncyCheckbox
                    size={25}
                    fillColor="blue"
                    unfillColor="#FFFFFF"
                    text="VPD"
                    isChecked={!checkboxVpd}
                    disableBuiltInState
                    iconStyle={{ borderColor: "blue" }}
                    onPress={() => setCheckboxVpd(!checkboxVpd)}
                />
                <BouncyCheckbox
                    size={25}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text="Temperature"
                    isChecked={!checkboxTemp}
                    disableBuiltInState
                    iconStyle={{ borderColor: "red" }}
                    onPress={() => setCheckboxTemp(!checkboxTemp)}
                />
                <BouncyCheckbox
                    size={25}
                    fillColor="green"
                    unfillColor="#FFFFFF"
                    text="Precipitation"
                    isChecked={!checkboxPrecipitation}
                    disableBuiltInState
                    iconStyle={{ borderColor: "green" }}
                    onPress={() => setCheckboxPrecipitation(!checkboxPrecipitation)}
                />
            </View>
        )
    }
    return (
        <View>
            <FilterEnvironmentData />
            {/* VPD graph */}
            {checkboxVpd && <LineChart
                label={'VPD'}
                hourlyData={vpdDataHourly}
                dailyData={vpdDataDaily}
                lineColor={vpdLineColor}
                timeRange={timeRange}
            />}
            {/* Temp graph */}
            {checkboxTemp && <LineChart
                label={'Temperature'}
                hourlyData={tempDataHourly}
                dailyData={tempDataDaily}
                lineColor={tempLineColor}
                timeRange={timeRange}
            />}
            {/* Precipitation graph */}
            {checkboxPrecipitation && <LineChart
                label={'Precipitation'}
                hourlyData={rainDataHourly}
                dailyData={rainDataDaily}
                lineColor={rainLineColor}
                timeRange={timeRange}
            />}
        </View>
    )
}
