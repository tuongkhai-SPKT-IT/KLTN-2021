import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DetailMessenger = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'yellow',
        zIndex: 999,
        height: 1000,
        position: 'absolute',
      }}>
      <Text>Đây là details messages</Text>
    </View>
  );
};
export default DetailMessenger;
