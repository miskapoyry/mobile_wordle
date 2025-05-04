import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { TouchableOpacity, View } from "react-native";
import { Portal, Button, Text, Modal } from "react-native-paper";
import { modalStyles } from "../styles/modalStyles";
import { styles } from "../styles/styles";
import { GameStartModalProps } from "../types/types";
import React from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { shareResult } from "../utils/shareService";

export default function GameStartModal({ visible, onDismiss, onStart, wordLength, setWordLength }: GameStartModalProps) {
    const lengths = ["4", "5", "6", "7"];
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
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} style={modalStyles.modalContainer}>
                <View style={modalStyles.modalContent}>

                    <View style={modalStyles.dismiss}>
                        <TouchableOpacity onPress={onDismiss}>
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <Text variant="displayMedium" style={modalStyles.title}>START GAME</Text>
                    <Text variant="titleMedium" style={modalStyles.modalIntro}>
                        Choose the word length:
                    </Text>

                    <SegmentedControl
                        values={lengths.map((len) => `${len}`)}
                        selectedIndex={lenIndex}
                        appearance="dark"
                        onChange={(e) => {
                            const index = e.nativeEvent.selectedSegmentIndex;
                            setWordLength(lengths[index]);
                        }}
                        style={{ marginBottom: 20 }}
                    />

                    <View style={modalStyles.modalText}>
                        <Text variant="titleMedium" >
                            {wordLength} letter win grants you <Text style={modalStyles.pointValue}>+{getPoints(wordLength)}p</Text>
                        </Text>
                        <Text variant="titleMedium">
                            Losing costs you <Text style={modalStyles.penaltyText}>-50p</Text>
                        </Text>
                    </View>

                    <View style={{ justifyContent: "center" }}>
                        <Button onPress={onStart} mode="contained">
                            Start Game
                        </Button>
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}