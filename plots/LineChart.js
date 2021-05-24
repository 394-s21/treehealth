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

export default function LineChart({ label, hourlyData, dailyData, lineColor, timeRange, displayed }) {
    const chartAspectWidth = vw(95);
    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

    let data = [];
    if (timeRange === 'daily') {
        data = hourlyData;
    } else {
        data = dailyData;
    }

    return (
        <VictoryChart width={chartAspectWidth} theme={VictoryTheme.material} containerComponent={<VictoryZoomVoronoiContainer responsive={false} />}>
            <VictoryAxis offsetY={50}
                tickCount={6}
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
                labels={({ datum }) => [`${datum.desc}: ${datum.data} ${datum.units}`, `Time: ${datum.time}`]}
                labelComponent={<VictoryTooltip renderInPortal={false} />}
            />
        </VictoryChart>

    );

}
