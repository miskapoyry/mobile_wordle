import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStats } from '../hooks/useStats'
import { statisticStyles, styles } from '../styles/styles';
import PieChart from './PieChart';
import { LineChart } from 'react-native-chart-kit';
import RatingChart from './Linechart';

export default function PlayerStats() {

    const { stats } = useStats();
    const wins = stats?.wins ?? 0;
    const losses = stats?.losses ?? 0;

    return (
        <View style={statisticStyles.container}>
            <RatingChart />
            <PieChart wins={wins} losses={losses}/>
        </View>
    )
}