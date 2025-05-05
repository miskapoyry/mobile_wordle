import { useNavigation } from "@react-navigation/native";
import { useAuthFunctions } from "./useAuth";
import { useAuth } from "./useAuthContext";
import { usePasswordChange } from "./usePasswordChange";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppParams, ProfileUpdateProps } from "../types/types";
import { useState } from "react";
import { db, FIREBASE_AUTH } from "../firebaseConfig";
import { Alert } from "react-native";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const useProfileFunctions = ({username, image, password, passwordAgain}: ProfileUpdateProps) => {
    const { logOut } = useAuth();
    const { checkUsernameUniqueness } = useAuthFunctions();
    const { changePassword } = usePasswordChange();
    const navigation = useNavigation<NativeStackNavigationProp<AppParams>>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleProfileSave = async () => {
        setLoading(true);
        const currentUser = FIREBASE_AUTH.currentUser;
        if (!currentUser) return;
        if(username){
            const nameUnique = await checkUsernameUniqueness(username);

            if (!nameUnique) {
                Alert.alert("This username is already in use!");
                setLoading(false);
                return;
            }
        }

        if (password && passwordAgain) {
            const response = await changePassword(password, passwordAgain);
            if (!response) {
                setLoading(false);
                return;
            };
        }

        try {
            await updateProfile(currentUser, {
                displayName: username,
                photoURL: image ?? null,
            });
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                username: username,
                photoURL: image ?? null,
            });
            await currentUser.reload()
            Alert.alert("Profile updated!");
            navigation.navigate("Home", { refresh: true });
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {loading, error, handleProfileSave, handleLogOut};
}