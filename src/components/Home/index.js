import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, BackHandler, ScrollView, StatusBar} from 'react-native';
import UpStatus from './UpStatus';
import {NativeRouter, Route, Link, useHistory} from 'react-router-native';
import ContentStatus from '../ContentStatus';
import {useDispatch, useSelector} from 'react-redux';
import AppBar from '../AppBar';
import { SafeAreaView } from 'react-navigation';
import ToolBar from '../ToolBar';
const Home = () => {
  const history = useHistory();
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      history.goBack();
      return true;
    });
  }, []);
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state.HomePage);
  console.log(storeState);
  return (
    <NativeRouter>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <AppBar />
          <ToolBar/>
        </ScrollView>
      </SafeAreaView>
    </NativeRouter>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
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
