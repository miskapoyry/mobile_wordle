import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { styles } from '../styles/styles'

export default function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
    </View>
  )
};