import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppParams } from "../types/types";

export function useAppNavigation() {
    return useNavigation<NativeStackNavigationProp<AppParams>>();
}