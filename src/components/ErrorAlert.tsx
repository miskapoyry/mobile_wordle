import * as Haptics from "expo-haptics";
import { Alert } from "react-native";
import { ErrorAlertProps } from "../types/types";

export const errorAlert = ({title, message}: ErrorAlertProps ) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

    Alert.alert(title,message);
}