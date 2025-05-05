import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { getTop20 } from "../utils/resultService";
import { LeaderboardStats } from "../types/types";
import { leaderBoardStyle } from "../styles/styles";

export default function Leaderboard() {

  const [players, setPlayers] = useState<LeaderboardStats[]>([]);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const topPlayers = await getTop20();
        setPlayers(topPlayers);
      } catch (error) {
        console.error(error);
      }
    };

    loadPlayers();
  }, []);

  return (
    <View style={leaderBoardStyle.container}>
      <Text variant="displaySmall" style={leaderBoardStyle.title}>Top 20 Players</Text>

      <FlatList
        data={players}
        renderItem={({ item, index }) => (
          <View style={leaderBoardStyle.row}>
            <Text variant="displaySmall" style={leaderBoardStyle.rank}>#{index + 1}</Text>
            <Text variant="titleSmall" style={leaderBoardStyle.name}>{item.username}</Text>
            <Text variant="displaySmall">{item.points} RP</Text>
          </View>
        )}
      />
    </View>
  );
}