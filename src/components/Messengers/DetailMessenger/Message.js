import React from 'react';
import {View, Image, Text} from 'react-native';
import {Avatar} from 'react-native-paper';

const Message = (props) => {
  let isSentByCurrentUser = false;
  const {user} = props.message;
  //   const trimmedName = 'cá rô';
  const trimmedName = props.name.trim().toLowerCase();
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  //   return <></>;

  return isSentByCurrentUser ? (
    <View
      style={{
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <View style={{width: '20%'}} />
      <View
        style={{
          backgroundColor: 'rgb(110, 223, 0)',
          padding: 10,
          borderRadius: 20,
          marginLeft: 10,
          maxWidth: '80%',
        }}>
        <Text style={{}}>{props.message.text}</Text>
      </View>
    </View>
  ) : (
    <View
      style={{
        padding: 10,
        width: '80%',
        flexDirection: 'row',
      }}>
      <Image
        style={{width: 40, height: 40, borderRadius: 20}}
        source={{uri: props.message.avatar}}
      />
      {/* avatar của bạn chat */}
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,.15)',
          padding: 10,
          borderRadius: 20,
          marginLeft: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>{props.message.text}</Text>
      </View>
    </View>
  );
};

export default Message;
