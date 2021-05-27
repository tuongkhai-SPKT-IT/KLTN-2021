import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  Clear_List_Chat,
  Get_Group_Chat,
  Search_Chat_List,
} from '../Redux/Actions/Chat.Action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
import {styles} from './Styles';

const SmallMessenger = (props) => {
  // console.log(props);
  const navigation = useNavigation();
  const [inputVisible, setInputVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const searchRef = useRef();
  const _handleSearch = () => {
    setInputVisible(!inputVisible);
    setInputSearch('');
  };
  useEffect(() => {
    if (searchRef.current) searchRef.current.focus();
  }, [inputVisible]);
  const onChangeSearch = (e) => {
    setInputSearch(e);
    if (e.length !== 0) {
      dispatch(Search_Chat_List(e));
    }
  };
  const chatReducer = useSelector((state) => state.ChatReducer);
  const dispatch = useDispatch();
  // const [isNullMessBox, setIsNullMessBox] = useState(false);
  const getChatGroup = async () => {
    dispatch(Get_Group_Chat());
  };

  useEffect(() => {
    getChatGroup();
  }, []);
  const jumpToChatBox = (message) => {
    // e.prenventDefault();
    // dispatch(Clear_List_Chat());
    // dispatch(Get_Group_Chat());
    navigation.navigate('DetailMessages', {
      chat_group_id: message.room,
      avatar: message.avatar,
      friend_chat: message.friend_chat,
    });
  };
  const singleSmallMess = (message, i) => {
    const maxlimit = 40;
    var contentCurrent = message.isCurrent
      ? 'Bạn: '
      : message.friend_chat + ': ';
    contentCurrent += message.messRecent;
    return (
      <TouchableOpacity
        key={i}
        onPress={() => jumpToChatBox(message)}
        style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: 'black',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <Image
          style={{
            borderColor: 'black',
            width: 60,
            height: 60,
            borderRadius: 40,
            borderWidth: 1.5,
          }}
          source={{uri: message.avatar}}
        />
        <View style={{padding: 5, justifyContent: 'space-between'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {message.friend_chat}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="clip"
              style={{
                fontSize: 16,
              }}>
              {contentCurrent.length > maxlimit
                ? contentCurrent.substring(0, maxlimit - 3) + '...'
                : contentCurrent}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 16}}>{message.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onRefresh = () => {
    // dispatch(Clear_List_Chat());
    dispatch(Get_Group_Chat());
    // setIsNullMessBox(false);
    // setTimeout(() => {
    //   if (chatReducer.ownChatGroup.length === 0) setIsNullMessBox(true);
    // }, 5000);
    navigation.navigate('Messengers', {
      screen: 'SmallMessengers',
      resetTime: true,
    });
  };
  // return <></>;
  if (chatReducer.ownChatGroup.length > 0) {
    const arrChatGroup = chatReducer.ownChatGroup;
    return (
      <SafeAreaView>
        <Appbar.Header style={{backgroundColor: '#fff'}}>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{justifyContent: 'center', marginRight: 10}}>
            <Ionicons name="ios-menu-sharp" size={30} />
          </TouchableOpacity>
          {!inputVisible && <Appbar.Content title="Messengers" />}
          {inputVisible && (
            <TextInput
              ref={searchRef}
              onChangeText={(e) => onChangeSearch(e)}
              placeholder="Tìm kiếm"
              style={styles.inputSearch}
              value={inputSearch}
            />
          )}
          <Appbar.Action
            icon={inputVisible ? 'close' : 'magnify'}
            onPress={_handleSearch}
          />
        </Appbar.Header>

        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isRefresh} />
          }
          style={{width: '100%', height: '100%'}}
          keyboardShouldPersistTaps="handled">
          {arrChatGroup.map(singleSmallMess)}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    if (chatReducer.err_code === 'No messengers') {
      return (
        <>
          <Appbar.Header style={{backgroundColor: '#fff'}}>
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{justifyContent: 'center', marginRight: 10}}>
              <Ionicons name="ios-menu-sharp" size={30} />
            </TouchableOpacity>
            <Appbar.Content title="Messengers" />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
          </Appbar.Header>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              There are no messages for you, you have to make friend and
              community with them
            </Text>
          </View>
        </>
      );
    }

    return (
      <View
        style={{
          position: 'relative',
          height: '100%',
        }}>
        <View
          style={{
            width: 150,
            height: 150,
            zIndex: 999,
            position: 'absolute',
            top: '50%',
            alignSelf: 'center',
          }}>
          <ActivityIndicator size="large" color="black" />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Loading
          </Text>
        </View>
      </View>
    );
  }
};
export default SmallMessenger;
