import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import ImageGrid from './ImageGrid';
import {Button} from 'react-native-elements';

const MainContent = (props) => {
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
  return (
    <>
      <View>
        <View style={styles.containerInfo}>
          <Image
            style={{width: 45, height: 45, borderRadius: 100, marginRight: 10}}
            source={{
              uri: props.srcAvt,
            }}
          />
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {props.userName}&nbsp;
              <Text style={{fontWeight: 'normal'}}>
                {props.header ? props.header : ''}
              </Text>
            </Text>
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
