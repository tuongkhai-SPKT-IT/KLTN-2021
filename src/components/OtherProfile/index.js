import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  ScrollView,
  DevSettings,
  Pressable,
} from 'react-native';
import HeaderOther from './HeaderOther';
import Modal from 'react-native-modal';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import {Avatar, Button, Text, SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import IntroOther from './IntroOther';
import {createStackNavigator} from '@react-navigation/stack';
import OthersFriend from './OthersFriend';
import ContentStatus from '../ContentStatus';
const OtherProfile = ({navigation}) => {
  const Stack = createStackNavigator();

  const mainProfile = ({navigation}) => {
    const OtherProfile = useSelector((state) => state.OtherProfile);
    console.log(OtherProfile);
    const dispatch = useDispatch();

    const showstatus = () => {
      const srcData = OtherProfile.status;

      if (srcData.length > 0) {
        {
          return srcData.map((stt, i) => {
            return (
              <View key={i} style={{backgroundColor: 'rgba(0,0,0,.3)'}}>
                <ContentStatus srcData={stt} />
              </View>
            );
          });
        }
      } else {
        return <Text style={{}}>Không có tin tức nào!!</Text>;
      }
    };

    return (
      <>
        <View style={{position: 'relative'}}>
          <ScrollView>
            <HeaderOther />
            <View
              style={{
                width: '100%',
                height: 50,
                // marginBottom: 10,
              }}></View>
            <Text
              h4
              style={{
                textAlign: 'center',
                marginBottom: 10,
              }}>
              {OtherProfile.intro.user_name}
            </Text>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                opacity: 0.5,
              }}
            />
            <IntroOther />

            <View
              style={{
                paddingBottom: 10,
                borderBottomWidth: 0.8,
                marginBottom: 20,
              }}>
              {OtherProfile.intro.friend_array ? (
                OtherProfile.intro.friend_array.length > 6 && (
                  <Button
                    buttonStyle={{
                      backgroundColor: 'rgba(0,0,0,.09555)',
                      marginVertical: 10,
                      zIndex: 999,
                    }}
                    containerStyle={{
                      width: '100%',
                    }}
                    onPress={() => navigation.navigate('fullfriends')}
                    title="See All Friends"
                    titleStyle={{color: 'black'}}
                  />
                )
              ) : (
                <></>
              )}
            </View>
            <View
              style={{
                backgroundColor: 'gray',
                height: 20,
                width: '100%',
                opacity: 0.6,
              }}></View>
            {showstatus()}
          </ScrollView>
        </View>
      </>
    );
  };
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileUser"
          options={{
            headerShown: false,
          }}
          component={mainProfile}
        />
        <Stack.Screen
          name="fullfriends"
          options={{
            title: 'Bạn Bè',
          }}
          component={OthersFriend}
        />
      </Stack.Navigator>
    </>
  );
};
export default OtherProfile;
const styles = StyleSheet.create({});
