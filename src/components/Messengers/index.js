import React, {useEffect, useState} from 'react';
import SmallMessenger from './SmallMessenger';
import {createStackNavigator} from '@react-navigation/stack';
import DetailMessenger from './DetailMessenger';
import * as keys from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../API/API';
import {SOCKET} from '../../config';
const Stack = createStackNavigator();

const Messengers = ({navigation, route}) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="SmallMessengers"
          initialParams={route.params.tabPress ? {reload: true} : null}
          component={SmallMessenger}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailMessages"
          component={DetailMessenger}
          options={{
            headerShown: false,
          }}
          getId={({params}) => params.id}
        />
      </Stack.Navigator>
    </>
  );
};
export default Messengers;
