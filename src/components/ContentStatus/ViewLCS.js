import MainContent from './MainContent';
import React, {Component, useRef, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5nIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomenIcon from 'react-native-vector-icons/FontAwesome';
import API from '../API/API';
import * as styles from './Styles';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modalbox';
import * as keys from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Pressable} from 'react-native';
export default function ViewLCS(props) {
  const [listLike, setListLike] = useState(props.likeList);
  const [likeNumber, setLikeNumber] = useState(props.likeNumber);
  const userToken = useRef('');
  const userInfo = useRef({});
  const modalRef = useRef(null);
  const [liked, setLiked] = useState(props.liked);
  const [loadding, setLoadding] = useState(false);
  const [inputCmt, setInputCmt] = useState('');
  const [listComment, setListComment] = useState(props.listComment);
  const [smallCmt, setSmallCmt] = useState(
    listComment.slice(listComment.length - 2),
  );
  const textComment = useRef(null);
  useEffect(() => {
    AsyncStorage.getItem(keys.User_Token).then((val) => {
      if (val) {
        userToken.current = val;
        userInfo.current = {...userInfo.current, user_token: val};
      }
    });
    AsyncStorage.getItem(keys.User_Avatar).then((val) => {
      if (val) {
        userInfo.current = {...userInfo.current, user_avatar: val};
      }
    });
    AsyncStorage.getItem(keys.User_Name).then((val) => {
      if (val) {
        userInfo.current = {...userInfo.current, user_name: val};
      }
    });
    AsyncStorage.getItem(keys.User_ProfLink).then((val) => {
      if (val) {
        userInfo.current = {...userInfo.current, user_ProLink: val};
      }
    });
    console.log(listComment);
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
        style={styles.stylesViewLCS.SingleCommentContainer}>
        <Image
          source={{uri: comment.user_avatar}}
          style={styles.stylesViewLCS.avatarComment}
        />
        <View style={styles.stylesViewLCS.commentBox}>
          <Text style={styles.stylesViewLCS.commentUserName}>
            {comment.user_name}
          </Text>
          <Text style={styles.stylesViewLCS.captionText}>
            {comment.comment}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <>
      {listLike.length > 0 && (
        <Pressable
          onPress={() => {
            modalRef.current.open();
          }}
          style={styles.stylesViewLCS.iconLike}>
          <View style={styles.stylesViewLCS.viewIcon}>
            <AntDesignIcon name="like1" size={15} color="white" />
          </View>
          <Text style={styles.stylesViewLCS.likeNumber}>{listLike.length}</Text>
        </Pressable>
      )}
      <View style={styles.stylesViewLCS.viewBtn}>
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
            // textComment.current.focus();
            AsyncStorage.clear();
          }}
          titleStyle={{
            marginHorizontal: 5,
            color: 'rgba(0,0,0,.6)',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
      </View>
      <View style={{marginVertical: 10}}>{smallCmt.map(SingleComment)}</View>
      <Modal
        position="center"
        coverScreen
        backButtonClose
        // swipeToClose={false}
        ref={modalRef}>
        {listLike.length > 0 && (
          <Pressable
            onPress={() => {
              modalRef.current.open();
            }}
            style={[
              styles.stylesViewLCS.iconLike,
              styles.stylesViewLCS.extendLike,
            ]}>
            <View style={styles.stylesViewLCS.viewIcon}>
              <AntDesignIcon name="like1" size={15} color="white" />
            </View>
            <Text style={styles.stylesViewLCS.likeNumber}>
              {listLike.length}
            </Text>
          </Pressable>
        )}
        <View style={{flex: 9}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            snapToInterval={450}
            decelerationRate="fast"
            style={{marginTop: 20}}>
            {listComment.map(SingleComment)}
          </ScrollView>
        </View>
      </Modal>
      <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
        <TextInput
          ref={textComment}
          onChangeText={(e) => setInputCmt(e)}
          placeholder="Viết 1 bình luận"
          style={styles.stylesViewLCS.textCmt}
        />

        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            height: '100%',
            right: 15,
          }}
          onPress={() => {
            if (inputCmt.trim() !== '') {
              listComment.push({
                comment: inputCmt,
                linkProfile: userInfo.current.user_ProLink,
                user_avatar: userInfo.current.user_avatar,
                user_name: userInfo.current.user_name,
              });
              setSmallCmt(listComment.slice(listComment.length - 2));
              textComment.current.clear();
              setInputCmt('');
            }
          }}>
          <FontAwesomenIcon name="send" size={25} color="rgba(0,0,0,.8)" />
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
