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
        backgroundColor: "black",
        padding: 20,
        width: 350,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
    }
})