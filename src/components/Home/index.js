import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  ScrollView,
  Button,
} from 'react-native';
import UpStatus from './UpStatus';
import {NativeRouter, Route, Link, useHistory} from 'react-router-native';
import ContentStatus from '../ContentStatus';
import {useDispatch, useSelector} from 'react-redux';
import {ReloadHome} from '../Redux/Actions/Home.Action';
const Home = () => {
  const history = useHistory();
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      history.goBack();
      return true;
    });
  }, []);
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state.HomePage);
  const srcData = [
    {
      caption: 'đây là cái hình đầu tiên của cái tài khoản này',
      created_at: [],
      id: '6008f10b207d00001e002e26',
      like_number: 0,
      liked: false,
      no_sign_profile: 'dotuong.khai.01.02',
      posted_image: [
        'https://i.ytimg.com/vi/dwWt4RQdQ94/hqdefault.jpg',
        'http://ae01.alicdn.com/kf/HTB1EMsmB49YBuNjy0Ffq6xIsVXaO.jpg_q50.jpg',
        'https://i.pinimg.com/originals/d5/5e/fc/d55efcc94b469ad21115c1d7fb9f0631.jpg',
        'https://i.ytimg.com/vi/BNcxTNrtRdk/maxresdefault.jpg',
      ],
      posted_time: '21/12/2020',
      status_setting: 'pub',
      user_avatar:
        'https://2sao.vietnamnetjsc.vn/images/2019/02/24/14/18/khanh-vy-2.jpg',
      user_id: '6008f052207d00001e002e22',
      user_name: 'Đỗ Tường Khải',
      who_liked_status: [],
    },
    {
      caption: 'hé lu mọi người ',
      created_at: [],
      id: '6008f1f2207d00001e002e2b',
      like_number: 0,
      liked: false,
      no_sign_profile: 'duongco.khanh.01.01',
      posted_image: [],
      posted_time: '21/01/2021',
      status_setting: 'pub',
      user_avatar:
        'https://2sao.vietnamnetjsc.vn/images/2019/02/24/14/19/khanh-vy-6.jpg',
      user_id: '6008f175207d00001e002e27',
      user_name: 'Dương Cơ1 Khánh',
      who_liked_status: [],
    },
  ];
  return (
    <NativeRouter>
      <ScrollView>
        {srcData.map((stt, i) => {
          return (
            <View key={i} style={{backgroundColor: 'rgba(0,0,0,.3)'}}>
              <ContentStatus srcData={stt} />
            </View>
          );
        })}
        {/* <UpStatus /> */}

        <Button title="loadStatus" onPress={() => AsyncStorage.clear()} />
      </ScrollView>
    </NativeRouter>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
});
export default Home;
