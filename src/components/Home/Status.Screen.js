import React from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import ContentStatus from '../ContentStatus';

export default function StatusScreen({navigation, route}) {
  console.log(route.params);
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{backgroundColor: 'white'}}>
      <ContentStatus profilePage={false} srcData={route.params.srcData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
