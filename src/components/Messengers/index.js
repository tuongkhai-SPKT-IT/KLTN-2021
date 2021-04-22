import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SmallMessenger from './SmallMessenger';
import {createStackNavigator} from '@react-navigation/stack';
import DetailMessenger from './DetailMessenger';
import {Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();

const Messengers = ({navigation}) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="SmallMessengers" component={SmallMessenger} />
        <Stack.Screen name="DetailMessages" component={DetailMessenger} />
      </Stack.Navigator>
    </>
  );
};
export default Messengers;
const styles = StyleSheet.create({});
