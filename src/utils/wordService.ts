export const fetchRandomWord = async (length: number): Promise<string> => {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${length}`);
    const data = await response.json();
    return data[0].toLowerCase();
};

export const validateRandomWord = async (word: string): Promise<boolean> => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return response.ok;
    } catch (error) {
        return false;
    }
}