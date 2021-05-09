import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, DevSettings} from 'react-native';
import HeaderProfile from './HeaderProfile';
import Modal from 'react-native-modal';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {Button, Text} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  Get_IntroUser,
  Get_StatusProfile,
  Clear_Store_Profile,
} from '../Redux/Actions/ProfileUser.Action';
import IntroProfile from './IntroProfile';
import ContentStatus from '../ContentStatus';
import HeaderApp from '../HeaderApp';
import {ActivityIndicator} from 'react-native';
import {RefreshControl} from 'react-native';
const mainProfile = ({navigation}) => {
  const ProfileInfo = useSelector((state) => state.ProfileInfo);
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
              <ContentStatus profilePage={true} srcData={stt} />
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
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    clearStoreProfile();
    getStatus();
    getIntro();
    if (Object.keys(ProfileInfo.introUser).length !== 0) setRefreshing(false);
    // setTimeout(() => {}, 2000);
  };
  const clearStoreProfile = () => {
    dispatch(Clear_Store_Profile());
  };
  const ButtonShowAll = () => {
    if (ProfileInfo.introUser)
      if (ProfileInfo.introUser.friend_array)
        return (
          <Button
            buttonStyle={{
              backgroundColor: 'rgba(0,0,0,.09555)',
              marginVertical: 10,
              zIndex: 999,
            }}
            containerStyle={{
              width: '100%',
            }}
            onPress={() => navigation.push('fullfriends')}
            title="See All Friends"
            titleStyle={{color: 'black'}}
          />
        );
  };
  if (Object.keys(ProfileInfo.introUser).length !== 0) {
    return (
      <>
        <View style={{position: 'relative'}}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <HeaderApp navigation={navigation} />
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
              }}></View>
            <Text
              h4
              style={{
                textAlign: 'center',
                marginBottom: 10,
              }}>
              {ProfileInfo.introUser.user_name}
            </Text>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                opacity: 0.5,
              }}
            />
            <IntroProfile navigation={navigation} />
            <View
              style={{
                paddingBottom: 10,
                borderBottomWidth: 0.8,
                marginBottom: 20,
              }}>
              {ButtonShowAll()}
            </View>
            <View
              style={{
                backgroundColor: 'gray',
                height: 20,
                width: '100%',
                opacity: 0.6,
              }}></View>
            {showstatus()}
            <View style={styles.divider} />
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
  } else {
    setTimeout(() => {
      if (Object.keys(ProfileInfo.introUser).length === 0)
        return (
          <View>
            <Text>
              Now, we can't connect with server. You must check your network
            </Text>
          </View>
        );
    }, 10000);
    return (
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          width: 150,
          height: 150,
          zIndex: 999,
          position: 'absolute',
          top: '30%',
          alignSelf: 'center',
        }}>
        <ActivityIndicator size="large" color="black" />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Loading
        </Text>
      </View>
    );
  }
};
export default mainProfile;

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 15,
    backgroundColor: '#CCCCD2',
  },
});
