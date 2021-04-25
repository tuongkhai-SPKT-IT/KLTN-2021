import 'react-native-gesture-handler';
import {
  NativeRouter,
  Route,
  Link,
  useHistory,
  Redirect,
} from 'react-router-native';
import React, {Component, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Provider as StoreProvider, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Login, Home} from './src/components';
import store from './src/components/Redux/Store';
import * as myConst from './src/components/Constants';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import API from './src/components/API/API';
import {SOCKET} from "./src/config";
import FlashMessage from "react-native-flash-message";
import Entypo from "react-native-vector-icons/Entypo"

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const [logged, setLogged] = useState(false);
  const [allUserRoute, setAllUserRoute] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(myConst.User_Token).then((value) => {
      if (value) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  });
  useEffect(() => {
    const api = new API();
    AsyncStorage.getItem(myConst.User_Token).then((userToken) => {
      if (userToken) {
        const param = {
          api_token: userToken,
        };
        const header = {
          Authorization: 'bearer ' + userToken,
        };
        const route = 'user/validate-log-in';
        api
          .onCallAPI('post', route, {}, param, header)
          .then((res) => {
            if (res.data.error_code !== 0) {
              AsyncStorage.clear();
              setLogged(false);
            } else {
              setLogged(true);
            }
          })
          .catch((err) => {
            console.log(err);
            AsyncStorage.clear();
            setLogged(false);
          });
      } else {
        setLogged(false);
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <NativeRouter>
          <PaperProvider>
            <NavigationContainer>
              <Route path="/Home" exact component={Home} />
              <Route exact path="/">
                {logged ? <Redirect to="/Home" /> : <Login />}
              </Route>
            </NavigationContainer>
          </PaperProvider>
        </NativeRouter>
      </StoreProvider>
      <FlashMessage 
        titleStyle={{marginTop: 15, textAlign: "justify"}}
        position="top" 
        style={{borderRadius: 12, backgroundColor: "rgb(244,244,244)", margin: 10}}
      />
    </SafeAreaProvider>
  );
};

export default App;
