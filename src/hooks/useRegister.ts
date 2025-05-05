import { useState } from "react";
import { useAuth } from "./useAuthContext"
import { Alert } from "react-native";

export const useRegister = () => {
    const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (): Promise<boolean> => {

        if (password !== passwordAgain) {
            Alert.alert("Passwords doesn't match", "Please make sure the passwords match.");
            return false;
        }

        if (!email || !username || !password || !passwordAgain) {
            Alert.alert("Fill all the fields", "Please make sure you have all the fields filled.");
            return false;
        }

        if (password.length < 6) {
            Alert.alert("Password length isn't enough", "Please make sure that your password is at least 6 characters.")
            return false;
        }

        try {
            setError(null);
            setLoading(true);
            await register(email, password, username);
            Alert.alert("Registratition was successful", "Welcome to Wordle Ranked!");
            return true;
        } catch (error: any) {
            setError(error.message);
            Alert.alert("Error", error.message);
            return false;
        } finally {
            setLoading(false);
        };

        
    }
    return{ email, setEmail, username, setUsername, password, setPassword, passwordAgain, setPasswordAgain, loading, error, handleRegister}
}