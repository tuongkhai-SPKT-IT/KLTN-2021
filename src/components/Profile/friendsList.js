import React, {useEffect, useState} from 'react';
import {Avatar, Button, Text, SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {navigate_To_Other} from '../Redux/Actions/OtherProfile.Action';

const fullFriend = ({navigation}) => {
  const [querrySearch, setQuerrySearch] = useState('');
  const userProfileReducer = useSelector((state) => state.ProfileInfo);
  const [filterFriends, setFilterFriends] = useState([
    ...userProfileReducer.introUser.friend_array,
  ]);
  const dispatch = useDispatch();
  const singleFriend = (friend, i) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(navigate_To_Other(friend.user_id));

          navigation.navigate('OtherUser', {
            userId: friend.user_id,
          });
        }}
        key={i}
        style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
        <Avatar size="large" rounded source={{uri: friend.avatar}} />
        <View style={{}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5}}>
            {friend.user_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const handleChange = (val) => {
    let friendArr = [...userProfileReducer.introUser.friend_array];
    setQuerrySearch(val);
    let arrSearch = [];
    for (var i = 0; i < friendArr.length; i++) {
      if (friendArr[i].user_name.toLowerCase().includes(val.toLowerCase()))
        arrSearch.push(friendArr[i]);
    }
    // console.log(arrSearch);
    setFilterFriends(arrSearch);
  };
  //   console.log(querrySearch, filterFriends);
  const renderAllFriends = () => {
    if (querrySearch !== '') {
      if (filterFriends.length !== 0) {
        return filterFriends.map(singleFriend);
      } else {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
            }}>
            <MaterialIcons name="do-not-disturb-alt" size={40} />
            <Text h4>No Result for {querrySearch}</Text>
          </View>
        );
      }
    }
    return userProfileReducer.introUser.friend_array.map(singleFriend);
  };
  return (
    <ScrollView style={{width: '100%'}}>
      <SearchBar
        platform="default"
        lightTheme
        searchIcon={
          <Ionicons
            name="search-sharp"
            style={{marginLeft: 5}}
            size={20}
            color="black"
          />
        }
        containerStyle={{backgroundColor: 'white'}}
        inputContainerStyle={{borderRadius: 50}}
        inputStyle={{color: 'black'}}
        onChangeText={handleChange}
        onClearText={() => console.log(onClearText())}
        placeholder="Search friends"
        placeholderTextColor="#000"
        cancelButtonTitle="Cancel"
        onCancel={() => setQuerrySearch('')}
        value={querrySearch}
      />
      {renderAllFriends()}
    </ScrollView>
  );
};
export default fullFriend;
