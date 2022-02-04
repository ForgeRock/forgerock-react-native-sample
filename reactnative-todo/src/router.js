/*
 * forgerock-react-native-sample
 *
 * index.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/home';
import Login from './screens/login';
import Logout from './screens/logout';

const Tab = createBottomTabNavigator();
const tabBarOptions = {
  tabBarLabelStyle: {
    fontSize: 12,
  },
  tabBarStyle: { height: 85, paddingTop: 5 },
};

import { AppContext } from './global-state';

export default function Navigation() {
  // Used for getting the global authentication state
  const [{ authenticated }] = useContext(AppContext);

  if (!authenticated) {
    return (
      <NavigationContainer>
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
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
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
            component={Logout}
            name="Sign Out"
            options={{
              tabBarLabel: 'Sign Out',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="logout"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
