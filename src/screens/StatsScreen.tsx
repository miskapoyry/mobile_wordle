import { Text } from 'react-native-paper'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '../components/PageHeader'

export default function StatsScreen() {
  return (
    <SafeAreaView>
        <PageHeader title="Your Statistics" description="Discover your ranking details here" />
    </SafeAreaView>
  )
}
