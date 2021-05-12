import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ActivityIndicator} from 'react-native';

export default function ContactScreen({navigation}) {
  const Setting = useSelector((state) => state.Setting);
  const renderContact = Setting;
  const handleOnPress = (e, press) => {
    e.preventDefault();
    if (press === 1) {
      navigation.navigate('Email');
    }
    if (press === 2) {
      navigation.navigate('Phone');
    }
  };
  const renderTitle = (title, press, icon) => {
    return (
      <TouchableOpacity
        onPress={(e) => handleOnPress(e, press)}
        style={styles.button}>
        <View style={styles.box}>
          {icon === 'phone' && <FontAwesome5 name={'phone-alt'} size={22} />}
          {icon === 'mail' && <Fontisto name={'email'} size={22} />}
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
        </View>

        <FontAwesome5 name="chevron-right" size={22} />
      </TouchableOpacity>
    );
  };
  if (renderContact.email.length === 0 || renderContact.phone.length === 0)
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

  return (
    <View>
      <Text h3 h3Style={{padding: 10}}>
        Manage Contact Information
      </Text>
      <View style={styles.hr} />

      {renderTitle(renderContact.email, 1, 'mail')}
      <View style={styles.hr} />
      {renderTitle(renderContact.phone, 2, 'phone')}
      <View style={styles.hr} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 25,
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.6,
  },
  box: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 30,
    marginRight: 5,
    opacity: 0.5,
    marginRight: 8,
  },
});
