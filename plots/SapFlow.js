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

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

function handleTick(t, tickType) {
  // Calls getTimePortion with appropriate inputs based on time range selected
  if (tickType === "daily") return `${getTimePortion(t, "|", 0)}`;
  else if (tickType === "weekly") return `${getTimePortion(t, "|", 1)}`;
  else if (tickType === "monthly") return `${getTimePortion(t, "|", 2)}`;
  else if (tickType === "yearly") return `${getTimePortion(t, "|", 3)}`;
  else return "error";
}

function getTimePortion(time, key, num) {
  // returns x-axis value of time depending on time range
  if (typeof time === "string" || time instanceof String) {
    var dummy = time;
    for (var i = 0; i < num; i++) {
      var index = dummy.indexOf(key);
      dummy = dummy.substring(index + 1);
    }
    var index = dummy.indexOf(key);
    if (index == -1) return dummy;
    return dummy.substring(0, index);
  }
  return "error";
}

export default function SapFlow({ timeRange, domain, setDomain }) {
  // Sap Flow Sycamore
  var rawSFMData = require("../data/SFM2I102_sycamore.json");
  // Set Sap Flow In Colors
  var inDistinctColor = "black";
  var inLineColor = "#00a3de";
  // Fetch Sap Flow In Data
  var sfmInData = JsonParser(
    rawSFMData,
    "Corrected In (cm/hr)",
    inDistinctColor,
    "Sap Flow In",
    "cm/hr"
  );
  // Set Sap Flow Out Colors
  var outDistinctColor = "#00a3de";
  var outLineColor = "#7c270b";
  // Fetch Sap Flow Out Data
  var sfmOutData = JsonParser(
    rawSFMData,
    "Corrected Out (cm/hr)",
    outDistinctColor,
    "Sap Flow Out",
    "cm/hr"
  );

  // Combine data together
  const [combinedSfmData, setCombinedSfmData] = useState([
    ...sfmInData,
    ...sfmOutData,
  ]);

  // Width of chart
  var chartAspectWidth = vw(85);

  const [tickSapFlow, setTickSapFlow] = useState(timeRange);
  // Amount of data points for a day
  const dailyLimit = 120;
  const weeklyLimit = 840;
  const monthlyLimit = 3360;

  // set current limit based on time range setting
  var limit = dailyLimit;
  if (timeRange === "weekly") limit = weeklyLimit;
  else if (timeRange === "monthly") limit = monthlyLimit;
  else if (timeRange === "yearly") limit = null;

  function determineTimeRange(domain) {
    // calculates time range based on the number of data points currently on graph
    var points = domain["x"][1] - domain["x"][0];
    if (points < dailyLimit) return "daily";
    else if (points > dailyLimit && points < weeklyLimit) return "weekly";
    else if (points > weeklyLimit && points < monthlyLimit) return "monthly";
    else if (points > monthlyLimit) return "yearly";
    return "error";
  }

  // TODO - Set as a parameter based on time range
  var startIndex = 0;

  // initialize state of checkbox
  const [checkboxSPIState, setSPICheckboxState] = useState(true);
  const [checkboxSPOState, setSPOCheckboxState] = useState(false);

  // Called whenever a checkbox is checked or unchecked, appropriately sets the combined SFM data to contain both, either , or none of sap flow in and out data
  useEffect(() => {
    if (checkboxSPIState && checkboxSPOState) {
      setCombinedSfmData([...sfmInData, ...sfmOutData]);
    } else if (checkboxSPOState) {
      setCombinedSfmData(sfmOutData);
    } else if (checkboxSPIState) {
      setCombinedSfmData(sfmInData);
    } else {
      setCombinedSfmData([]);
    }
  }, [checkboxSPIState, checkboxSPOState]);

  return (
    <View>
      {/* Sap Flow In Checkbox */}
      <BouncyCheckbox
        size={25}
        fillColor="blue"
        unfillColor="#FFFFFF"
        text="Sap Flow In"
        iconStyle={{ borderColor: "blue" }}
        onPress={() => setSPICheckboxState(!checkboxSPIState)}
        testID='Sap Flow In-checkbox'
      />
      {/* Sap Flow Out Checkbox */}
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text="Sap Flow Out"
        iconStyle={{ borderColor: "red" }}
        onPress={() => setSPOCheckboxState(!checkboxSPOState)}
        isChecked={true}
        testID='Sap Flow Out-checkbox'
      />
      <VictoryChart
        width={chartAspectWidth}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryZoomVoronoiContainer
          // container used to reset graph after zoom and display tooltip
            responsive={false}
            zoomDomain={
              domain.length !== 0 ? { x: domain }
                : !limit ? {}
                  : { x: [startIndex, limit] }
            }
            onZoomDomainChange={(domain) => {
              setTickSapFlow(determineTimeRange(domain));
              setDomain(domain["x"]);
            }}
          />
        }
      >
        <VictoryAxis
          // x-axis showing time
          offsetY={50}
          tickCount={6}
          tickFormat={(t) => handleTick(t, tickSapFlow)}
        />
        <VictoryAxis 
        // y-axis showing sap flow measurements
        dependentAxis />
        <VictoryLabel
          // label at top of graph indicating which line is Sap Flow In
          x={40}
          y={20}
          style={[{ fill: inLineColor }]}
          text={"Sap Flow In"}
        />
        <VictoryLabel
          // label at top of graph indicating which line is Sap Flow Out
          x={40}
          y={35}
          style={[{ fill: outLineColor }]}
          text={"Sap Flow Out"}
        />
        {checkboxSPIState && (
          // sap flow in data only shown if checkbox is checked
          <VictoryLine
            testID='lineIn'
            data={sfmInData}
            style={{ data: { stroke: inLineColor } }}
            x="time"
            y="data"
          />
        )}
        {checkboxSPOState && (
          // sap flow out data only shown if checkbox is checked
          <VictoryLine
            testID='lineOut'
            data={sfmOutData}
            style={{ data: { stroke: outLineColor } }}
            x="time"
            y="data"
          />
        )}
        <VictoryScatter
          // Scatter plot consisting of both, some, or none of sap flow in and sap flow out. Used for showing tooltip
          data={combinedSfmData}
          style={{ data: { fill: ({ datum }) => datum.color } }}
          x="time"
          y="data"
          // Format labels of Tooltip
          labels={({ datum }) => [
            `${datum.desc}: ${datum.data} ${datum.units}`,
            `Time: ${handleTick(datum.time, tickSapFlow)}`,
          ]}
          // Display data measurement at time if you scroll on graph
          labelComponent={<VictoryTooltip flyoutWidth={160} flyoutHeight={60} style={{ fontSize: 12 }} />}
        />
      </VictoryChart>
    </View>
  );
}
