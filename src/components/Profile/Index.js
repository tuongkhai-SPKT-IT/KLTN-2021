import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  ScrollView,
  DevSettings,
  Pressable,
} from 'react-native';
import HeaderProfile from './HeaderProfile';
import Modal from 'react-native-modal';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {Avatar, Button, Text, SearchBar} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  Get_IntroUser,
  Get_StatusProfile,
} from '../Redux/Actions/ProfileUser.Action';
import IntroProfile from './IntroProfile';
import OtherProfile from '../OtherProfile';
import {createStackNavigator} from '@react-navigation/stack';
import friendsList from './friendsList';
import ContentStatus from '../ContentStatus';
const Profile = ({navigation}) => {
  const Stack = createStackNavigator();

  const mainProfile = ({navigation}) => {
    const ProfileInfo = useSelector((state) => state.ProfileInfo);
    console.log(ProfileInfo);
    const userInfo = useSelector((state) => state.UserInfo);
    const dispatch = useDispatch();
    useEffect(() => {
      getStatus();
      getIntro();
    }, []);
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [imgPopup, setImgPopup] = useState(false);
    const [typeImg, setTypeImg] = useState(true);
    const getStatus = () => {
      dispatch(Get_StatusProfile());
    };
    const showstatus = () => {
      const srcData = ProfileInfo.statusUser;

      if (srcData.length > 0) {
        {
          return srcData.map((stt, i) => {
            return (
              <View key={i} style={{backgroundColor: 'rgba(0,0,0,.3)'}}>
                <ContentStatus srcData={stt} />
              </View>
            );
          });
        }
      } else {
        return <Text style={{padding: 20}}>Không có tin tức nào!!</Text>;
      }
    };
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
                height: 50,
                // marginBottom: 10,
              }}></View>
            <Text
              h4
              style={{
                textAlign: 'center',
                marginBottom: 10,
              }}>
              {userInfo.information[2] ? userInfo.information[2].value : ''}
            </Text>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                opacity: 0.5,
              }}
            />
            <IntroProfile direction={() => navigation.navigate('OtherUser')} />

            <View
              style={{
                paddingBottom: 10,
                borderBottomWidth: 0.8,
                marginBottom: 20,
              }}>
              {ProfileInfo.introUser.friend_array ? (
                ProfileInfo.introUser.friend_array.length > 6 && (
                  <Button
                    buttonStyle={{
                      backgroundColor: 'rgba(0,0,0,.09555)',
                      marginVertical: 10,
                      zIndex: 999,
                    }}
                    containerStyle={{
                      width: '100%',
                    }}
                    onPress={() => navigation.navigate('fullfriends')}
                    title="See All Friends"
                    titleStyle={{color: 'black'}}
                  />
                )
              ) : (
                <></>
              )}
            </View>
            <View
              style={{
                backgroundColor: 'gray',
                height: 20,
                width: '100%',
                opacity: 0.6,
              }}></View>
            {showstatus()}
          </ScrollView>
        </View>

        <Modal
          isVisible={visiblePopup}
          animationIn="slideInUp"
          onBackButtonPress={() => setVisiblePopup(false)}
          animationOut="slideOutDown"
          swipeDirection={['up', 'down']}
          swipeThreshold={150}
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
              icon={
                <MaterialCommunityIcons
                  name="image-edit"
                  style={{marginRight: 5}}
                  color="#050505"
                  size={30}
                />
              }
              onPress={() => DevSettings.reload()}
              title={
                typeImg ? 'Change Profile Picture' : 'Change Cover Picture'
              }
              titleStyle={{color: 'black'}}
            />
          </View>
        </Modal>
      </>
    );
  };
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileUser"
          options={{
            headerShown: false,
          }}
          component={mainProfile}
        />
        <Stack.Screen
          name="OtherUser"
          options={{
            title: '',
          }}
          component={OtherProfile}
        />
        <Stack.Screen
          name="fullfriends"
          options={{
            title: 'Bạn Bè',
          }}
          component={friendsList}
        />
      </Stack.Navigator>
    </>
  );
};
export default Profile;
const styles = StyleSheet.create({});
// const srcData = [
//   {
//     caption: '1 hình 1 video',
//     created_at: [],
//     file_uploaded: [
//       {
//         type: 'image',
//         uri:
//           'http://api.facebook-kltn.alphawolf.io/image/Y0cF4YV8sjxRsixidrn6YuvwCnkhRN.jpg',
//       },
//       {
//         type: 'video',
//         uri:
//           'http://api.facebook-kltn.alphawolf.io/video/vqXpEe8Vm5UBMKAB2fmxZASICyzgqS.mp4',
//       },
//     ],
//     id: '606ef522e1f7bd56b33d4708',
//     like_number: 0,
//     liked: false,
//     no_sign_profile: 'khaidev.chatheader.09.01',
//     posted_time: '08/04/2021 07:20:50 PM',
//     sex: '1',
//     status_setting: 'pub',
//     user_avatar: 'http://api.facebook-kltn.alphawolf.io/image/default.jpg',
//     user_id: '606c1c6af2cda67fc337dc73',
//     user_name: 'Khải dev chat header',
//     who_liked_status: [],
//   },
// ];
