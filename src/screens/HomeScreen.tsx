import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/styles";
export default function HomeScreen() {
    return (
        <SafeAreaView>
            <Text variant="displayMedium" style={styles.title}>Wordle Ranked</Text>
            <Text variant="titleSmall" style={styles.intro}>The competetive side of Wordle</Text>
        </SafeAreaView>
    )
}