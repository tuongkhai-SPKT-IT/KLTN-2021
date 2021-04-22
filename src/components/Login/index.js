import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, View} from 'react-native';
import Login from './Login';
import Register1 from './Register1';
export default function index() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        component={Login}
        name="Login"
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Register"
        component={Register1}
      />
    </Stack.Navigator>
  );
}
