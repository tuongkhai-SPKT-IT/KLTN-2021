import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {Searchbar, List, Appbar, Avatar} from 'react-native-paper';
import {GetUsers} from '../../services/user';
import {useNavigation} from '@react-navigation/core';
// import {Clear_Store_Other} from '../Redux/Actions/OtherProfile.Action';

export default function index(props) {
  const [isVisibleSearchModal, setIsVisibleSearchModal] = useState(false);
  const [searchContent, setSearchContent] = useState('');
  const [usersList, setUsersList] = useState([]);
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  const handleOnChangeSearchBar = (query) => {
    setSearchContent(query);
    if (searchContent) {
      setUsersList([]);
    }
  };
  useEffect(() => {
    loadUsers();
  }, [searchContent]);

  const loadUsers = async () => {
    let data = {
      type_search: 0,
    };
    if (searchContent !== '') {
      data = {
        ...data,
        search_content: searchContent,
      };

      try {
        const userResponse = await GetUsers(data);

        if (userResponse.status) {
          setUsersList(userResponse.data);
        } else {
          alert(userResponse.message);
        }
      } catch (e) {
        console.log('error: ', e);
      }
    }
    return;
  };

  const searchList = ({item}) => {
    if (usersList.length > 0) {
      return (
        <List.Item
          title={item.user_name}
          description={item.email}
          left={(props) => (
            <Avatar.Image
              size={40}
              source={{
                uri: item.user_avatar,
              }}
              style={{margin: 10}}
            />
          )}
          onPress={() => {
            setIsVisibleSearchModal(false);
            navigation.navigate('OtherUser', {
              userId: item.user_id,
            });
            setSearchContent('');
          }}
        />
      );
    }
    return <></>;
  };

  return (
    <>
      <View style={styles.row}>
        <View style={styles.appName}>
          <Text style={styles.appName}>facebook</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsVisibleSearchModal(true);
          }}>
          <Feather name="search" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isVisibleSearchModal}
        onBackButtonPress={() => setIsVisibleSearchModal(false)}
        style={{
          backgroundColor: 'transparent',
          margin: 0,
        }}>
        <View style={styles.searchModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
            }}>
            <Appbar.Header style={{backgroundColor: '#fff'}}>
              <Appbar.BackAction
                onPress={() => {
                  setIsVisibleSearchModal(false);
                  setSearchContent('');
                  setUsersList([]);
                }}
              />
              <Searchbar
                placeholder="Search"
                style={styles.searchBox}
                value={searchContent}
                onChangeText={handleOnChangeSearchBar}
              />
            </Appbar.Header>
            <FlatList
              data={usersList}
              keyExtractor={(item) => item.user_id}
              renderItem={searchList}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  scrollView: {
    marginHorizontal: -10,
    flex: 1,
  },
  divider: {
    width: '100%',
    height: 15,
    backgroundColor: '#CCCCD2',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: 56,
    paddingTop: 5,
    paddingBottom: 0,
    paddingLeft: 11,
    paddingRight: 11,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  containerHeader: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 25,
  },
  containerBody: {
    flex: 18,
    width: '100%',
    backgroundColor: '#fff',
  },
  appName: {
    color: '#3a86e9',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: -0.3,
    flex: 8,
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  statusField: {
    flex: 1,
    width: '100%',
    height: 300,
  },
  searchModal: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    flex: 1,
  },
  searchBox: {
    backgroundColor: 'whitesmoke',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 15,
    width: 350,
  },
});
