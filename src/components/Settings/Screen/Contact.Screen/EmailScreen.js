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

export default function EmailScreen({navigation}) {
  const [emailInput, setEmailInput] = useState('');
  const Setting = useSelector((state) => state.Setting);
  const [passwordInput, setPasswordInput] = useState('');
  const [visible, setVisible] = useState({
    email: false,
    password: false,
  });

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(Change_User_Contact(emailInput, '', passwordInput));

    dispatch(Clear_Setting());
    // await dispatch(Fetch_Setting());
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
  const onChangeTextEmail = (e) => {
    setVisible({
      ...visible,
      email: true,
    });
    setEmailInput(e);
    if (e.length === 0)
      setVisible({
        ...visible,
        email: false,
      });
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text h4 style={{padding: 10, fontSize: 18, textAlign: 'center'}}>
        Make sure that you remember this email, because you will need email for
        login our system
      </Text>
      <Text h4 h4Style={{padding: 10}}>
        Email
      </Text>
      <View style={styles.inputBox}>
        <TextInput
          autoCapitalize="none"
          onChangeText={onChangeTextEmail}
          placeholder={Setting.email}
          value={emailInput}
          style={styles.inputText}
          onBlur={() => setVisible({email: false, password: false})}
        />
        {visible.email && (
          <TouchableOpacity
            style={styles.rigthInputIcon}
            onPress={() => {
              setEmailInput('');
              setVisible({...visible, email: false});
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
          style={styles.inputText}
          secureTextEntry={true}
          autoCapitalize="none"
          onBlur={() => setVisible({email: false, password: false})}
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
