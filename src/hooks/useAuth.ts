import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebaseConfig"

export const useAuthM = () => {
    const checkUsernameUniqueness = async (username: string): Promise<boolean> => {
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("username", "==", username));
        const snapshot = await getDocs(userQuery);
        return snapshot.empty;
    }

    return {
        checkUsernameUniqueness
    }
}