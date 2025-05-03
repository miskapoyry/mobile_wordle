import React from 'react';
import { View } from 'react-native';
import { Pie, PolarChart } from 'victory-native';

type Props = {
    wins: number;
    losses: number;
};

export default function PieChart({ wins, losses }: Props) {
    const chartData = [
        { label: 'Wins', value: wins, color: 'green' },
        { label: 'Losses', value: losses, color: 'red' },
    ];

    return (
        <View style={{ height: 200 }}>
            <PolarChart
                data={chartData}
                labelKey={"label"}
                valueKey={"value"}
                colorKey={"color"}
            >
                <Pie.Chart />
            </PolarChart>
        </View>
    );
}
