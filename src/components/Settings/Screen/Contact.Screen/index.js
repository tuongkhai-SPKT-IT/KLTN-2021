import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ContactScreen from './ContactScreen';
import PhoneScreen from './PhoneScreen';
import EmailScreen from './EmailScreen';
// import PasswordCheck from './PasswordCheck';
const Stack = createStackNavigator();
export default function index({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Contact">
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Phone"
        component={PhoneScreen}
        options={{headerShown: false}}
        // options={{title: 'Manage Phone'}}
      />
      <Stack.Screen
        name="Email"
        component={EmailScreen}
        options={{headerShown: false}}
        // options={{title: 'Manage Email'}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
