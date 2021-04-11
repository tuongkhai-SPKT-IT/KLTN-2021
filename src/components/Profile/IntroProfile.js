import React from 'react';
import {View, Text} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
export default function IntroProfile() {
  const ProfileInfo = useSelector((state) => state.ProfileInfo);

  return (
    <>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <Fontisto name="email" size={25} color="black" />
        <Text style={{flex: 1, fontSize: 20, fontWeight: '900', marginLeft: 5}}>
          {ProfileInfo.introUser.email}
        </Text>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <Entypo name="old-phone" size={25} color="black" />
        <Text style={{flex: 1, fontSize: 20, fontWeight: '900', marginLeft: 5}}>
          {ProfileInfo.introUser.phone}
        </Text>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <FontAwesome5 name="birthday-cake" size={25} color="black" />
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '900',
            marginLeft: 5,
            textAlignVertical: 'center',
          }}>
          {ProfileInfo.introUser.dOb}
        </Text>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <Ionicons name="male-female-outline" size={25} color="black" />
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '900',
            marginLeft: 5,
            textAlignVertical: 'center',
          }}>
          {ProfileInfo.introUser.sex === true && 'Nam'}
          {ProfileInfo.introUser.sex === false && 'Nữ'}
        </Text>
      </View>
    </>
  );
}
