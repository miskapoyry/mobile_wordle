import { Button, Text, TextInput } from 'react-native-paper';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { useAuth } from '../hooks/useAuthContext';
import Loading from '../components/Loading';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRegister } from '../hooks/useRegister';
import LottieView from 'lottie-react-native';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    const { email, setEmail, username, setUsername, password, setPassword, passwordAgain, setPasswordAgain, loading, error, handleRegister } = useRegister();

    if (loading) return <Loading />;

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <LottieView
                        source={require("../assets/bgAnimation.json")}
                        autoPlay
                        loop
                        style={{ width: "100%", height: "100%", alignContent: "center", alignSelf: "center", position: "absolute", zIndex: -100 }}
                    />

                    <Text variant="displayMedium" style={styles.title}>REGISTER</Text>

                    <TextInput
                        label="Username"
                        onChangeText={setUsername}
                        mode="outlined"
                        left={<TextInput.Icon icon="account" color="#999999" />}
                        theme={{ colors: { primary: "white" } }}
                        maxLength={12}
                    />

                    <TextInput
                        label="Email"
                        onChangeText={setEmail}
                        mode="outlined"
                        left={<TextInput.Icon icon="email" color={"#999999"} />}
                        theme={{ colors: { primary: "white" } }}
                    />

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
                        secureTextEntry={!showPasswordAgain}
                        left={<TextInput.Icon icon="lock" color="#999999" />}
                        theme={{ colors: { primary: "white" } }}
                        right={
                            <TextInput.Icon
                                icon={showPasswordAgain ? "eye-off" : "eye"}
                                onPress={() => setShowPasswordAgain(prev => !prev)}
                            />
                        }
                    />
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="contained" onPress={handleRegister}>
                            Register Account
                        </Button>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{ marginTop: 10, color: "white" }}>
                                Already have an account?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen