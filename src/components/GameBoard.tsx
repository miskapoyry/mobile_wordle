import React, { useState } from "react";
import { View, TextInput, SafeAreaView, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import { fetchWordDefinition, validateRandomWord } from "../utils/wordService";
import { saveResult } from "../utils/resultService";
import { useStatsContext } from "../hooks/useStatsContext";
import { checkGuess } from "../utils/guessService";
import { GameProps } from "../types/types";
import * as Haptics from 'expo-haptics';
import { gameStyles } from "../styles/styles";
import PageHeader from "./PageHeader";
import GameModal from "./GameModal";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { useStats } from "../hooks/useStats";
import { View as AnimatedView } from "react-native-animatable";

export default function GameBoard({ targetWord, maxGuesses }: GameProps) {
    const [guess, setGuess] = useState("");
    const [guesses, setGuesses] = useState<string[]>([]);
    const [feedbacks, setFeedbacks] = useState<("correct" | "present" | "absent")[][]>([]);
    const [status, setStatus] = useState<"won" | "lost" | "playing">("playing");
    const [definition, setDefinition] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { refreshStats } = useStatsContext();
    const navigation = useAppNavigation();
    const { stats } = useStats();

    const handleGiveUp = async () => {
        setStatus("lost");
        setModalVisible(true);
        await saveResult("lost", targetWord.length, targetWord);
        refreshStats();
    }

    const handleGuess = async () => {

        const loweredGuess = guess.toLowerCase();

        if (guess.length !== targetWord.length) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return Alert.alert(`Guess must be ${targetWord.length} letters.`);
        };
        if (guesses.includes(loweredGuess)) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return Alert.alert("You already guessed that word!");
        }
        if (await validateRandomWord(loweredGuess) === false) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            return Alert.alert("Invalid word. Please try again.");
        };

        const { result } = checkGuess(loweredGuess, targetWord);
        setGuesses([...guesses, loweredGuess]);
        setFeedbacks([...feedbacks, result]);
        setGuess("");

        const defi = await fetchWordDefinition(targetWord);
        setDefinition(defi);

        if (loweredGuess === targetWord) {
            setStatus("won");
            setTimeout(async () => {
                setModalVisible(true);
                await saveResult("won", targetWord.length, targetWord);
                refreshStats();
            }, 800);
        }
        else if (guesses.length + 1 >= maxGuesses) {
            setStatus("lost");
            setTimeout(async () => {
                setModalVisible(true);
                await saveResult("lost", targetWord.length, targetWord);
                refreshStats();
            }, 800);
        }
    };

    const showBg = (letters: string, feedback?: ("correct" | "present" | "absent")[], key?: string) => {
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
                <AnimatedView key={i} style={[gameStyles.letterContainer, { backgroundColor: backGround }]} duration={800} animation="flipInY" delay={i * 200} useNativeDriver>
                    <Text style={gameStyles.letterText}>{character}</Text>
                </AnimatedView>
            );
        }

        return <View style={gameStyles.rowed} key={key}>{letterGuesses}</View>;
    };

    return (
        <SafeAreaView style={gameStyles.container}>
            <PageHeader title="Game Started!" description={`Guess the right ${targetWord.length} letter word.`} style={{ marginBottom: 20, marginTop: 20 }} />

            {guesses.map((guess, index) => showBg(guess, feedbacks[index], `${index}`))}
            {status === "playing" && showBg(guess)}
            {status === "playing" && (
                <>
                    <TextInput
                        value={guess}
                        onChangeText={setGuess}
                        placeholder="Your guess"
                        style={{ opacity: 0, fontSize: 0 }}
                        autoFocus={true}
                        maxLength={targetWord.length}
                        returnKeyType="none"
                        keyboardAppearance="dark"
                        submitBehavior="submit"
                    />
                    <Button onPress={handleGuess} textColor="white">Make Guess</Button>
                    <Button onPress={handleGiveUp} textColor="red" style={{ top: -10}}>Give Up</Button>
                </>
            )}

            {status !== "playing" && (
                <GameModal
                    status={status}
                    targetWord={targetWord}
                    visible={modalVisible}
                    definition={definition}
                    guessAmount={guesses.length}
                    startingPoints={stats?.points ?? 0}
                    goHome={() => {
                        setModalVisible(false);
                        // Laita niin, että ei voida tulla enää takaisin pelinäkymään
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Home" }],
                        })
                    }}
                />
            )}
        </SafeAreaView>
    );
}