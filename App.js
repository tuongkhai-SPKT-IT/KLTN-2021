import 'react-native-gesture-handler';
import {NativeRouter, Route, Link, useHistory} from 'react-router-native';
import React, {Component, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Login, Home} from './src/components';
import store from './src/components/Redux/Store';
import * as myConst from './src/components/Constants';
import Register1 from './src/components/Login/Register1';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  var firstStateAll = store.getState();
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('logged').then((value) => {
      if (value) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  }, []);

  return (
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="Home" component={HomeScreen} />
    //     <Tab.Screen name="Settings" component={SettingsScreen} />
    //   </Tab.Navigator>
    // </NavigationContainer>
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <NativeRouter>
          <View style={{height: '100%'}}>
            {/* <Register /> */}
            <Route exact path="/" component={Login} />
            <Route exact path="/Home" component={Home} />

            {/* <Route path="/" component={Home} /> */}
          </View>
        </NativeRouter>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
