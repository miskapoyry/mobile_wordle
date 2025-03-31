import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './src/context/AuthContext';
import { useAuth } from './src/hooks/useAuth';
import NoAuthNavigator from './src/navigators/NoAuthNavigator';
import AppNavigator from './src/navigators/AppNavigator';

const NavigationType = () => {
  const { user } = useAuth();

  return(
    <NavigationContainer>
      {user ? <AppNavigator /> : <NoAuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return(
    <AuthContextProvider>
      <NavigationType />
    </AuthContextProvider>
  )
}