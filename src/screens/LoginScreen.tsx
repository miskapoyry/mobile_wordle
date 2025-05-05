import { Button, Text, TextInput } from 'react-native-paper';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NoAuthParams } from '../types/types';
import { Platform } from 'react-native';
import Loading from '../components/Loading';
import LottieView from 'lottie-react-native';
import { useLogin } from '../hooks/useLogin';

const LoginScreen = () => {

  type LoginNav = NativeStackNavigationProp<NoAuthParams, 'Login'>;

  const navigation = useNavigation<LoginNav>();
  const { email, setEmail, password, setPassword, loading, showPassword, setShowPassword, handleLogin} = useLogin();

  if (loading) {
    return <Loading />;
  };

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
          <Text variant="displayMedium" style={styles.title}>LOGIN</Text>
          <TextInput
            label="Email"
            onChangeText={setEmail}
            mode="outlined"
            left={<TextInput.Icon icon="email" color={"#999999"} />}
            autoCorrect={false}
            theme={{ colors: { primary: "white" } }}
          />
          <TextInput
            key={showPassword ? 'visible' : 'hidden'}
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            autoCorrect={false}
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

          <View style={styles.buttonContainer}>
            <Button style={styles.button} mode="contained" onPress={handleLogin}>
              Login
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ marginTop: 10, color: "white" }}>
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