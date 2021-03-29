import MainContent from './MainContent';
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  Image,
  Pressable,
  BackHandler,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5nIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomenIcon from 'react-native-vector-icons/FontAwesome';
import API from '../API/API';
import * as styles from './Styles';
import {Button} from 'react-native-elements';
import SwipeDownModal from 'react-native-swipe-down';
import * as keys from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ViewLCS(props) {
  const [listLike, setListLike] = useState(props.likeList);
  const [likeNumber, setLikeNumber] = useState(props.likeNumber);
  const scrollRef = useRef(null);
  const textComment = useRef(null);
  const userInfo = useRef({});
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(props.liked);
  const [loadding, setLoadding] = useState(false);
  const [inputCmt, setInputCmt] = useState('');
  const [listComment, setListComment] = useState(props.listComment);
  const [smallCmt, setSmallCmt] = useState(
    listComment.slice(listComment.length - 2),
  );

  useEffect(() => {
    AsyncStorage.getItem(keys.User_Token).then((val) => {
      if (val) {
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
  }, []);
  const Like = async () => {
    setLoadding(true);
    if (!liked) {
      const route = 'status/update-status';
      const param = {
        status_id: props.index,
        like: parseInt(likeNumber) + 1,
      };
      const header = {
        Authorization: 'bearer' + userInfo.current.user_token,
      };
      const api = new API();
      setTimeout(() => {
        api
          .onCallAPI('post', route, {}, param, header)
          .then((res) => {
            if (res.data.error_code !== 0) {
              window.alert(res.data.message);
            } else {
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
        Authorization: 'bearer' + userInfo.current.user_token,
      };
      const api = new API();
      setTimeout(() => {
        api
          .onCallAPI('post', route, {}, param, header)
          .then((res) => {
            if (res.data.error_code !== 0) {
              window.alert(res.data.message);
            } else {
              setListLike(res.data.data);
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
  const inputComment = () => {
    return (
      // <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
      <View style={styles.stylesViewLCS.inputcmtContainer}>
        <TextInput
          multiline
          ref={textComment}
          onChangeText={(e) => setInputCmt(e)}
          placeholder="Viết 1 bình luận"
          style={[styles.stylesViewLCS.textCmt, {maxHeight: 100}]}
          value={inputCmt}
        />

        <Pressable style={styles.stylesViewLCS.btnComment}>
          <FontAwesomenIcon
            onPress={() => {
              if (inputCmt.trim() !== '') {
                listComment.push({
                  comment: inputCmt,
                  linkProfile: userInfo.current.user_ProLink,
                  user_avatar: userInfo.current.user_avatar,
                  user_name: userInfo.current.user_name,
                });
                setSmallCmt(listComment.slice(listComment.length - 2));
                if (textComment.current) textComment.current.clear();
                setInputCmt('');
                if (scrollRef.current) {
                  setTimeout(() => {
                    scrollRef.current.scrollToEnd();
                  }, 1 * 100);
                }
              }
            }}
            name="send"
            style={{width: 26}}
            size={25}
            color="rgba(0,0,0,.8)"
          />
        </Pressable>
      </View>
      // </ScrollView>
    );
  };
  const SingleComment = (comment, i) => {
    return (
      <Pressable
        onPress={() => {
          setVisible(true);
          // setCmtVisible(true);
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
  const whoLike = (list) => {
    var i = 0;
    var listWho = '';
    if (list.length <= 2)
      for (i = 0; i < list.length; i++) {
        if (i + 1 < list.length)
          listWho = list[i].user_name + ', ' + list[i + 1].user_name;
        else listWho = list[i].user_name;
      }
    return listWho;
  };
  return (
    <>
      <SwipeDownModal
        modalVisible={visible}
        ContentModal={
          <View style={styles.stylesViewLCS.containerContent}>
            {listLike.length > 0 && (
              <Pressable
                onPress={() => {
                  console.log(listLike);
                }}
                style={[
                  {borderTopLeftRadius: 16, borderTopRightRadius: 16},
                  styles.stylesViewLCS.iconLike,
                  styles.stylesViewLCS.extendLike,
                ]}>
                <View style={styles.stylesViewLCS.viewIcon}>
                  <AntDesignIcon name="like1" size={15} color="white" />
                </View>
                <Text style={styles.stylesViewLCS.likeNumber}>
                  {whoLike(listLike)}
                </Text>
              </Pressable>
            )}
            <View style={{flex: 10}}>
              <ScrollView
                ref={scrollRef}
                overScrollMode="always"
                contentContainerStyle={{justifyContent: 'center'}}
                // showsHorizontalScrollIndicator={false}
                snapToInterval={450}
                decelerationRate="fast"
                onScroll={(event) =>
                  console.log(event.nativeEvent.contentOffset)
                }
                style={{marginTop: 10}}>
                {listComment.map(SingleComment)}
              </ScrollView>
            </View>
            {inputComment()}
          </View>
        }
        ContentModalStyle={styles.stylesViewLCS.Modal}
        onClose={() => {
          setVisible(false);
        }}
      />
      {listLike.length > 0 && (
        <Pressable
          onPress={() => {
            // setCmtVisible(true);
          }}
          style={styles.stylesViewLCS.iconLike}>
          <View style={styles.stylesViewLCS.viewIcon}>
            <AntDesignIcon name="like1" size={12} color="white" />
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
              fontSize: 16,
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
          title="Bình luận"
          onPress={() => {
            if (textComment.current) textComment.current.focus();
            // AsyncStorage.clear();
          }}
          titleStyle={{
            marginHorizontal: 5,
            color: 'rgba(0,0,0,.6)',
            fontSize: 16
          }}
        />
      </View>
      <View style={{marginVertical: 10}}>{smallCmt.map(SingleComment)}</View>
      {inputComment()}
    </>
  );
}
