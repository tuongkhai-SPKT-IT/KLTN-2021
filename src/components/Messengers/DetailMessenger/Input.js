import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Input(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 20,
        marginHorizontal: 5,
        borderColor: 'rgba(0,0,0,.5)',
      }}>
      <TextInput
        multiline
        onChangeText={(e) => props.setMessage(e)}
        placeholder="Nhập tin nhắn..."
        // style={[styles.stylesViewLCS.textCmt, {maxHeight: 100}]}
        value={props.message}
        style={{flex: 10, lineHeight: 14, maxHeight: 150, fontSize: 14}}
      />
      <Button
        buttonStyle={{backgroundColor: 'transparent'}}
        containerStyle={{margin: 5}}
        onPress={() => props.sendMessage()}
        icon={<FontAwesome name="paper-plane" size={25} color="black" />}
        style={{flex: 1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
