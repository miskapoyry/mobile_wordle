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
    modalText: {
        marginBottom: 20,
        alignItems: "center",
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
    title: {
        fontSize: 25,
        textAlign: "center",
        marginBottom: 20,
    },
    dismiss: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 10,
    },
    share: {
        position: "absolute",
        top: 25,
        right: 20,
        zIndex: 10,
    },
})