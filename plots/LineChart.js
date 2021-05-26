import React, { useEffect, useState } from 'react';
import { vw } from 'react-native-expo-viewport-units';
import {
    createContainer,
    VictoryAxis,
    VictoryChart,
    VictoryLabel,
    VictoryLine,
    VictoryScatter,
    VictoryTheme,
    VictoryTooltip
} from '../Victory';

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

export default function LineChart({ label,data, lineColor, timeRange, displayed }) {
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

    function determineTimeRange(domain) {
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

    return (
        <VictoryChart width={chartAspectWidth} theme={VictoryTheme.material} 
        containerComponent={
            <VictoryZoomVoronoiContainer 
                responsive={false} 
                zoomDomain={!limit ? {} : {x:[startIndex, limit]}} 
                onZoomDomainChange={(domain) => setTick(determineTimeRange(domain)) }/>}>
            <VictoryAxis offsetY={50}
                    tickCount={6}
                    tickFormat={(t) => handleTick(t, tick)}
                />
            <VictoryAxis dependentAxis />
            <VictoryLabel x={40} y={20} style={[{ fill: lineColor }]}
                text={label}
            />
            <VictoryLine data={data} style={{ data: { stroke: lineColor } }}
                x="time"
                y="data" />
            <VictoryScatter data={data} style={{ data: { fill: ({ datum }) => datum.color } }}
                    x="time"
                    y="data"
                    labels={({ datum }) => [`${datum.desc}: ${datum.data} ${datum.units}`, `Time: ${handleTick(datum.time, tick)}`]}
                    labelComponent={<VictoryTooltip />}
                />
        </VictoryChart>

    );

}
