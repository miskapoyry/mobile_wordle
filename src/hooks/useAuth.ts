import { collection, getDocs, query, where } from "firebase/firestore"
import { db, FIREBASE_AUTH } from "../firebaseConfig"

export const useAuthFunctions = () => {
    const checkUsernameUniqueness = async (username: string): Promise<boolean> => {
        const user = FIREBASE_AUTH.currentUser;

        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("username", "==", username));
        const snapshot = await getDocs(userQuery);

        if(snapshot.empty) return true;

        const found = snapshot.docs[0];

        return found.id === user?.uid;
    };

    const checkUsernameUniquenessRegister = async (username: string): Promise<boolean> => {
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("username", "==", username));
        const snapshot = await getDocs(userQuery);

        return snapshot.empty;
    };

    return {
        checkUsernameUniqueness, checkUsernameUniquenessRegister
    }
}