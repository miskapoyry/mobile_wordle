import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={30} color={"black"} />
                ),
            }} />
        </Tab.Navigator>
    )
}