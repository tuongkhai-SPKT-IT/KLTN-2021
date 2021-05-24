import MainContent from './MainContent';
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  Image,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5nIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomenIcon from 'react-native-vector-icons/FontAwesome';
import API from '../API/API';
import * as styles from './Styles';
import {Button} from 'react-native-elements';
import * as keys from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {SOCKET} from '../../config';
import moment from 'moment';
import { CreateNotification } from '../../services/user';

export default function ViewLCS(props) {
  const [listLike, setListLike] = useState(props.likeList);
  const [likeNumber, setLikeNumber] = useState(props.likeNumber);
  const scrollRef = useRef(null);
  const textComment = useRef(null);
  const userInfo = useRef({});
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(props.liked);
  const [loading, setLoading] = useState(false);
  const [inputCmt, setInputCmt] = useState('');
  const [listComment, setListComment] = useState(props.listComment);
  const [smallCmt, setSmallCmt] = useState(
    listComment.slice(listComment.length - 2),
  );
  const device = Dimensions.get('window');

  const [layoutModal, setLayoutModal] = useState(device);
  const [scrollOffset, setScrollOffset] = useState(0);

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

  //for testing
  const makeid = (length) => {
    var result = [];
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength)),
      );
    }
    return result.join('');
  };

  const Like = async () => {
    setLoading(true);
    if (!liked) {
      const name = makeid(10);
      SOCKET.emit(
        'subscribe-friend-chanel',
        {name: userInfo.current.user_ProLink, room: '1234567890'},
        (err) => {
          if (err) {
            console.log('error noti: ', err);
          }
        },
      );

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
              alert(res.data.message);
            } else {
              setListLike(res.data.data);
              setLiked(true);
              setLoading(false);
              setLikeNumber(likeNumber + 1);

              //push notification
              let notificationData = {
                current_user_name: userInfo.current.user_ProLink,
                status_id: props.index,
                owner_id: props.userID, //owner of status
                content: `${userInfo.current.user_name} liked your status`,
                current_user_avatar: userInfo.current.user_avatar,
                moment: moment().fromNow(),
              };
              SOCKET.emit('client-liked-status', notificationData);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 2 * 1000);

      setTimeout( async () =>{
        let params = {
          owner: props.userID,
          type: 'status-like',
          item: props.index
        }

        const notiResponse = await CreateNotification(params);

      },1000)
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
              alert(res.data.message);
            } else {
              setListLike(res.data.data);
              setLiked(false);
              setLoading(false);
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
          placeholder="Write comment"
          style={[styles.stylesViewLCS.textCmt, {maxHeight: 100}]}
          value={inputCmt}
        />

        {/* <Pressable ></Pressable> */}
        <Button
          buttonStyle={{backgroundColor: 'transparent'}}
          style={styles.stylesViewLCS.btnComment}
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
          icon={
            <FontAwesomenIcon
              name="send"
              style={{width: 26}}
              size={25}
              color="rgba(0,0,0,.8)"
            />
          }
        />
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
    const test =
      'Đãbảođặttênngắnthôi MàsaoNócứ Dàinhưthếnày, Đãbảođặttênngắnthôi MàsaoNócứ Dàinhưthếnày';

    for (i = 0; i < list.length; i++) {
      listWho += list[i].user_name + ', ';
    }
    if (list.length > 2) {
      listWho =
        list[0].user_name +
        ', ' +
        list[1].user_name +
        ' và ' +
        (list.length - 2) +
        ' người khác';
    }
    if (list.length <= 2)
      listWho = listWho.substring(0, listWho.lastIndexOf(','));
    return test;
  };

  const handleOnScroll = (event) => {
    if (event.nativeEvent.contentOffset.y)
      setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(p);
    }
  };

  return (
    <>
      <Modal
        isVisible={visible}
        hasBackdrop={false}
        swipeDirection={['up', 'down']}
        animationIn="slideInUp"
        scrollTo={handleScrollTo}
        onBackdropPress={() => setVisible(false)}
        scrollOffset={scrollOffset}
        scrollOffsetMax={layoutModal.height}
        onSwipeCancel={() => setVisible(true)}
        onSwipeComplete={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        animationOut="slideOutDown"
        propagateSwipe={true}
        animationInTiming={600}
        animationOutTiming={600}
        avoidKeyboard
        hideModalContentWhileAnimating
        style={{margin: 0}}>
        <View
          onLayout={(e) => setLayoutModal(e.nativeEvent.layout)}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
          }}>
          <View style={styles.stylesViewLCS.containerContent}>
            {listLike.length > 0 && (
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  position: 'relative',
                  borderBottomWidth: 1,
                  backgroundColor: 'rgba(0,0,0,.1)',
                }}>
                <Pressable
                  onPress={() => {
                    // console.log(listLike);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 10,
                  }}>
                  <View style={styles.stylesViewLCS.viewIcon}>
                    <AntDesignIcon name="like1" size={15} color="white" />
                  </View>
                  <Text style={styles.stylesViewLCS.likeNumber}>
                    {whoLike(listLike)}
                  </Text>
                </Pressable>
                <Button
                  buttonStyle={{
                    backgroundColor: 'transparent',
                  }}
                  containerStyle={{borderRadius: 100}}
                  icon={
                    liked ? (
                      <AntDesignIcon name="like1" size={20} color="blue" />
                    ) : (
                      <AntDesignIcon
                        name="like2"
                        size={20}
                        color="rgba(0,0,0,.6)"
                      />
                    )
                  }
                  loading={loading}
                  loadingProps={{animating: true, color: '#999'}}
                  loadingStyle={{borderColor: 'black'}}
                  onPress={() => Like()}
                />
              </View>
            )}
            <View style={{flex: 10}}>
              <ScrollView
                ref={scrollRef}
                overScrollMode="always"
                scrollToOverflowEnabled
                contentContainerStyle={{justifyContent: 'center'}}
                // showsHorizontalScrollIndicator={false}
                snapToInterval={450}
                decelerationRate="fast"
                onScroll={handleOnScroll}
                style={{marginTop: 10}}>
                {listComment.map(SingleComment)}
              </ScrollView>
            </View>
            {inputComment()}
          </View>
        </View>
      </Modal>

      {listLike.length > 0 && (
        <Pressable
          onPress={() => {
            setVisible(true);
          }}
          style={[
            styles.stylesViewLCS.iconLike,
            {marginTop: 10, marginLeft: 10},
          ]}>
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
          loading={loading}
          loadingProps={{animating: true, color: '#999'}}
          loadingStyle={{borderColor: 'black'}}
          onPress={() => Like()}
          title={'Like'}
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
          title="Comments"
          onPress={() => {
            if (textComment.current) textComment.current.focus();
            // AsyncStorage.clear();
            // history.back();
          }}
          titleStyle={{
            marginHorizontal: 5,
            color: 'rgba(0,0,0,.6)',
            fontSize: 16,
          }}
        />
      </View>
      <View style={{marginVertical: 10}}>{smallCmt.map(SingleComment)}</View>
      {inputComment()}
    </>
  );
}
const styless = StyleSheet.create({
  container: {
    width: '100%',
    height: 92,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 11,
    paddingLeft: 11,
    alignItems: 'center',
  },
  input: {
    height: 50,
    flex: 1,
    paddingTop: -20,
    paddingBottom: -20,
    paddingLeft: 20,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.5)',
    borderRadius: 30,
    height: 35,
    justifyContent: 'space-around',
  },
});
