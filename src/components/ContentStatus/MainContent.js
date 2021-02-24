import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {NativeRouter, Route, Link, useHistory} from 'react-router-native';

const UpStatus = () => {
  const history = useHistory();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        history.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
  return (
    <>
      <View>
        <Text>Day là chỗ chưa caption và hình ảnh</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({

});
export default UpStatus;
