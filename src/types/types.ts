import { User, UserCredential } from "firebase/auth";
import { ViewStyle } from "react-native";

export interface HeaderProps {
    title: string;
    description: string;
    style?: ViewStyle;
};

export type FadeAnimationProps = {
    children: React.ReactNode;
    duration: number;
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
};

export interface UserContextType {
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

export interface StatsContextType {
    stats: GameStats | null;
    refreshStats: () => Promise<void>;
}

export type GameProps = {
    targetWord: string;
    maxGuesses: number;
}

export type GameEndModalProps = {
    status: string;
    targetWord: string;
    visible: boolean;
    goHome: () => void;
    definition: string | null;
    guessAmount: number;
}