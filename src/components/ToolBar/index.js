import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import Avatar from '../Avatar';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
// import Modal from 'react-native-modalbox';
import DropDownPicker from 'react-native-dropdown-picker';
import * as StatusServices from '../../services/status';
import {useDispatch, useSelector} from 'react-redux';
import {ReloadHome} from '../Redux/Actions/Home.Action';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../Constants';
import RNCamera from '../CameraComponent';
export default function ToolBar() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserInfo);
  // console.log('from toolbar ', userInfo);
  const [enablePost, setEnablePost] = useState(false);
  const [status, setStatus] = useState('');
  const [option, setOption] = useState('pub');
  const [isReload, setIsReload] = useState(false);
  const [isPostStatus, setIsPostStatus] = useState(false);
  const userInfoRef = useRef({});
  const device = Dimensions.get('window');
  const inputTextRef = useRef(null);
  const [layoutModal, setLayoutModal] = useState(device);

  useEffect(() => {
    const getInfoOwner = async () => {
      userInfoRef.current.avatar = await AsyncStorage.getItem(keys.User_Avatar);
      userInfoRef.current.userName = await AsyncStorage.getItem(keys.User_Name);
      userInfoRef.current.userToken = await AsyncStorage.getItem(
        keys.User_Token,
      );
    };
    getInfoOwner();
  }, []);
  useEffect(() => {
    if (isPostStatus === true) {
      dispatch(ReloadHome());
      setIsReload(false);
      setIsPostStatus(false);
    }
  }, [isReload]);

  const popUpStatusModal = () => {
    // requestCameraPermission();
    // initRef.current.open();
    setVisible(true);
  };

  const postStatus = async () => {
    if (status && option) {
      let params = {
        caption: status,
        status_setting: option,
      };

      const upStatusResponse = await StatusServices.PostStatus(params);

      if (upStatusResponse.status) {
        setIsPostStatus(true);
        setIsReload(true);
        // initRef.current.close();
        setVisible(false);
      } else {
        alert('Server error! Please try again later :(');
      }
    }
  };
  const pressLiveCamera = (e) => {
    // console.log(1);
    setVisibleCamera(true);
    // requestCameraPermission();
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        pressLiveCamera();
        console.log(1);
      } else {
        return false;
      }
    } catch (err) {
      alert(err);
    }
  };
  const [visible, setVisible] = useState(false);
  const [visibleCamera, setVisibleCamera] = useState(false);

  const cameraRef = useRef(null);
  return (
    <>
      <Modal
        isVisible={visibleCamera}
        hasBackdrop={false}
        swipeDirection={['down']}
        animationIn="slideInUp"
        onBackdropPress={() => setVisibleCamera(false)}
        onSwipeCancel={() => setVisibleCamera(true)}
        onSwipeComplete={() => setVisibleCamera(false)}
        onBackButtonPress={() => setVisibleCamera(false)}
        animationOut="slideOutDown"
        propagateSwipe={true}
        animationInTiming={600}
        animationOutTiming={600}
        // avoidKeyboard
        hideModalContentWhileAnimating
        style={{margin: 0}}>
        <RNCamera ref={cameraRef} />
      </Modal>

      <View style={styles.container}>
        <View style={styles.row}>
          <View style={{marginRight: 10}}>
            {userInfo.information.length !== 0 ? (
              <Avatar
                isHomePage={true}
                source={userInfo.information[0].value}
              />
            ) : (
              <ActivityIndicator />
            )}
          </View>
          <TouchableOpacity
            style={styles.input}
            onPress={() => popUpStatusModal()}>
            <Text>What's on your mind?</Text>
          </TouchableOpacity>
          {/* <TextInput placeholder="Bạn đang nghĩ gì?" style={styles.input} onFocus={() => popUpStatusModal()} /> */}
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={{backgroundColor: 'red', width: 20, height: 20}}
            onPress={() => pressLiveCamera()}></TouchableOpacity>
          <TouchableOpacity
            onPress={() => pressLiveCamera()}
            style={styles.menu}>
            <Ionicons.Button
              onPress={() => pressLiveCamera()}
              style={styles.memuButton}
              name="ios-videocam"
              size={22}
              color="#f44337">
              Live
            </Ionicons.Button>
            <View style={styles.separator}></View>
          </TouchableOpacity>

          <View style={styles.menu}>
            <MaterialIcons.Button
              style={styles.memuButton}
              name="photo-size-select-actual"
              size={20}
              color="#4caf50">
              Photo
            </MaterialIcons.Button>
            <View style={styles.separator}></View>
          </View>

          <View style={styles.menu}>
            <Entypo.Button
              style={styles.memuButton}
              name="location-pin"
              size={22}
              color="#e141fc">
              Check in
            </Entypo.Button>
            <View style={styles.separator}></View>
          </View>
        </View>

        <Modal
          isVisible={visible}
          hasBackdrop={false}
          swipeDirection={['down']}
          animationIn="slideInUp"
          onBackdropPress={() => setVisible(false)}
          onSwipeCancel={() => setVisible(true)}
          onSwipeComplete={() => setVisible(false)}
          onBackButtonPress={() => setVisible(false)}
          animationOut="slideOutDown"
          propagateSwipe={true}
          animationInTiming={600}
          animationOutTiming={600}
          // avoidKeyboard
          hideModalContentWhileAnimating
          style={{margin: 0}}>
          {/* <Modal position="center" swipeToClose={true} ref={initRef} coverScreen> */}
          <View
            onLayout={(e) => setLayoutModal(e.nativeEvent.layout)}
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
            }}>
            <ScrollView>
              <View style={styles.popupStatus}>
                <View
                  style={[
                    styles.popupStatusHeader,
                    {
                      position: 'relative',
                    },
                  ]}>
                  <View style={styles.popupStatusHeaderBack}>
                    <Ionicons
                      name="arrow-back"
                      color="black"
                      size={22}
                      onPress={() => {
                        // initRef.current.close();
                        setVisible(false);
                        setStatus('');
                      }}
                    />
                  </View>
                  <View
                    style={[
                      styles.popupStatusHeaderContent,
                      {justifyContent: 'center'},
                    ]}>
                    <Text
                      style={{
                        fontSize: 20,
                      }}>
                      Tạo bài viết
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.popupStatusHeaderButtonSubmit,
                      {justifyContent: 'center'},
                    ]}>
                    <TouchableOpacity
                      style={[
                        styles.submitButton,
                        {
                          backgroundColor:
                            status === '' ? '#EEEEEE' : '#1058B0',
                        },
                      ]}
                      onPress={() => {
                        postStatus();
                      }}>
                      <Text
                        style={{
                          color: status !== '' ? '#f9f3f3' : '#bbbbbb',
                        }}>
                        Đăng
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.popupStatusContent}>
                  <View style={styles.popupStatusUser}>
                    <View style={styles.avatarBlock}>
                      <Avatar
                        isHomePage={false}
                        source={userInfoRef.current.avatar}
                      />
                    </View>
                    <View style={styles.statusUserRestBlock}>
                      <View style={styles.statusUserName}>
                        <Text style={{fontSize: 19}}>
                          {userInfoRef.current.userName}
                        </Text>
                      </View>
                      <View style={styles.statusOption}>
                        <DropDownPicker
                          items={[
                            {
                              label: 'Public',
                              value: 'pub',
                              icon: () => (
                                <Ionicons
                                  name="earth-outline"
                                  size={18}
                                  color="#bbbbbb"
                                />
                              ),
                            },
                            {
                              label: 'Private',
                              value: 'priv',
                              icon: () => (
                                <Feather
                                  name="lock"
                                  size={18}
                                  color="#bbbbbb"
                                />
                              ),
                            },
                            {
                              label: 'Friends',
                              value: 'friend',
                              icon: () => (
                                <Ionicons
                                  name="people-outline"
                                  size={18}
                                  color="#bbbbbb"
                                />
                              ),
                            },
                          ]}
                          defaultValue={option}
                          containerStyle={{height: 30, width: 115}}
                          style={styles.statusButton}
                          itemStyle={{
                            justifyContent: 'flex-start',
                          }}
                          dropDownStyle={{backgroundColor: '#fafafa'}}
                          onChangeItem={(item) => setOption(item.value)}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={[styles.popupStatusMainContent]}>
                    <TextInput
                      placeholder="What's on your mind?"
                      multiline={true}
                      ref={inputTextRef}
                      style={{
                        textAlign: 'justify',
                        textAlignVertical: 'top',
                        fontSize: 17,
                      }}
                      value={status}
                      onChangeText={setStatus}
                    />
                  </View>
                </View>
                <Button
                  buttonStyle={{width: 150}}
                  containerStyle={{margin: 5}}
                  onPress={() => requestCameraPermission()}
                  title="Hello"
                  titleStyle={{marginHorizontal: 5}}
                />
              </View>
              <Pressable
                onPress={() => inputTextRef.current.focus()}
                style={{
                  backgroundColor: 'transparent',
                  height: layoutModal.height * 0.8,
                  width: '100%',
                }}
              />
            </ScrollView>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 92,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 11,
    paddingLeft: 11,
    alignItems: 'center',
  },
  input: {
    height: 50,
    flex: 1,
    paddingTop: -20,
    paddingBottom: -20,
    paddingLeft: 20,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.5)',
    borderRadius: 30,
    height: 35,
    justifyContent: 'space-around',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    zIndex: 9999,
  },
  memuButton: {
    paddingLeft: 11,
    fontWeight: '500',
    fontSize: 12,
    backgroundColor: '#ffffff',
  },
  separator: {
    width: 1,
    height: 26,
    backgroundColor: '#f0f0f0',
  },
  popupStatus: {
    // flex: 1,
    position: 'relative',
  },
  popupStatusHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 'auto',
    // marginTop: "auto",
    position: 'relative',
  },
  popupStatusContent: {
    flex: 6,
    marginTop: 'auto',
  },
  popupStatusFooter: {
    flex: 1,
    backgroundColor: 'red',
  },
  popupStatusHeaderBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupStatusHeaderContent: {
    flex: 6,
  },
  popupStatusHeaderButtonSubmit: {
    flex: 2.5,
  },
  popupStatusUser: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 4,
    marginTop: 1,
  },
  popupStatusMainContent: {
    flex: 4,
    marginTop: 5,
  },
  submitButton: {
    width: 85,
    height: 35,
    top: 2,
    borderRadius: 10,
    // backgroundColor: status === '' ? '#EEEEEE': '#1058B0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  statusButton: {
    // width: 70,
    // height:30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
  },
  avatarBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statusUserRestBlock: {
    flex: 5,
  },
  statusUserName: {
    flex: 1,
  },
  statusOption: {
    flex: 1,
  },
});
