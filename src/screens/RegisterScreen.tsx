import { Button, Text, TextInput } from 'react-native-paper';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { useAuth } from '../hooks/useAuth';

const RegisterScreen = () => {
    const {register} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        try {
            setError(null)
            await register(email, password);
            alert("Rekisteröinti onnistui!");
        } catch (error: any) {
            setError(error.message)
            alert(error)
        }
    }

    return (
        <SafeAreaView>
            <Text variant="displayMedium" style={styles.title}>Create Account</Text>

            <TextInput label="Email" onChangeText={setEmail} mode="outlined" />
            <TextInput label="Password" onChangeText={setPassword} mode="outlined" />
            <TextInput label="Retype password" onChangeText={setPasswordAgain} mode="outlined" />

            <Button mode="contained" onPress={handleRegister}>
                Create
            </Button>
        </SafeAreaView>
    )
}

export default RegisterScreen