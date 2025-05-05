import { useState } from "react";
import { useAuth } from "./useAuthContext"
import { Alert } from "react-native";
import { useAuthFunctions } from "./useAuth";
import { errorAlert } from "../components/ErrorAlert";

export const useRegister = () => {
    const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { checkUsernameUniquenessRegister } = useAuthFunctions();

    const handleRegister = async (): Promise<boolean> => {

        const nameUnique = await checkUsernameUniquenessRegister(username);

        if (!nameUnique) {
            errorAlert({title: "Username is already in use", message: "Please pick another username"});
            return false;
        }

        if (password !== passwordAgain) {
            errorAlert({title: "Passwords doesn't match", message: "Please make sure the passwords match."});
            return false;
        }

        if (!email || !username || !password || !passwordAgain) {
            errorAlert({title: "Some fields are missing", message: "Please make sure you have all the fields filled."});
            return false;
        }

        if (password.length < 6) {
            errorAlert({title: "Password isn't long enough", message: "Please make sure that your password is at least 6 characters."});
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
            Alert.alert("Unknown", error.message);
            return false;
        } finally {
            setLoading(false);
        };


    }
    return { email, setEmail, username, setUsername, password, setPassword, passwordAgain, setPasswordAgain, loading, error, handleRegister }
}