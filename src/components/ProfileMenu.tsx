import React, { useEffect } from "react";
import { View } from "react-native";
import { Avatar, Divider, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppParams } from "../types/types";
import { useAuth } from "../hooks/useAuth";
import { styles } from "../styles/styles";

export default function ProfileMenu() {
    const { user } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<AppParams>>();

    const handleProfile = () => {
        navigation.navigate("Profile");
    };

    return (
        <View>
            <View style={styles.profileGreeting}>
                <Text variant="displayMedium" style={styles.greetingText}>Hello{user?.displayName ? `, ${user.displayName}!` : "!"}</Text>
            </View>
            <View style={styles.profileMenu}>
                {user?.photoURL ? (
                    <Avatar.Image
                        size={35}
                        source={{ uri: user.photoURL }}
                        onTouchEnd={handleProfile}
                    />
                ) : (
                    <Avatar.Image
                        size={35}
                        source={require("../assets/profile.png")}
                        onTouchEnd={handleProfile}
                    />
                )}
            </View>
            <Divider style={styles.profileDivider} />
        </View>
    );
}
