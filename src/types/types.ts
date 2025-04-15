import { User, UserCredential } from "firebase/auth";

export interface HeaderProps {
    title: string;
    description: string;
};

export type FadeAnimationProps = {
    children: React.ReactNode;
    duration: number;
};

export type NoAuthParams = {
    Login: undefined;
    Register: undefined;
};

export type GameParams = {
    Home: undefined;
    Game: { wordLength: number };
};

export interface UserContextType {
    user: User | null;
    logIn: (email: string, password: string) => Promise<UserCredential>
    register: (email: string, password: string, username: string) => Promise<UserCredential>
    logOut: () => Promise<void>;
    loading: boolean;
}