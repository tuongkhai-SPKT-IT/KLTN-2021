import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ToolBar from '../ToolBar';
import ContentStatus from '../ContentStatus';
import {useDispatch, useSelector} from 'react-redux';
import {ReloadHome} from '../Redux/Actions/Home.Action';

export default function AppBar() {
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
  const showstatus = () => {
    const {srcData} = storeState;
    // const srcData = [
    //   {
    //     caption: '1 hình 1 video',
    //     created_at: [],
    //     file_uploaded: [
    //       {
    //         type: 'image',
    //         uri:
    //           'http://api.facebook-kltn.alphawolf.io/image/Y0cF4YV8sjxRsixidrn6YuvwCnkhRN.jpg',
    //       },
    //       {
    //         type: 'video',
    //         uri:
    //           'http://api.facebook-kltn.alphawolf.io/video/vqXpEe8Vm5UBMKAB2fmxZASICyzgqS.mp4',
    //       },
    //     ],
    //     id: '606ef522e1f7bd56b33d4708',
    //     like_number: 0,
    //     liked: false,
    //     no_sign_profile: 'khaidev.chatheader.09.01',
    //     posted_time: '08/04/2021 07:20:50 PM',
    //     sex: '1',
    //     status_setting: 'pub',
    //     user_avatar: 'http://api.facebook-kltn.alphawolf.io/image/default.jpg',
    //     user_id: '606c1c6af2cda67fc337dc73',
    //     user_name: 'Khải dev chat header',
    //     who_liked_status: [],
    //   },
    // ];
    if (srcData.length > 0) {
      {
        return srcData.map((stt, i) => {
          return (
            <View key={i} style={{backgroundColor: 'rgba(0,0,0,.3)'}}>
              <ContentStatus srcData={stt} />
            </View>
          );
        });
      }
    } else {
      return <Text style={{}}>Không có tin tức nào!!</Text>;
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.row}>
            <View style={styles.appName}>
              <Text style={styles.appName}>facebook</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Feather name="search" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerBody}>
          <ScrollView style={styles.scrollView}>
            <ToolBar />
            <View style={styles.divider}></View>
            <ScrollView
              onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  console.log(1);
                }
              }}
              scrollEventThrottle={400}>
              {showstatus()}
            </ScrollView>
          </ScrollView>
        </View>
      </View>
      {/* <ToolBar/> */}
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
});
