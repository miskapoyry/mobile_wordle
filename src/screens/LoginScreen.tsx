import { Button, Text, TextInput } from 'react-native-paper';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { useAuth } from '../hooks/useAuth';

const LoginScreen = () => {

  const { logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null)
      await logIn(email, password);
      alert("Kirjautuminen onnistui!");
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <SafeAreaView>
      <Text variant="displayMedium" style={styles.title}>Login</Text>

      <TextInput label="Email" onChangeText={setEmail} mode="outlined" />
      <TextInput label="Password" onChangeText={setPassword} mode="outlined" />

      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </SafeAreaView>
  )
}

export default LoginScreen