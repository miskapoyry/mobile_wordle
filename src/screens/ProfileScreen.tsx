import React, { useState } from "react";
import { Image, View, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import PageHeader from "../components/PageHeader";
import { db, FIREBASE_AUTH } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { Platform } from "react-native";
import { styles } from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppParams } from "../types/types";
import BackButton from "../components/BackButton";

export default function ProfileScreen() {
  const { logOut, user } = useAuth();
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(user?.photoURL ?? null);
  const [username, setUsername] = useState(user?.displayName ?? "");
  const defaultImage = require("../assets/profile.png");
  const navigation = useNavigation<NativeStackNavigationProp<AppParams>>();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleProfileSave = async () => {
    const currentUser = FIREBASE_AUTH.currentUser;
    if (!currentUser) return;

    try {
      await updateProfile(currentUser, {
        displayName: username,
        photoURL: image ?? null,
      });
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        username: username,
        photoURL: image ?? null,
      });
      await currentUser.reload()
      Alert.alert("Profile updated!");
      navigation.navigate("Home", { refresh: true });
    } catch (error: any) {
      setError(error.message);
    }
  };

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

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={{ position: "absolute", top: 65, marginLeft: 10, zIndex: 10}}>
            <BackButton />
          </View>
          <ScrollView style={styles.scrollViewContainer}>
            <PageHeader title="My Profile" description="Set up your profile here!" />

            <View style={styles.imageContainer}>
              <Image
                source={image ? { uri: image } : defaultImage}
                style={styles.profileImage}
              />
              <Button mode="outlined" onPress={pickImage} style={{ marginTop: 12 }}>
                Choose Profile Picture
              </Button>
            </View>
            <TextInput
              label="Email"
              value={user?.email ?? ""}
              mode="outlined"
              left={<TextInput.Icon icon="email" color={"#999999"} />}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Username"
              value={username}
              onChangeText={setUsername}
              left={<TextInput.Icon icon="account" color="#999999" />}
              style={styles.input}
              theme={{ colors: { primary: "white" } }}
            />
            <Button mode="contained" onPress={handleProfileSave} style={{ marginTop: 15, backgroundColor: "green" }}>
              Save Changes
            </Button>

            <Button mode="outlined" onPress={handleLogOut} style={{ marginTop: 15 }}>
              Log Out
            </Button>

            {error ? <Text style={{ color: "red", marginTop: 10 }}>{error}</Text> : null}
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
