// src/navigation/MainTabs.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import Log from "../screens/Log";
import History from "../screens/History";
import Goals from "../screens/Goals";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Log" component={Log} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Goals" component={Goals} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
