import { Share } from "react-native";
import { SharingProps } from "../types/types";

export const shareResult = async ({ word, won, guesses, rating }: SharingProps): Promise<void> => {
    const message = won
        ? `🏆 I guessed the word "${word}" in ${guesses} guesses!\n My rating increased to ${rating} RP in Wordle Ranked`
        : `❌ I failed to guess the word "${word}".\n My rating decreased to ${rating} RP in Wordle Ranked`;

    await Share.share({ message });
};