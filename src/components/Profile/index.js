import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  ScrollView,
  DevSettings,
  Pressable,
} from 'react-native';

import OtherProfile from '../OtherProfile';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import friendsList from './friendsList';
import HeaderApp from '../HeaderApp';
import MainProfile from './MainProfile';
const Stack = createStackNavigator();
const Profile = ({navigation}) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileUser"
          options={{
            headerShown: false,
          }}
          component={MainProfile}
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
        <Stack.Screen
          name="fullfriends"
          options={{
            title: 'Friends',
          }}
          component={friendsList}
        />
      </Stack.Navigator>
    </>
  );
};
export default Profile;
const styles = StyleSheet.create({});
// const srcData = [
//   {
//     caption: '1 hình 1 video',
//     created_at: [],
//     file_uploaded: [
//       {
//         type: 'image',
//         uri:
//           'http://api.facebook-kltn.alphawolf.io/image/Y0cF4YV8sjxRsixidrn6YuvwCnkhRN.jpg',
//       },
//       {
//         type: 'video',
//         uri:
//           'http://api.facebook-kltn.alphawolf.io/video/vqXpEe8Vm5UBMKAB2fmxZASICyzgqS.mp4',
//       },
//     ],
//     id: '606ef522e1f7bd56b33d4708',
//     like_number: 0,
//     liked: false,
//     no_sign_profile: 'khaidev.chatheader.09.01',
//     posted_time: '08/04/2021 07:20:50 PM',
//     sex: '1',
//     status_setting: 'pub',
//     user_avatar: 'http://api.facebook-kltn.alphawolf.io/image/default.jpg',
//     user_id: '606c1c6af2cda67fc337dc73',
//     user_name: 'Khải dev chat header',
//     who_liked_status: [],
//   },
// ];
