import React, {useEffect, useState} from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import OtherProfile from '../OtherProfile';
import HomePage from './HomePage';

const Stack = createStackNavigator();

export default function AppBar({navigation}) {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          options={{
            headerShown: false,
          }}
          component={HomePage}
        />
      </Stack.Navigator>
    </>
  );
}
