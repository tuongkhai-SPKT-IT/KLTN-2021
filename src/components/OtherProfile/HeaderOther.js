import React, {useState, useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {View, Image, Pressable} from 'react-native';
import {Avatar, Button, Text} from 'react-native-elements';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';

export default function HeaderProfile(props) {
  const userInfo = useSelector((state) => state.OtherProfile);
  console.log(userInfo);
  const [imageProfile, setImageProfile] = useState({});
  // const [declarePopUp, setDeclarePopUp] = useState(true);
  //true: avatar, false: cover props.imgPopup
  useEffect(() => {
    if (userInfo.intro) {
      const temp = {
        avatar: userInfo.intro.user_avatar,
        cover: userInfo.intro.user_cover,
      };
      setImageProfile({...temp});
    }
  }, [userInfo.intro]);

  const [imgPopup, setImgPopup] = useState(false);
  const [typeImg, setTypeImg] = useState(true);
  return (
    <>
      <Modal
        isVisible={imgPopup}
        backdropColor="#000"
        swipeDirection={['up', 'down']}
        backdropOpacity={1}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        swipeThreshold={100}
        hasBackdrop={false}
        onBackButtonPress={() => setImgPopup(false)}
        onSwipeComplete={() => setImgPopup(false)}
        onSwipeCancel={() => setImgPopup(true)}
        animationInTiming={600}
        style={{margin: 0}}
        animationOutTiming={600}>
        <View
          style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
          <Image
            source={{
              uri: typeImg ? imageProfile.avatar : imageProfile.cover,
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="contain"
          />
        </View>
      </Modal>

      <View
        style={{
          justifyContent: 'center',
          position: 'relative',
          height: 200,
        }}>
        <Pressable
          onPress={() => {
            setImgPopup(true);
            setTypeImg(false);
          }}
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          <View style={{width: '100%', height: '100%'}}>
            <Image
              source={{uri: imageProfile.cover}}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="stretch"
            />
          </View>
        </Pressable>
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
            size="xlarge"
            onPress={() => {
              setImgPopup(true);
              setTypeImg(true);
            }}
            rounded
            source={{uri: imageProfile.avatar}}
          />
        </View>
      </View>
    </>
  );
}
