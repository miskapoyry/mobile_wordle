import { updatePassword } from "firebase/auth";
import { Alert } from "react-native"
import { FIREBASE_AUTH } from "../firebaseConfig";

export const usePasswordChange = () => {

    const changePassword = async (password: string, passwordAgain: string): Promise<boolean> => {

        const user = FIREBASE_AUTH.currentUser;
        if (!user) {
            return false;
        }

        if (!password || !passwordAgain) {
            Alert.alert("Passwords not found", "Please type passwords again");
            return false;
        }

        if (password !== passwordAgain) {
            Alert.alert("Passwords doesn't match", "Please make sure the passwords match");
            return false;
        }

        if (password.length < 6) {
            Alert.alert("Password length isn't enough", "Please make sure that your password is at least 6 characters")
            return false;
        }

        try {
            await updatePassword(user, password);
            return true;
        } catch (error: any) {
            if (error.code === "auth/requires-recent-login") {
                Alert.alert("Login has expired", "To change the password, please login again.")
            } else {
                Alert.alert(error.message);
            }
            return false;
        }
    };

    return { changePassword };
}