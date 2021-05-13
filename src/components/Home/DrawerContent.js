import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Get_IntroUser} from '../Redux/Actions/ProfileUser.Action';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Drawer} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/core';

export default function DrawerContent(props) {
  const ProfileInfo = useSelector((state) => state.ProfileInfo);
  const [infoDropDown, setInfoDropDown] = useState(false);
  const {introUser} = ProfileInfo;
  const [tabDropDown, setTabDropDown] = useState(false);
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  useLayoutEffect(() => {
    dispatch(Get_IntroUser());
  }, []);
  const navigatePress = (type) => {
    setTabDropDown(false);
    setInfoDropDown(false);
    if (type === 1) {
      props.navigation.jumpTo('Home');
      props.navigation.closeDrawer();
    }
    if (type === 2) {
      props.navigation.navigate('Messengers', {
        screen: 'SmallMessengers',
      });
      props.navigation.closeDrawer();
    }
    if (type === 3) {
      props.navigation.jumpTo('Notifications');
      props.navigation.closeDrawer();
    }
    if (type === 4) {
      props.navigation.jumpTo('Profile');
      props.navigation.closeDrawer();
    }
  };
  const renderTab = (title, icon, typePress) => {
    return (
      <TouchableOpacity
        onPress={() => navigatePress(typePress)}
        style={{
          padding: 10,
          flexDirection: 'row',
          //paddingLeft: 0,
        }}>
        <Icon name={icon} color="#1877F2" size={26} />
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: '900',
            marginLeft: 5,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  const signOut = () => {};
  //   console.log(introUser);
  if (Object.keys(introUser).length !== 0)
    return (
      <View style={{flex: 1, padding: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: introUser.user_avatar}}
            style={{width: 50, height: 50, borderRadius: 40}}
          />
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Text h4 style={{}}>
              {introUser.user_name}
            </Text>
            <Text style={{fontSize: 18}}>
              {introUser.friend_array.length}&nbsp;
              <Text style={{color: 'rgba(0,0,0,.6)'}}>
                {introUser.friend_array.length > 1 ? 'friends' : 'friend'}
              </Text>
            </Text>
          </View>
        </View>

        <DrawerContentScrollView {...props}>
          <Button
            containerStyle={{ borderRadius: 0, marginTop: 10}}
            buttonStyle={{paddingLeft: 0, backgroundColor: 'rgba(0,0,0,.3)'}}
            icon={
              <Ionicons
                name={'information-circle-outline'}
                style={{paddingRight: 10}}
                size={25}
              />
            }
            titleStyle={[styles.btnInforTitle, styles.btnDropDownTitle]}
            onPress={() => setInfoDropDown(!infoDropDown)}
            title="Information"
          />

          {infoDropDown && (
            <View
              style={{
                borderBottomWidth: 1,
              }}>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  //paddingLeft: 0,
                }}>
                <Fontisto name="email" size={25} color="black" />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 20,
                    fontWeight: '900',
                    marginLeft: 5,
                  }}>
                  {introUser.email}
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                  //paddingLeft: 0,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Entypo name="old-phone" size={25} color="black" />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 20,
                    fontWeight: '900',
                    marginLeft: 5,
                  }}>
                  {introUser.phone}
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  //paddingLeft: 0,
                }}>
                <FontAwesome5 name="birthday-cake" size={25} color="black" />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 20,
                    fontWeight: '900',
                    marginLeft: 5,
                    textAlignVertical: 'center',
                  }}>
                  {introUser.dOb}
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  //paddingLeft: 0,
                }}>
                <Ionicons name="male-female-outline" size={25} color="black" />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 20,
                    fontWeight: '900',
                    marginLeft: 5,
                    textAlignVertical: 'center',
                  }}>
                  {introUser.sex === true && 'Nam'}
                  {introUser.sex === false && 'Nữ'}
                </Text>
              </View>
            </View>
          )}

          <Button
            containerStyle={{ borderRadius: 0, marginTop: 10}}
            buttonStyle={{paddingLeft: 0, backgroundColor: 'rgba(0,0,0,.3)'}}
            icon={
              <Icon
                name="table-of-contents"
                style={{paddingRight: 10}}
                size={25}
              />
            }
            titleStyle={[styles.btnInforTitle, styles.btnDropDownTitle]}
            onPress={() => setTabDropDown(!tabDropDown)}
            title="Tab"
          />

          {tabDropDown && (
            <View
              style={{
                borderBottomWidth: 1,
              }}>
              {renderTab('Home', 'home', 1)}
              {renderTab('Messenger', 'facebook-messenger', 2)}
              {renderTab('Notification', 'bell', 3)}
              {renderTab('Profile', 'account-circle', 4)}
            </View>
          )}

          <Button
            containerStyle={{ borderRadius: 0, marginTop: 10}}
            buttonStyle={{paddingLeft: 0, backgroundColor: 'rgba(0,0,0,.3)'}}
            icon={<AntDesign name="setting" size={25} />}
            iconContainerStyle={{}}
            titleStyle={styles.btnInforTitle}
            onPress={() => props.navigation.navigate('Settings')}
            title="Edit information"
          />
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="exit-to-app" color={color} size={size} />
            )}
            label="Sign Out"
            labelStyle={{fontSize: 20, fontWeight: 'bold'}}
            onPress={signOut}
          />
        </Drawer.Section>
      </View>
    );
  else return <></>;
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    //paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    backgroundColor: 'white',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  btnInforTitle: {
    flex: 1,
    paddingVertical: 10,
    textAlign: 'left',
    paddingLeft: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: '900',
  },
  btnDropDownTitle: {
    fontSize: 20,
    fontWeight: '900',
    paddingLeft: 0,
  },
});
