import { User, UserCredential } from "firebase/auth";
import { ViewStyle } from "react-native";

export type HeaderProps = {
    title: string;
    description: string;
    style?: ViewStyle;
};

export type FadeAnimationProps = {
    children: React.ReactNode;
    duration: number;
    delay?: number;
};

export type NoAuthParams = {
    Login: undefined;
    Register: undefined;
};

export type AppParams = {
    Home: { refresh?: boolean };
    Game: { wordLength: number };
    Statistics: undefined;
    Profile: undefined;
    Instructions: undefined;
};

export type UserContextType = {
    user: User | null;
    logIn: (email: string, password: string) => Promise<UserCredential>
    register: (email: string, password: string, username: string) => Promise<UserCredential>
    logOut: () => Promise<void>;
    loading: boolean;
}

export type GameStats = {
    points: number;
    wins: number;
    losses: number;
    games: number;
}

export type StatsContextType = {
    stats: GameStats | null;
    refreshStats: () => Promise<void>;
}

export type GameProps = {
    targetWord: string;
    maxGuesses: number;
}

export type GameStartModalProps = {
    visible: boolean;
    onDismiss: () => void;
    onStart: () => void;
    wordLength: string; 
    setWordLength: (val: string) => void;
}

export type GameEndModalProps = {
    status: string;
    targetWord: string;
    visible: boolean;
    goHome: () => void;
    definition: string | null;
    guessAmount: number;
    startingPoints: number;
}

export type PointAnimationProps = {
    totalPoints: number,
    difference: number,
    fontSize: number,
}

export type LeaderboardStats = {
    points: number,
    username: string,
}

export type StatCardProps = {
    title: string,
    amount: number,
    delay?: number,
}

export type SharingProps = {
    word: string,
    won: boolean,
    guesses: number,
    rating: number,
}

export type ErrorAlertProps = {
    title: string,
    message: string,
}

export type ProfileUpdateProps = {
    username?: string,
    image?: string | null,
    password?: string,
    passwordAgain?: string,
}