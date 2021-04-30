import React, {useEffect, useState} from 'react';
import {Avatar, Button, Text, SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {View, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const fullFriend = ({navigation}) => {
  const [querrySearch, setQuerrySearch] = useState('');
  const userProfileReducer = useSelector((state) => state.OtherProfile);
  const [filterFriends, setFilterFriends] = useState([
    ...userProfileReducer.intro.friend_array,
  ]);
  const singleFriend = (friend, i) => {
    return (
      <View
        key={i}
        style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
        <Avatar
          onLongPress={() => alert('onLongPress')}
          onPress={() => {
            alert('click');
          }}
          size="large"
          rounded
          source={{uri: friend.avatar}}
        />
        <View style={{}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 5}}>
            {friend.user_name}
          </Text>
        </View>
      </View>
    );
  };
  //   const handleChange = (val) => {
  //     let arrSearch = [];
  //     var friendArr = [...userProfileReducer.introUser.friend_array];
  //     setQuerrySearch(val);
  //     for (var i = 0; i < friendArr.length; i++) {
  //       if (
  //         friendArr[i].user_name
  //           .toLowerCase()
  //           .includes(querrySearch.toLowerCase())
  //       )
  //         arrSearch.push(friendArr[i]);
  //     }
  //     setFilterFriends(arrSearch);
  //   };
  //   console.log(querrySearch, filterFriends);
  const renderAllFriends = () => {
    if (querrySearch !== '') {
      if (filterFriends.length !== 0) {
        return filterFriends.map(singleFriend);
      } else {
        return (
          <View>
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
        onChangeText={(val) => setQuerrySearch(val)}
        // onClearText={() => console.log(onClearText())}
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
