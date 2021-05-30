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

function handleTick(t, tickType) {
  if (tickType === "daily") return `${getTimePortion(t, "|", 0)}`;
  else if (tickType === "weekly") return `${getTimePortion(t, "|", 1)}`;
  else if (tickType === "monthly") return `${getTimePortion(t, "|", 2)}`;
  else if (tickType === "yearly") return `${getTimePortion(t, "|", 3)}`;
  else return "error";
}

function determineTimeRange(domain) {
  var points = domain["x"][1] - domain["x"][0];
  if (points < dailyLimit) return "daily";
  else if (points > dailyLimit && points < weeklyLimit) return "weekly";
  else if (points > weeklyLimit && points < monthlyLimit) return "monthly";
  else if (points > monthlyLimit) return "yearly";
  return "error";
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

export default function Environment({ timeRange, domain, setDomain }) {
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

  var envData = [vpdData, tempData, rainData]
  const [envScatter, setEnvScatter] = useState([])

  const chartAspectWidth = vw(85);
  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
  // Amount of data points for a day
  const dailyLimit = 120;
  const weeklyLimit = 840;
  const monthlyLimit = 3360;

  var limit = dailyLimit;
  if (timeRange === "weekly") limit = weeklyLimit;
  else if (timeRange === "monthly") limit = monthlyLimit;
  else if (timeRange === "yearly") limit = null;

  const [tick, setTick] = useState(timeRange);
  // TODO - Set as a parameter based on time range
  var startIndex = 0;
  var xOffsets = [50, 500, 1500];
  const maxima = envData.map(
      (dataset) => Math.max(...dataset.map((d) => d.y))
  );

  // var rawSpruceData = require('../data/102_norwayspruce.json');

  const [checkboxVpd, setCheckboxVpd] = useState(false);
  const [checkboxTemp, setCheckboxTemp] = useState(false);
  const [checkboxPrecipitation, setCheckboxPrecipitation] = useState(false);

  const [vpdLine, setVpdLine] = useState([]);
  const [tempLine, setTempLine] = useState([]);
  const [rainLine, setRainLine] = useState([]);

  useEffect(() => {
    setVpdLine(checkboxVpd ? vpdData : [])
    setTempLine(checkboxTemp ? tempData : [])
    setRainLine(checkboxPrecipitation ? rainData : [])
    setEnvScatter([...vpdLine, ...tempLine, ...rainLine])
    
  }, [checkboxVpd, checkboxTemp, checkboxPrecipitation]);


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
      <VictoryChart width={chartAspectWidth} theme={VictoryTheme.material}
        containerComponent={
            <VictoryZoomVoronoiContainer
                responsive={false}
                zoomDomain={
                    domain.length !== 0 ? {x: domain}
                    : !limit ? {}
                    : {x: [startIndex, limit]}
                }
                onZoomDomainChange={(domain) => {
                    setTick(determineTimeRange(domain))
                    setDomain(domain["x"]);
                }}
            />
            }
        >
            <VictoryAxis offsetY={50}
                tickCount={6}
                tickFormat={(t) => handleTick(t, tick)}
            />
            {envData.map((d, i) => {
                {console.log(i)}
                <VictoryAxis 
                dependentAxis 
                key={i} 
                xOffset={xOffsets[i]}
                // style={{
                //   axis: { stroke: vpdLineColor },
                //   ticks: { padding: 0 },
                //   tickLabels: { fill: vpdLineColor}
                // }}
                tickValues={[0.25, 0.5, 0.75, 1]}
                tickFormat={(t) => t * maxima[i]}
                />
            })}
            <VictoryLabel x={40} y={20} style={[{ fill: vpdLineColor }]}
                text={"Temperature"}
            />
            {checkboxVpd && (<VictoryLine data={vpdData} style={{ data: { stroke: vpdLineColor } }}
                x="time"
                y="data" />)}
            {checkboxTemp && (<VictoryLine data={tempData} style={{ data: { stroke: tempLineColor } }}
                x="time"
                y="data" />)}
            {checkboxPrecipitation && (<VictoryLine data={rainData} style={{ data: { stroke: rainLineColor } }}
                x="time"
                y="data" />)}
            <VictoryScatter data={envScatter} style={{ data: { fill: ({ datum }) => datum.color } }}
                    x="time"
                    y="data"
                    labels={({ datum }) => [`${datum.desc}: ${datum.data} ${datum.units}`, `Time: ${handleTick(datum.time, tick)}`]}
                    labelComponent={<VictoryTooltip flyoutWidth={vw(9)} flyoutHeight={vw(5)} style={{fontSize: 15}} />}
                />
        </VictoryChart>
      {/* VPD graph */}
      {/* {checkboxVpd && (
        <LineChart
          label={"VPD"}
          data={vpdData}
          lineColor={vpdLineColor}
          timeRange={timeRange}
          domain={domain}
          setDomain={setDomain}
        />
      )} */}
      {/* Temp graph */}
      {/* {checkboxTemp && (
        <LineChart
          label={"Temperature"}
          data={tempData}
          lineColor={tempLineColor}
          timeRange={timeRange}
          domain={domain}
          setDomain={setDomain}
        />
      )} */}
      {/* Precipitation graph */}
      {/* {checkboxPrecipitation && (
        <LineChart
          label={"Precipitation"}
          data={rainData}
          lineColor={rainLineColor}
          timeRange={timeRange}
          domain={domain}
          setDomain={setDomain}
        />
      )} */}
    </View>
  );
}
