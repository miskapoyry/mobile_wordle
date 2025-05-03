import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import { styles } from '../styles/styles'
import LottieView from 'lottie-react-native'

export default function Loading() {
  return (
    <View style={styles.loading}>
      <LottieView
        source={require("../assets/loadingAnimation.json")}
        autoPlay
        loop
        style={{ width: 200, height: 200, alignContent: "center" }}
      />
    </View>
  )
};