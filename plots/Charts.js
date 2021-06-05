import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { vw } from "react-native-expo-viewport-units";
import SapFlow from "./SapFlow";
import Environment from "./Environment";

export default function Charts({ navigation, timeRange }) {
  const [domain, setDomain] = useState([]);
  return (
    <View style={styles.container}>
      <SapFlow timeRange={timeRange} domain={domain} setDomain={setDomain}/>
      <Environment timeRange={timeRange} domain={domain} setDomain={setDomain}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    // paddingLeft: Platform.OS === "android" ? vw(50) : 0,
    paddingRight: Platform.OS === "ios" ? vw(50) : 0,
    paddingBottom: vh(2)
  },
});
