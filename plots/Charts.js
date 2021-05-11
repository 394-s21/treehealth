import * as React from 'react';
import { View, StyleSheet } from 'react-native';
// import { ListItem, Icon } from 'react-native-elements'
// import { NavigationContainer, CommonActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
// import { Foundation } from '@expo/vector-icons';
// import {Picker} from '@react-native-picker/picker';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryAxis} from '../Victory';



function Charts ({navigation}) {

    // const data = [
    //     { quarter: 1, earnings: 13000 },
    //     { quarter: 2, earnings: 16500 },
    //     { quarter: 3, earnings: 14250 },
    //     { quarter: 4, earnings: 19000 }
    // ];

    // var buff = readFileSync('../data/SFM2I102_sycamore.json');
    var rawSFMData = require('../data/SFM2I102_sycamore.json');
    var sfmInData = []
    var sfmOutData = []

    var prevIn = 0
    var prevOut = 0

    for (const [key, value] of Object.entries(rawSFMData)) {
        if (value["Corrected In (cm/hr)"] != "") {
            var inside = parseFloat(value["Corrected In (cm/hr)"])
        } else {
            var inside = prevIn
        }

        if (value["Corrected Out (cm/hr)"] != "") {
            var outside = parseFloat(value["Corrected Out (cm/hr)"])
        } else {
            var outside = prevOut
        }

        sfmInData.push({time: key, sapFlowIn: inside})
        sfmOutData.push({time: key, sapFlowOut: outside})

        prevIn = inside
        prevOut = outside
    }

    // console.log(sfmInData)


    return (
        <View style={styles.container}>
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryAxis offsetY={50}
                />
                <VictoryLine data={sfmInData}
                x="time"
                y="value" />
                <VictoryLine data={sfmOutData}
                x="time"
                y="value" />
            </VictoryChart>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });

export default Charts;