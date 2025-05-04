import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export function useProfilePicture(url: string | null) {
    const [image, setImage] = useState<string | null>(url);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            const selected = result.assets[0].uri;
            setImage(selected);
        }
    };

    const useCamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.status !== "granted") {
            Alert.alert("Camera permissions are required to access the camera.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            const selected = result.assets[0].uri;
            setImage(selected);
        }
    };

    const deletePicture = () => {
        setImage(null);
    };

    return { image, pickImage, useCamera, deletePicture };
}