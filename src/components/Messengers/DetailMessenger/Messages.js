import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, Keyboard, TouchableOpacity} from 'react-native';
import Message from './Message';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../../Constants';
import {Button} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
    if (props.messages) {
      if (messagesScroll.current) {
        messagesScroll.current.scrollToEnd();
      }
    }
  }, [props.messages]);
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 100;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <>
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            props.setVisibleScroll(false);
          } else {
            props.setVisibleScroll(true);
          }
        }}
        ref={messagesScroll}
        style={[props.style, {position: 'relative'}]}>
        <View>
          {props.messages.map((message, i) => {
            return (
              <View key={i}>
                <Message message={message} name={props.selfName} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};
export default Messages;
