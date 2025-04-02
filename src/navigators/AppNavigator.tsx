import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StatsScreen from "../screens/StatsScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="game-controller" size={28} color="black" />
                ),
            }} />
            <Tab.Screen name="Statistics" component={StatsScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="stats-chart" size={28} color={"black"} />
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={28} color={"black"} />
                ),
            }} />
        </Tab.Navigator>
    )
}