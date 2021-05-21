import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import API from '../../API/API';
import HeaderMessenger from './HeaderMessenger';
import Messages from './Messages';
import InputMessage from './Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../../Constants';
import {SOCKET} from '../../../config';
// import {Keyboard} from 'react-native';

const DetailMessenger = ({route, navigation}) => {
  const {chat_group_id, avatar, friend_chat} = route.params;
  const [messages, setMessages] = useState([]);
  const [visibleScroll, setVisibleScroll] = useState(false);
  const messagesScroll = useRef();
  useEffect(() => {
    const joinRoomChat = async () => {
      const name = await AsyncStorage.getItem(keys.User_ProfLink);
      const room = route.params.chat_group_id;
      if (room) {
        SOCKET.emit('join', {name, room}, (err) => {
          if (err) alert(err);
        });
      }
    };
    joinRoomChat();
  }, [route.params]);

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
          alert(res.data.message);
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
  const sendMessage = async () => {
    if (message.trim() === '') return;
    // console.log(message.trimEnd());
    // return;
    if (message) {
      const userAvatar = await AsyncStorage.getItem(keys.User_Avatar);
      SOCKET.emit('sendMessage', message.trimEnd(), selfName, userAvatar, () => {
        setMessage('');
      });
    }
    if (message) {
      const token = await AsyncStorage.getItem(keys.User_Token);
      const route = 'chat/save-message';
      const param = {
        chat_group_id,
        content: message.trimEnd(),
      };
      const header = {
        Authorization: 'bearer' + token,
      };
      const api = new API();

      api.onCallAPI('post', route, {}, param, header).then((res) => {
        if (res.data.error_code !== 0) {
          alert(res.data.message);
        }
      });
    }
  };
  useEffect(() => {
    SOCKET.on('message', async (message) => {
      console.log(message.avatar);
      const messageText = {
        user: message.user,
        text: message.text,
        avatar: message.avatar,
        time: message.time,
      };
      setMessages((messages) => [...messages, messageText]);
    });
  }, []);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    if (messagesScroll.current) {
      messagesScroll.current.scrollToEnd();
    }
  }, [keyboardStatus]);
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
      <Messages
        style={{}}
        keyboardStatus={keyboardStatus}
        setKeyboardStatus={setKeyboardStatus}
        messagesScroll={messagesScroll}
        messages={messages}
        setVisibleScroll={setVisibleScroll}
        selfName={selfName}
      />
      <InputMessage
        style={{}}
        visibleScroll={visibleScroll}
        sendMessage={sendMessage}
        setMessage={setMessage}
        messagesScroll={messagesScroll}
        message={message}
      />
    </View>
  );
};
export default DetailMessenger;
