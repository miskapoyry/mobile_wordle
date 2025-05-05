import React, { useState } from "react";
import { Image, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import { useAuth } from "../hooks/useAuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "../components/PageHeader";
import { Platform } from "react-native";
import { styles } from "../styles/styles";
import BackButton from "../components/BackButton";
import { useProfilePicture } from "../hooks/useProfilePicture";
import { List } from "react-native-paper";
import Loading from "../components/Loading";
import { useProfileFunctions } from "../hooks/useProfileFunctions";

export default function ProfileScreen() {
  const { logOut, user } = useAuth();
  const [username, setUsername] = useState(user?.displayName ?? "");
  const defaultImage = require("../assets/profile.png");
  const { image, pickImage, useCamera, deletePicture } = useProfilePicture(user?.photoURL ?? null);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const { handleProfileSave, handleLogOut, loading, error } = useProfileFunctions({username, image: image?? "", password, passwordAgain});

  if (loading){
    return <Loading />
  }

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

            <List.Section>
              <List.Accordion title="CHANGE USERNAME" titleStyle={{ color: "white", fontFamily: "JetBrainsMonoBold" }} left={ () => <List.Icon icon="account" style={{ paddingLeft: 15}} />}>
                <TextInput
                  mode="outlined"
                  label="Username"
                  value={username}
                  onChangeText={setUsername}
                  left={<TextInput.Icon icon="account" color="#999999" />}
                  style={styles.input}
                  theme={{ colors: { primary: "white" } }}
                  maxLength={12}
                />
              </List.Accordion>
              <View style={{ padding: 5}} />
              <List.Accordion title="CHANGE PASSWORD" titleStyle={{ color: "white", fontFamily: "JetBrainsMonoBold" }} left={ () => <List.Icon icon="lock" style={{ paddingLeft: 15}} />}>
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
              </ List.Accordion >
              <View style={{ padding: 5}} />
            </List.Section>
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
