import { View } from "react-native";
import { PointAnimationProps } from "../types/types";
import AnimatedNumbers from 'react-native-animated-numbers';
import { useEffect, useState } from "react";

export default function PointAnimation({ totalPoints, difference, fontSize }: PointAnimationProps){
    const [pointAmount, setPointAmount] = useState(totalPoints);
    let color = "white";

    if(difference >= 0){
        color = "green";
    } else {
        color = "red";
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPointAmount(totalPoints + difference)
        }, 500)
        return () => clearTimeout(timeout)
    }, [totalPoints, difference])

    return(
        <View style={{ alignItems: "center" }}>
            <AnimatedNumbers
                animationDuration={2000}
                animateToNumber={pointAmount}
                fontStyle={{ fontSize: fontSize, fontFamily: "JetBrainsMonoBold", color: color}}
            />
        </View>
    )
}