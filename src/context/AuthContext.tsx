import { createContext, ReactNode, useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, UserCredential} from "firebase/auth";
import { UserContextType } from "../types/types";

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const register = (email: string, password: string) => {
        return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    };

    const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    };

    const logOut = () => {
        return signOut(FIREBASE_AUTH);
    };

    return(
        <AuthContext.Provider value={{ user, logIn, register, logOut, loading}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;