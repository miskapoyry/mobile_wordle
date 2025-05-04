import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Text } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
    wins: number;
    losses: number;
};

export default function PieChartComponent({ wins, losses }: Props) {
    const chartData = [
        { name: "Wins", population: wins, color: "green" },
        { name: "Losses", population: losses, color: "red" },
    ];

    const screenWidth = Dimensions.get("window").width;

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <PieChart
                data={chartData}
                width={screenWidth}
                height={200}
                chartConfig={{
                    color: () => "green",
                    labelColor: () => "black",
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="100"
                absolute
                hasLegend={false}
            />
            <View style={{ flexDirection: "row", gap: 40 }}>
                <View style={{ flexDirection: "row" }}>
                    <AntDesign name="checkcircle" size={30} color="green" />
                    <Text variant="displaySmall" style={{ paddingTop: 6, color: "green" }}> {wins} WINS</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <AntDesign name="checkcircle" size={30} color="red" />
                    <Text variant="displaySmall" style={{ paddingTop: 6, color: "red" }}> {losses} LOSSES</Text>
                </View>
            </View>
        </View>
    );
}
