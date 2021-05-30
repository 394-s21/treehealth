import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
// import { ListItem, Icon } from 'react-native-elements'
// import { NavigationContainer, CommonActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
// import { Foundation } from '@expo/vector-icons';
// import {Picker} from '@react-native-picker/picker';
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryScatter,
  VictoryZoomContainer,
  VictoryTooltip,
} from "../Victory";
import { createContainer } from "../Victory";
// import {createContainer} from '../Victory.web';
// import { VictoryTooltip} from 'victory';
import JsonParser from "./JsonParser";
import { Line } from "react-native-svg";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LineChart from "./LineChart";

export default function Environment({ timeRange }) {
  // Environment
  // Environment
  var rawEnvData = require("../data/forestryplot_spruce_met.json");

  // VPD
  var vpdDistinctColor = "blue";
  var vpdLineColor = "#00a3de";
  // TODO: What unit of measure is VPD?
  var vpdData = JsonParser(rawEnvData, "VPD", vpdDistinctColor, "VPD", "kPa");

  // Temp
  var tempDistinctColor = "blue";
  var tempLineColor = "#00a3de";
  var tempData = JsonParser(
    rawEnvData,
    "Temp",
    tempDistinctColor,
    "Temp",
    "°C"
  );

  // Rain
  var rainDistinctColor = "blue";
  var rainLineColor = "#00a3de";
  // TODO: What unit of measure is Rain?
  var rainData = JsonParser(
    rawEnvData,
    "Rain",
    rainDistinctColor,
    "Rain",
    "mm?"
  );

  // var rawSpruceData = require('../data/102_norwayspruce.json');

  const [checkboxVpd, setCheckboxVpd] = useState(false);
  const [checkboxTemp, setCheckboxTemp] = useState(false);
  const [checkboxPrecipitation, setCheckboxPrecipitation] = useState(false);

  const FilterEnvironmentData = () => {
    return (
      <View>
        <BouncyCheckbox
          size={25}
          fillColor="blue"
          unfillColor="#FFFFFF"
          text="VPD"
          iconStyle={{ borderColor: "blue" }}
          onPress={() => setCheckboxVpd(!checkboxVpd)}
          disableBuiltInState
          isChecked={!checkboxVpd}
        />
        <BouncyCheckbox
          size={25}
          fillColor="red"
          unfillColor="#FFFFFF"
          text="Temperature"
          iconStyle={{ borderColor: "red" }}
          onPress={() => setCheckboxTemp(!checkboxTemp)}
          disableBuiltInState
          isChecked={!checkboxTemp}
        />
        <BouncyCheckbox
          size={25}
          fillColor="green"
          unfillColor="#FFFFFF"
          text="Precipitation"
          iconStyle={{ borderColor: "green" }}
          onPress={() => setCheckboxPrecipitation(!checkboxPrecipitation)}
          disableBuiltInState
          isChecked={!checkboxPrecipitation}
        />
      </View>
    );
  };
  return (
    <View>
      <FilterEnvironmentData />
      {/* VPD graph */}
      {checkboxVpd && (
        <LineChart
          label={"VPD"}
          data={vpdData}
          lineColor={vpdLineColor}
          timeRange={timeRange}
        />
      )}
      {/* Temp graph */}
      {checkboxTemp && (
        <LineChart
          label={"Temperature"}
          data={tempData}
          lineColor={tempLineColor}
          timeRange={timeRange}
        />
      )}
      {/* Precipitation graph */}
      {checkboxPrecipitation && (
        <LineChart
          label={"Precipitation"}
          data={rainData}
          lineColor={rainLineColor}
          timeRange={timeRange}
        />
      )}
    </View>
  );
}
