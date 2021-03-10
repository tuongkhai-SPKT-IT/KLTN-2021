import {
  NativeRouter,
  Route,
  Link,
  useHistory,
  useRouteMatch,
} from 'react-router-native';
import React, {Component, useState, useEffect, useRef} from 'react';
import * as storeKeys from '../Constants';
import {Register_Request} from '../Redux/Actions/Login.Action';
import {useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modalbox';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
  StyleSheet,
  View,
  Button,
  BackHandler,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import backIcon from '../HinhAnh/backIcon.png';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = ({match}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setformData] = useState({
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    phone: '',
    sex: '', //1 || 0 // 1 là nam, 0 là nữ
    dOb: '',
  });
  //19/02/2021: sửa nút back handler khi đang ở view Register UserName, mở modal refs lên...
  const initRef = useRef(null);
  const input1 = useRef(null);
  const input2 = useRef(null);
  const [visible, setVisible] = useState({
    userName: true,
    password: false,
    emailAndPhone: false,
    dOb: false,
    sex: false,
    done: false,
  });
  const [alertModal, setAlertModal] = useState(true);
  const [date, setDate] = useState(new Date());
  const storeState = useSelector((state) => state.login);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (visible.userName) {
          initRef.current.open();
        }
        if (visible.dOb) {
          setVisible({...visible, dOb: false, userName: true});
          return true;
        }
        if (visible.sex) {
          setVisible({...visible, sex: false, dOb: true});
          return true;
        }
        if (visible.emailAndPhone) {
          setVisible({...visible, emailAndPhone: false, sex: true});
          return true;
        }
        if (visible.password) {
          setVisible({...visible, password: false, emailAndPhone: true});
          return true;
        }
        if (visible.done) {
          setVisible({...visible, done: false, password: true});
          return true;
        } else {
          console.log(visible);
          return true;
        }
      },
    );
    return () => backHandler.remove();
  }, [visible]);
  const onChangeText = (key, val) => {
    setformData({...formData, [key]: val});
  };
  const signUp = async () => {
    try {
      setformData({
        ...formData,
        first_name: formData.first_name.trimEnd(),
        last_name: formData.last_name.trimEnd(),
        phone: formData.phone.trimEnd(),
        email: formData.email.trimEnd(), //mật khẩu cho phép " "
      });
      dispatch(Register_Request(formData));
      if (storeState.err_code === '') {
        history.push('/');
      }
    } catch (err) {
      console.log('error signing up: ', err);
    }
  };
  const formatDateTime = (e) => {
    var ngay = e.getDate();
    var thang = e.getMonth() + 1;
    var nam = e.getFullYear();
    switch (ngay) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9: {
        ngay = '0' + ngay;
        break;
      }
      default:
        ngay = ngay;
    }
    switch (thang) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9: {
        thang = '0' + thang + '';
        break;
      }
      default:
        thang = thang;
    }
    return ngay + '/' + thang + '/' + nam;
  };
  const comparedDate = (date) => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 4);
    // console.log(today);
    return today.getTime() >= date.getTime();
  };
  // const checkString = (str) => { return /^-?[\d.]+(?:e-?\d+)?$/.test(str); }
  const showEmail = (str) => {
    const index = str.indexOf('@');

    return str.slice(0, index) + '\n' + str.slice(index, str.length);
  };
  const setUserName = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            borderBottomColor: 'rgba(0,0,0,0.4)',
            borderBottomWidth: 1,
            paddingVertical: 5,
          }}>
          <Text style={{fontSize: 20, marginLeft: 30}}>Tên</Text>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              initRef.current.open();
            }}
            style={{position: 'absolute', paddingVertical: 6}}>
            <Image source={backIcon} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 150,
          }}>
          Bạn tên gì?
        </Text>

        <View style={{width: '100%', flexDirection: 'row', marginTop: 15}}>
          <TextInput
            ref={input1}
            style={[
              styles.input,
              {
                width: '50%',
                flex: 1,
                borderRadius: 0,
                paddingLeft: 0,
                paddingBottom: 0,
              },
            ]}
            placeholder="Họ"
            autoCapitalize="none"
            placeholderTextColor="black"
            onChangeText={(val) => onChangeText('last_name', val)}
            value={formData.last_name}
          />
          <TextInput
            ref={input2}
            style={[
              styles.input,
              {
                width: '50%',
                flex: 1,
                borderRadius: 0,
                paddingLeft: 0,
                paddingBottom: 0,
              },
            ]}
            placeholder="Tên"
            autoCapitalize="none"
            placeholderTextColor="black"
            value={formData.first_name}
            onChangeText={(val) => onChangeText('first_name', val)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (!formData.first_name) {
              Alert.alert('Bạn cần phải nhập đầy đủ cả họ và tên');
              input2.current.focus();
              return;
            }
            if (!formData.last_name) {
              Alert.alert('Bạn cần phải nhập đầy đủ cả họ và tên');
              input1.current.focus();
              return;
            } else {
              setVisible({...visible, userName: false, dOb: true});
              setAlertModal(false);
            }
            // modalRef.current._children[3]._children[1].focus();
            // setVisible({ ...visible, userName: false, dOb: true })
          }}
          style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const setDateOfBirth = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            borderBottomColor: 'rgba(0,0,0,0.4)',
            borderBottomWidth: 1,
            paddingVertical: 5,
          }}>
          <Text style={{fontSize: 20, marginLeft: 30}}>Ngày sinh</Text>
          <TouchableOpacity
            onPress={() => {
              setVisible({...visible, userName: true, dOb: false});
              setAlertModal(true);
            }}
            style={{position: 'absolute', paddingVertical: 6}}>
            <Image source={backIcon} />
          </TouchableOpacity>
        </View>

        <DatePicker
          date={date}
          locale="vi"
          onDateChange={(e) => {
            setDate(e);
          }}
          mode="date"
        />
        <TouchableOpacity
          onPress={() => {
            if (comparedDate(date)) {
              setVisible({...visible, dOb: false, sex: true});
              setformData({...formData, dOb: formatDateTime(date)});
            } else {
              initRef.current.open();
            }
          }}
          style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const [isSelected, setIsSelected] = useState(-1);
  const setSex = () => {
    var radio_props = [
      {label: 'Nữ', value: 0},
      {label: 'Nam', value: 1},
    ];
    return (
      <View style={{width: '100%', height: '100%', position: 'relative'}}>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            borderBottomColor: 'rgba(0,0,0,0.4)',
            borderBottomWidth: 1,
            paddingVertical: 5,
          }}>
          <Text style={{fontSize: 20, marginLeft: 30}}>Giới tính</Text>
          <TouchableOpacity
            onPress={() => setVisible({...visible, sex: false, dOb: true})}
            style={{position: 'absolute', paddingVertical: 6}}>
            <Image source={backIcon} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginBottom: 70}}>
            Giới tính của bạn là gì?
          </Text>
          <RadioForm
            formHorizontal={false}
            animation={true}
            style={{width: '90%'}}>
            {radio_props.map((arr, i) => {
              return (
                <RadioButton
                  labelHorizontal={true}
                  key={i}
                  style={{
                    width: '100%',
                    position: 'relative',
                    borderBottomColor: 'rgba(0,0,0,0.5)',
                    borderBottomWidth: 1,
                    paddingVertical: 20,
                  }}>
                  <RadioButtonLabel
                    obj={arr}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => {
                      setIsSelected(i);
                    }}
                    labelStyle={{fontSize: 22, color: '#000', paddingTop: 5}}
                    labelWrapStyle={{}}
                  />
                  <RadioButtonInput
                    obj={arr}
                    index={i}
                    isSelected={isSelected === i}
                    onPress={() => {
                      setIsSelected(i);
                    }}
                    borderWidth={1} // tạo thêm phần chú thích cho các cái nút giới tính này /// Ghi chú ăn xong làm
                    buttonInnerColor={
                      isSelected === i ? '#1877F2' : 'rgba(0,0,0,0.8)'
                    } //chấm tròn trong
                    buttonOuterColor={
                      isSelected === i ? '#1877F2' : 'rgba(0,0,0,0.5)'
                    } // màu viền
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonStyle={{}}
                    buttonWrapStyle={{
                      position: 'absolute',
                      right: 0,
                      bottom: 20,
                    }}
                  />
                </RadioButton>
              );
            })}
          </RadioForm>
          <TouchableOpacity
            onPress={() => {
              if (isSelected > -1) {
                setVisible({...visible, sex: false, emailAndPhone: true});
                setformData({...formData, sex: isSelected});
              } else {
                Alert.alert(
                  'Bạn phải chọn giới tính (giới tính trên giấy khai sinh)',
                );
              }
            }}
            style={[styles.appButtonContainer, {marginTop: 70}]}>
            <Text style={styles.appButtonText}>Tiếp theo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const setPhoneEmail = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            borderBottomColor: 'rgba(0,0,0,0.4)',
            borderBottomWidth: 1,
            paddingVertical: 5,
          }}>
          <Text style={{fontSize: 20, marginLeft: 30}}>
            Số di động và Email
          </Text>
          <TouchableOpacity
            onPress={() =>
              setVisible({...visible, emailAndPhone: false, sex: true})
            }
            style={{position: 'absolute', paddingVertical: 6}}>
            <Image source={backIcon} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 100,
          }}>
          Nhập số di động và email của bạn
        </Text>
        <View style={{width: '100%', flexDirection: 'column', marginTop: 15}}>
          <TextInput
            style={[styles.input]}
            ref={input1}
            placeholder="Số điện thoại "
            value={formData.phone}
            autoCapitalize="none"
            placeholderTextColor="black"
            keyboardType="numbers-and-punctuation"
            onChangeText={(val) => onChangeText('phone', val.trimEnd())}
          />

          <TextInput
            style={[styles.input]}
            ref={input2}
            placeholder="Email"
            autoCapitalize="none"
            value={formData.email}
            placeholderTextColor="black"
            onChangeText={(val) => onChangeText('email', val.trimEnd())}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!formData.phone) {
              Alert.alert('Bạn cần phải nhập đầy đủ cả số điện thoại và email');
              input1.current.focus();
              return;
            }
            if (!formData.email) {
              Alert.alert('Bạn cần phải nhập đầy đủ cả số điện thoại và email');
              input2.current.focus();
              return;
            } else {
              setVisible({...visible, emailAndPhone: false, password: true});
            }
          }}
          style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const setPassword = () => {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            borderBottomColor: 'rgba(0,0,0,0.4)',
            borderBottomWidth: 1,
            paddingVertical: 5,
          }}>
          <Text style={{fontSize: 20, marginLeft: 30}}>Mật khẩu</Text>
          <TouchableOpacity
            onPress={() =>
              setVisible({...visible, password: false, emailAndPhone: true})
            }
            style={{position: 'absolute', paddingVertical: 6}}>
            <Image source={backIcon} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 100,
          }}>
          Chọn mật khẩu của bạn
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            marginTop: 15,
            marginBottom: 50,
          }}>
          <TextInput
            style={[styles.input]}
            placeholder="Nhập mật khẩu "
            autoCapitalize="none"
            placeholderTextColor="white"
            value={formData.password}
            onChangeText={(val) => onChangeText('password', val.trimEnd())}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setVisible({...visible, password: false, done: true});
          }}
          style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const alertBackLogin = () => {
    return (
      <>
        <View style={{width: '100%', paddingHorizontal: 15}}>
          <Text
            style={{
              color: 'black',
              fontSize: 22,
              fontWeight: '800',
              paddingBottom: 10,
            }}>
            Bạn có muốn dừng tạo tài khoản không?
          </Text>
          <Text style={{color: 'black', fontSize: 22, fontWeight: '800'}}>
            Nếu dừng bây giờ, bạn sẽ mất toàn bộ thông tin đã điền
          </Text>
        </View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => initRef.current.close()}
            style={[
              styles.appButtonContainer,
              {flex: 1, width: 0, backgroundColor: 'transparent'},
            ]}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
                color: 'black',
                textAlign: 'center',
              }}>
              Tiếp tục tạo tài khoản
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible({...visible, userName: false});
              history.push('/');
            }}
            style={[
              styles.appButtonContainer,
              {flex: 1, width: 0, backgroundColor: 'transparent'},
            ]}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '400',
                color: '#1877F2',
                textAlign: 'center',
              }}>
              Dừng tạo tài khoản
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const alertDob = () => {
    return (
      <>
        <View style={{width: '100%', paddingHorizontal: 15}}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '800',
              paddingBottom: 10,
              textAlign: 'center',
            }}>
            Cảnh báo
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '800',
              textAlign: 'center',
            }}>
            Bạn phải thay đổi ngày sinh phù hợp
          </Text>
        </View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => initRef.current.close()}
            style={[
              styles.appButtonContainer,
              {
                flex: 1,
                width: 0,
                backgroundColor: '#1877F2',
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              },
            ]}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <View style={styles.container}>
      {visible.userName && setUserName()}
      {visible.dOb && setDateOfBirth()}
      {visible.sex && setSex()}
      {visible.emailAndPhone && setPhoneEmail()}
      {visible.password && setPassword()}

      {storeState.signingUp && (
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: '#1877F2',
            width: 150,
            height: 150,
            zIndex: 999,
            position: 'absolute',
            top: '30%',
          }}>
          <ActivityIndicator size="large" color="white" />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Đang xác thực
          </Text>
        </View>
      )}
      <Modal
        position="center"
        swipeToClose={false}
        ref={initRef}
        style={{
          flexDirection: 'column',
          paddingVertical: 15,
          width: '85%',
          height: alertModal ? '30%' : '18%',
        }}
        ref={initRef}>
        {alertModal ? alertBackLogin() : alertDob()}
      </Modal>

      {visible.done && (
        <View style={{width: '100%', height: '100%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
              position: 'absolute',
              top: 20,
            }}>
            Đây là thông tin tài khoản của bạn, bạn hãy kiểm tra lại lần cuối và
            xác thực đăng ký
          </Text>
          <View style={{flexDirection: 'row', marginTop: 150}}>
            <View style={{flex: 1}}>
              <Text style={styles.collumn}>Họ:</Text>
              <Text style={styles.collumn}>Tên:</Text>
              <Text style={styles.collumn}>Giới tính:</Text>
              <Text style={styles.collumn}>Ngày sinh:</Text>
              <Text style={styles.collumn}>Số điện thoại:</Text>
              <Text style={styles.collumn}>Email:</Text>
            </View>
            <View style={{flex: 2}}>
              <Text style={[styles.collumn, styles.collumn1]}>
                {formData.last_name.trimEnd()}
              </Text>
              <Text style={[styles.collumn, styles.collumn1]}>
                {formData.first_name}
              </Text>
              <Text style={[styles.collumn, styles.collumn1]}>
                {formData.sex ? 'Nam' : 'Nữ'}
              </Text>
              <Text style={[styles.collumn, styles.collumn1]}>
                {formData.dOb}
              </Text>
              <Text style={[styles.collumn, styles.collumn1]}>
                {formData.phone}
              </Text>
              <Text style={[styles.collumn, styles.collumn1]}>
                {showEmail(formData.email)}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              position: 'absolute',
              bottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => signUp()}
              style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

/*
first_name:
last_name: 
password: 
email: 
phone: 
sex:  "1" || "0",
dOb: dd/mm/yyyy
*/
export default Register;

const styles = StyleSheet.create({
  collumn: {
    fontSize: 20,
    padding: 5,
    marginTop: 5,
    borderBottomColor: 'rgba(0,0,0,.4)',
    paddingLeft: 10,
  },
  collumn1: {
    textAlign: 'left',
    marginLeft: 10,
  },
  input: {
    width: '95%',
    height: 55,
    backgroundColor: 'transparent',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    borderBottomColor: 'rgba(0,0,0,.5)',
    borderBottomWidth: 1,
  },
  appButtonContainer: {
    marginTop: 10,
    width: '90%',
    backgroundColor: '#1877F2',
    borderRadius: 5,
    paddingVertical: 10,
    alignContent: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
