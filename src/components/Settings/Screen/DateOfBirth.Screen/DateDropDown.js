import React, {useEffect, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button, Text} from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {
  Change_Dob_Setting,
  Clear_Setting,
  Fetch_Setting,
} from '../../../Redux/Actions/Setting.Action';

export default function DateDropDown(props) {
  const today = new Date(props.year, props.month - 1, props.day);
  const [date, setDate] = useState(today);
  const [visible, setVisible] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const navigation = useNavigation();
  const comparedDate = (date) => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 4);
    // console.log(today);
    return today.getTime() >= date.getTime();
  };
  const formatDateTime = (e) => {
    var ngay = e.getDate();
    var thang = e.getMonth() + 1;
    var nam = e.getFullYear();
    ngay = `0${ngay}`.slice(-2);
    thang = `0${thang}`.slice(-2);
    return ngay + '/' + thang + '/' + nam;
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
            Warning !!!
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '800',
              paddingBottom: 10,
              textAlign: 'center',
            }}>
            Your birth day is not valid
          </Text>
        </View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Button
            buttonStyle={{borderColor: 'black'}}
            containerStyle={{
              marginHorizontal: 10,
              marginVertical: 5,
              flex: 1,
            }}
            onPress={() => setVisible(false)}
            title="OK"
            titleStyle={{marginHorizontal: 5}}
          />
        </View>
      </>
    );
  };
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    setVisible(false);
    dispatch(Change_Dob_Setting(formatDateTime(date), passwordInput));
    dispatch(Clear_Setting());
    setTimeout(() => {
      navigation.goBack();
    }, 600);
  };

  const onChangeTextPassword = (e) => {
    setVisiblePassword(true);
    setPasswordInput(e);
    if (e.length === 0) setVisiblePassword(false);
  };
  const passwordSubmit = () => {
    return (
      <>
        <Text style={{padding: 10, fontSize: 20}}>
          Please enter password for submit
        </Text>
        <Text h4 h4Style={{padding: 10}}>
          Password
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={onChangeTextPassword}
            placeholder={'Type your password here...'}
            value={passwordInput}
            autoCapitalize="none"
            style={styles.inputText}
            secureTextEntry={true}
            onBlur={() => setVisiblePassword(false)}
          />
          {visiblePassword && (
            <TouchableOpacity
              style={styles.rigthInputIcon}
              onPress={() => {
                setPasswordInput('');
                setVisiblePassword(false);
              }}>
              <Icon name="close" size={22} />
            </TouchableOpacity>
          )}
        </View>
        <Button
          buttonStyle={{}}
          containerStyle={{
            marginHorizontal: 10,
            marginVertical: 5,
          }}
          onPress={handleSubmit}
          title="Submit change"
          titleStyle={{marginHorizontal: 5}}
        />
        <Button
          type="outline"
          buttonStyle={{backgroundColor: 'white', borderColor: 'black'}}
          containerStyle={{
            marginHorizontal: 10,
            marginVertical: 5,
          }}
          onPress={() => {
            setVisible(false);
            setPasswordInput('');
          }}
          title="Cancel"
          titleStyle={{marginHorizontal: 5}}
        />
      </>
    );
  };
  const backdropPress = (e) => {
    if (comparedDate(date)) {
      setVisible(false);
      setPasswordInput('');
    } else e.preventDefault();
  };
  const confirmPress = (e) => {
    if (date === today) {
      e.preventDefault();
      alert('You have to change date');
    } else setVisible(true);
  };
  return (
    <>
      <Modal
        isVisible={visible}
        backdropColor="#000"
        swipeDirection={['up', 'down']}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        avoidKeyboard
        onSwipeComplete={() => setVisible(false)}
        onSwipeCancel={() => setVisible(true)}
        style={{margin: 0}}
        onBackdropPress={backdropPress}
        animationInTiming={600}
        animationOutTiming={600}
        backdropOpacity={0.5}>
        <View
          style={{
            backgroundColor: 'white',
            paddingBottom: 10,
            justifyContent: 'center',
          }}>
          {comparedDate(date) ? passwordSubmit() : alertDob()}
        </View>
      </Modal>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <Text h4 h4Style={{padding: 10}}>
            Manage your birth day
          </Text>
          <Text style={{fontSize: 15, paddingBottom: 15, textAlign: 'center'}}>
            This will display on your profile and all of user will see this.
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <DatePicker
              date={date}
              style={{flex: 1}}
              locale="vi"
              onDateChange={(e) => {
                setDate(e);
              }}
              mode="date"
            />
          </View>
          <View style={{width: '100%', height: 20}} />
          <Button
            buttonStyle={{}}
            containerStyle={{
              marginHorizontal: 10,
              marginVertical: 5,
              width: '100%',
            }}
            onPress={confirmPress}
            title="Confirm"
            titleStyle={{marginHorizontal: 5}}
          />
          <Button
            type="outline"
            buttonStyle={{backgroundColor: 'white', borderColor: 'black'}}
            containerStyle={{
              marginHorizontal: 10,
              marginVertical: 5,
              width: '100%',
            }}
            onPress={() => navigation.goBack()}
            title="Cancel"
            titleStyle={{marginHorizontal: 5}}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
  },
  inputText: {
    fontSize: 18,
    flex: 1,
    paddingRight: 23,
  },
  rigthInputIcon: {
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 5,
    zIndex: 999,
  },
});
