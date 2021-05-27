import React from 'react';
import SmallMessenger from './SmallMessenger';
import {createStackNavigator} from '@react-navigation/stack';

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
          }}
          component={SmallMessenger}
        />
      </Stack.Navigator>
    </>
  );
};
export default Messengers;
