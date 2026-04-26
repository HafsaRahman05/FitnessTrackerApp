import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExercisesScreen from "../screens/ExercisesScreen";
import DetailScreen from "../screens/DetailScreen";
import CategoryScreen from "../screens/CategoryScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      
      {/* MAIN SCREEN */}
      <Stack.Screen 
        name="ExercisesMain" 
        component={ExercisesScreen} 
      />

      {/* CATEGORY SCREEN (THIS IS REQUIRED) */}
      <Stack.Screen 
        name="CategoryScreen" 
        component={CategoryScreen} 
      />

   

      {/* DETAIL */}
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
      />

    </Stack.Navigator>
  );
}