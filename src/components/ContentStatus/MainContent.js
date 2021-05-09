import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ImageGrid from './ImageGrid';
import {Avatar, Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {navigate_To_Other} from '../Redux/Actions/OtherProfile.Action';

const MainContent = (props) => {
  const navigation = useNavigation();
  const checkSetting = (setting) => {
    switch (setting) {
      case 'pub':
        return 'earth';
      case 'priv':
        return 'lock-closed';
      case 'friend':
        return 'people';
    }
  };
  // console.log(props.srcImg);
  const dispatch = useDispatch();
  const statusPress = (e) => {
    console.log(props);
    if (!props.clickHeader) {
      dispatch(navigate_To_Other(props.userID));
      navigation.navigate('OtherUser', {
        userId: props.userID,
      });
    } else e.preventDefault();
  };
  return (
    <>
      <View>
        <View style={styles.containerInfo}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}
            onPress={statusPress}>
            <Image
              style={{
                width: 45,
                height: 45,
                borderRadius: 100,
              }}
              source={{
                uri: props.srcAvt,
              }}
            />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text
                onPress={statusPress}
                style={{fontSize: 18, fontWeight: 'bold'}}>
                {props.userName}&nbsp;
                <Text style={{fontWeight: 'normal', fontSize: 18, flex: 1}}>
                  {props.header ? props.header : ''}
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: '500',
                }}>
                {props.postedTime}
              </Text>
              <IoniconsIcon
                style={{padding: 2, marginLeft: 5}}
                name={checkSetting(props.statusSetting)}
                size={15}
                color="rgba(0,0,0,.75)"
              />
            </View>
          </View>

          <Button
            buttonStyle={{marginRight: 15, padding: 5}}
            type="clear"
            icon={
              <EntypoIcon
                name="dots-three-horizontal"
                size={15}
                color="rgba(0,0,0,.6)"
              />
            }
            iconContainerStyle={{background: '#fff'}}
            onPress={() => alert('click')}
            titleStyle={{textAlign: 'left'}}
          />
        </View>
        <Text style={styles.captionText}>
          {props.caption ? props.caption : ''}
        </Text>
        <ImageGrid ref={props.ref} srcImage={props.srcImg} />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  containerInfo: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  captionText: {
    fontSize: 18,
    fontWeight: '400',
    padding: 10,
  },
});
export default MainContent;
