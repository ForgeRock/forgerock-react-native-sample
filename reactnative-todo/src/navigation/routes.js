/*
 * forgerock-react-native-sample
 *
 * routes.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/home';
import Login from '../screens/login';
import Logout from '../screens/logout';
import Register from '../screens/register';
import Todos from '../screens/todos';

const Tab = createBottomTabNavigator();
const tabBarOptions = {
  tabBarLabelStyle: {
    fontSize: 14,
  },
  tabBarStyle: { height: 80, paddingTop: 4 },
};

export function UnauthenticatedRoutes() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={Login}
        name="Sign In"
        options={{
          tabBarLabel: 'Sign In',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="key" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={Register}
        name="Sign Up"
        options={{
          tabBarLabel: 'Sign Up',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-plus"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AuthenticatedRoutes() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('Todos');
  });
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={Todos}
        name="Todos"
        options={{
          tabBarLabel: 'Todos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="check-all"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        component={Logout}
        name="Sign Out"
        options={{
          tabBarLabel: 'Sign Out',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
