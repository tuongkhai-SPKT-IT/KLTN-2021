import React, {Component, useState, useEffect, useRef} from 'react';
import Register from './Register';
import * as storeKeys from '../Constants';
import {Login_Request} from '../Redux/Actions/Login.Action';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHistory} from 'react-router-native';
import Modal from 'react-native-modal';

import API from '../API/API';
import {DevSettings} from 'react-native';
const Login = ({navigation}) => {
  const [Account, setAccount] = useState('');
  const [Password, setPassword] = useState('');
  const [phone_verified, setPhoneVerified] = useState('');
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state.login);
  // console.log(storeState);

  const _Login = () => {
    AsyncStorage.clear();
    // DevSettings.reload();

    //const info = { user: Account.account, password: Password.password };
    if (!Account) {
      alert('Account is required !!!');
      return;
    }
    if (!Password) {
      alert('Password is required !!!');
      return;
    }
    if (Account && Password) {
      const info = {
        user: Account.account.trimEnd(),
        password: Password.password,
      };
      dispatch(Login_Request(info));
    }
  };

  AsyncStorage.getItem(storeKeys.User_Token).then((val) => {
    if (val) history.push('/Home');
  });
  useEffect(() => {
    if (storeState.err_code === 'Phone is not verifed') {
      setVisible(true);
    }
  }, [storeState]);
  const _Register = () => {
    navigation.navigate('Register');
  };
  const CheckSDT = () => {
    var route = 'user/update/info';
    var params = {
      account: Account.account,
      otp_token: phone_verified,
      update_type: 5,
    };
    var api = new API();
    api
      .onCallAPI('post', route, {}, params, {})
      .then((res) => {
        if (res.data.error_code !== 0) {
          Alert.alert(res.data.message);
        } else {
          Alert.alert('???? x??c th???c otp');
          setVisible(false);
          _Login();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // initRef.current.open();
    const backhandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        history.goBack();
        return true;
      },
    );
    return () => backhandler.remove();
  }, []);

  return (
    <>
      {storeState.authentication && (
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
            ??ang x??c th???c
          </Text>
        </View>
      )}
      <Modal
        isVisible={visible}
        // swipeDirection={['up', 'down', 'left', 'right']}
        backdropOpacity={0.5}
        animationIn="zoomInDown"
        onBackdropPress={() => setVisible(false)}
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        hideModalContentWhileAnimating
        avoidKeyboard
        style={{margin: 0}}>
        <View style={{width: '100%'}}>
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              padding: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Th??ng b??o</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                textAlign: 'center',
              }}>
              B???n ph???i nh???p OTP ???????c g???i v??o email b???n ???? d??ng ????? ????ng k??
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
            }}>
            <TextInput
              autoCapitalize="none"
              autoCompleteType="off"
              placeholderTextColor="rgba(0,0,0,.5)"
              style={{
                fontSize: 15,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                paddingLeft: 10,
                borderTopColor: 'rgba(0,0,0,.5)',
                borderBottomColor: 'rgba(0,0,0,.5)',
                width: '100%',
                marginVertical: 10,
              }}
              onChangeText={(otp) => setPhoneVerified(otp)}
              placeholder="M?? OTP"
            />
            <Button
              buttonStyle={{width: 150}}
              containerStyle={{margin: 5}}
              disabledTitleStyle={{color: '#00F'}}
              onPress={() => {
                CheckSDT();
              }}
              title="X??c nh???n"
            />
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.View1} keyboardShouldPersistTaps="handled">
        {/* <Register /> */}

        <View
          style={[
            styles.View2,
            {opacity: storeState.authentication ? 0.5 : 1},
          ]}>
          <Image
            source={{
              uri: 'https://www.facebook.com/images/fb_icon_325x325.png',
            }}
            style={[styles.ImageIcon]}
          />
          <Text style={styles.text1}>Facebook</Text>
        </View>
        <View
          style={[
            styles.View3,
            {opacity: storeState.authentication ? 0.5 : 1},
          ]}>
          <TextInput
            autoCapitalize="none"
            autoCompleteType="off"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#e0e0eb',
              width: '80%',
              marginTop: '10%',
            }}
            onChangeText={(account) => setAccount({account})}
            placeholder="S??? ??i???n tho???i ho???c Email"
          />
          <TextInput
            autoCapitalize="none"
            autoCompleteType="off"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#e0e0eb',
              width: '80%',
              marginBottom: 28,
            }}
            placeholder="M???t kh???u"
            autoCapitalize="none"
            onChangeText={(password) => setPassword({password})}
            secureTextEntry={true}
          />
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => _Login()}>
            <Text style={styles.appButtonText}>????ng nh???p</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => AsyncStorage.clear()}
            style={[
              styles.appButtonContainer,
              {
                backgroundColor: 'transparent',
              },
            ]}>
            <Text
              style={[
                styles.appButtonText,
                {
                  color: '#1877F2',
                },
              ]}>
              Qu??n m???t kh???u?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '80%',
            marginVertical: 15,
            marginTop: 30,
            alignSelf: 'center',
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center'}}>HO???C</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            // onPress={this.test()}
            onPress={() => _Register()}
            style={[
              styles.appButtonContainer,
              {
                marginTop: 0,
                backgroundColor: '#42b72a',
              },
            ]}>
            <Text style={[styles.appButtonText]}>T???o t??i kho???n m???i</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
export default Login;
const styles = StyleSheet.create({
  appButtonContainer: {
    marginTop: 10,
    width: '80%',
    backgroundColor: '#1877F2',
    borderRadius: 5,
    paddingVertical: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  View1: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    position: 'relative',
    // alignItems: 'center',
  },
  View2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  View3: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: '10%',
  },

  ImageIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'white',
  },

  text1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
});
