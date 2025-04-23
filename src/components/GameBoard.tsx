import React, { useEffect, useState } from "react";
import { View, TextInput, SafeAreaView, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import { validateRandomWord } from "../utils/wordService";
import { saveResult } from "../utils/resultService";
import { useStatsContext } from "../hooks/useStatsContext";
import { checkGuess } from "../utils/guessService";
import { GameProps } from "../types/types";
import * as Haptics from 'expo-haptics';
import { gameStyles } from "../styles/styles";
import PageHeader from "./PageHeader";
import FadeInAnimation from "./FadeInAnimation";

export default function GameBoard({ targetWord, maxGuesses }: GameProps) {
    const [guess, setGuess] = useState("");
    const [guesses, setGuesses] = useState<string[]>([]);
    const [feedbacks, setFeedbacks] = useState<("correct" | "present" | "absent")[][]>([]);
    const [status, setStatus] = useState<"won" | "lost" | "playing">("playing");
    const { refreshStats } = useStatsContext();

    const handleGuess = async () => {

        const loweredGuess = guess.toLowerCase();

        if (guess.length !== targetWord.length) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return Alert.alert(`Guess must be ${targetWord.length} letters.`);
        };
        if (guesses.includes(loweredGuess)) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return Alert.alert("You already guessed that word!");
        }
        if (await validateRandomWord(loweredGuess) === false) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return Alert.alert("Invalid word. Please try again.");
        };

        const { result } = checkGuess(loweredGuess, targetWord);
        setGuesses([...guesses, loweredGuess]);
        setFeedbacks([...feedbacks, result]);
        setGuess("");

        if (loweredGuess === targetWord){
            setStatus("won");
            await saveResult("won", targetWord.length);
            refreshStats();
        }
        else if (guesses.length + 1 >= maxGuesses){
            setStatus("lost");
            await saveResult("lost", targetWord.length);
            refreshStats();
        }
    };

    const showBg = (letters: string, feedback?: ("correct" | "present" | "absent")[]) => {
        const letterGuesses = [];

        for (let i = 0; i < targetWord.length; i++) {
            const character = letters[i]?.toUpperCase() || "";
            const backGround =
                feedback?.[i] === "correct"
                    ? "green"
                    : feedback?.[i] === "present"
                        ? "orange"
                        : feedback?.[i] === "absent"
                            ? "red"
                            : "gray";

            letterGuesses.push(
                    <View key={i} style={[gameStyles.letterContainer, { backgroundColor: backGround }]}>
                        <Text style={gameStyles.letterText}>{character}</Text>
                    </View>
            );
        }

        return <View style={gameStyles.rowed}>{letterGuesses}</View>;
    };

    return (
        <SafeAreaView style={gameStyles.container}>
            <PageHeader title="Game Started!" description={`Guess the right ${targetWord.length} letter word. Good luck`} style={{ marginBottom: 20, marginTop: 20 }} />

            {guesses.map((g, i) => showBg(g, feedbacks[i]))}
            {status === "playing" && showBg(guess)}
            {status === "playing" && (
                <>
                    <TextInput
                        value={guess}
                        onChangeText={setGuess}
                        placeholder="Your guess"
                        style={{ opacity: 0, fontSize: 0 }}
                        autoFocus
                        maxLength={targetWord.length}
                        onSubmitEditing={handleGuess}
                        returnKeyType="none"
                    />
                    <Button onPress={handleGuess}>Make Guess</Button>
                </>
            )}

            {status === "won" && <Text style={{textAlign: "center"}}>Correct! You won!</Text>}
            {status === "lost" && <Text style={{textAlign: "center"}}>Game over. Word was: {targetWord.toUpperCase()}</Text>}
        </SafeAreaView>
    );
}