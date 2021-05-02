import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  ScrollView,
  StatusBar,
} from 'react-native';
import {NativeRouter, Route, Link, useHistory} from 'react-router-native';
import {useDispatch, useSelector} from 'react-redux';
import AppBar from '../AppBar';
import {SafeAreaView} from 'react-navigation';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profile from '../Profile/';
import Notifications from '../Notifications';
import Messengers from '../Messengers';
import OtherProfile from '../OtherProfile';
import {SOCKET} from '../../config';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Avatar} from 'react-native-paper';
import {Clear_List_Chat, Get_Group_Chat} from '../Redux/Actions/Chat.Action';

const Tab = createMaterialBottomTabNavigator();

const Home = () => {
  const [tabColor, setTabColor] = useState('#65676B');
  const [activeHomeTab, setActiveHomeTab] = useState(true);
  const [activeNotiTab, setActiveNotiTab] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState(false);

  const history = useHistory();
  useEffect(() => {}, []);
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () => {
  //     history.goBack();
  //     return true;
  //   });
  // }, []);

  const dispatch = useDispatch();
  const storeState = useSelector((state) => state.HomePage);

  const notificationTitle = (data) => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{justifyContent: 'space-around', flex: 1}}>
          <Avatar.Image size={35} source={{uri: data.avatar}} />
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            flex: 1,
            marginHorizontal: 5,
          }}>
          <Text>{data.content}</Text>
          <Text>{data.moment}</Text>
        </View>
      </View>
    );
  };

  SOCKET.on('server-popup-notification', (data) => {
    showMessage({
      message: notificationTitle({
        avatar: data.current_user_avatar,
        content: data.content,
        moment: data.moment,
      }),
      type: 'default',
      color: 'black',
    });
  });

  return (
    <NativeRouter>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Tab.Navigator
          activeColor="#1877F2"
          inactiveColor="#65676B"
          barStyle={{backgroundColor: '#ffff'}}
          shifting={true}>
          <Tab.Screen
            name="Home"
            options={{
              tabBarIcon: () => {
                return (
                  <MaterialCommunityIcons
                    name="home"
                    color="#1877F2"
                    size={26}
                  />
                );
              },
            }}
            component={AppBar}
          />
          <Tab.Screen
            name="Notifications"
            options={{
              tabBarIcon: () => {
                return <Entypo name="bell" color="#1877F2" size={26} />;
              },
            }}
            component={Notifications}
          />
          <Tab.Screen
            name="Messengers"
            listeners={({navigation, route}) => ({
              tabPress: (e) => {
                e.preventDefault();
                dispatch(Clear_List_Chat());
                dispatch(Get_Group_Chat());
                navigation.navigate('Messengers', {
                  screen: 'SmallMessengers',
                });
              },
            })}
            options={{
              tabBarIcon: () => {
                return (
                  <MaterialCommunityIcons
                    name="facebook-messenger"
                    color="#1877F2"
                    size={26}
                  />
                );
              },
            }}
            component={Messengers}
          />
          <Tab.Screen
            name="Profile"
            options={{
              tabBarIcon: () => {
                return (
                  <Ionicons
                    name="person-circle-outline"
                    color="#1877F2"
                    size={26}
                  />
                );
              },
            }}
            component={Profile}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NativeRouter>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
});
export default Home;
