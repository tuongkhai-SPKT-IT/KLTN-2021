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
  // console.log(route.params);
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="SmallMessengers"
          // initialParams={route.params.tabPress ? {reload: true} : null}

          options={{
            headerShown: false,
          }}>
          {(props) => <SmallMessenger reset={route.params.resetTime} />}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
};
export default Messengers;
