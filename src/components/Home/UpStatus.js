import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {NativeRouter, Route, Link, useHistory} from 'react-router-native';

const UpStatus = () => {
  const history = useHistory();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        history.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleUp}>Tạo bài viết</Text>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: 'rgba(0,0,0,.6)',
          }}>
          <View
            style={{
              borderColor: '#f5f5f5',
              margin: 5,
            }}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          </View>
          <TextInput
            autoCapitalize="none"
            autoCompleteType="off"
            placeholderTextColor="rgba(0,0,0,.5)"
            style={styles.textCaption}
            multiline={true}
            placeholder="Bạn đang nghĩ gì?"
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 5}}>
          <View style={{flexDirection: 'row', height: 50}}>
            <Button
              buttonStyle={{flex: 1, borderRadius: 16, borderWidth: 1}}
              containerStyle={{margin: 5}}
              type="outline"
              icon={
                <Image
                  style={{width: 25, height: 25, marginHorizontal: 2.5}}
                  source={require('../HinhAnh/fbPictureAdd.png')}
                />
              }
              iconContainerStyle={{background: '#fff'}}
              onPress={() => alert('click')}
              title="Ảnh/Video"
              titleStyle={{textAlign: 'left'}}
            />
            <Button
              buttonStyle={{flex: 1, borderRadius: 16, borderWidth: 1}}
              containerStyle={{margin: 5}}
              type="outline"
              icon={
                <Image
                  style={{width: 25, height: 25, marginHorizontal: 2.5}}
                  source={require('../HinhAnh/tagName.png')}
                />
              }
              iconContainerStyle={{background: '#fff'}}
              onPress={() => alert('click')}
              title="Gắn thẻ bạn bè"
              titleStyle={{textAlign: 'left'}}
            />
            <Button
              buttonStyle={{flex: 1, borderRadius: 16, borderWidth: 1}}
              containerStyle={{margin: 5}}
              type="outline"
              icon={
                <Image
                  style={{width: 25, height: 25, marginHorizontal: 2.5}}
                  source={require('../HinhAnh/marker.png')}
                />
              }
              iconContainerStyle={{background: '#fff'}}
              onPress={() => alert('click')}
              title="Check In"
              titleStyle={{textAlign: 'left'}}
            />
          </View>
          <TouchableOpacity
            // onPress={this.test()}
            onPress={() => AsyncStorage.clear()}
            // onPress={() => _Register()}
            style={[
              styles.appButtonContainer,
              {
                marginTop: 0,
                backgroundColor: '#4267b2',
                width: '80%',
              },
            ]}>
            <Text style={[styles.appButtonText]}>Đăng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  tinyLogo: {
    width: 65,
    height: 65,
    padding: 0,
    borderColor: 'black',
    borderRadius: 100,
  },
  titleUp: {
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#f5f5f5',
    color: '#333',
    borderColor: 'rgba(0,0,0,.6)',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textCaption: {
    backgroundColor: 'white',
    textAlignVertical: 'top',
    flex: 1,
    fontSize: 18,
    borderLeftColor: 'rgba(0,0,0,.6)',
    borderLeftWidth: 1,
    padding: 8,
  },
  container: {
    width: '100%',
    borderColor: 'rgba(0,0,0,.6)',
    borderTopWidth: 1,
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
  appButtonContainer: {
    borderRadius: 5,
    paddingVertical: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
export default UpStatus;
