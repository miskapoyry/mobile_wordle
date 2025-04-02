import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/styles";
import PageHeader from "../components/PageHeader";
import { View } from "react-native";
import FadeInAnimation from "../components/FadeInAnimation";
export default function HomeScreen() {
    return (
        
        <SafeAreaView style={styles.container}>
            <FadeInAnimation duration={500}>
            <PageHeader title="Wordle Ranked" description="The competetive side of Wordle" />
            <View style={styles.buttonContainer}>
                <Button mode="contained" style={styles.button} onPress={() => console.log("Game started")}>
                    Ranked
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => console.log("Prac started")}>
                    Practice
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => console.log("How to play")}>
                    Instructions
                </Button>
            </View>
            </FadeInAnimation>
        </SafeAreaView>
        
    )
}