import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet, View, BackHandler} from 'react-native';
import HeaderProfile from './HeaderProfile';
import Modal from 'react-native-modal';
import {Pressable} from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {Button, Text} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Get_IntroUser} from '../Redux/Actions/ProfileUser.Action';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IntroProfile from './IntroProfile';

export default function Profile(props) {
  const userInfo = useSelector((state) => state.UserInfo);
  // const imgPopup = useRef(null);
  const ProfileInfo = useSelector((state) => state.ProfileInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    getStatus();
    getIntro();
  }, []);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [imgPopup, setImgPopup] = useState(false);
  const [typeImg, setTypeImg] = useState(true);
  const getStatus = () => {};
  const getIntro = () => {
    dispatch(Get_IntroUser());
  };

  return (
    <>
      <View style={{position: 'relative'}}>
        <ScrollView>
          <HeaderProfile
            setImgPopup={setImgPopup}
            imgPopup={imgPopup}
            setVisiblePopup={setVisiblePopup}
            typeImg={typeImg}
            setTypeImg={setTypeImg}
          />
          <View
            style={{
              width: '100%',
              height: 150,
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginBottom: 10,
            }}>
            <Text h4 style={{textAlign: 'center'}}>
              {userInfo.information[2].value}
            </Text>
            <Button
              buttonStyle={{backgroundColor: '#d1d1e0'}}
              containerStyle={{width: '100%', backgroundColor: '#0f0f0f'}}
              icon={
                <Ionicons
                  name="ios-settings-outline"
                  size={20}
                  color="#000"
                  style={{marginHorizontal: 5}}
                />
              }
              onPress={() => alert('click')}
              title="Chỉnh sửa thông tin cá nhân"
              titleStyle={{color: 'black'}}
            />
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              opacity: 0.5,
            }}
          />
          <IntroProfile />
        </ScrollView>
      </View>
      <Modal
        isVisible={visiblePopup}
        animationIn="slideInUp"
        onBackButtonPress={() => setVisiblePopup(false)}
        animationOut="slideOutDown"
        swipeDirection={['up', 'down']}
        swipeThreshold={150}
        // backdropColor="white"
        // backdropOpacity={1}
        onSwipeComplete={() => setVisiblePopup(false)}
        onBackdropPress={() => setVisiblePopup(false)}
        onSwipeCancel={() => setVisiblePopup(true)}
        style={{
          backgroundColor: 'transparent',
          margin: 0,
        }}
        backdropOpacity={0.5}>
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: 0,
          }}>
          <Button
            buttonStyle={{
              backgroundColor: 'white',
              justifyContent: 'flex-start',
              padding: 20,
            }}
            containerStyle={{}}
            icon={
              <EntypoIcons
                name="images"
                style={{marginRight: 5}}
                color="#050505"
                size={30}
              />
            }
            iconContainerStyle={{}}
            onPress={() => setImgPopup(true)}
            title={typeImg ? 'View Profile Picture' : 'View Cover Picture'}
            titleStyle={{color: 'black'}}
          />
          <Button
            buttonStyle={{
              backgroundColor: 'white',
              // width: "100%"
              justifyContent: 'flex-start',
              padding: 20,
            }}
            containerStyle={{}}
            icon={
              <MaterialCommunityIcons
                name="image-edit"
                style={{marginRight: 5}}
                color="#050505"
                size={30}
              />
            }
            iconContainerStyle={{}}
            onPress={() => alert('click')}
            title={typeImg ? 'Change Profile Picture' : 'Change Cover Picture'}
            titleStyle={{color: 'black'}}
          />
        </View>
      </Modal>
    </>
  );

  // return <>
  //   <Stack.Navigator>
  //     <Stack.Screen
  //       name="ProfileUser"
  //       options={{
  //         headerShown: false
  //       }}
  //       component={ProfileUser}
  //     />
  //     <Stack.Screen
  //       name="userAvatarFull"
  //       options={{
  //         headerShown: false
  //       }}
  //       component={seeImgFull}
  //     />
  //   </Stack.Navigator>

  // </>
}

const styles = StyleSheet.create({});
