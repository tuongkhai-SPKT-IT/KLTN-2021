import React from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Appbar} from 'react-native-paper';
import {Text} from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

export default function BlockInfo({navigation}) {
  const Setting = useSelector((state) => state.Setting);
  const renderUserName = Setting;
  const handleOnPress = (e, press) => {
    e.preventDefault();
    if (press === 1) {
      navigation.navigate('NameScreen');
    }
    if (press === 2) {
      navigation.navigate('ContactScreen');
    }
    if (press === 3) {
      e.preventDefault();
    }
    if (press === 4) {
      navigation.navigate('DateOfBirthScreen');
    }
    if (press === 5) {
      navigation.navigate('PasswordScreen');
    }
  };
  const renderTitle = (title, value, press) => {
    return (
      <TouchableOpacity
        onPress={(e) => handleOnPress(e, press)}
        style={styles.button}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
          <Text style={{fontSize: 18}}>{value}</Text>
        </View>

        <FontAwesome5 name="chevron-right" size={22} />
      </TouchableOpacity>
    );
  };
  if (renderUserName.userName.length > 0)
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{paddingHorizontal: 15, width: '100%', height: '100%'}}>
          <Text h4 style={{paddingVertical: 10}}>
            Personal Information
          </Text>
          {renderTitle('Name', renderUserName.userName, 1)}
          <View style={styles.hr} />

          {renderTitle(
            'Contact Info',
            'Manage your phone numbers and emails',
            2,
          )}
          <View style={styles.hr} />

          {renderTitle('Sex', renderUserName.sex ? 'Male' : 'Female', 3)}
          <View style={styles.hr} />

          {renderTitle('Date Of Birth', renderUserName.dob, 4)}
          <View style={styles.hr} />

          {renderTitle('Manage Account', 'Change your password account', 5)}
        </ScrollView>
      </View>
    );
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.6,
  },
});
