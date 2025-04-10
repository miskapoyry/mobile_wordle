import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './src/context/AuthContext';
import { useAuth } from './src/hooks/useAuth';
import NoAuthNavigator from './src/navigators/NoAuthNavigator';
import AppNavigator from './src/navigators/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Loading from './src/components/Loading';

// Expo SplashScreen estämään typerä loginin flashaaminen
SplashScreen.preventAutoHideAsync();

const NavigationType = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <NoAuthNavigator />}
    </NavigationContainer>
  );
};

const AuthLoading = () => {
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);
  
  if (loading) {
    return <Loading />;
  }

  return <NavigationType />
}

export default function App() {
  return (
    <PaperProvider>
      <AuthContextProvider>
        <AuthLoading />
      </AuthContextProvider>
    </PaperProvider>
  )
}