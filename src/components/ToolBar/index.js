import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Avatar from '../Avatar';
import {Text} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as keys from '../Constants';
import RNCamera from '../CameraComponent';
import {useNavigation} from '@react-navigation/core';
export default function ToolBar() {
  const navigation = useNavigation();
  const [enablePost, setEnablePost] = useState(false);
  const userInfoRef = useRef({});
  const [visibleCamera, setVisibleCamera] = useState(false);
  const cameraRef = useRef(null);
  useEffect(() => {
    const getInfoOwner = async () => {
      userInfoRef.current.avatar = await AsyncStorage.getItem(keys.User_Avatar);
    };
    getInfoOwner();
  }, []);

  const popUpStatusModal = () => {
    navigation.navigate('subToolBar', {
      isPhotoPress: false,
    });
  };
  const photoPress = () => {
    navigation.navigate('subToolBar', {
      isPhotoPress: true,
    });
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
            <Avatar isHomePage={true} source={userInfoRef.current.avatar} />
          </View>
          <TouchableOpacity
            style={styles.input}
            onPress={() => popUpStatusModal()}>
            <Text>What's on your mind?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            // onPress={() => pressLiveCamera()}
            style={[styles.menu, {borderEndWidth: 0.2}]}>
            <Ionicons name="ios-videocam" size={22} color="#f44337"></Ionicons>
            <Text style={{padding: 5, fontWeight: '900'}}>Live</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => photoPress()}
            style={[styles.menu, {borderEndWidth: 0.2}]}>
            <MaterialIcons
              name="photo-size-select-actual"
              size={20}
              color="#4caf50"></MaterialIcons>
            <Text style={{padding: 5, fontWeight: '900'}}>Photo</Text>
          </TouchableOpacity>

          <View style={styles.menu}>
            <Entypo name="location-pin" size={22} color="#e141fc" />
            <Text style={{padding: 5, fontWeight: '900'}}>Check in</Text>
          </View>
        </View>
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
