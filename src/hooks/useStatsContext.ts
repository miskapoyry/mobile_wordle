import { useContext } from "react";
import StatsContext from "../context/StatsContext";

export const useStatsContext = () => {
    const context = useContext(StatsContext);
    if(!context) {
        throw new Error("useStatsContext not in StatsProvider");
    }
    return context;
};