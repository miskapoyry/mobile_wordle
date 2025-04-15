import { Button, Text, TextInput } from 'react-native-paper';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        if (password !== passwordAgain) {
            setError("The passwords need to match!");
            return;
        }
        try {
            setError(null);
            setLoading(true);
            await register(email, password, username);
            alert("Rekisteröinti onnistui!");
        } catch (error: any) {
            setError(error.message)
            alert(error)
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Loading />;

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <Text variant="displayMedium" style={styles.title}>Register</Text>

                    <TextInput label="Username" onChangeText={setUsername} mode="outlined" left={<TextInput.Icon icon="account" color="#999999" />} />

                    <TextInput label="Email" onChangeText={setEmail} mode="outlined" left={<TextInput.Icon icon="email" color={"#999999"} />} />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        secureTextEntry={!showPassword}
                        left={<TextInput.Icon icon="lock" color="#999999" />}
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
                        right={
                            <TextInput.Icon
                                icon={showPassword ? "eye-off" : "eye"}
                                onPress={() => setShowPassword(prev => !prev)}
                            />
                        }
                    />
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="contained" onPress={handleRegister}>
                            Register Account
                        </Button>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{ marginTop: 10, color: "blue" }}>
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