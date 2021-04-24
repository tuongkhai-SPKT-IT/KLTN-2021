import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Avatar, Button, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import API from '../API/API';
import * as keys from '../Constants';
const SmallMessenger = ({navigation}) => {
  const userInfo = useSelector((state) => state.UserInfo);
  const [arrChatGroup, setArrChatGroup] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(keys.User_Token).then((val) => {
      if (val) {
        const route = 'chat/list-messages';
        const param = {
          token: val,
        };
        const header = {
          Authorization: 'bearer' + val,
        };
        const api = new API();
        api.onCallAPI('get', route, {}, param, header).then((res) => {
          if (res.data.error_code !== 0) {
            window.alert(res.data.message);
          } else {
            if (res.data.data) {
              // this.setState({friendAddArray: res.data.data});
              setArrChatGroup(res.data.data);
            }
          }
        });
      }
    });
  }, []);

  // const [widthMess, setWidthMess] = useState(0);
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
          navigation.push('DetailMessages', {
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
  return (
    <View style={{paddingTop: 5}}>
      <ScrollView>
        {arrChatGroup.length > 0 ? (
          arrChatGroup.map(singleSmallMess)
        ) : (
          <Text style={{padding: 20, fontSize: 16}}>
            You haven't any messages
          </Text>
        )}
      </ScrollView>
    </View>
  );
};
export default SmallMessenger;
