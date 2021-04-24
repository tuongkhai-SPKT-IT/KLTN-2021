import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import API from '../../API/API';
import HeaderMessenger from './HeaderMessenger';
import Messages from './Messages';
import InputMessage from './Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../../Constants';
import {Keyboard} from 'react-native';

const DetailMessenger = ({route, navigation}) => {
  const {chat_group_id, avatar, friend_chat} = route.params;
  const [messages, setMessages] = useState([]);
  let userToken = '';
  useEffect(() => {
    AsyncStorage.getItem(keys.User_Token).then((val) => {
      if (val) userToken = val;
    });
  }, []);
  const [selfName, setSelfName] = useState('');
  useEffect(() => {
    AsyncStorage.getItem(keys.User_ProfLink).then((val) => {
      if (val) setSelfName(val);
    });
  }, []);

  useEffect(() => {
    if (chat_group_id) {
      const route = 'chat/list-messages-in-group';
      const param = {chat_group_id};
      const api = new API();
      api.onCallAPI('get', route, {}, param, {}).then((res) => {
        if (res.data.error_code !== 0) {
          window.alert(res.data.message);
        } else {
          if (res.data.data) {
            const messArr = [];
            res.data.data.map((mess) => {
              const messageText = {
                user: mess.owner,
                text: mess.contents,
                avatar: mess.user_avatar,
              };
              messArr.push(messageText);
              return 0;
            });
            setMessages(messArr);
          }
        }
      });
    }
  }, [chat_group_id]);
  // if (messages.length > 0) console.log(messages);
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    if (message.trim() === '') return;
    if (message) {
      // socket.emit('sendMessage', message, selfName, () => setMessage(''));
      const messageAfterInput = [...messages];
      messageAfterInput.push({user: selfName, text: message});
      setMessages(messageAfterInput);
      setMessage('');
    }

    // if (message) {
    //   var route = 'chat/save-message';
    //   if (message.trim() === '') {
    //     return;
    //   }
    //   var param = {
    //     chat_group_id: room,
    //     content: message,
    //   };
    //   var header = {
    //     Authorization: 'bearer' + localStorage.getItem('UserToken'),
    //   };
    //   var api = new API();

    //   api.onCallAPI('post', route, {}, param, header).then((res) => {
    //     if (res.data.error_code !== 0) {
    //       window.alert(res.data.message);
    //     } else {
    //       if (res.data.data) {
    //         // console.log(res.data.data);
    //       }
    //     }
    //   });
    // }
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <HeaderMessenger
        style={{}}
        navigation={navigation}
        avatar={avatar}
        name={friend_chat}
      />
      <Messages style={{}} messages={messages} selfName={selfName} />
      <InputMessage
        style={{}}
        sendMessage={sendMessage}
        setMessage={setMessage}
        message={message}
      />
    </View>
  );
};
export default DetailMessenger;
