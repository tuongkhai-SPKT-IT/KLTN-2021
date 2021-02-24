import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, BackHandler, ScrollView} from 'react-native';
import UpStatus from './UpStatus';
import {NativeRouter, Route, Link, useHistory} from 'react-router-native';
import {MainContent, ViewLCS, Comment} from '../ContentStatus';
const Home = () => {
  const history = useHistory();
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      history.goBack();
      return true;
    });
  }, []);
  return (
    <NativeRouter>
      <UpStatus />
    </NativeRouter>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
});
export default Home;
