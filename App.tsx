import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './src/context/AuthContext';
import { useAuth } from './src/hooks/useAuthContext';
import NoAuthNavigator from './src/navigators/NoAuthNavigator';
import AppNavigator from './src/navigators/AppNavigator';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Loading from './src/components/Loading';
import { StatsContextProvider } from './src/context/StatsContext';
import { useFonts } from 'expo-font';

// Expo SplashScreen estämään typerä loginin flashaaminen
SplashScreen.preventAutoHideAsync();

const NavigationType = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <StatsContextProvider>
          <AppNavigator />
        </StatsContextProvider>
      ) : <NoAuthNavigator />}
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

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'white',
    primary: '#00BFFF',
    secondary: '#ffffff',
    onSurface: '#ffffff',
    background: '#000000',
  },
  fonts: {
    displayLarge: { fontFamily: "JetBrainsMonoBold" },
    displayMedium: { fontFamily: "JetBrainsMonoBold" },
    displaySmall: { fontFamily: "JetBrainsMonoBold" },
    headlineLarge: { fontFamily: "JetBrainsMonoRegular" },
    headlineMedium: { fontFamily: "JetBrainsMonoRegular" },
    headlineSmall: { fontFamily: "JetBrainsMonoRegular" },
    titleLarge: { fontFamily: "JetBrainsMonoRegular" },
    titleMedium: { fontFamily: "JetBrainsMonoRegular" },
    titleSmall: { fontFamily: "JetBrainsMonoRegular" },
    labelLarge: { fontFamily: "JetBrainsMonoRegular" },
    labelMedium: { fontFamily: "JetBrainsMonoRegular" },
    labelSmall: { fontFamily: "JetBrainsMonoRegular" },
    bodyLarge: { fontFamily: "JetBrainsMonoRegular" },
    bodyMedium: { fontFamily: "JetBrainsMonoRegular" },
    bodySmall: { fontFamily: "JetBrainsMonoRegular" },
  }
}

export default function App() {

  const [loaded] = useFonts({
    "JetBrainsMonoBold": require("./src/assets/fonts/JetBrainsMono-Bold.ttf"),
    "JetBrainsMonoMedium": require("./src/assets/fonts/JetBrainsMono-Medium.ttf"),
    "JetBrainsMonoRegular": require("./src/assets/fonts/JetBrainsMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContextProvider>
        <AuthLoading />
      </AuthContextProvider>
    </PaperProvider>
  )
}