export function checkGuess(guess: string,targetWord: string) {
    const length = targetWord.length;
    const result = Array(length).fill("absent") as ("correct" | "present" | "absent")[];
    const guessed = Array(length).fill(false);
    const status: { [key: string]: "correct" | "present" | "absent" } = {};

    for (let i = 0; i < length; i++) {
        if (guess[i] === targetWord[i]) {
            result[i] = "correct";
            guessed[i] = true;
            status[guess[i]] = "correct";
        }
    }

    for (let i = 0; i < length; i++) {
        if (result[i] === "correct") continue;
        for (let j = 0; j < length; j++) {
            if (!guessed[j] && guess[i] === targetWord[j]) {
                result[i] = "present";
                guessed[j] = true;
                if (status[guess[i]] !== "correct") {
                    status[guess[i]] = "present";
                }
                break;
            }
        }
        if (result[i] === "absent" && !status[guess[i]]) {
            status[guess[i]] = "absent";
        }
    }

    return { result, status };
}  