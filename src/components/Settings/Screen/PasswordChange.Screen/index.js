import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Change_Password } from '../../../Redux/Actions/Setting.Action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

export default function index() {
  const [oldPassword, setOldPassword] = useState('');
  const [seeOldPassword, setSeeOldPassword] = useState(true);
  const [oldVisible, setOldVisible] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [seeNewPassword, setSeeNewPassword] = useState(true);

  const [retypePassword, setRetypePassword] = useState('');
  const [seeRetype, setSeeRetype] = useState(true);

  const [checkRetype, setCheckRetype] = useState(false);
  const dispatch = useDispatch();

  const visibleClear = (visible, setVisible) => {
    
  };
  useEffect(() => {
    if (newPassword !== retypePassword) setCheckRetype(false);
    else setCheckRetype(true);
  }, [newPassword, retypePassword]);
  const renderCheckType = (title) => {
    if (title === 'Re-type new Password' || title === 'New Password')
      if (retypePassword.length > 0 && newPassword.length > 0) {
        return (
          <View
            style={{
              width: 40,
              justifyContent: 'center',
            }}
            onPress={() => setSee(!see)}>
            <AntDesign
              name={checkRetype ? 'check' : 'close'}
              size={18}
              color={checkRetype ? 'green' : 'red'}
            />
          </View>
        );
      } else {
        return <></>;
      }
    else {
      return <></>;
    }
  };
  const renderInputName = (title, value, setValue, see, setSee, visile, setVisible) => {
    return (
      <>
        <Text style={styles.titleInput}>{title}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputText}
              onChangeText={(e) => {
                if (e.length <= 32) setValue(e);
                else return;
              }}
              value={value}
              secureTextEntry={see}
              placeholder={title}
              autoCapitalize="none"
            />
            {value !== '' && (
              <TouchableOpacity
                style={{
                  width: 40,
                  justifyContent: 'center',
                }}
                onPress={() => setSee(!see)}>
                <Octicons name={see ? 'eye' : 'eye-closed'} size={18} />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => visibleClear(visile, setVisible)}>
              <MaterialIcons name="close" size={25} />
            </TouchableOpacity>
          </View>
          {renderCheckType(title)}
        </View>
      </>
    );
  };
  const accecptChange = (e) => {
    // if (oldPassword !== '' && newPassword !== '' && retypePassword !== '') {
    //   if (oldPassword === newPassword)
    if (checkRetype && oldPassword !== '')
      dispatch(Change_Password(oldPassword, newPassword));
    //     alert('You can not change same password');
    // }
  };
  const cancelChange = (e) => { };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text h4 h4Style={{ textAlign: 'center', paddingVertical: 10 }}>
        This screen help you change your password account
      </Text>
      {renderInputName(
        'Old Password',
        oldPassword,
        setOldPassword,
        seeOldPassword,
        setSeeOldPassword,
      )}
      {renderInputName(
        'New Password',
        newPassword,
        setNewPassword,
        seeNewPassword,
        setSeeNewPassword,
      )}
      {renderInputName(
        'Re-type new Password',
        retypePassword,
        setRetypePassword,
        seeRetype,
        setSeeRetype,
      )}
      <View>
        <Button
          buttonStyle={{ borderWidth: 1, borderColor: 'black' }}
          containerStyle={{ marginHorizontal: 10, marginTop: 10 }}
          onPress={accecptChange}
          title="Submit change"
          titleStyle={{ marginHorizontal: 5 }}
        />
        <Button
          type="outline"
          buttonStyle={{
            backgroundColor: 'white',
            borderColor: 'black',
          }}
          containerStyle={{ marginHorizontal: 10, marginTop: 10 }}
          onPress={cancelChange}
          title="Cancel"
          titleStyle={{ marginHorizontal: 5, color: 'black' }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.555,
  },
  inputBox: {
    borderWidth: 0.5,
    borderColor: 'black',
    fontSize: 18,
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  titleInput: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },

  inputText: {
    fontSize: 18,
    flex: 1,
  },
});
