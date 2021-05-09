import {HeaderBackButton} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';
import {ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useSelector} from 'react-redux';
import * as styles from './Styles';
import CheckPassword from './CheckPassword';
export default function UserNameScreen({navigation}) {
  const Setting = useSelector((state) => state.Setting);
  const renderUserName = Setting;
  const [firstName, setFirstName] = useState(renderUserName.firstName);
  const [lastName, setLastName] = useState(renderUserName.lastName);
  const [navigatePassword, setNavigatePassword] = useState(false);
  const backPassword = (e) => {
    setNavigatePassword(false);
    navigation.setOptions({
      title: 'Name',
    });
  };
  const accecptChange = (e) => {
    setNavigatePassword(true);
    navigation.setOptions({
      title: 'Preview your new name',
      headerLeft: (props) => <HeaderBackButton onPress={backPassword} />,
    });

    // if (
    //   firstName !== renderUserName.firstName ||
    //   lastName !== renderUserName.lastName
    // ) {
    //   setNavigatePassword(true);
    //   navigation.setOptions({
    //     headerShown: false,
    //   });
    // } else e.preventDefault();
  };
  const cancelChange = (e) => {
    navigation.goBack();
  };
  useEffect(() => {
    if (renderUserName.firstName) setFirstName(renderUserName.firstName);
    if (renderUserName.lastName) setLastName(renderUserName.lastName);
  }, [renderUserName]);
  const renderInputName = (title, value, setValue) => {
    return (
      <>
        <Text style={styles.styles.titleInput}>{title}</Text>
        <View style={styles.styles.inputBox}>
          <TextInput
            style={styles.styles.inputText}
            onChangeText={(e) => setValue(e)}
            value={value}
            // placeholder={renderUserName.first_name}
          />
        </View>
      </>
    );
  };
  if (Object.keys(Setting).length !== 0) {
    if (!navigatePassword) {
      return (
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.styles.container}>
            <View style={styles.styles.block1}>
              <Text
                style={{
                  textAlign: 'center',
                  paddingVertical: 10,
                  paddingTop: 20,
                  fontSize: 18,
                }}>
                Your change will be updated on our server.
              </Text>
              {renderInputName('First name', firstName, setFirstName)}
              <View style={styles.styles.blockDevide} />
              {renderInputName('Last name', lastName, setLastName)}
              <View style={styles.styles.blockDevide} />
              <View>
                <Button
                  buttonStyle={{borderWidth: 1, borderColor: 'black'}}
                  containerStyle={{margin: 10}}
                  onPress={accecptChange}
                  title="Review change"
                  titleStyle={{marginHorizontal: 5}}
                />
                <Button
                  type="outline"
                  buttonStyle={{
                    backgroundColor: 'white',
                    borderColor: 'black',
                  }}
                  containerStyle={{margin: 10}}
                  onPress={cancelChange}
                  title="Cancel"
                  titleStyle={{marginHorizontal: 5, color: 'black'}}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <CheckPassword
          firstName={firstName}
          lastName={lastName}
          setNavigatePassword={setNavigatePassword}
          backPassword={backPassword}
        />
      );
    }
  }
  return (
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
        Loading
      </Text>
    </View>
  );
}
