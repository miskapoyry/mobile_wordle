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