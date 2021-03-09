import MainContent from './MainContent';
import React, {Component, useRef, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5nIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomenIcon from 'react-native-vector-icons/FontAwesome';

import API from '../API/API';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modalbox';
import * as keys from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Pressable} from 'react-native';
export default function ViewLCS(props) {
  const [listLike, setListLike] = useState(props.likeList);
  const [likeNumber, setLikeNumber] = useState(props.likeNumber);
  const userToken = useRef('');
  const modalRef = useRef(null);
  const [liked, setLiked] = useState(props.liked);
  const [loadding, setLoadding] = useState(false);
  const [listComment, setListComment] = useState(props.listComment);
  const smallCmt = useRef(listComment.slice(listComment.length - 2));

  useEffect(() => {
    AsyncStorage.getItem(keys.User_Token).then((val) => {
      if (val) {
        userToken.current = val;
      }
    });
  }, []);
  const Like = async () => {
    // console.log(userToken);
    setLoadding(true);
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

  const SingleComment = (comment, i) => {
    return (
      <Pressable
        onPress={() => {
          modalRef.current.open();
        }}
        key={i}
        style={{flexDirection: 'row', paddingHorizontal: 5, paddingBottom: 5}}>
        <Image
          source={{uri: comment.user_avatar}}
          style={{width: 50, height: 50, borderRadius: 1000}}
        />
        <View
          style={{
            marginHorizontal: 8,
            backgroundColor: 'rgba(0,0,0,.25555)',
            borderRadius: 10,
            flex: 1,
            paddingLeft: 5,
            paddingTop: 5,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: 'bold',
              paddingHorizontal: 5,
            }}>
            {comment.user_name}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: '800',
              paddingBottom: 10,
              paddingHorizontal: 5,
            }}>
            {comment.comment}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <>
      <Pressable
        onPress={() => {
          modalRef.current.open();
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          marginLeft: 10,
        }}>
        <View
          style={{
            borderRadius: 100,
            width: 25,
            height: 25,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesignIcon name="like1" size={15} color="white" />
        </View>
        <Text
          style={{
            color: 'rgba(0,0,0,.6)',
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 5,
          }}>
          {listLike.length}
        </Text>
      </Pressable>
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
          containerStyle={{margin: 5, flex: 1}}
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
          containerStyle={{margin: 5, flex: 1}}
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
      </View>
      <View style={{marginVertical: 10}}>
        {smallCmt.current.map(SingleComment)}
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
        <Modal
          position="center"
          coverScreen
          backButtonClose
          // swipeToClose={false}
          ref={modalRef}>
          <View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              snapToInterval={450}
              decelerationRate="fast"
              style={{marginTop: 20}}>
              {listComment.map(SingleComment)}
            </ScrollView>
          </View>
        </Modal>
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
