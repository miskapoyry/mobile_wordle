export const fetchRandomWord = async (length: number): Promise<string> => {
    const response = await fetch(`https://random-word-api.vercel.app/api?words=1&length=${length}`);
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

export const fetchWordDefinition = async (word: string): Promise<string> => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        const definition = data[0].meanings[0].definitions[0].definition;
        return definition ? definition : "The word has no definition set.";
    } catch (error) {
        return "Error fetching definition.";
    }
}