import { SafeAreaView, ScrollView, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import { gameStyles, styles } from '../styles/styles'
import PageHeader from '../components/PageHeader'
import BackButton from '../components/BackButton'
import PointAnimation from '../components/PointAnimation'

export default function InstructionsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ position: "absolute", top: 65, marginLeft: 10, zIndex: 10 }}>
                <BackButton />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <PageHeader title="How To" description="Play Wordle Ranked" />
                <View>
                    <Text variant="bodyMedium" style={{ marginTop: 30,marginBottom: 20, textAlign: "center" }}>
                        Welcome to Wordle Ranked! Here's how to play and recieve your rank:
                    </Text>
                    <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
                        1. Choose a word length (4, 5, 6, or 7 letters).
                    </Text>
                    <Text variant="bodyMedium" style={{ marginBottom: 30 }}>
                        - You have 6 tries to guess the correct word.
                    </Text>
                    <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
                        2. After guessing you will recieve feedback
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <View style={{ ...gameStyles.letterContainer, backgroundColor: "green" }}>
                            <Text style={gameStyles.letterText}>G</Text>
                        </View>
                        <Text variant="bodyMedium" style={{ marginLeft: 20, flexShrink: 1 }}>
                            Green: Correct letter in the correct spot
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                        <View style={{ ...gameStyles.letterContainer, backgroundColor: "orange" }}>
                            <Text style={gameStyles.letterText}>G</Text>
                        </View>
                        <Text variant="bodyMedium" style={{ marginLeft: 20, flexShrink: 1 }}>
                            Yellow: Correct letter in the wrong spot
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}>
                        <View style={{ ...gameStyles.letterContainer, backgroundColor: "red" }}>
                            <Text style={gameStyles.letterText}>G</Text>
                        </View>
                        <Text variant="bodyMedium" style={{ marginLeft: 20, flexShrink: 1 }}>
                            Red: Letter ins't in the word
                        </Text>
                    </View>
                    <Text variant="bodyMedium" style={{ marginBottom: 20 }}>
                        3. The game is finished, you will recieve points depending on your performance. Points will affect your rankings as shown:
                    </Text>
                    <View style={{ flexDirection: "row", gap: 20, alignSelf: "center"}}>
                        <PointAnimation totalPoints={3000} difference={50} fontSize={30} />
                        <PointAnimation totalPoints={3000} difference={-50} fontSize={30} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}