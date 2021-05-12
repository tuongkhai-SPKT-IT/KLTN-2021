import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Fetch_Setting} from '../Redux/Actions/Setting.Action';
import BlockInfo from './BlockInfo';
import {
  ContactScreen,
  UserNameScreen,
  DateOfBirthScreen,
  PasswordChangeScreen,
} from './Screen';
const Stack = createStackNavigator();

export default function index({navigation}) {
  const dispatch = useDispatch();
  const Setting = useSelector((state) => state.Setting);
  useEffect(() => {
    dispatch(Fetch_Setting());
  }, []);
  return (
    <Stack.Navigator initialRouteName="mainSettings">
      <Stack.Screen
        name="mainSettings"
        options={{title: 'Settings'}}
        component={BlockInfo}
      />
      <Stack.Screen
        name="NameScreen"
        options={{title: 'Name'}}
        component={UserNameScreen}
      />
      <Stack.Screen
        name="ContactScreen"
        options={{title: 'Contact Infomation'}}
        component={ContactScreen}
      />

      <Stack.Screen
        name="DateOfBirthScreen"
        options={{title: 'Date of Birth'}}
        component={DateOfBirthScreen}
      />
      <Stack.Screen
        name="PasswordScreen"
        options={{title: 'Manage Account'}}
        component={PasswordChangeScreen}
      />
    </Stack.Navigator>
  );
}
