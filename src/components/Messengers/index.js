import React from 'react';
import SmallMessenger from './SmallMessenger';
import {createStackNavigator} from '@react-navigation/stack';
import DetailMessenger from './DetailMessenger';
const Stack = createStackNavigator();

const Messengers = ({navigation}) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="SmallMessengers"
          component={SmallMessenger}
          options={{title: 'Messengers'}}
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
