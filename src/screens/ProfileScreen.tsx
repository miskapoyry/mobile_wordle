import React, { useState } from "react";
import { Image, View, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import { useAuth } from "../hooks/useAuthContext";
import { useAuthFunctions } from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { useProfilePicture } from "../hooks/useProfilePicture";
import { usePasswordChange } from "../hooks/usePasswordChange";

export default function ProfileScreen() {
  const { logOut, user } = useAuth();
  const [error, setError] = useState("");
  const [username, setUsername] = useState(user?.displayName ?? "");
  const defaultImage = require("../assets/profile.png");
  const navigation = useNavigation<NativeStackNavigationProp<AppParams>>();
  const { checkUsernameUniqueness } = useAuthFunctions();
  const { image, pickImage, useCamera, deletePicture } = useProfilePicture(user?.photoURL ?? null);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const { changePassword } = usePasswordChange();

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
    const nameUnique = await checkUsernameUniqueness(username);

    if (!nameUnique) {
      Alert.alert("This username is already in use!");
      return;
    }

    if(password && passwordAgain){
      const response = await changePassword(password,passwordAgain);
      if (!response) return;
    }

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



  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={{ position: "absolute", top: 65, marginLeft: 10, zIndex: 10 }}>
            <BackButton />
          </View>
          <ScrollView style={styles.scrollViewContainer}>
            <PageHeader title="My Profile" description="Set up your profile here!" />

            <View style={styles.imageContainer}>
              <Image
                source={image ? { uri: image } : defaultImage}
                style={styles.profileImage}
              />
              <View style={{ flexDirection: "row", justifyContent: "center", gap: 20, marginTop: 10 }}>
                <IconButton icon="image" size={30} onPress={pickImage} iconColor="white" accessibilityLabel="Pick Image From Gallery." />
                <IconButton icon="camera" size={30} onPress={useCamera} iconColor="white" accessibilityLabel="Take a Live Picture." />
                <IconButton icon="delete" size={30} onPress={deletePicture} iconColor="white" accessibilityLabel="Delete the Profile Picture." />
              </View>
            </View>

            <View>
              <Text variant="displaySmall" style={{ textAlign: "center", marginBottom: 5 }}>CHANGE USERNAME</Text>
              <TextInput
                mode="outlined"
                label="Username"
                value={username}
                onChangeText={setUsername}
                left={<TextInput.Icon icon="account" color="#999999" />}
                style={styles.input}
                theme={{ colors: { primary: "white" } }}
              />
              <Text variant="displaySmall" style={{ textAlign: "center", marginBottom: 5 }}>CHANGE PASSWORD</Text>
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" color="#999999" />}
                theme={{ colors: { primary: "white" } }}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(prev => !prev)}
                  />
                }
              />
              <TextInput
                label="Password again"
                value={passwordAgain}
                onChangeText={setPasswordAgain}
                mode="outlined"
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" color="#999999" />}
                theme={{ colors: { primary: "white" } }}
                right={
                  <TextInput.Icon
                    icon={showPasswordAgain ? "eye-off" : "eye"}
                    onPress={() => setShowPasswordAgain(prev => !prev)}
                  />
                }
              />
            </View>
            <Button mode="contained" onPress={handleProfileSave} style={{ marginTop: 15, backgroundColor: "green" }}>
              Save Changes
            </Button>

            <Button mode="contained" onPress={handleLogOut} style={{ marginTop: 15, backgroundColor: "red" }}>
              Log Out
            </Button>

            {error ? <Text style={{ color: "red", marginTop: 10 }}>{error}</Text> : null}
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
