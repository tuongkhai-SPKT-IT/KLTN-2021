import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, Keyboard, TouchableOpacity} from 'react-native';
import Message from './Message';

const Messages = (props) => {
  // const props.messagesScroll = useRef();
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    if (props.messagesScroll.current) {
    }
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
    if (props.messagesScroll.current) {
      props.messagesScroll.current.scrollToEnd();
    }
  }, [keyboardStatus]);
  useEffect(() => {
    if (props.messages) {
      if (props.messagesScroll.current) {
        props.messagesScroll.current.scrollToEnd();
      }
    }
  }, [props.messages]);
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 150;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <>
      <ScrollView
        onContentSizeChange={() => {
          props.messagesScroll.current.scrollToEnd();
        }}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            props.setVisibleScroll(false);
          } else {
            props.setVisibleScroll(true);
          }
        }}
        ref={props.messagesScroll}
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
