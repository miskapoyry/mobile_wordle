import { Button, Text, TextInput } from 'react-native-paper';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { useAuth } from '../hooks/useAuth';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NoAuthParams } from '../types/types';
import { Platform } from 'react-native';

const LoginScreen = () => {
  
  type LoginNav = NativeStackNavigationProp<NoAuthParams, 'Login'>;

  const { logIn } = useAuth();
  const navigation = useNavigation<LoginNav>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null)
      await logIn(email, password);
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Text variant="displayMedium" style={styles.title}>Login</Text>
          <TextInput label="Email" onChangeText={setEmail} mode="outlined" left={<TextInput.Icon icon="email" color={"#999999"} />} />
          <TextInput
            key={showPassword ? 'visible' : 'hidden'}
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

          <View style={styles.buttonContainer}>
            <Button style={styles.button} mode="contained" onPress={handleLogin}>
              Login
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ marginTop: 10, color: "blue" }}>
                Don't have an account yet?
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen