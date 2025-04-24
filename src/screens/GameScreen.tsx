import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import GameBoard from "../components/GameBoard";
import { fetchRandomWord, validateRandomWord } from "../utils/wordService";
import Loading from "../components/Loading";

export default function GameScreen() {
  const route = useRoute();
  const { wordLength } = route.params as { wordLength: number };
  const [targetWord, setTargetWord] = useState<string | null>(null);

  useEffect(() => {
    const loadValidWord = async () => {
      let validWord: string | null = null;

      while (!validWord) {
        const word = await fetchRandomWord(wordLength);
        const isValid = await validateRandomWord(word);

        if (isValid) {
          console.log(word)
          validWord = word;
        }
      }

      setTargetWord(validWord);
    };

    loadValidWord();
  }, [wordLength]);

  if (!targetWord) {
    return <Loading />;
  }

  return <GameBoard targetWord={targetWord} maxGuesses={6} />;
}
