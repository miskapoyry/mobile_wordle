import { addDoc, collection, doc, increment, setDoc } from "firebase/firestore";
import { db, FIREBASE_AUTH } from "../firebaseConfig"

export const saveResult = async (status: "won" | "lost", wordLength: number) => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;
    const userReference = doc(db, "users", user.uid);
    const pointsDifference = status === "won" ? getPoints(wordLength) : -50;

    await setDoc(userReference, {
        points: increment(pointsDifference),
        wins: increment(status === "won" ? 1 : 0),
        losses: increment(status === "lost" ? 1 : 0),
        games: increment(1),
      }, { merge: true });
    
      await addDoc(collection(db, "users", user.uid, "games"), {
        status,
        wordLength,
        pointsDifference,
      });
}

const getPoints = (length: number) => {
    switch (length) {
        case 4:
            return 60;
        case 5:
            return 70;
        case 6:
            return 80;
        case 7:
            return 90;
        case 8:
            return 100;
        default:
            return 0;
    }
};