import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToolBar from '../ToolBar';
import ContentStatus from '../ContentStatus';
import { useDispatch, useSelector } from 'react-redux';
import { ReloadHome } from '../Redux/Actions/Home.Action';
import Modal from 'react-native-modal';
import { Searchbar, List, Appbar, Avatar } from 'react-native-paper';
import { GetUsers } from '../../services/user';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Profile/Index';
import {
  Get_Intro_Other,
  Get_Status_Other,
} from '../Redux/Actions/OtherProfile.Action';

export default function AppBar() {
  const Stack = createStackNavigator();

  const homePage = ({ navigation }) => {
    const dispatch = useDispatch();
    const storeState = useSelector((state) => state.HomePage);

    /**
   * AppBar State
   */
    const [isVisibleSearchModal, setIsVisibleSearchModal] = useState(false);
    const [searchContent, setSearchContent] = useState('');
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
      dispatch(ReloadHome());
    }, []);

    useEffect(() => {
      loadUsers();
    }, [searchContent])

    const loadUsers = async () => {
      let data = {
        type_search: 0,
      }
      if (searchContent !== '') {
        data = {
          ...data,
          search_content: searchContent
        }

        try {
          const userResponse = await GetUsers(data);

          if (userResponse.status) {
            setUsersList(userResponse.data);
          } else {
            alert(userResponse.message)
          }
        } catch (e) {
          console.log('error: ', e)
        }
      }
      return;
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      const paddingToBottom = 20;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    };

    const showstatus = () => {
      const { srcData } = storeState;

      if (srcData.length > 0) {
        {
          return srcData.map((stt, i) => {
            return (
              <View key={i} style={{ backgroundColor: 'rgba(0,0,0,.3)' }}>
                <ContentStatus srcData={stt} />
              </View>
            );
          });
        }
      } else {
        return <Text style={{}}>Have no any news in your newsfeed! Post your first status now!</Text>;
      }
    };

    const searchList = ({ item }) => {
      if (usersList.length > 0) {
        return (
          <List.Item
            title={item.user_name}
            description={item.email}
            left={props => <Avatar.Image
              size={40}
              source={{
                uri: item.user_avatar,
              }}
              style={{ margin: 10 }}
            />}
            onPress={()=>{
              dispatch(Get_Intro_Other(item.user_id))
              dispatch(Get_Status_Other(item.user_id))
              navigation.navigate('ProfileUser')
              navigation.jumpTo('Profile',{})
            }}
          />
        );
      }
      return (
        <></>
      )
    };

    const handleOnChangeSearchBar = (query) => {
      setSearchContent(query)
      if (searchContent) {
        setUsersList([])
      }
    }

    return (
      <>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <View style={styles.row}>
              <View style={styles.appName}>
                <Text style={styles.appName}>facebook</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => { setIsVisibleSearchModal(true) }}
              >
                <Feather name="search" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerBody}>
            <ScrollView style={styles.scrollView}>
              <ToolBar />
              <View style={styles.divider}></View>
              <ScrollView
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
                onScroll={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) {
                    console.log(1);
                  }
                }}
                scrollEventThrottle={400}>
                {showstatus()}
              </ScrollView>
            </ScrollView>
          </View>
          <Modal
            isVisible={isVisibleSearchModal}
            onBackButtonPress={() => setIsVisibleSearchModal(false)}
            style={{
              backgroundColor: 'transparent',
              margin: 0,
            }}
          >
            <View
              style={styles.searchModal}
            >
              <View style={{
                flex: 1,
                backgroundColor: "#fff"
              }}>
                <Appbar.Header style={{ backgroundColor: '#fff' }}>
                  <Appbar.BackAction onPress={() => {
                    setIsVisibleSearchModal(false);
                    setSearchContent('');
                    setUsersList([])
                  }} />
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
        </View>
        {/* <ToolBar/> */}
      </>
    );
  }
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          options={{
            headerShown: false,
          }}
          component={homePage}
        />
        <Stack.Screen
          name="ProfileUser"
          options={{
            headerShown: false,
          }}
          component={Profile}
        />
      </Stack.Navigator>
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
    position: "relative",
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
    flex: 1
  },
  searchBox: {
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 15,
    width: 350
  }
});