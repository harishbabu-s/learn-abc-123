import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { enableScreens } from "react-native-screens";
// import "react-native-gesture-handler";

// enableScreens();

import HomeScreen from "./screens/HomeScreen";
import AlphabetsScreen from "./screens/Alphabets";
import NumbersScreen from "./screens/Numbers";
import CalendarScreen from "./screens/Calendar";
import TempScreen from "./screens/newTemp";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Alphabets" component={AlphabetsScreen} />
        <Stack.Screen name="Numbers" component={NumbersScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="temp" component={TempScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
