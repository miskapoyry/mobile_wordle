import { Button, Modal, Portal, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/styles";
import PageHeader from "../components/PageHeader";
import { View, StyleSheet } from "react-native";
import FadeInAnimation from "../components/FadeInAnimation";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { modalStyles } from "../styles/modalStyles";
import { AppParams } from "../types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ProfileMenu from "../components/ProfileMenu";

export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<AppParams>>();

    const lengths = ["4", "5", "6", "7"];
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

    const lenIndex = lengths.indexOf(wordLength);

    const getPoints = (length: string) => {
        switch (length) {
            case "4":
                return 60;
            case "5":
                return 70;
            case "6":
                return 80;
            case "7":
                return 90;
            default:
                return 0;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ProfileMenu />
            <PageHeader title="Wordle Ranked" description="The competitive side of Wordle" />
            <View style={styles.buttonContainer}>
                <Button mode="contained" style={styles.button} onPress={showModal}>
                    Start Game
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => navigation.navigate("Statistics")}>
                    Statistics
                </Button>
                <Button mode="contained" style={styles.button} onPress={() => console.log("How to play")}>
                    Instructions
                </Button>
            </View>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalContent}>
                        <Text variant="titleMedium" style={modalStyles.modalIntro}>
                            Choose the word length
                        </Text>

                        <SegmentedControl
                            values={lengths.map((len) => `${len}`)}
                            selectedIndex={lenIndex}
                            onChange={(e) => {
                                const index = e.nativeEvent.selectedSegmentIndex;
                                setWordLength(lengths[index]);
                            }}
                            style={{ marginBottom: 24 }}
                        />

                        <Text variant="titleMedium" style={styles.intro}>
                            {wordLength} letter win grants you <Text style={modalStyles.pointValue}>+{getPoints(wordLength)}p</Text>
                        </Text>
                        <Text variant="titleMedium" style={styles.intro}>
                            Losing costs you <Text style={modalStyles.penaltyText}>-50p</Text>
                        </Text>

                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Button onPress={handleStartGame} style={{ marginLeft: 8 }}>
                                Start Game
                            </Button>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
}