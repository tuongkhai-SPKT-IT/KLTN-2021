import MainContent from './MainContent';
import React, {Component, useRef, useState} from 'react';
import {View, TextInput, StyleSheet, ScrollView, Text} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5nIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomenIcon from 'react-native-vector-icons/FontAwesome';

import {Button, Input} from 'react-native-elements';
import Modal from 'react-native-modalbox';
export default function ViewLCS() {
  const [liked, setLiked] = useState(false);
  const modalRef = useRef(null);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          marginVertical: 10,
          paddingVertical: 5,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'rgba(0,0,0,.6)',
        }}>
        <Button
          buttonStyle={{backgroundColor: 'transparent'}}
          containerStyle={{margin: 5, borderWidth: 1, flex: 1}}
          icon={
            liked ? (
              <AntDesignIcon name="like1" size={20} color="blue" />
            ) : (
              <AntDesignIcon name="like2" size={20} color="rgba(0,0,0,.8)" />
            )
          }
          loadingProps={{animating: true}}
          loadingStyle={{}}
          onPress={() => setLiked(!liked)}
          title="Thích"
          titleProps={{}}
          titleStyle={[
            {
              marginHorizontal: 5,
              fontSize: 18,
              fontWeight: 'bold',
            },
            liked ? {color: 'blue'} : {color: 'rgba(0,0,0,.6)'},
          ]}
        />
        <Button
          buttonStyle={{backgroundColor: 'transparent'}}
          containerStyle={{margin: 5, borderWidth: 1, flex: 1}}
          linearGradientProps={null}
          icon={
            <FontAwesome5nIcon
              name="comment-alt"
              size={20}
              color="rgba(0,0,0,.8)"
            />
          }
          loadingProps={{animating: true}}
          loadingStyle={{}}
          title="Bình luận"
          onPress={() => {
            modalRef.current.open();
          }}
          titleStyle={{
            marginHorizontal: 5,
            color: 'rgba(0,0,0,.6)',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
        <Modal
          position="center"
          coverScreen
          backButtonClose
          // swipeToClose={false}
          swipeThreshold={100}
          swipeArea={100}
          ref={modalRef}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            snapToInterval={450}
            decelerationRate="fast"></ScrollView>
        </Modal>
      </View>
      <View style={{flex: 1}}>
        <TextInput
          placeholder="Viết 1 bình luận"
          style={{
            flex: 1,
            width: '98%',
            fontSize: 18,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,5)',
            marginBottom: 10,
            borderRadius: 16,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 40,
            marginLeft: 5,
          }}></TextInput>

        <Button
          buttonStyle={{backgroundColor: 'transparent'}}
          containerStyle={{
            position: 'absolute',
            top: 6,
            right: 10,
            height: '100%',
          }}
          loading={false}
          loadingProps={{animating: true}}
          icon={<FontAwesomenIcon name="send" size={20} />}
          titleStyle={{
            marginHorizontal: 5,
            color: 'rgba(0,0,0,.6)',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
      </View>
      <Input
        containerStyle={{}}
        disabledInputStyle={{background: '#ddd'}}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIcon={<FontAwesomenIcon name="send" size={20} />}
        rightIcon={<AntDesignIcon name="close" size={20} />}
        rightIconContainerStyle={{}}
        placeholder="Viết 1 bình luận"
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 450,
  },
});
