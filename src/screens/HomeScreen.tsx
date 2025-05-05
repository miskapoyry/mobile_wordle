import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/styles";
import PageHeader from "../components/PageHeader";
import { View } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppParams } from "../types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ProfileMenu from "../components/ProfileMenu";
import LottieView from "lottie-react-native";
import GameStartModal from "../components/GameStartModal";

export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<AppParams>>();

    const [visible, setVisible] = useState(false);
    const [wordLength, setWordLength] = useState("5");

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleStartGame = () => {
        hideModal();
        navigation.navigate("Game", {
            wordLength: Number(wordLength),
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <LottieView
                source={require("../assets/bgAnimation.json")}
                autoPlay
                loop
                style={styles.lottieBackground}
            />
            <ProfileMenu />
            <PageHeader title="Wordle Ranked" description="The competitive side of Wordle" />
            <View style={styles.buttonContainer}>
                <Button mode="contained" style={styles.button} onPress={showModal}>
                    Start Game
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate("Statistics")}>
                    Statistics
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate("Instructions")}>
                    Instructions
                </Button>
            </View>

            <GameStartModal visible={visible} onDismiss={hideModal} onStart={handleStartGame} wordLength={wordLength} setWordLength={setWordLength} />
        </SafeAreaView>
    );
}