import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Get_Group_Chat} from '../Redux/Actions/Chat.Action';
import {ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SmallMessenger = ({navigation, route}) => {
  const _handleSearch = () => console.log('Searching');
  const chatReducer = useSelector((state) => state.ChatReducer);
  const dispatch = useDispatch();
  const getChatGroup = async () => {
    dispatch(Get_Group_Chat());
  };
  useEffect(() => {
    getChatGroup();
  }, []);
  const singleSmallMess = (message, i) => {
    const maxlimit = 40;
    var contentCurrent = message.isCurrent
      ? 'Bạn: '
      : message.friend_chat + ': ';
    contentCurrent += message.messRecent;
    return (
      <TouchableOpacity
        key={i}
        onPress={() =>
          navigation.navigate('DetailMessages', {
            chat_group_id: message.room,
            avatar: message.avatar,
            friend_chat: message.friend_chat,
          })
        }
        style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: 'black',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <Image
          style={{
            borderColor: 'black',
            width: 60,
            height: 60,
            borderRadius: 40,
            borderWidth: 1.5,
          }}
          source={{uri: message.avatar}}
        />
        <View style={{padding: 5, justifyContent: 'space-between'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {message.friend_chat}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="clip"
              style={{
                fontSize: 16,
              }}>
              {contentCurrent.length > maxlimit
                ? contentCurrent.substring(0, maxlimit - 3) + '...'
                : contentCurrent}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 16}}>{message.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // return <></>;
  if (chatReducer.ownChatGroup.length > 0) {
    const arrChatGroup = chatReducer.ownChatGroup;
    return (
      <SafeAreaView>
        <Appbar.Header style={{backgroundColor: '#fff'}}>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{justifyContent: 'center', marginRight: 10}}>
            <Ionicons name="ios-menu-sharp" size={30} />
          </TouchableOpacity>
          <Appbar.Content title="Messengers" />
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
        </Appbar.Header>

        <ScrollView>
          {arrChatGroup.length > 0 ? (
            arrChatGroup.map(singleSmallMess)
          ) : (
            <Text style={{padding: 20, fontSize: 16}}>
              You don't have any messages
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        width: 150,
        height: 150,
        zIndex: 999,
        position: 'absolute',
        top: '30%',
        alignSelf: 'center',
      }}>
      <ActivityIndicator size="large" color="black" />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          color: 'black',
        }}>
        Loading
      </Text>
    </View>
  );
};
export default SmallMessenger;
