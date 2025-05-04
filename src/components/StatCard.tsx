import { View } from "react-native";
import { Text } from "react-native-paper";
import { StatCardProps } from "../types/types";
import { statCardStyle } from "../styles/styles";
import FadeInAnimation from "./FadeInAnimation";

export default function StatCard({ title, amount, delay }: StatCardProps) {
    return (
        <FadeInAnimation duration={500} delay={delay}>
            <View style={statCardStyle.container}>
                <Text variant="titleSmall" style={statCardStyle.title}>{title}</Text>
                <View style={statCardStyle.line} />
                <Text variant="displaySmall" style={statCardStyle.amount}>{amount}</Text>
            </View>
        </FadeInAnimation>
    )
}