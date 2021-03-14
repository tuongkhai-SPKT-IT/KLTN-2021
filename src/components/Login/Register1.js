import { NativeRouter, Route, Link, useHistory, useRouteMatch, } from 'react-router-native';
import React, { Component, useState, useEffect, useRef } from 'react';
import * as storeKeys from '../Constants';
import { Register_Request } from '../Redux/Actions/Login.Action';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modalbox';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel, } from 'react-native-simple-radio-button';
import { StyleSheet, View, Button, BackHandler, TextInput, Text, TouchableOpacity, Image, Keyboard, Alert, ScrollView, ActivityIndicator } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
const Stack = createStackNavigator();
const Register = ({ navigation }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setformData] = useState({
    password: '',
    email: '',
    phone: '',
    sex: '', //1 || 0 // 1 là nam, 0 là nữ
    dOb: '',
  });
  const [alertModal, setAlertModal] = useState(true);
  const initRef = useRef(null);
  const input1 = useRef(null);
  const input2 = useRef(null);
  const [date, setDate] = useState(new Date());
  const storeState = useSelector((state) => state.login);
  const [inputName, setInputName] = useState('');

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
  const setUserName = ({ navigation }) => {
    const [firstName, setFirstName] = useState(formData.first_name);
    const [lastName, setLastName] = useState(formData.last_name);
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 70,
          }}>
          Bạn tên gì?
        </Text>

        <View style={{ width: '100%', flexDirection: 'row', marginBottom: 35 }}>
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
            onChangeText={(val) => setFirstName(val)}
            value={firstName}
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
            onChangeText={(val) => setLastName(val)}
            value={lastName}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            if (!firstName) {
              Alert.alert('Bạn cần phải nhập đầy đủ cả họ và tên');
              input1.current.focus();
              return;
            }
            if (!lastName) {
              Alert.alert('Bạn cần phải nhập đầy đủ cả họ và tên');
              input2.current.focus();
              return;
            } else {
              setformData({
                ...formData, first_name: firstName, last_name: lastName
              })
              setAlertModal(false);
              navigation.push('dateOfBirth');
            }
          }}
          style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const setDateOfBirth = ({ navigation }) => {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <DatePicker
          date={date}
          style={{ marginVertical: 50, backgroundColor: "transparent" }}
          locale="vi"
          onDateChange={(e) => {
            setDate(e);
          }}
          mode="date"
        />
        <TouchableOpacity
          onPress={() => {
            if (comparedDate(date)) {
              setformData({ ...formData, dOb: formatDateTime(date) });
              console.log(formData);
              navigation.push('Sex');
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
  const setSex = ({ navigation }) => {
    var radio_props = [
      { label: 'Nữ', value: 0 },
      { label: 'Nam', value: 1 },
    ];
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          position: 'relative',
        }}>
        <Text style={{ fontWeight: 'bold', fontSize: 24, marginVertical: 70 }}>
          Giới tính của bạn là gì?
        </Text>
        <RadioForm
          formHorizontal={false}
          animation={true}
          style={{ width: '90%' }}>
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
                  labelStyle={{ fontSize: 22, color: '#000', paddingTop: 5 }}
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
              navigation.push('EmailandPhone');
              setformData({ ...formData, sex: isSelected });
            } else {
              Alert.alert(
                'Bạn phải chọn giới tính (giới tính trên giấy khai sinh)',
              );
            }
          }}
          style={[styles.appButtonContainer, { marginTop: 70 }]}>
          <Text style={styles.appButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const setPhoneEmail = ({ navigation }) => {
    const [phone, setPhone] = useState(formData.email);
    const [email, setEmail] = useState(formData.phone);
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 70,
          }}>
          Nhập số di động và email của bạn
        </Text>
        <View style={{ width: '100%', flexDirection: 'column', marginTop: 15 }}>
          <TextInput
            style={[styles.input]}
            ref={input1}
            placeholder="Số điện thoại "
            value={phone}
            autoCapitalize="none"
            placeholderTextColor="black"
            keyboardType="numbers-and-punctuation"
            onChangeText={(val) => setPhone(val.trimEnd())}
          />

          <TextInput
            style={[styles.input]}
            ref={input2}
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            placeholderTextColor="black"
            onChangeText={(val) => setEmail(val.trimEnd())}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!phone) {
              Alert.alert('Bạn cần phải nhập đầy đủ cả số điện thoại và email');
              input1.current.focus();
              return;
            }
            if (!email) {
              Alert.alert('Bạn cần phải nhập đầy đủ cả số điện thoại và email');
              input2.current.focus();
              return;
            } else {
              setformData({ ...formData, phone: phone, email: email })
              navigation.push('Password');
            }
          }}
          style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const setPassword = ({ navigation }) => {
    const [passWord, setPassWord] = useState(formData.password);
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
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
            marginVertical: 15,
          }}>
          <TextInput
            style={[styles.input]}
            placeholder="Nhập mật khẩu "
            autoCapitalize="none"
            placeholderTextColor="black"
            secureTextEntry
            value={passWord}
            onChangeText={(val) => setPassWord(val.trimEnd())} />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("doneRegister")
            setformData({ ...formData, password: passWord })
          }}
          style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const doneInfo = () => {
    return <View style={{ width: '100%', height: '100%' }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          position: 'absolute',
          top: 20,
        }}>
        Đây là thông tin tài khoản của bạn, bạn hãy kiểm tra lại lần cuối
        và xác thực đăng ký
    </Text>
      <View style={{ flexDirection: 'row', marginTop: 150 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.collumn}>Họ:</Text>
          <Text style={styles.collumn}>Tên:</Text>
          <Text style={styles.collumn}>Giới tính:</Text>
          <Text style={styles.collumn}>Ngày sinh:</Text>
          <Text style={styles.collumn}>Số điện thoại:</Text>
          <Text style={styles.collumn}>Email:</Text>
        </View>
        <View style={{ flex: 2 }}>
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
  }
  const alertBackLogin = () => {
    return (
      <>
        <View style={{ width: '100%', paddingHorizontal: 15 }}>
          <Text
            style={{
              color: 'black',
              fontSize: 22,
              fontWeight: '800',
              paddingBottom: 10,
            }}>
            Bạn có muốn dừng tạo tài khoản không?
          </Text>
          <Text style={{ color: 'black', fontSize: 22, fontWeight: '800' }}>
            Nếu dừng bây giờ, bạn sẽ mất toàn bộ thông tin đã điền
          </Text>
        </View>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => initRef.current.close()}
            style={[
              styles.appButtonContainer,
              { flex: 1, width: 0, backgroundColor: 'transparent' },
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
              navigation.popToTop();
            }}
            style={[
              styles.appButtonContainer,
              { flex: 1, width: 0, backgroundColor: 'transparent' },
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
        <View style={{ width: '100%', paddingHorizontal: 15 }}>
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
        <View style={{ width: '100%', flexDirection: 'row' }}>
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
    <>
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
      <Stack.Navigator>
        <Stack.Screen
          name="userName"
          options={{
            title: "Tên", headerTitleStyle: { fontSize: 25 }, headerLeft: () => (<HeaderBackButton onPress={() => {
              Keyboard.dismiss();
              initRef.current.open();
            }} />)
          }}
          component={setUserName}
        />
        <Stack.Screen name="dateOfBirth" options={{
          headerLeft: () => (<HeaderBackButton onPress={() => {
            navigation.navigate("userName");
            setAlertModal(true);
          }} />),
          title: "Ngày sinh", headerTitleStyle: { fontSize: 25, },
        }} component={setDateOfBirth} />
        <Stack.Screen name="Sex"
          options={{ title: "Giới tính", headerTitleStyle: { fontSize: 25 } }}
          component={setSex} />
        <Stack.Screen name="EmailandPhone" options={{
          title: "Số điện thoại và Email", headerTitleStyle: { fontSize: 25 }
        }} component={setPhoneEmail} />
        <Stack.Screen name="Password"
          options={{
            title: "Mật khẩu",
            headerTitleStyle: {
              fontSize: 25,
            },
          }} component={setPassword} />
        <Stack.Screen name="doneRegister"
          options={{
            headerShown: false
          }} component={doneInfo} />
      </Stack.Navigator>
    </>
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
