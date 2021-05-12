import React, {useState, useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {View, Image, Pressable} from 'react-native';
import {Avatar, Button, Text} from 'react-native-elements';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';

export default function HeaderProfile(props) {
  const userInfo = useSelector((state) => state.UserInfo);
  const [imageProfile, setImageProfile] = useState({});
  //true: avatar, false: cover props.imgPopup
  useEffect(() => {
    if (userInfo.information.length > 0) {
      const temp = {
        avatar: userInfo.information[0].value,
        cover: userInfo.information[1].value,
      };
      setImageProfile({...temp});
    }
  }, [userInfo.information]);
  const buttonUpImg = (name) => {
    return (
      <Button
        buttonStyle={{
          backgroundColor: '#d1d1e0',
          width: 35,
          borderRadius: 30,
          height: 35,
          zIndex: 9999,
        }}
        containerStyle={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex: 999,
        }}
        icon={<EntypoIcon name="camera" size={15} color="black" />}
        onPress={() => {
          if (name === 'avatar') {
            props.setTypeImg(true);
            props.setVisiblePopup(true);
          }
          if (name === 'cover') {
            props.setTypeImg(false);
            props.setVisiblePopup(true);
          }
        }}
      />
    );
  };

  return (
    <>
      <Modal
        isVisible={props.imgPopup}
        backdropColor="#000"
        swipeDirection={['up', 'down']}
        backdropOpacity={1}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        swipeThreshold={100}
        hasBackdrop={false}
        onModalShow={() => props.setVisiblePopup(false)}
        onSwipeComplete={() => props.setImgPopup(false)}
        onSwipeCancel={() => props.setImgPopup(true)}
        animationInTiming={600}
        style={{margin: 0}}
        animationOutTiming={600}>
        <View
          style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
          <Image
            source={{
              uri: props.typeImg ? imageProfile.avatar : imageProfile.cover,
            }}
            style={{
              width: '100%',
              height: '80%',
            }}
            resizeMode="stretch"
          />
        </View>
      </Modal>

      <View
        style={{
          justifyContent: 'center',
          position: 'relative',
          height: 200,
        }}>
        <View
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          <Pressable
            style={{width: '100%', height: '100%'}}
            onPress={() => {
              props.setTypeImg(false);
              props.setVisiblePopup(true);
            }}>
            <Image
              source={{uri: imageProfile.cover}}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="stretch"
            />
          </Pressable>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 150,
            left: 0,
            right: 0,
            bottom: 0,
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Avatar
            onLongPress={() => alert('onLongPress')}
            onPress={() => {
              props.setTypeImg(true);
              props.setVisiblePopup(true);
            }}
            size="xlarge"
            rounded
            source={{uri: imageProfile.avatar}}>
            {buttonUpImg('avatar')}
          </Avatar>
        </View>

        {buttonUpImg('cover')}
      </View>
    </>
  );
}
