import {useNavigation} from '@react-navigation/core';
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HeaderMessenger = (props) => {
  const navigation = useNavigation();
  console.log(props);
  const goBackButtonChat = () => {
    navigation.navigate('Messengers', {
      screen: 'SmallMessengers',
      resetTime: true,
    });
    // props.navigation.goBack();
  };
  return (
    <View
      style={[
        props.style,
        {
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderColor: 'rgba(0,0,0,0.5)',
        },
      ]}>
      <TouchableOpacity
        onPress={goBackButtonChat}
        style={{
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AntDesign name="arrowleft" size={20} color="rgba(0,0,0,.5)" />
      </TouchableOpacity>
      <View
        style={{
          padding: 5,
          flexDirection: 'row',
          paddingLeft: 0,
        }}>
        <Avatar
          containerStyle={{borderWidth: 1.5, borderColor: 'black'}}
          rounded
          size="medium"
          title={props.name}
          source={{uri: props.avatar}}
        />
        <View style={{padding: 5, justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {props.name}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default HeaderMessenger;
