import { createContext, ReactNode } from "react";
import { StatsContextType } from "../types/types";
import { useStats } from "../hooks/useStats";

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsContextProvider = ({ children }: { children: ReactNode }) => {
    const { stats, refreshStats } = useStats();

    return (
        <StatsContext.Provider value={{ stats, refreshStats }}>
          {children}
        </StatsContext.Provider>
      );
};

export default StatsContext;