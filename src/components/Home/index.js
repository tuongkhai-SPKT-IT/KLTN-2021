import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppBar from '../AppBar';
import {SafeAreaView} from 'react-navigation';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../Profile/';
import Notifications from '../Notifications';
import Messengers from '../Messengers';
import OtherProfile from '../OtherProfile';
import {SOCKET} from '../../config';
import {showMessage} from 'react-native-flash-message';
import {Avatar} from 'react-native-paper';
import {Clear_List_Chat, Get_Group_Chat} from '../Redux/Actions/Chat.Action';
import {createStackNavigator} from '@react-navigation/stack';
import DetailMessenger from '../Messengers/DetailMessenger';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Settings from '../Settings';
import {
  Get_IntroUser,
  Get_StatusProfile,
} from '../Redux/Actions/ProfileUser.Action';
import DrawerContent from './DrawerContent';
import {useHistory} from 'react-router';
import UpStatusScreen from '../ToolBar/UpStatusScreen';
import {clear_Home, ReloadHome} from '../Redux/Actions/Home.Action';
import {Fetch_Notification} from '../Redux/Actions/Notification.Action';
import {useNavigation} from '@react-navigation/core';
import StatusScreen from './Status.Screen';

LogBox.ignoreLogs(['Reanimated 2']);
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Home = () => {
  const HomeTabs = () => {
    const [tabColor, setTabColor] = useState('#65676B');
    const [activeHomeTab, setActiveHomeTab] = useState(true);
    const [activeNotiTab, setActiveNotiTab] = useState(false);
    const [activeProfileTab, setActiveProfileTab] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const storeState = useSelector((state) => state.HomePage);

    const notificationTitle = (data) => {
      return (
        <TouchableOpacity
          onPress={() => console.log(data)}
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
        </TouchableOpacity>
      );
    };
    const history = useHistory();

    SOCKET.on('server-popup-notification', (data) => {
      showMessage({
        message: notificationTitle({
          avatar: data.current_user_avatar,
          content: data.content,
          moment: data.moment,
          StatusId: data.status_id,
        }),
        type: 'default',
        color: 'black',
      });
    });
    return (
      <Tab.Navigator
        activeColor="#1877F2"
        initialRouteName="Home"
        inactiveColor="#65676B"
        barStyle={{backgroundColor: '#ffff'}}
        shifting={true}>
        <Tab.Screen
          name="Home"
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              dispatch(ReloadHome());
            },
          })}
          options={{
            tabBarIcon: () => {
              return (
                <MaterialCommunityIcons name="home" color="#1877F2" size={26} />
              );
            },
          }}
          // component={Settings}
          component={AppBar}
        />
        <Tab.Screen
          name="Notifications"
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              dispatch(Fetch_Notification());
            },
          })}
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
              // e.preventDefault();
              dispatch(Clear_List_Chat());
              dispatch(Get_Group_Chat());
              // navigation.navigate('Messengers', {
              //   screen: 'SmallMessengers',
              //   resetTime: true,
              // });
            },
          })}
          keyboardHidesTabBar={true}
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
          listeners={({navigation, route}) => ({
            tabPress: (e) => {
              dispatch(Get_StatusProfile());
              dispatch(Get_IntroUser());
            },
          })}
          options={{
            tabBarIcon: () => (
              <Ionicons
                name="person-circle-outline"
                color="#1877F2"
                size={26}
              />
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    );
  };

  const StackNavigator = () => {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          // component={Settings}
          component={HomeTabs}
        />
        <Stack.Screen
          name="OtherUser"
          options={{
            headerShown: false,
            // cái chỗ thanh tìm kiếm khi ở screen của người khác
            //  thì viết vào header screen ở trong other Profile, custom lại cái header
          }}
          component={OtherProfile}
        />
        <Stack.Screen
          name="DetailMessages"
          component={DetailMessenger}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="subToolBar"
          component={UpStatusScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="statusScreen"
          component={StatusScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };
  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="test2" component={StackNavigator} />
        </Drawer.Navigator>
      </SafeAreaView>
    </>
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
