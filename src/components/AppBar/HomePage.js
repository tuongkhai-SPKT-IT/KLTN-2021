import React, {useEffect, useState} from 'react';
import ToolBar from '../ToolBar';
import ContentStatus from '../ContentStatus';
import {useDispatch, useSelector} from 'react-redux';
import {clear_Home, ReloadHome} from '../Redux/Actions/Home.Action';
import HeaderApp from '../HeaderApp';
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const HomePage = ({navigation}) => {
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state.HomePage);
  useEffect(() => {
    // console.log(token);
    dispatch(ReloadHome());
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    // dispatch(clear_Home());
    dispatch(ReloadHome());

    // setTimeout(() => {}, 2000);
  };
  useEffect(() => {
    if (storeState.srcData.length > 0) setRefreshing(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, [storeState.srcData]);
  const showstatus = () => {
    const {srcData} = storeState;

    if (srcData.length > 0) {
      {
        return srcData.map((stt, i) => {
          return (
            <View key={i}>
              <ContentStatus profilePage={false} srcData={stt} />
              <View style={styles.divider} />
            </View>
          );
        });
      }
    } else {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            width: 150,
            height: 150,
            zIndex: 999,
            position: 'absolute',
            top: '30%',
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
      );
    }
  };

  return (
    <>
      <HeaderApp style={{padding: 10, backgroundColor: 'white'}} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ToolBar />

        <View style={styles.divider} />

        <View>{showstatus()}</View>
      </ScrollView>
    </>
  );
};

export default HomePage;

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
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
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
