import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Input, Button} from 'react-native-elements';
// import {TextInput} from 'react-native';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Change_User_Contact,
  Clear_Setting,
  Fetch_Setting,
} from '../../../Redux/Actions/Setting.Action';

export default function PhoneScreen({navigation}) {
  const [phoneInput, setPhoneInput] = useState('');
  const Setting = useSelector((state) => state.Setting);
  const [passwordInput, setPasswordInput] = useState('');
  const [visible, setVisible] = useState({
    phone: false,
    password: false,
  });

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    dispatch(Change_User_Contact('', phoneInput, passwordInput));
    await dispatch(Clear_Setting());
    await dispatch(Fetch_Setting());
    navigation.goBack();
  };
  const onChangeTextPassword = (e) => {
    setVisible({
      ...visible,
      password: true,
    });
    setPasswordInput(e);
    if (e.length === 0)
      setVisible({
        ...visible,
        password: false,
      });
  };
  const onChangeTextPhone = (e) => {
    setVisible({
      ...visible,
      phone: true,
    });
    setPhoneInput(e);
    if (e.length === 0)
      setVisible({
        ...visible,
        phone: false,
      });
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text h4 style={{padding: 10, fontSize: 18, textAlign: 'center'}}>
        Make sure that you remember this phone, because you will need phone for
        login our system
      </Text>
      <Text h4 h4Style={{padding: 10}}>
        Phone
      </Text>
      <View style={styles.inputBox}>
        <TextInput
          keyboardType="numeric"
          onChangeText={onChangeTextPhone}
          placeholder={Setting.phone}
          value={phoneInput}
          style={styles.inputText}
          onBlur={() => setVisible({phone: false, password: false})}
        />
        {visible.phone && (
          <TouchableOpacity
            style={styles.rigthInputIcon}
            onPress={() => {
              setPhoneInput('');
              setVisible({...visible, phone: false});
            }}>
            <Icon name="close" size={22} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={{padding: 10, fontSize: 18, paddingVertical: 0}}>
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
          onBlur={() => setVisible({phone: false, password: false})}
        />
        {visible.password && (
          <TouchableOpacity
            style={styles.rigthInputIcon}
            onPress={() => {
              setPasswordInput('');
              setVisible({
                ...visible,
                password: false,
              });
            }}>
            <Icon name="close" size={22} />
          </TouchableOpacity>
        )}
      </View>

      <Button
        buttonStyle={{}}
        containerStyle={{marginHorizontal: 10, marginVertical: 5}}
        onPress={handleSubmit}
        title="Submit change"
        titleStyle={{marginHorizontal: 5}}
      />
      <Button
        type="outline"
        buttonStyle={{backgroundColor: 'white', borderColor: 'black'}}
        containerStyle={{marginHorizontal: 10, marginVertical: 5}}
        onPress={() => navigation.goBack()}
        title="Cancel"
        titleStyle={{marginHorizontal: 5}}
      />
    </ScrollView>
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
