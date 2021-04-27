import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import ToolBar from '../ToolBar';
import ContentStatus from '../ContentStatus';
import {useDispatch, useSelector} from 'react-redux';
import {ReloadHome} from '../Redux/Actions/Home.Action';
import Modal from 'react-native-modal';
import {Searchbar, List, Appbar, Avatar} from 'react-native-paper';
import {GetUsers} from '../../services/user';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import OtherProfile from '../OtherProfile';
import HeaderApp from '../HeaderApp';
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
        <Stack.Screen
          name="OtherUser"
          options={{
            title: '',
            headerRight: (props) => (
              <>
                {/* <HeaderApp navigation={navigation} /> 
                  Thanh tìm kiếm, và tìm cách navigator được khi ở trang cá nhân cảu người khác
                */}
              </>
            ),
            headerRightContainerStyle: {},
          }}
          component={OtherProfile}
        />
      </Stack.Navigator>
    </>
  );
}
