import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {View, ScrollView, Pressable} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import API from '../API/API';
const SmallMessenger = ({navigation}) => {
  const userInfo = useSelector((state) => state.UserInfo);
  const [arrChatGroup, setArrChatGroup] = useState([]);
  const userToken = useRef(null);
  if (userInfo.informtion)
    userToken.current =
      // userInfo.information[3].value;
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLmZhY2Vib29rLWtsdG4uYWxwaGF3b2xmLmlvL2FwaS91c2VyL2xvZy1pbiIsImlhdCI6MTYxODkwNDY2NiwibmJmIjoxNjE4OTA0NjY2LCJqdGkiOiJ2SkdjdzVxVWI3NUs5VE0yIiwic3ViIjoiNjA1MzM4M2ZmY2Y5ZTk2YzJlMjI5OGM1IiwicHJ2IjoiMzg1MmIyMTg1MDEzNTZkMzNjNjEyOTJiNzVmMmFkNzU3Mjk4NmExNyIsInVzZXJfbmFtZSI6Ilx1MDExMFx1MWVkNyBUXHUwMWIwXHUxZWRkbmcgS2hcdTFlYTNpIiwidXNlcl9pZCI6IjYwNTMzODNmZmNmOWU5NmMyZTIyOThjNCIsInVzZXJfZnVsbF9uYW1lIjoiXHUwMTEwXHUxZWQ3IFRcdTAxYjBcdTFlZGRuZyBLaFx1MWVhM2kiLCJwaG9uZSI6IjA1ODU1MTE5NTUiLCJlbWFpbCI6ImRvdHVvbmdraGFpMTkxOTk5QGdtYWlsLmNvbSIsInNleCI6IjEifQ.s5obfQoJaTQUEWIlevDwo0j8hzdM5eQK66pX0xGCAoM';
  useEffect(() => {
    if (userToken.current) {
      const route = 'chat/list-messages';
      const param = {
        token: userToken.current,
      };
      const header = {
        Authorization: 'bearer' + userToken.current,
      };
      const api = new API();
      api.onCallAPI('get', route, {}, param, header).then((res) => {
        if (res.data.error_code !== 0) {
          window.alert(res.data.message);
        } else {
          if (res.data.data) {
            // this.setState({friendAddArray: res.data.data});
            setArrChatGroup(res.data.data);
            console.log(res.data.data);
          }
        }
      });
    }
  }, [userToken]);
  // const [widthMess, setWidthMess] = useState(0);

  const singleSmallMess = (message, i) => {
    console.log(message);
    return (
      <Pressable
        onPress={() => navigation.push('DetailMessages')}
        key={i}
        style={{flex: 1, flexDirection: 'row', padding: 10}}>
        <Avatar
          avatarStyle={{}}
          containerStyle={{backgroundColor: '#BDBDBD'}}
          onLongPress={() => alert('onLongPress')}
          onPress={() => alert('onPress')}
          rounded
          size="large"
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
              {message.isCurrent ? 'Bạn: ' : message.friend_chat + ': '}
              {message.messRecent}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 16}}>{message.time}</Text>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{paddingTop: 5}}>
      <ScrollView>
        {arrChatGroup.length > 0 ? (
          arrChatGroup.map(singleSmallMess)
        ) : (
          <Text
            // onPress={() => navigation.push('DetailMessages')}
            style={{padding: 20, fontSize: 16}}>
            You haven't any messages
          </Text>
        )}
      </ScrollView>
    </View>
  );
};
export default SmallMessenger;
