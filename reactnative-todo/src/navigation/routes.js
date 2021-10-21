/*
 * forgerock-react-native-sample
 *
 * routes.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext, useEffect } from 'react';
import { NativeModules } from 'react-native';
import { Home, Login, Todos, Register } from '../screens';
import { AppContext } from '../global-state';
import { Loading } from '../components/utilities/loading';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const { FRAuthSampleBridge } = NativeModules;

function Logout() {
  const [{}, { setAuthentication }] = useContext(AppContext);
  useEffect(() => {
    async function logout() {
      await FRAuthSampleBridge.logout();
      setAuthentication(false);
    }
    logout();
  }, []);

  return <Loading />;
}

const UnauthenticatedRoutes = () => (
  <Tab.Navigator initialRoute="Home">
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Sign In"
      component={Login}
      options={{
        tabBarLabel: 'Sign In',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="key" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Sign Up"
      component={Register}
      options={{
        tabBarLabel: 'Sign Up',
        tabBarLabelStyle: {
          fontSize: 12,
        },
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

const AuthenticatedRoutes = () => (
  <Tab.Navigator initialRoute="Home">
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Todos"
      component={Todos}
      options={{
        tabBarLabel: 'Todos',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="check-all" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Sign Out"
      component={Logout}
      options={{
        tabBarLabel: 'Sign Out',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="logout" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export {
  AuthenticatedRoutes as TodoRoutes,
  UnauthenticatedRoutes as LoginRoutes,
};
