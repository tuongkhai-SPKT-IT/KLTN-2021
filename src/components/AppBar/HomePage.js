import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import ToolBar from '../ToolBar';
import ContentStatus from '../ContentStatus';
import {useDispatch, useSelector} from 'react-redux';
import {ReloadHome} from '../Redux/Actions/Home.Action';
import HeaderApp from '../HeaderApp';
import {Text, View, StyleSheet} from 'react-native';
const HomePage = ({navigation}) => {
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state.HomePage);

  useEffect(() => {
    dispatch(ReloadHome());
  }, []);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const showstatus = ({item}) => {
    // const { srcData } = storeState;

    return (
      <View style={{backgroundColor: 'rgba(0,0,0,.3)'}}>
        <ContentStatus srcData={item} />
      </View>
    );

    // if (srcData.length > 0) {
    //   {
    //     return srcData.map((stt, i) => {

    //     });
    //   }
    // } else {
    //   return <Text style={{}}>Have no any news in your newsfeed! Post your first status now!</Text>;
    // }
  };

  const statusList = () => {
    const {srcData} = storeState;
    if (srcData.length > 0) {
      return (
        <FlatList
          data={srcData}
          keyExtractor={(status) => status.id}
          renderItem={showstatus}
        />
      );
    } else {
      return (
        <Text style={{padding: 20, fontSize: 20, textAlign: 'center'}}>
          There didnt have any news in your newsfeed! Post your first status
          now!
        </Text>
      );
    }
  };

  return (
    <>
      <View style={styles.containerHeader}>
        <HeaderApp navigation={navigation} />
      </View>
      <View style={styles.container}>
        <View style={styles.containerBody}>
          <ScrollView style={styles.scrollView}>
            <ToolBar />
            <View style={styles.divider}></View>
            {/* {statusList()} */}
            {/* <ScrollView
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
                onScroll={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) {
                    console.log(1);
                  }
                }}
                scrollEventThrottle={400}>
                {showstatus()}
              </ScrollView> */}
          </ScrollView>
        </View>
      </View>
      {/* <ToolBar/> */}
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
