import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  DevSettings,
  Pressable,
  RefreshControl,
  Alert,
} from 'react-native';
import HeaderOther from './HeaderOther';
import Modal from 'react-native-modal';
import {Avatar, Button, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import IntroOther from './IntroOther';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import OthersFriend from './OthersFriend';
import {
  Get_Intro_Other,
  Get_Status_Other,
  Clear_Store_Other,
  Check_Relationship,
  call_Add_Friend,
  Cancel_Friend,
  Accept_Friend,
  Switch_TO_Messenger,
  Back_From_Other,
  Delete_Friend,
} from '../Redux/Actions/OtherProfile.Action';
import ContentStatus from '../ContentStatus';
import {ActivityIndicator} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderScreen from './HeaderScreen';
import {Appbar, Searchbar} from 'react-native-paper';
const OtherProfile = ({route, navigation}) => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Clear_Store_Other());

    if (route.params.userId) {
      dispatch(Get_Intro_Other(route.params.userId));
      dispatch(Get_Status_Other(route.params.userId));
      dispatch(Check_Relationship(route.params.userId));
    }
  }, [route.params]);
  const mainProfile = ({navigation}) => {
    const OtherProfile = useSelector((state) => state.OtherProfile);
    // console.log();
    const {buttonFriend, buttonMessage, relationShip} = OtherProfile;
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [searchContent, setSearchContent] = useState('');

    const onPressFriendsButton = () => {
      if (relationShip) {
        createRoom();
        setLoading(true);
      } else {
        // fasle button to là friends, true button to là messenger
        if (buttonFriend.title === 'Requested') {
          dispatch(Cancel_Friend(route.params.userId));
          refreshThis();
        }
        if (buttonFriend.title === 'Confirm') {
          setVisiblePopup(true);
        }
        if (buttonFriend.title === 'Add friend') {
          dispatch(call_Add_Friend(route.params.userId));
          refreshThis();
        }
      }
    };
    const createTwoButtonAlert = () =>
      Alert.alert('Warning', 'Bạn có chắc muốn xoá ', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', style: {color: 'blue'}, onPress: () => unfriend()},
      ]);
    useEffect(() => {
      const {buttonFriend, relationShip, buttonMessage} = OtherProfile;
      if (buttonFriend || relationShip || buttonMessage) {
        setLoading(false);
      }
    }, [OtherProfile]);
    const refreshThis = () => {
      dispatch(Clear_Store_Other());
      dispatch(Get_Intro_Other(route.params.userId));
      dispatch(Get_Status_Other(route.params.userId));
      dispatch(Check_Relationship(route.params.userId));
    };
    const onRefresh = () => {
      setRefreshing(true);
      refreshThis();
      if (
        buttonFriend !== undefined &&
        buttonMessage !== undefined &&
        Object.keys(OtherProfile.intro).length !== 0
      )
        setRefreshing(false);
    };
    const showstatus = () => {
      const srcData = OtherProfile.status;

      if (srcData.length > 0) {
        {
          return srcData.map((stt, i) => {
            return (
              <View key={i} style={{backgroundColor: 'rgba(0,0,0,.3)'}}>
                <ContentStatus srcData={stt} profilePage={true} />
              </View>
            );
          });
        }
      } else {
        return <Text style={{padding: 20}}>Không có tin tức nào!!</Text>;
      }
    };
    useEffect(() => {
      if (OtherProfile.chat_room_id) {
        navigation.navigate('DetailMessages', {
          avatar: OtherProfile.intro.user_avatar,
          friend_chat: OtherProfile.intro.user_name,
          chat_group_id: OtherProfile.chat_room_id,
        });
      }
    }, [OtherProfile]);
    const unfriend = () => {
      dispatch(Delete_Friend(route.params.userId));
      refreshThis();
    };
    const createRoom = () => {
      dispatch(Switch_TO_Messenger(route.params.userId));
    };
    useEffect(() => {
      if (OtherProfile.err_code === 'Same UserID') {
        dispatch(Back_From_Other());
        navigation.navigate('Profile');
      }
    }, [OtherProfile.err_code]);
    if (OtherProfile.err_code) {
      if (OtherProfile.err_code !== 'Same UserID')
        return <Text h1>There has an error when you use our system</Text>;
    }
    if (
      buttonFriend !== undefined &&
      buttonMessage !== undefined &&
      Object.keys(OtherProfile.intro).length !== 0
    ) {
      return (
        <>
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
                  <FontAwesome5Icon
                    name="user-check"
                    style={{marginRight: 5}}
                    color="black" //"#050505"
                    size={30}
                  />
                }
                onPress={() => {
                  dispatch(Accept_Friend(route.params.userId));
                  setTimeout(() => {
                    refreshThis();
                  }, 1000);
                  console.log(OtherProfile);
                  setTimeout(() => {
                    setVisiblePopup(false);
                  }, 100);
                }}
                //dispatch(Accept_Friend(route.params.userId))
                title={'Confirm'}
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
                  <FontAwesome5Icon
                    name="times"
                    style={{marginRight: 5}}
                    color="#050505"
                    size={30}
                  />
                }
                onPress={() => {
                  dispatch(Cancel_Friend(route.params.userId));
                  setVisiblePopup(false);
                  refreshThis();
                }}
                // dispatch(Cancel_Friend(route.params.userId))
                title={'Delete Request'}
                titleStyle={{color: 'black'}}
              />
            </View>
          </Modal>
          <HeaderScreen arrPrevious={OtherProfile.arrPrevious} />

          <View style={{position: 'relative'}}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <HeaderOther />
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
                {OtherProfile.intro.user_name}
              </Text>
              <View
                style={{flexDirection: 'row', width: '100%', marginBottom: 10}}>
                <Button
                  buttonStyle={{backgroundColor: '#E4E6EB'}}
                  titleStyle={{color: 'black'}}
                  containerStyle={{marginHorizontal: 10, flex: 10}}
                  loadingProps={{animating: true}}
                  loading={loading}
                  icon={
                    relationShip ? (
                      <MaterialCommunityIcons
                        name={buttonMessage.icon}
                        style={{marginRight: 10}}
                        size={20}
                      />
                    ) : (
                      <FontAwesome5Icon
                        name={buttonFriend.icon}
                        style={{marginRight: 10}}
                        size={20}
                      />
                    )
                  }
                  onPress={() => onPressFriendsButton()}
                  title={
                    relationShip ? buttonMessage.title : buttonFriend.title
                  }
                />

                <Button
                  buttonStyle={{
                    backgroundColor: '#E4E6EB',
                    width: 40,
                  }}
                  titleStyle={{color: 'black'}}
                  containerStyle={{marginHorizontal: 10}}
                  loadingProps={{animating: true}}
                  icon={
                    relationShip ? (
                      <FontAwesome5Icon name={buttonFriend.icon} size={20} />
                    ) : (
                      <MaterialCommunityIcons
                        name={buttonMessage.icon}
                        size={20}
                      />
                    )
                  }
                  onPress={() =>
                    relationShip ? createTwoButtonAlert() : createRoom()
                  }
                />
              </View>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  opacity: 0.5,
                }}
              />
              <IntroOther navigation={navigation} />

              <View
                style={{
                  paddingBottom: 10,
                  borderBottomWidth: 0.8,
                  marginBottom: 20,
                }}>
                {OtherProfile.intro.friend_array ? (
                  OtherProfile.intro.friend_array.length > 6 && (
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
        </>
      );
    }
    const handleSearchBar = (e) => {
      setSearchContent(e);
    };
    return (
      <View
        style={{
          position: 'relative',
          height: '100%',
        }}>
        <Appbar.Header style={{backgroundColor: '#fff'}}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
        <View
          style={{
            width: 150,
            height: 150,
            zIndex: 999,
            position: 'absolute',
            top: '50%',
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
      </View>
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
          name="fullfriends"
          options={{
            title: 'Friends',
          }}
          component={OthersFriend}
        />
      </Stack.Navigator>
    </>
  );
};
export default OtherProfile;
const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 15,
    backgroundColor: '#CCCCD2',
  },
});
