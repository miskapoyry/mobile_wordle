import { ScrollView, View } from 'react-native'
import React from 'react'
import { useStats } from '../hooks/useStats'
import { statisticStyles, styles } from '../styles/styles';
import RatingChart from './Linechart';
import StatCard from './StatCard';
import { getPlayerRank } from '../utils/rankService';
import { ProgressBar, Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Loading from './Loading';

export default function PlayerStats() {

    const { stats, loading } = useStats();
    const wins = stats?.wins ?? 0;
    const losses = stats?.losses ?? 0;
    const games = wins + losses;
    const points = stats?.points ?? 0;
    const { name, progress, rankMinPoints, rankMaxPoints, animation } = getPlayerRank(points);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <ScrollView style={styles.scrollViewContainer}>
            <View style={statisticStyles.container}>

                <View style={{ marginBottom: 10 }}>
                    <Text variant="displaySmall" style={{ textAlign: "center" }}>{name} | {points} RP</Text>
                </View>

                <View>
                    <View style={{ alignContent: "center", alignItems: "center" }}>
                        <LottieView
                            source={animation}
                            autoPlay
                            loop={true}
                            style={{ width: 100, height: 100, alignContent: "center" }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text variant='displaySmall'>{rankMinPoints}</Text>
                        <Text variant='displaySmall'>{rankMaxPoints}</Text>
                    </View>
                    <ProgressBar progress={progress} style={statisticStyles.progress} />
                </View>

                <View style={{ marginBottom: 20 }}>
                    <RatingChart />
                </View>

                <View style={{ paddingBottom: 30}}>
                    <Text variant="displaySmall" style={{ textAlign: "center" }}>CURRENT STATISTICS</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 20, marginTop: 20 }}>
                        <StatCard title="WINS" amount={wins} delay={500} />
                        <StatCard title="LOSSES" amount={losses} delay={1000} />
                        <StatCard title="GAMES" amount={games} delay={1500} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}