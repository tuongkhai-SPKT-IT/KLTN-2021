import React, {useEffect} from 'react';
import SmallMessenger from './SmallMessenger';
import {createStackNavigator} from '@react-navigation/stack';
import DetailMessenger from './DetailMessenger';
import {SOCKET} from '../../config';
const Stack = createStackNavigator();

const Messengers = ({navigation, route}) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="SmallMessengers"
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
        />
      </Stack.Navigator>
    </>
  );
};
export default Messengers;
