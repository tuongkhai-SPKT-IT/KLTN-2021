import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, Keyboard} from 'react-native';
import Message from './Message';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../../Constants';
const Messages = (props) => {
  // const userInfo = useSelector((state) => state.UserInfo);
  const messagesScroll = useRef();
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);
  useEffect(() => {
    if (keyboardStatus) {
      if (messagesScroll.current) messagesScroll.current.scrollToEnd();
    }
  }, [keyboardStatus]);
  useEffect(() => {
    if (props.messages) {
      if (messagesScroll.current) {
        // console.log(messagesScroll.current);
        // messagesScroll.current.scrollTop = messagesScroll.current.scrollHeight;
        messagesScroll.current.scrollToEnd();
      }
    }
  }, [props.messages]);
  return (
    <ScrollView ref={messagesScroll} style={[props.style, {}]}>
      {props.messages.map((message, i) => {
        return (
          <View key={i}>
            <Message message={message} name={props.selfName} />
          </View>
        );
      })}
    </ScrollView>
  );
};
export default Messages;
