import { addDoc, collection, doc, getDoc, getDocs, increment, limit, orderBy, query, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { db, FIREBASE_AUTH } from "../firebaseConfig"

export const saveResult = async (status: "won" | "lost", wordLength: number, targetWord: string) => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;
    const userReference = doc(db, "users", user.uid);
    const pointsDifference = status === "won" ? getPoints(wordLength) : -50;
    
    const userDoc = await getDoc(userReference);
    const pointTotal = userDoc.exists() ? userDoc.data().points + pointsDifference || 0 : 0;

    await setDoc(userReference, {
        points: increment(pointsDifference),
        wins: increment(status === "won" ? 1 : 0),
        losses: increment(status === "lost" ? 1 : 0),
        games: increment(1),
    }, { merge: true });

    await addDoc(collection(db, "users", user.uid, "games"), {
        pointTotal,
        status,
        targetWord,
        wordLength,
        pointsDifference,
        timestamp: serverTimestamp(),
    });
}

export const getPoints = (length: number) => {
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

export const getTop20 = async () => {
    const usersRef = collection(db, "users");
    const leaderboardQuery = query(usersRef, orderBy("points", "desc"), limit(20));
    const snapshot = await getDocs(leaderboardQuery);

    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            username: data.username,
            points: data.points,
        };
    });
}

export const fetchGameData = async () => {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) return;

    const gamesRef = collection(db, "users", user.uid, "games");
    const gameQuery = query(gamesRef, orderBy("timestamp", "desc"), limit(10));
    const snapshot= await getDocs(gameQuery);

    return snapshot.docs.reverse().map((doc) => {
        const data = doc.data();
        console.log(data.pointTotal)
        return data.pointTotal;
    });
}