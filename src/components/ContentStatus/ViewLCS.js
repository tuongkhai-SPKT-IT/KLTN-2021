import MainContent from './MainContent';
import React, {Component, useRef, useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, ScrollView, Text} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5nIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomenIcon from 'react-native-vector-icons/FontAwesome';

import API from '../API/API';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modalbox';
import * as keys from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ViewLCS(props) {
  const [listLike, setListLike] = useState(props.likeList);
  const [likeNumber, setLikeNumber] = useState(props.likeNumber);
  const userToken = useRef('');
  const modalRef = useRef(null);
  const [liked, setLiked] = useState(props.liked);
  const [loadding, setLoadding] = useState(false);
  useEffect(() => {
    console.log(listLike);
    AsyncStorage.getItem(keys.User_Token).then((val) => {
      if (val) {
        userToken.current = val;
      }
    });
  }, []);
  const Like = async () => {
    // console.log(userToken);
    setLoadding(true);
    console.log(loadding);
    if (!liked) {
      const route = 'status/update-status';
      const param = {
        status_id: props.index,
        like: parseInt(likeNumber) + 1,
      };
      const header = {
        Authorization: 'bearer' + userToken.current,
      };
      const api = new API();
      // console.log(param, route, header);
      setTimeout(() => {
        api
          .onCallAPI('post', route, {}, param, header)
          .then((res) => {
            if (res.data.error_code !== 0) {
              window.alert(res.data.message);
            } else {
              console.log(res.data.data);
              setListLike(res.data.data);
              setLiked(true);
              setLoadding(false);
              setLikeNumber(likeNumber + 1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 2 * 1000);
    } else {
      const route = 'status/update-status';
      const param = {
        status_id: props.index,
        like: parseInt(likeNumber) - 1,
        is_unlike: 1,
      };
      const header = {
        Authorization: 'bearer' + userToken.current,
      };
      const api = new API();
      // console.log(param, route, header);
      setTimeout(() => {
        api
          .onCallAPI('post', route, {}, param, header)
          .then((res) => {
            if (res.data.error_code !== 0) {
              window.alert(res.data.message);
            } else {
              setListLike(res.data.data);
              console.log(res.data.data);
              setLiked(false);
              setLoadding(false);
              setLikeNumber(likeNumber - 1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 2 * 1000);
    }
  };

  return (
    <>
      <View style={{}}>
        <Text style={{color: 'black', fontSize: 18}}>
          {listLike.map((val) => val.user_name)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          marginVertical: 10,
          paddingVertical: 5,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'rgba(0,0,0,.6)',
        }}>
        <Button
          buttonStyle={{backgroundColor: 'transparent'}}
          containerStyle={{margin: 5, borderWidth: 1, flex: 1}}
          icon={
            liked ? (
              <AntDesignIcon name="like1" size={20} color="blue" />
            ) : (
              <AntDesignIcon name="like2" size={20} color="rgba(0,0,0,.6)" />
            )
          }
          loading={loadding}
          loadingProps={{animating: true, color: '#999'}}
          loadingStyle={{borderColor: 'black'}}
          onPress={() => Like()}
          title={'Thích'}
          titleStyle={[
            {
              marginHorizontal: 5,
              fontSize: 18,
              fontWeight: 'bold',
            },
            liked ? {color: 'blue'} : {color: 'rgba(0,0,0,.6)'},
          ]}
        />
        <Button
          buttonStyle={{backgroundColor: 'transparent'}}
          containerStyle={{margin: 5, borderWidth: 1, flex: 1}}
          linearGradientProps={null}
          icon={
            <FontAwesome5nIcon
              name="comment-alt"
              size={20}
              color="rgba(0,0,0,.8)"
            />
          }
          loadingProps={{animating: true}}
          loadingStyle={{}}
          title="Bình luận"
          onPress={() => {
            modalRef.current.open();
          }}
          titleStyle={{
            marginHorizontal: 5,
            color: 'rgba(0,0,0,.6)',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
        <Modal
          position="center"
          coverScreen
          backButtonClose
          // swipeToClose={false}
          swipeThreshold={100}
          swipeArea={100}
          ref={modalRef}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            snapToInterval={450}
            decelerationRate="fast"></ScrollView>
        </Modal>
      </View>
      <View style={{flex: 1}}>
        <TextInput
          placeholder="Viết 1 bình luận"
          style={{
            flex: 1,
            width: '98%',
            fontSize: 18,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,5)',
            marginBottom: 10,
            borderRadius: 16,
            padding: 10,
            paddingLeft: 15,
            paddingRight: 40,
            marginLeft: 5,
          }}></TextInput>

        <Button
          buttonStyle={{backgroundColor: 'transparent'}}
          containerStyle={{
            position: 'absolute',
            top: 6,
            right: 10,
            height: '100%',
          }}
          loading={false}
          loadingProps={{animating: true}}
          icon={<FontAwesomenIcon name="send" size={20} />}
          titleStyle={{
            marginHorizontal: 5,
            color: 'rgba(0,0,0,.6)',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 450,
  },
});
