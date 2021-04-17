import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';
import {Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IntroProfile = ({navigation}) => {
  const OtherProfile = useSelector((state) => state.OtherProfile);
  const [introUser, setIntroUser] = useState({});
  useEffect(() => {
    if (OtherProfile.intro) setIntroUser(OtherProfile.intro);
  }, [OtherProfile.intro]);
  const blockFriend = (friend, i) => {
    // console.log(friend);
    // if (introUser.friend_array)
    return (
      <Pressable
        onPress={() => {
          alert('click');
        }}
        key={i}
        style={{width: 100}}>
        <Image
          source={{uri: friend.avatar}}
          style={{width: 100, height: 100, borderRadius: 15}}
        />
        <Text h4 h4Style={{fontSize: 15}} style={{textAlign: 'center'}}>
          {friend.user_name}
        </Text>
      </Pressable>
    );
    //else return <></>;
  };

  return (
    <View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <Fontisto name="email" size={25} color="black" />
        <Text style={{flex: 1, fontSize: 20, fontWeight: '900', marginLeft: 5}}>
          {introUser.email}
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
          {introUser.phone}
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
          {introUser.dOb}
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
          {introUser.sex === true && 'Nam'}
          {introUser.sex === false && 'Nữ'}
        </Text>
      </View>
      <View style={{borderTopWidth: 0.8}}>
        <Text h3 h3Style={{padding: 15, paddingVertical: 0}}>
          Bạn bè
        </Text>
        {introUser.friend_array ? (
          <Text
            style={{
              fontSize: 20,
              color: 'gray',
              opacity: 0.99,
              paddingLeft: 15,
            }}>
            {introUser.friend_array.length > 1
              ? introUser.friend_array.length + ' friends'
              : introUser.friend_array.length + ' friend'}
          </Text>
        ) : (
          <></>
        )}
        <View
          style={{
            margin: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {introUser.friend_array ? (
            introUser.friend_array.map(blockFriend)
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};
export default IntroProfile;
