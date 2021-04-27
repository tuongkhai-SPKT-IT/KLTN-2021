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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Button, Text, SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import IntroOther from './IntroOther';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import OthersFriend from './OthersFriend';
import {
  Get_Intro_Other,
  Get_Status_Other,
  Clear_Store_Other,
  Check_Relationship,
  Add_Friend,
  Cancel_Friend,
  Accept_Friend,
} from '../Redux/Actions/OtherProfile.Action';
import ContentStatus from '../ContentStatus';
import {ActivityIndicator} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const OtherProfile = ({route, navigation}) => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      dispatch(Clear_Store_Other());
      dispatch(Get_Intro_Other(route.params.userId));
      dispatch(Get_Status_Other(route.params.userId));
      dispatch(Check_Relationship(route.params.userId));
    }
  }, [route.params]);
  const mainProfile = ({navigation}) => {
    const OtherProfile = useSelector((state) => state.OtherProfile);
    const userInfo = useSelector((state) => state.UserInfo);
    const token = userInfo.information[3].value;
    const [relationShip, setRelationShip] = useState(false); // true: friend, false: requested, not friend
    const [buttonFriend, setButtonFriend] = useState({
      // title: 'Add friend',
      // icon: 'user-plus',
    });
    const [buttonMessenger, setButtonMessenger] = useState({});
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
        return <Text style={{padding: 20}}>Không có tin tức nào!!</Text>;
      }
    };
    const createRoom = () => {
      navigation.jumpTo('Messengers');
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
              style={{flexDirection: 'row', width: '100%', marginBottom: 10}}>
              <Button
                buttonStyle={{backgroundColor: '#E4E6EB'}}
                titleStyle={{color: 'black'}}
                containerStyle={{marginHorizontal: 10, flex: 10}}
                loadingProps={{animating: true}}
                icon={
                  relationShip ? (
                    <MaterialCommunityIcons
                      name={buttonMessenger.icon}
                      style={{marginRight: 10}}
                      size={20}
                    />
                  ) : (
                    <FontAwesome5
                      name={buttonFriend.icon}
                      style={{marginRight: 10}}
                      size={20}
                    />
                  )
                }
                onPress={() => alert('click')}
                title={
                  relationShip ? buttonMessenger.title : buttonFriend.title
                }
                onPress={() => dispatch(Accept_Friend(route.params.userId))}
                title={'Confirm'}
                titleStyle={{color: 'black'}}
              />

              <Button
                buttonStyle={{
                  backgroundColor: '#E4E6EB',
                  width: 40,
                }}
                titleStyle={{color: 'black'}}
                containerStyle={{marginHorizontal: 10}}
                loadingProps={{animating: true}}
                icon={
                  relationShip ? (
                    <FontAwesome5 name={buttonFriend.icon} size={20} />
                  ) : (
                    <MaterialCommunityIcons
                      name={buttonMessenger.icon}
                      size={20}
                    />
                  )
                }
                onPress={() => dispatch(Cancel_Friend(route.params.userId))}
                title={'Delete Request'}
                titleStyle={{color: 'black'}}
              />
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                opacity: 0.5,
              }}
            />
            <IntroOther direction={() => navigation.push('OtherUser')} />

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
                    onPress={() => navigation.push('fullfriends')}
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
          name="OtherUser"
          options={{
            headerShown: false,
          }}
          component={OtherProfile}
        />
        <Stack.Screen
          name="fullfriends"
          options={{
            title: 'Friends',
          }}
          component={OthersFriend}
        />
      </Stack.Navigator>
    </>
  );
};
export default OtherProfile;
const styles = StyleSheet.create({});
