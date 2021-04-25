import React, {useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Input(props) {
  const [heightInput, setHeightInput] = useState(0);

  return (
    <>
      {props.visibleScroll && (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            bottom: heightInput + 15,
            justifyContent: 'center',
            left: '50%',
            right: '50%',
          }}>
          <TouchableOpacity
            onPress={() => {
              // if (messagesScroll.current) {
              messagesScroll.current.scrollToEnd();
              // }
            }}
            style={{
              width: 40,
              padding: 0,
              backgroundColor: 'white',
              borderRadius: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}>
            <AntDesign name="arrowdown" size={25} color="rgb(110, 223, 0)" />
          </TouchableOpacity>
        </View>
      )}
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
          onContentSizeChange={(e) =>
            setHeightInput(
              e.nativeEvent.contentSize.height > 100
                ? 100
                : e.nativeEvent.contentSize.height,
            )
          }
          placeholder="Nhập tin nhắn..."
          // style={[styles.stylesViewLCS.textCmt, {maxHeight: 100}]}
          value={props.message}
          style={{
            flex: 10,
            fontSize: 16,
            paddingLeft: 10,
            maxHeight: 100,
          }}
        />
        <View style={{width: 36, height: 36}} />
        <Button
          buttonStyle={{
            backgroundColor: 'transparent',
          }}
          containerStyle={{position: 'absolute', bottom: 0, right: 0}}
          onPress={() => props.sendMessage()}
          icon={<FontAwesome name="paper-plane" size={25} color="black" />}
          style={{flex: 1}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
