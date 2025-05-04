import { useEffect, useState } from "react";
import { useAuth } from "./useAuthContext"
import { GameStats } from "../types/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const useStats = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<GameStats | null>(null);

    const refreshStats = async () => {
        if (!user) return;
        const statDocRef = doc(db, "users", user.uid);
        const statDocSnap = await getDoc(statDocRef);
        if (statDocSnap.exists()) {
            const data = statDocSnap.data() as GameStats;
            setStats(data);
        } else {
            console.log("Couldn't find user stats")
        }
    }

    useEffect(() => {
        refreshStats();
    }, [user]);

    return { stats, refreshStats };
};
