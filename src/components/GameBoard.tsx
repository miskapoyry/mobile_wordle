import React, { useEffect, useState } from "react";
import { View, TextInput, Button, SafeAreaView, Alert } from "react-native";
import { validateRandomWord } from "../utils/wordService";
import { Text } from "react-native-paper";
import { saveResult } from "../utils/resultService";

type Props = {
    targetWord: string;
    maxGuesses: number;
};

export default function GameBoard({ targetWord, maxGuesses }: Props) {
    const [guess, setGuess] = useState("");
    const [guesses, setGuesses] = useState<string[]>([]);
    const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

    useEffect(() => {
        if(status === "won" || status === "lost") {
            saveResult(status, targetWord.length)
                .then(() => console.log("Game result saved."))
                .catch((error) => console.error("Error saving game result:", error));
        }
    })

    const handleGuess = async () => {

        const validatedGuess = await validateRandomWord(guess.toLowerCase());
        if (!validatedGuess) {
            Alert.alert("Invalid word. Please try again.");
            return;
        }

        if (guesses.includes(guess.toLowerCase())) {
            Alert.alert("You already guessed that word!");
            return;
        }

        if (guess.length !== targetWord.length) {
            Alert.alert(`Guess must be ${targetWord.length} letters long.`);
            return;
        }

        const newGuesses = guesses.concat(guess.toLowerCase());
        setGuesses(newGuesses);
        setGuess("");


        if (guess.toLowerCase() === targetWord) {
            setStatus("won");
        } else if (newGuesses.length >= maxGuesses) {
            setStatus("lost");
        }
    };

    return (
        <SafeAreaView>
            <Text variant="titleLarge" style={{ marginBottom: 10, textAlign: "center" }}>Target word length: {targetWord.length}</Text>

            {guesses.map((g, i) => (
                <Text key={i} variant="titleMedium" style={{ marginBottom: 10, textAlign: "center" }}>{g}</Text>
            ))}

            {status === "playing" && (
                <>
                    <TextInput
                        value={guess}
                        onChangeText={setGuess}
                        placeholder="Your guess"
                        style={{ borderBottomWidth: 1, marginVertical: 12 }}
                    />
                    <Button title="Guess" onPress={handleGuess} />
                </>
            )}

            {status === "won" && <Text style={{ marginTop: 10, color: "green" }}>Correct! You won!</Text>}
            {status === "lost" && <Text style={{ marginTop: 10, color: "red" }}>Game over. Word was: {targetWord}</Text>}

        </SafeAreaView>
    );
}