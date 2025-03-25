import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={HomeScreen} options={{
          headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={30} color={"black"} />
          ),
        }} />
      </Navigator>
    </NavigationContainer>
  );
}