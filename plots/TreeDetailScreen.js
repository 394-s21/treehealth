import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";
import { Picker } from "@react-native-picker/picker";
import Charts from "./Charts";
import Collapsible from "react-native-collapsible";

export default function TreeDetailScreen({ navigation }) {
  // Object containing Tree Information 
  const treeInfo = {
    treeSpecies: "American Elm",
    treeLocation: "4100 IL-53, Lisle",
    treeDiameter: "Diameter: 3ft",
    treeSensor: "Sensor: e7vi3",
    average: "8.5",
  };

  // Set Initial State for Pickers to display
  const [selectedView, setSelectedView] = useState("daily");
  const [selectedTime, setSelectedTime] = useState("Mar 1");

  // Set default ranges for each time selection
  const days = ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5"];
  const weeks = ["Feb 28 - Mar 6", "Mar 7-13", "Mar 14-20"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = ["2017", "2018", "2019", "2020", "2021"];

  const [collapsed, setCollapsed] = useState(true);

  // Expands collapsible
  function toggleExpanded() {
    setCollapsed(!collapsed);
  }

  function DropdownTwo() {
    //Changes the time Range displayed on graphs based on choice in Picker
    var timeRange = days;
    if (selectedView == "weekly") {
      timeRange = weeks;
    } else if (selectedView == "monthly") {
      timeRange = months;
    } else if (selectedView == "yearly") {
      timeRange = years;
    }

    return (
      // Renders picker for time value
      <Picker
        selectedValue={selectedTime}
        style={{
          height: vh(10),
          width: vw(40),
          backgroundColor: "#38735D",
          color: "white",
          borderRadius: 5,
          padding: 10,
        }}
        onValueChange={setSelectedTime}
      >
        {timeRange.map((item, id) => (
          <Picker.Item key={(item, id)} label={item} value={item} />
        ))}
      </Picker>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.filler}></Text>
      <TouchableOpacity onPress={toggleExpanded}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Tree Information</Text>
        </View>
      </TouchableOpacity>
      {/* Collapsible View of Tree Information */}
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.content}>
          <Text style={styles.paragraph}>
            <Text style={styles.paragraph}></Text>
            <View style={styles.info}>
              <View style={styles.add}>
                <Text> {treeInfo.treeSpecies}</Text>
                <Text> {treeInfo.treeDiameter}</Text>
                <Text> {treeInfo.treeSensor}</Text>
                <Text> {treeInfo.treeLocation}</Text>
              </View>
              <View style={styles.add}>
                <Text style={styles.inline}>
                  <Text
                    style={{ fontSize: 30, fontWeight: "bold", marginRight: 5 }}
                  >
                    {treeInfo.average}
                  </Text>
                  <Text>cm/hr</Text>
                </Text>
                <Text>Average</Text>
              </View>
            </View>
            <View style={{ textAlign: "center", marginBottom: 10, flex: 10 }}>
              <View style={styles.filterDiv}>
                {/* Picker for time Range (daily, weekly, monthly, etc.) */}
                <Picker
                  selectedValue={selectedView}
                  style={{
                    height: vh(10),
                    width: vw(40),
                    backgroundColor: "#38735D",
                    color: "white",
                    borderRadius: 5,
                    padding: 10,
                  }}
                  onValueChange={setSelectedView}
                >
                  <Picker.Item label="daily" value="daily" />
                  <Picker.Item label="weekly" value="weekly" />
                  <Picker.Item label="monthly" value="monthly" />
                  <Picker.Item label="yearly" value="yearly" />
                </Picker>
                <View>
                  <DropdownTwo />
                </View>
              </View>
            </View>
          </Text>
        </View>
      </Collapsible>
      {/* Charts for this tree */}
      <Charts timeRange={selectedView} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  paragraph: {
    textAlign: "center",
    flex: 20,
  },
  filler: {
    flex: 1,
  },
  info: {
    width: vw(90),
    flexDirection: "row",
    textAlign: "left",
    margin: vh(1),
    justifyContent: "space-between",
    flex: 5,
  },
  add: {
    alignItems: "center",
    fontSize: 16,
    backgroundColor: "#38735D",
    color: "white",
    padding: 5,
    fontWeight: "normal",
    width: vw(43),
    height: vh(15),
    paddingTop: vh(2),
    paddingBottom: vh(2),
    borderRadius: 5,
  },
  filterDiv: {
    width: vw(90),
    flexDirection: "row",
    textAlign: "left",
    margin: vh(1),
    justifyContent: "space-between",
  },
  inline: {
    flexDirection: "row",
  },
  header: {
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
});
