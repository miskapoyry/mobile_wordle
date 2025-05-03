import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SegmentedButtons } from 'react-native-paper';
import { View } from 'react-native';
import PageHeader from '../components/PageHeader';
import Leaderboard from '../components/Leaderboard';
import PlayerStats from '../components/PlayerStats';
import { statisticStyles } from '../styles/styles';
import BackButton from '../components/BackButton';

export default function StatsScreen() {

  const [selectedTab, setSelectedTab] = useState<string>('statistics');

  return (
    <SafeAreaView style={statisticStyles.container}>
      <View style={{ position: "absolute", top: 65, marginLeft: 10, zIndex: 10 }}>
        <BackButton />
      </View>
      <PageHeader title="Statistics" description="Discover rankings and progress" />

      <SegmentedButtons
        value={selectedTab}
        onValueChange={setSelectedTab}
        buttons={[
          { value: "statistics", label: "Statistics", checkedColor: "black", uncheckedColor: "white", icon: "chart-bar", style: { backgroundColor: selectedTab === "statistics" ? "#00BFFF" : "none" } },
          { value: "leaderboard", label: "Leaderboard", checkedColor: "black", uncheckedColor: "white", icon: "medal", style: { backgroundColor: selectedTab === "leaderboard" ? "#00BFFF" : "none" } },
        ]}
        style={statisticStyles.segmentedButton}
      />

      {selectedTab === 'statistics' ? (
        <PlayerStats />
      ) : (
        <Leaderboard />
      )}
    </SafeAreaView>
  );
}