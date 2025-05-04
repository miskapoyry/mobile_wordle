import React, { useEffect, useState } from 'react';
import { Surface, Text } from 'react-native-paper';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchGameData } from '../utils/resultService';
import FadeInAnimation from './FadeInAnimation';

export default function RatingChart() {

    // DATA EI HYVÄKSTY MAPPEJA TAI LISTOJA, JOTEN TÄMÄ OLI PAKKO TEHDÄ NÄIN
    const [game1, setGame1] = useState<number>(0);
    const [game2, setGame2] = useState<number>(0);
    const [game3, setGame3] = useState<number>(0);
    const [game4, setGame4] = useState<number>(0);
    const [game5, setGame5] = useState<number>(0);
    const [game6, setGame6] = useState<number>(0);
    const [game7, setGame7] = useState<number>(0);
    const [game8, setGame8] = useState<number>(0);
    const [game9, setGame9] = useState<number>(0);
    const [game10, setGame10] = useState<number>(0);
    const [gameCount, setGameCount] = useState<number>(0);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchGameData();
            if (data) {
                setGameCount(data.length);
                setGame1(data[0] || 0);
                setGame2(data[1] || 0);
                setGame3(data[2] || 0);
                setGame4(data[3] || 0);
                setGame5(data[4] || 0);
                setGame6(data[5] || 0);
                setGame7(data[6] || 0);
                setGame8(data[7] || 0);
                setGame9(data[8] || 0);
                setGame10(data[9] || 0);
            }
        };

        loadData();
    }, []);

    const screenWidth = Dimensions.get('window').width;

    if (gameCount < 10) {
        return (
            <View>
                <Text variant="displayMedium" style={{ marginBottom: 10, textAlign: "center" }}>YOUR LAST 10 GAMES</Text>
                <View style={{ height: 200, justifyContent: "center", alignItems: "center" }}>
                    <Text variant="displayMedium" style={{ fontSize: 20, textAlign: "center" }}> PLAY 10 GAMES TO REVEAL PROGRESS...</Text>
                </View>
            </View>
        )
    }

    const data = {
        datasets: [
            {
                data: [game1, game2, game3, game4, game5, game6, game7, game8, game9, game10],
                strokeWidth: 3,
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            },
        ],
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    };

    return (
        <FadeInAnimation duration={1000}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text variant="displayMedium" style={{ marginBottom: 20 }}>LAST 10 GAMES RESULTS</Text>
                <LineChart
                    data={data}
                    width={screenWidth * 0.9}
                    height={200}
                    yAxisSuffix=" RP"
                    chartConfig={{
                        backgroundGradientFrom: "#00112b",
                        backgroundGradientTo: "#00112b",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        fillShadowGradientTo: "white",
                        fillShadowGradientFromOpacity: .5,
                        propsForDots: {
                            r: "1",
                            strokeWidth: "2",
                            stroke: "white"
                        }
                    }}
                />
            </View>
        </FadeInAnimation>
    );
}
