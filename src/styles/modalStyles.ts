import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
    penaltyText: {
        fontWeight: "bold",
        color: "#b00020",
    },
    pointValue: {
        fontWeight: "bold",
        color: "#388e3c",
    },
    modalIntro: {
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        width: 300,
        borderRadius: 10,
    }
})