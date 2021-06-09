import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { vw } from "react-native-expo-viewport-units";
import {
  createContainer,
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryScatter,
  VictoryTooltip,
} from "../Victory";
import JsonParser from "./JsonParser";
import BouncyCheckbox from "react-native-bouncy-checkbox";
// import LineChart from "./LineChart";

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

export default function Environment({ timeRange, domain, setDomain }) {
  // Fetch Environment Data
  var rawEnvData = require("../data/forestryplot_spruce_met.json");

  // Fetch VPD Data
  var vpdDistinctColor = "blue";
  var vpdLineColor = "blue";
  var vpdData = JsonParser(
    rawEnvData,
    "VPD",
    vpdDistinctColor,
    "VPD",
    "kPa"
  );

  // Fetch Temp Data
  var tempDistinctColor = "blue";
  var tempLineColor = "red";
  var tempData = JsonParser(
    rawEnvData,
    "Temp",
    tempDistinctColor,
    "Temp",
    "°C"
  );

  // Fetch Precipitation Data
  var rainDistinctColor = "blue";
  var rainLineColor = "green";
  var rainData = JsonParser(
    rawEnvData,
    "Rain",
    rainDistinctColor,
    "Rain",
    "mm"
  );

  // Combine all data into one array
  var envData = [vpdData, tempData, rainData]
  const [envScatter, setEnvScatter] = useState([])

  // Set width of chart
  const chartAspectWidth = vw(85);
  const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

  // Amount of data points for a day
  const dailyLimit = 120;
  const weeklyLimit = 840;
  const monthlyLimit = 3360;

  // set current limit based on time range
  var limit = dailyLimit;
  if (timeRange === "weekly") limit = weeklyLimit;
  else if (timeRange === "monthly") limit = monthlyLimit;
  else if (timeRange === "yearly") limit = null;

  function determineTimeRange(domain) {
    // calculates time range based on domain length
    var points = domain["x"][1] - domain["x"][0];
    if (points < dailyLimit) return "daily";
    else if (points > dailyLimit && points < weeklyLimit) return "weekly";
    else if (points > weeklyLimit && points < monthlyLimit) return "monthly";
    else if (points > monthlyLimit) return "yearly";
    return "error";
  }

  const [tick, setTick] = useState(timeRange);
  // TODO - Set as a parameter based on time range
  var startIndex = 0;
  // determines positions of y-axes for each data type along the graph
  var xOffsets = [vw(2.6), vw(42.5), vw(82.4)];
  // calculates maximum value of each dataset
  const maxima = envData.map(
      (dataset) => Math.max(...dataset.map((d) => d.data))
  );

  // var rawSpruceData = require('../data/102_norwayspruce.json');
  
  // initialize checkbox values
  const [checkboxVpd, setCheckboxVpd] = useState(false);
  const [checkboxTemp, setCheckboxTemp] = useState(false);
  const [checkboxPrecipitation, setCheckboxPrecipitation] = useState(false);

  // initialize lines
  const [vpdLine, setVpdLine] = useState([]);
  const [tempLine, setTempLine] = useState([]);
  const [rainLine, setRainLine] = useState([]);

  // if checkboxes are checked, set appriate data
  useEffect(() => {
    setVpdLine(checkboxVpd ? vpdData : [])
    setTempLine(checkboxTemp ? tempData : [])
    setRainLine(checkboxPrecipitation ? rainData : [])
    setEnvScatter([...vpdLine, ...tempLine, ...rainLine])

  }, [checkboxVpd, checkboxTemp, checkboxPrecipitation]);


  const FilterEnvironmentData = () => {
    return (
      <View>
        {/* Checkbox for VPD data */}
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
        {/* Checkbox for Temp data */}
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
        {/* Checkbox for Rain data */}
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
          // container allowing response to zoom and tooltips
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
          {/* x-axis showing time */}
            <VictoryAxis offsetY={50}
                tickCount={6}
                tickFormat={(t) => handleTick(t, tick)}
            />

            {/* y-axis for vpd, only shown if vpd checkbox is checked */}
            {checkboxVpd && (<VictoryAxis
                dependentAxis
                offsetX={xOffsets[0]}
                style={{
                  axis: { stroke: vpdLineColor },
                  ticks: { padding: 0 },
                  tickLabels: { fill: vpdLineColor}
                }}
                // Set axis values according to maximum
                tickValues={[0.25, 0.5, 0.75, 1]}
                tickFormat={(t) => t * maxima[0]}
                />)}
            {/* y-axis for temp, only shown if vpd checkbox is checked */}
            {checkboxTemp && (<VictoryAxis
                dependentAxis
                offsetX={xOffsets[1]}
                style={{
                  axis: { stroke: tempLineColor },
                  ticks: { padding: 0 },
                  tickLabels: { fill: tempLineColor}
                }}
                // Set axis values according to maximum
                tickValues={[0.25, 0.5, 0.75, 1]}
                tickFormat={(t) => t * maxima[1]}
                />)}
            {/* y-axis for precipitation, only shown if precipitation checkbox is checked */}
            {checkboxPrecipitation && (<VictoryAxis
                dependentAxis
                offsetX={xOffsets[2]}
                style={{
                  axis: { stroke: rainLineColor },
                  ticks: { padding: 0 },
                  tickLabels: { fill: rainLineColor}
                }}
                // Set axis values according to maximum
                tickValues={[0.25, 0.5, 0.75, 1]}
                tickFormat={(t) => t * maxima[2]}
                />)}
            {/* Set labels for each data type at top of graph to determine which line is which */}
            <VictoryLabel x={40} y={20} style={[{ fill: vpdLineColor }]}
                text={"VPD"}
            />
            <VictoryLabel x={90} y={20} style={[{ fill: tempLineColor }]}
                text={"Temperature"}
            />
            <VictoryLabel x={200} y={20} style={[{ fill: rainLineColor }]}
                text={"Precipitation"}
            />
            {/* line for vpd, only shown if vpd checkbox is checked */}
            {checkboxVpd && (<VictoryLine data={vpdData} style={{ data: { stroke: vpdLineColor } }}
                x="time"
                // data normalized according to maximum
                y={(datum) => datum.data / maxima[0]}/>)}
            {/* line for temp, only shown if temp checkbox is checked */}
            {checkboxTemp && (<VictoryLine data={tempData} style={{ data: { stroke: tempLineColor } }}
                x="time"
                // data normalized according to maximum
                y={(datum) => datum.data / maxima[1]} />)}
            {/* line for precipitation, only shown if precipitation checkbox is checked */}
            {checkboxPrecipitation && (<VictoryLine data={rainData} style={{ data: { stroke: rainLineColor } }}
                x="time"
                // data normalized according to maximum
                y={(datum) => datum.data / maxima[2]} />)}
            <VictoryScatter data={envScatter} style={{ data: { fill: ({ datum }) => datum.color } }}
                    x="time"
                    y={(datum) => {
                      // set y-value according to the dataset by normalizing by corresponding maximum
                      if (datum.desc == "VPD") {
                        return datum.data / maxima[0]
                      } else if (datum.desc == "Temp") {
                        return datum.data / maxima[1]
                      } else {
                        return datum.data / maxima[2]
                      }
                    }}
                    // Format labels on tooltip
                    labels={({ datum }) => [`${datum.desc}: ${datum.data} ${datum.units}`, `Time: ${handleTick(datum.time, tick)}`]}
                    // Set dimensions of tooltip to see data when scrolling on line
                    labelComponent={<VictoryTooltip flyoutWidth={vw(9)} flyoutHeight={vw(5)} style={{fontSize: 15}} />}
                />
        </VictoryChart>
    </View>
  );
}
