import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StatsScreen from "../screens/StatsScreen";
import GameScreen from "../screens/GameScreen";
import InstructionsScreen from "../screens/InstructionsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Statistics" component={StatsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Instructions" component={InstructionsScreen} />
        </Stack.Navigator>
    );
}
