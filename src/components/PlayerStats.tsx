import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStats } from '../hooks/useStats'
import { statisticStyles, styles } from '../styles/styles';
import PieChart from './PieChart';

export default function PlayerStats() {

    const { stats } = useStats();
    const wins = stats?.wins ?? 0;
    const losses = stats?.losses ?? 0;

    return (
        <View style={statisticStyles.container}>
            <PieChart wins={wins} losses={losses}/>
            <Text>
                TÄNNE OMA SELITETEKSTI
            </Text>
        </View>
    )
}