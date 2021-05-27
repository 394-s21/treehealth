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
import SapFlow from "./SapFlow";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LineChart from "./LineChart";
import Environment from "./Environment";

// const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export default function Charts({ navigation, timeRange }) {
  return (
    <View style={styles.container}>
      <SapFlow timeRange={timeRange} />
      <Environment timeRange={timeRange} />
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
    paddingRight: Platform.OS === "ios" ? vw(50) : 0,
  },
});
