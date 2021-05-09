import {useNavigation} from '@react-navigation/core';
import {HeaderBackButton} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
// import moduleName from 'react native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {
  navigate_To_Other,
  Back_From_Other,
} from '../Redux/Actions/OtherProfile.Action';
export default function HeaderScreen(props) {
  const [value, setValue] = useState('');
  const OtherProfile = useSelector((state) => state.OtherProfile);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigateFromArr = () => {
    dispatch(Back_From_Other());
    const listArr = OtherProfile.arrPrevious;
    if (listArr.length > 0) {
      navigation.navigate('OtherUser', {
        userId: listArr[listArr.length - 1],
      });
    } else navigation.goBack();
  };
  useEffect(() => {
    console.log(OtherProfile.arrPrevious);
  }, []);
  // useEffect(() => {
  //   console.log(props);
  // }, []);
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={navigateFromArr}
        style={{justifyContent: 'center', padding: 8}}>
        <AntDesign name="arrowleft" size={24} />
      </TouchableOpacity>
      <SearchBar
        round
        platform="ios"
        containerStyle={{
          backgroundColor: 'transparent',
          flex: 1,
          paddingTop: 10,
          paddingBottom: 10,
        }}
        onChangeText={(newVal) => setValue(newVal)}
        placeholder="Tìm kiếm"
        cancelButtonTitle="Cancel"
        onCancel={() => console.log(1)}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
