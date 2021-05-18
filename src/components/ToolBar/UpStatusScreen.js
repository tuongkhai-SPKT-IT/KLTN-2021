import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import Avatar from '../Avatar';
import {Text} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import * as StatusServices from '../../services/status';
import {clear_Home, ReloadHome} from '../Redux/Actions/Home.Action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import ImageGrid from '../ContentStatus/ImageGrid';
import {DocumentPicker} from 'react-native-document-picker';

export default function UpStatusScreen({navigation, route}) {
  const [status, setStatus] = useState('');
  const [option, setOption] = useState('pub');
  const [userInfo, setUserInfo] = useState({});
  const inputTextRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [visible, setVisible] = useState(false);
  // const gridRef = useRef();
  const [imageGrid, setImageGrid] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (route.params.isPhotoPress) {
      library();
    } else return;
  }, []);
  // useEffect(() => {
  //   if (inputTextRef.current) inputTextRef.current.focus();
  // }, [inputTextRef.current]);
  useEffect(() => {
    const getInfoOwner = async () => {
      const avatar = await AsyncStorage.getItem(keys.User_Avatar);
      const userName = await AsyncStorage.getItem(keys.User_Name);
      setUserInfo({
        avatar: avatar,
        userName: userName,
      });
    };
    getInfoOwner();
  }, []);

  const postStatus = async () => {
    if (status || files.length > 0) {
      const params = {
        caption: status,
        status_setting: option,
        type: 2,
        option: 2,
      };
      const formdata = new FormData();
      if (files.length !== 0) {
        for (var i = 0; i < files.length; i++) {
          const today = new Date();
          const str = files[i].path;
          var n = str.lastIndexOf('/');
          var res = str.substr(n + 1);
          const file = {
            uri: files[i].path,
            name: res,
            type: files[i].mime,
          };
          formdata.append('file[]', file);
        }
      }
      console.log(formdata);

      // return;
      const upStatusResponse = StatusServices.PostStatus(params, formdata);

      if (upStatusResponse.status) {
        dispatch(clear_Home());
        dispatch(ReloadHome());

        navigation.goBack();
      } else {
        alert('Server error! Please try again later :(');
      }
    }
  };
  const camera = (mediaType = 'photo') => {
    ImageCropPicker.openCamera({
      width: 500,
      height: 500,
      // cropping: true,
    })
      .then((image) => {
        const arr = [...files];
        const temp = [...imageGrid];
        const value = {
          type: image.mime.includes('image') ? 'image' : 'video',
          uri: image.path,
        };
        arr.push(image);
        temp.push(value);
        setFiles(arr);
        setImageGrid(temp);
      })
      .catch((err) => console.log(err));
  };
  const library = () => {
    ImageCropPicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      // includeExif: true,
      // forceJpg: true,
    })
      .then((images) => {
        setFiles([...files, ...images]);
        const temp = [...imageGrid];
        images.map((image) => {
          const value = {
            type: image.mime.includes('image') ? 'image' : 'video',
            uri: image.path,
          };
          temp.push(value);
        });
        setImageGrid(temp);
      })
      .catch((e) => console.log(e));
  };

  if (Object.keys(userInfo).length !== 0)
    return (
      <>
        <Modal
          isVisible={visible}
          swipeDirection={['up', 'down']}
          animationIn="zoomInUp"
          onBackdropPress={() => setVisible(false)}
          onSwipeCancel={() => setVisible(true)}
          onSwipeComplete={() => setVisible(false)}
          onBackButtonPress={() => setVisible(false)}
          animationOut="zoomOutDown"
          animationInTiming={600}
          backdropOpacity={0.5}
          animationOutTiming={600}
          hideModalContentWhileAnimating
          style={{margin: 0}}>
          <View style={{backgroundColor: 'white'}}>
            <Text h1>Hello</Text>
          </View>
        </Modal>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
          }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={[styles.popupStatus]}>
              <View style={styles.popupStatus}>
                <View
                  style={[
                    styles.popupStatusHeader,
                    {
                      position: 'relative',
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.popupStatusHeaderBack}>
                    <Ionicons name="arrow-back" color="black" size={22} />
                  </TouchableOpacity>
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
                      onPress={() => postStatus()}>
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

                <View style={styles.divider}></View>
                <View style={[styles.popupStatusContent]}>
                  <View style={[styles.popupStatusUser]}>
                    <View style={styles.avatarBlock}>
                      <Avatar isHomePage={false} source={userInfo.avatar} />
                    </View>
                    <View style={styles.statusUserRestBlock}>
                      <View style={styles.statusUserName}>
                        <Text style={{fontSize: 19}}>{userInfo.userName}</Text>
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
                <TouchableOpacity
                  onPress={library}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome
                    name="plus-circle"
                    style={{padding: 3, marginLeft: 10}}
                    size={25}
                    color="blue"
                  />
                  <Text h4 h4Style={{padding: 10}}>
                    Images / Videos
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={camera}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome
                    name="camera"
                    style={{padding: 3, marginLeft: 10}}
                    size={20}
                    color="blue"
                  />

                  <Text h4 h4Style={{padding: 10}}>
                    Camera
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {/* {files.map(fileShowRender)} */}

                <ImageGrid srcImage={imageGrid} />
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  else return <></>;
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
    // flex: 1,/
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
